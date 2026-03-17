import { createClient } from "@/src/utils/supabase/server";
import DailyQuestClient, { MappedQuest } from "./client/DailyQuestClient";
import { DashboardService } from "../services/dashboard.service";

export default async function DailyQuest() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const todayStrId = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  const response = await DashboardService.dailyQuest(
    supabase,
    user.id,
    todayStrId,
  );

  // jika data kosong
  if (!response) return <DailyQuestClient quests={[]} />;

  const { allDailyQuests, userProgress } = response;

  const mappedQuests: MappedQuest[] = allDailyQuests.map((quest) => {
    const progressRecord = userProgress.find((up) => up.quest_id === quest.id);

    const currentProgress = progressRecord?.progress || 0;
    const maxTarget = quest.target_value;

    const isCompleted =
      progressRecord?.is_completed || currentProgress >= maxTarget;
    const isClaimed = progressRecord?.is_claimed || false;

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
