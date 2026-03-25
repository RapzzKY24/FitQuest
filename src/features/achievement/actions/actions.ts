"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function claimBadgeAction(badgeId: string | number) {
  const supabase = await createClient();

  // Cek user yang lagi login
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Insert ke tabel user_badges (Ini yang tadinya dilakuin otomatis sama database)
  const { error } = await supabase.from("user_badges").insert({
    user_id: user.id,
    badge_id: badgeId,
  });

  if (error) {
    console.error("Gagal claim badge:", error);
    return { success: false, error: error.message };
  }

  // Refresh halaman biar badge-nya langsung berubah jadi "unlocked" tanpa perlu reload browser!
  revalidatePath("/profile");

  return { success: true };
}
