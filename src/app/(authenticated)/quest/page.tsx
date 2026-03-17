import {createClient} from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";
import QuestPage from "@/src/features/quests/Quests";
import {
  DashboardStats,
  UserQuestWithDetails,
} from "@/src/features/quests/types/quest";

export default async function QuestsRoute() {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  

  // ⚡ 1. PANCING DATABASE: "Pastikan user ini punya quest buat hari ini!"
  // Fungsi ini aman dipanggil berkali-kali karena di SQL-nya ada NOT EXISTS
  await supabase.rpc("fn_generate_daily_quests", {p_user_id: user.id});

  // 2. Tarik data Quests yang SEKARANG PASTI ADA ISINYA
  const {data: rawUserQuests, error: questError} = await supabase
    .from("user_quests")
    .select(
      `
      id, progress, is_completed, is_claimed, period_start,
      quests (id, title, description, icon, quest_type, target_value, xp_reward)
    `,
    )
    .eq("user_id", user.id)
    .eq("period_start", new Date().toISOString().split("T")[0]); // Opsional: Pastikan cuma narik quest hari ini

  if (questError) {
    console.error("Gagal narik quest:", questError.message);
  }

  const formattedQuests = rawUserQuests as unknown as UserQuestWithDetails[];

  // 3. Tarik data Stats...
  const {data: userStats, error: statsError} = await supabase
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
