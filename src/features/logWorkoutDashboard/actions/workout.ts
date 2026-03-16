"use server";

import {createClient} from "@/src/utils/supabase/server";
import {revalidatePath} from "next/cache";

interface WorkoutSessionData {
  workout_type_id: number;
  duration_min: number;
  intensity: "light" | "moderate" | "intense";
  notes?: string;
}

export async function logWorkoutSession(data: WorkoutSessionData) {
  try {
    const supabase = await createClient();

    // 1. Cek User yang lagi login
    const {
      data: {user},
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {success: false, error: "Sesi tidak valid. Silakan login ulang."};
    }

    // 2. Tembak ke Database & Minta ID-nya kembali (.select('id').single())
    const {data: insertedLog, error: insertError} = await supabase
      .from("workout_logs")
      .insert({
        user_id: user.id,
        workout_type_id: data.workout_type_id,
        duration_min: data.duration_min,
        intensity: data.intensity,
        notes: data.notes || null,
      })
      .select("id") // Ambil ID dari row yang baru aja dibuat
      .single();

    if (insertError) {
      console.error("Gagal simpan sesi workout:", insertError.message);
      return {success: false, error: insertError.message};
    }

    // 3. Tarik data XP yang udah dihitung sama Trigger SQL lu di background
    const {data: finalLog, error: fetchError} = await supabase
      .from("workout_logs")
      .select("xp_earned")
      .eq("id", insertedLog.id)
      .single();

    const xpEarned = finalLog?.xp_earned || 0;

    // 4. Refresh cache halaman
    revalidatePath("/dashboard");

    // 5. Kembalikan data sukses beserta jumlah XP-nya!
    return {
      success: true,
      data: {
        xpEarned: xpEarned,
      },
    };
  } catch (error) {
    console.error("System error:", error);
    return {success: false, error: "Terjadi kesalahan pada sistem."};
  }
}
