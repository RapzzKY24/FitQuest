"use server";

import {
  loginSchema,
  registerSchema,
  onboardingSchema,
} from "../schemas/auth.schemas";
import { redirect } from "next/navigation";
import type { AuthActionResult } from "../types/auth.types";
import type {
  LoginSchema,
  RegisterSchema,
  OnboardingSchema,
} from "../schemas/auth.schemas";
import { createClient } from "@/src/utils/supabase/server";

// ─────────────────────────────────────────────
// SIGN UP
// ─────────────────────────────────────────────
export async function signUp(data: RegisterSchema): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let isSuccess = false;
  try {
    const supabase = await createClient();

    // Cek username sudah dipakai atau belum
    const { data: existing } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("username", parsed.data.username)
      .single();

    if (existing) {
      return {
        success: false,
        error: "Username sudah dipakai, coba yang lain",
      };
    }

    // Create new user
    const { data: authData, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/login",
        data: {
          // Data ini dibaca oleh trigger fn_handle_new_user di Supabase
          // untuk auto-create user_profiles + user_stats
          display_name: parsed.data.displayName,
          username: parsed.data.username,
        },
      },
    });

    if (
      authData.user &&
      authData.user.identities &&
      authData.user.identities.length === 0
    ) {
      return {
        success: false,
        error: "Email ini sudah terdaftar,Silakan login.",
      };
    }

    // Change isSuccess jika tidak ada error dari supabase
    isSuccess = true;
  } catch (error) {
    console.error("Signup System Error:", error);
    return {
      success: false,
      error: "Terjadi kesalahan pada sistem. Coba lagi nanti.",
    };
  }
  // Return success true jika berhasil membuat user baru
  if (isSuccess) {
    return { success: true };
  }

  // Fallback (seharusnya tidak pernah sampai ke sini)
  return { success: false, error: "Unknown error occurred" };
}

// ─────────────────────────────────────────────
// SIGN IN
// ─────────────────────────────────────────────
export async function signIn(data: LoginSchema): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const supabase = await createClient();

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });

    if (authError) {
      // Supabase ngasih error kalau email belum diverifikasi atau password salah
      if (authError.message.includes("Email not confirmed")) {
        return {
          success: false,
          error: "Email belum diverifikasi. Silakan cek email anda!",
        };
      }
      return { success: false, error: "Email atau password salah!." };
    }

    // 2. Cek Status Onboarding di user_profiles
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("height_cm, weight_kg")
      .eq("id", authData.user.id)
      .single();

    // 3. Tentukan arah redirect-nya
    // Kalau tinggi atau berat badannya masih null, berarti belum onboarding
    const needsOnboarding = !profile?.height_cm || !profile?.weight_kg;
    const redirectUrl = needsOnboarding
      ? "/auth/register/onboarding"
      : "/dashboard";

    return {
      success: true,
      redirectTo: redirectUrl, // Kita kasih tau Client harus pindah ke mana
    };
  } catch (error) {
    console.error("System error during sign in:", error);
    return {
      success: false,
      error: "Terjadi kesalahan sistem. Coba beberapa saat lagi.",
    };
  }
}

// ─────────────────────────────────────────────
// SIGN OUT
// ─────────────────────────────────────────────
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

// ─────────────────────────────────────────────
// SAVE ONBOARDING DATA
// ─────────────────────────────────────────────
export async function saveOnboarding(
  data: OnboardingSchema,
): Promise<AuthActionResult> {
  const parsed = onboardingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Data tidak valid" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Sesi tidak ditemukan" };

  const { error } = await supabase
    .from("user_profiles")
    .update({
      goal: parsed.data.goal as string,
      height_cm: parsed.data.heightCm ?? null,
      weight_kg: parsed.data.weightKg ?? null,
      updated_at: new Date().toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    .eq("id", user.id);

  if (error) return { success: false, error: error.message };

  if (parsed.data.weightKg) {
    const { error: weightError } = await supabase.from("weight_logs").insert({
      user_id: user.id,
      weight_kg: parsed.data.weightKg,
      // Kolom logged_at dan created_at gak perlu diisi manual
      // karena di SQL lu udah ada "DEFAULT CURRENT_DATE" dan "DEFAULT NOW()"
    });

    if (weightError) {
      console.error(
        "Failed to insert initial weight log:",
        weightError.message,
      );
      // Return error biar tau kalau gagal bikin log awal
      return {
        success: false,
        error: "Gagal menyimpan riwayat berat badan awal",
      };
    }
  }

  redirect("/dashboard");
}
