"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Tambahin interface balikan dari function SQL lu
interface ClaimRewardResponse {
  success: boolean;
  xp_earned?: number;
  error?: string;
}

export async function claimQuestReward(userQuestId: string) : Promise<ClaimRewardResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { success: false, error: "Sesi tidak valid" };

    // Panggil fungsi fn_claim_quest di PostgreSQL lu!
    const { data, error } = await supabase.rpc("fn_claim_quest", {
      p_user_id: user.id,
      p_user_quest_id: userQuestId
    });

    if (error) {
      console.error("Gagal klaim:", error.message);
      return { success: false, error: error.message };
    }

    // Refresh halaman biar progress bar XP di sidebar langsung loncat!
    revalidatePath("/quests");
    revalidatePath("/dashboard");

    return data as ClaimRewardResponse; // data ini isinya JSON dari SQL lu: { success: true, xp_earned: 50 }
    
  } catch (error) {
    console.error("System error:", error);
    return { success: false, error: "System error" };
  }
}