"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

type ProfileUpdateData = {
  display_name: string;
  username: string;
  avatar_emoji: string;
};

type PhysicalUpdateData = {
  height: string;
  weight: string;
  goal: string;
};

export async function updatePersonalInfoAction(data: ProfileUpdateData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Tidak ada akses." };

  const { error } = await supabase
    .from("user_profiles")
    .update({
      display_name: data.display_name,
      username: data.username,
      avatar_emoji: data.avatar_emoji,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Gagal update profil:", error);
    return { success: false, error: "Gagal menyimpan perubahan." };
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true, message: "Profil berhasil diperbarui! 🔥" };
}

export async function updatePhysicalInformation(data: PhysicalUpdateData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Tidak ada akses." };

  const { error } = await supabase
    .from("user_profiles")
    .update({
      weight_kg: parseFloat(data.weight),
      height_cm: parseInt(data.height),
      goal: data.goal,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Gagal update profil:", error);
    return { success: false, error: "Gagal menyimpan perubahan." };
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true, message: "Data Tubuh berhasil diperbarui! 🔥" };
}
