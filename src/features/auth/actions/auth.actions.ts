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

  const supabase = await createClient();

  // Cek username sudah dipakai atau belum
  const { data: existing } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("username", parsed.data.username)
    .single();

  if (existing) {
    return { success: false, error: "Username sudah dipakai, coba yang lain" };
  }

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        // Data ini dibaca oleh trigger fn_handle_new_user di Supabase
        // untuk auto-create user_profiles + user_stats
        display_name: parsed.data.displayName,
        username: parsed.data.username,
      },
    },
  });

  if (error) return { success: false, error: error.message };

  // Setelah signup, arahkan ke onboarding untuk pilih goal & data fisik
  redirect("/register/onboarding");
}

// ─────────────────────────────────────────────
// SIGN IN
// ─────────────────────────────────────────────
export async function signIn(data: LoginSchema): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Terjemahkan error Supabase ke bahasa yang lebih friendly
    const msg = error.message.includes("Invalid login credentials")
      ? "Email atau password salah"
      : error.message;
    return { success: false, error: msg };
  }

  redirect("/dashboard");
}

// ─────────────────────────────────────────────
// SIGN OUT
// ─────────────────────────────────────────────
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
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

  redirect("/dashboard");
}
