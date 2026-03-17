import { createClient } from "@/src/utils/supabase/server";
import { Achievement } from "../components/AchievementCard";

export async function FetchUserAchievement(
  userId: string,
): Promise<Achievement[]> {
  const supabase = await createClient();

  // 1. FETCH DATA
  const [{ data: badgesMaster }, { data: userBadges }, { data: userStats }] =
    await Promise.all([
      supabase.from("badges").select("*").eq("is_active", true),
      supabase.from("user_badges").select("*").eq("user_id", userId),
      supabase.from("v_user_dashboard").select("*").eq("id", userId).single(),
    ]);

  // 2. MAPPER: Ubah data dari database jadi format AchievementCard
  const achievementsData: Achievement[] = (badgesMaster || []).map((badge) => {
    // Cari tau apakah user udah dapet badge ini
    const unlockedBadge = userBadges?.find((ub) => ub.badge_id === badge.id);
    const isUnlocked = !!unlockedBadge;

    let status: "unlocked" | "locked" | "in-progress" = isUnlocked
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
        default:
          progress = 0;
      }

      // Kalau udah ada progress tapi belum nyampe target, set "in-progress"
      if (progress > 0 && progress < badge.condition_value) {
        status = "in-progress";
      }
    }

    return {
      id: badge.id,
      title: badge.name,
      desc: badge.description,
      rarity: badge.rarity as "legendary" | "epic" | "rare" | "common",
      icon: badge.icon,
      status: status,
      progress: status === "in-progress" ? progress : undefined,
      max: status === "in-progress" ? badge.condition_value : undefined,
      unlockedAt: unlockedBadge?.earned_at,
    };
  });

  return achievementsData;
}
