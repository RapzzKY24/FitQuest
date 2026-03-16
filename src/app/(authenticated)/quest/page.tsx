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
  if (!user) redirect("/login");

  // 1. Tarik data Quests seperti biasa (tanpa .returns())
  const {data: rawUserQuests, error: questError} = await supabase
    .from("user_quests")
    .select(
      `
      id,
      progress,
      is_completed,
      is_claimed,
      period_start,
      quests (
        id, title, description, icon, quest_type, target_value, xp_reward
      )
    `,
    )
    .eq("user_id", user.id);

  if (questError) {
    console.error("Gagal narik quest:", questError.message);
  }

  // ⚡ INI KUNCI JAWABANNYA ⚡
  // Kita "casting" paksa raw datanya ke interface yang udah lu buat.
  // Pake as unknown dulu biar TypeScript bener-bener lepas tangan dari tipe aslinya.
  const formattedQuests = rawUserQuests as unknown as UserQuestWithDetails[];

  const {data: userStats, error: statsError} = await supabase
    .from("v_user_dashboard")
    .select("*")
    .eq("id", user.id)
    .single();

  if (statsError) {
    console.error("Gagal narik stats:", statsError.message);
  }

  return (
    // Sekarang lempar formattedQuests, dijamin garis merahnya lenyap!
    <QuestPage
      initialQuests={formattedQuests || []}
      userStats={userStats as DashboardStats}
    />
  );
}
