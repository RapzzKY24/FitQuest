import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import QuestPage from "@/src/features/quests/Quests";
import {
  DashboardStats,
  UserQuestWithDetails,
} from "@/src/features/quests/types/quest";
import { constructMetadata } from "@/src/utils/metadata";

export const metadata = constructMetadata({
  title: "Quest",
});

export default async function QuestsContainer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Bikin variabel hari ini (format YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // 1. PANCING DATABASE (tetep panggil fungsi ini ya)
  await supabase.rpc("fn_generate_daily_quests", { p_user_id: user.id });

  // 2. Tarik data Quests dengan FILTER YANG BENER
  const { data: rawUserQuests, error: questError } = await supabase
    .from("user_quests")
    .select(
      `
      id, progress, is_completed, is_claimed, period_start, period_end,
      quests (id, title, description, icon, quest_type, target_value, xp_reward)
    `,
    )
    .eq("user_id", user.id)
    .lte("period_start", today) // ⚡ period_start HARUS hari ini atau sebelumnya (Senin)
    .gte("period_end", today); // ⚡ period_end HARUS hari ini atau setelahnya (Minggu)

  if (questError) {
    console.error("Gagal narik quest:", questError.message);
  }
  const formattedQuests = rawUserQuests as unknown as UserQuestWithDetails[];

  // 3. Tarik data Stats...
  const { data: userStats, error: statsError } = await supabase
    .from("v_user_dashboard")
    .select("*")
    .eq("id", user.id)
    .single();

  if (statsError) {
    console.error("Gagal narik stats:", statsError.message);
  }

  return (
    <QuestPage
      initialQuests={formattedQuests || []}
      userStats={userStats as DashboardStats}
    />
  );
}
