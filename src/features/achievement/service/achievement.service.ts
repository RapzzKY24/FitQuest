import { createClient } from "@/src/utils/supabase/server";
import { Achievement } from "../components/AchievementCard";

export async function FetchUserAchievement(
  userId: string,
): Promise<Achievement[]> {
  const supabase = await createClient();

  // 1. FETCH DATA
  const [
    { data: badgesMaster },
    { data: userBadges },
    { data: userStats },
    { data: userLogs },
  ] = await Promise.all([
    supabase.from("badges").select("*").eq("is_active", true),
    supabase.from("user_badges").select("*").eq("user_id", userId),
    supabase.from("v_user_dashboard").select("*").eq("id", userId).single(),
    supabase
      .from("workout_logs")
      .select("workout_type_id, duration_min")
      .eq("user_id", userId),
  ]);

  const sessionsPerWt: Record<number, number> = {};
  const minutesPerWt: Record<number, number> = {};

  if (userLogs) {
    userLogs.forEach((log) => {
      const wtId = log.workout_type_id;
      if (wtId) {
        sessionsPerWt[wtId] = (sessionsPerWt[wtId] || 0) + 1;
        minutesPerWt[wtId] =
          (minutesPerWt[wtId] || 0) + (log.duration_min || 0);
      }
    });
  }

  // 2. MAPPER: Ubah data dari database jadi format AchievementCard
  const achievementsData: Achievement[] = (badgesMaster || []).map((badge) => {
    // Cari tau apakah user udah dapet badge ini
    const unlockedBadge = userBadges?.find((ub) => ub.badge_id === badge.id);
    const isUnlocked = !!unlockedBadge;

    let status: "unlocked" | "locked" | "in-progress" | "claimable" = isUnlocked
      ? "unlocked"
      : "locked";
    let progress = 0;

    // Kalau belum unlocked, kita hitung progressnya
    if (!isUnlocked && userStats) {
      switch (badge.condition_type) {
        case "total_sessions":
          progress = userStats.total_sessions || 0;
          break;
        case "streak":
          progress = userStats.streak_current || 0;
          break;
        case "level":
          progress = userStats.level || 0;
          break;
        case "specific":
          // Pastikan badge ini punya target ID olahraga di database
          if (badge.target_wt_id) {
            if (badge.target_metric === "minutes") {
              progress = minutesPerWt[badge.target_wt_id] || 0;
            } else {
              // Default-nya ngitung sesi
              progress = sessionsPerWt[badge.target_wt_id] || 0;
            }
          }
          break;
        default:
          progress = 0;
      }

      if (progress >= badge.condition_value) {
        status = "claimable"; // Target tercapai, siap di-klaim!
        progress = badge.condition_value; // Mentokin progress bar-nya
      } else if (progress > 0) {
        status = "in-progress"; // Masih jalan
      }
    }

    return {
      id: badge.id,
      title: badge.name,
      desc: badge.description,
      rarity: badge.rarity as "legendary" | "epic" | "rare" | "common",
      icon: badge.icon,
      status: status,
      progress:
        status === "in-progress" || status === "claimable"
          ? progress
          : undefined,
      max:
        status === "in-progress" || status === "claimable"
          ? badge.condition_value
          : undefined,
      unlockedAt: unlockedBadge?.earned_at,
    };
  });

  return achievementsData;
}
