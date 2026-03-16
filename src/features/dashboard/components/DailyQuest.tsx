import { createClient } from "@/src/utils/supabase/server";
import DailyQuestClient, { MappedQuest } from "./client/DailyQuestClient";

export default async function DailyQuest() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 1. Dapatkan tanggal hari ini (Format YYYY-MM-DD) biar cocok sama database
  // Karena SQL CURRENT_DATE biasanya pakai UTC, trik gampangnya gini:
  const todayStr = new Date().toISOString().split("T")[0];

  // 2. Tarik semua data Daily Quest yang lagi aktif
  const { data: allDailyQuests } = await supabase
    .from("quests")
    .select("*")
    .eq("quest_type", "daily")
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (!allDailyQuests) return null;

  // 3. Tarik progress user khusus untuk quest hari ini
  const { data: userProgress } = await supabase
    .from("user_quests")
    .select("quest_id, progress, is_completed, is_claimed")
    .eq("user_id", user.id)
    .eq("period_start", todayStr);

  // 4. Gabungin data Master Quest dengan Progress User
  const mappedQuests: MappedQuest[] = allDailyQuests.map((quest) => {
    // Cari apakah user udah ada progress di quest ini
    const progressRecord = userProgress?.find((up) => up.quest_id === quest.id);

    // Ambil nilai progress (kalau belum mulai, berarti 0)
    const currentProgress = progressRecord?.progress || 0;
    const maxTarget = quest.target_value;

    const isCompleted =
      progressRecord?.is_completed || currentProgress >= maxTarget;
    const isClaimed = progressRecord?.is_claimed || false;

    // Tentukan Status String
    let status = `${currentProgress}/${maxTarget}`;
    if (isClaimed) status = "CLAIMED";
    else if (isCompleted) status = "DONE";

    // Tentukan Warna & Tampilan berdasarkan status
    let iconBg = "bg-white/5 border-white/10";
    let barVariant: "green" | "orange" | "blue" = "orange";
    let isMuted = currentProgress === 0;

    if (isCompleted) {
      iconBg = "bg-green-500/10 border-green-500/20";
      barVariant = "green";
      isMuted = false;
    } else if (currentProgress > 0) {
      iconBg = "bg-orange-500/10 border-orange-500/20";
      isMuted = false;
    }

    return {
      id: quest.id,
      title: quest.title,
      icon: quest.icon || "🎯",
      iconBg,
      status,
      progress: Math.min(currentProgress, maxTarget),
      max: maxTarget,
      barVariant,
      isMuted,
    };
  });

  return <DailyQuestClient quests={mappedQuests} />;
}
