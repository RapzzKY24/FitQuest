import {
  FormattedWorkoutLog,
  HeatCell,
  MonthlyData,
  RawProfile,
  RawStats,
  RawWorkoutLog,
  UserProfileData,
} from "../types/profile.types";

export const formatProfileData = (
  profile: RawProfile | null,
  stats: RawStats | null,
  achievementCount: number | null,
): UserProfileData => ({
  name: profile?.display_name ?? "Gym Bro",
  username: profile?.username ?? "gymbro",
  avatar: profile?.avatar_emoji ?? "😤",
  created_at: profile?.created_at ?? new Date().toISOString(),
  level: stats?.level ?? 1,
  title: stats?.level_title ?? "Novice",
  xp: stats?.xp_current ?? 0,
  xpMax: stats?.xp_to_next ?? 100,
  streak: stats?.streak_current ?? 0,
  total_sessions: stats?.total_sessions ?? 0,
  total_minutes: stats?.total_minutes ?? 0,
  total_xp: stats?.xp_total ?? 0,
  total_achievements: achievementCount ?? 0,
});

export const formatMonthlyAndLogs = (
  logs: RawWorkoutLog[] | null,
  stats: RawStats | null,
): { monthlyData: MonthlyData; formattedLogs: FormattedWorkoutLog[] } => {
  const intensityMap: Record<string, string> = {
    light: "Ringan",
    moderate: "Sedang",
    intense: "Intens",
  };

  const sportCounts: Record<
    string,
    { count: number; name: string; icon: string }
  > = {};
  const intensityCounts: Record<string, number> = {};

  const formattedLogs: FormattedWorkoutLog[] = (logs ?? []).map((log) => {
    const wt = Array.isArray(log.workout_types)
      ? log.workout_types[0]
      : log.workout_types;
    const wName = wt?.name ?? "Workout";
    const wIcon = wt?.icon ?? "🏃";

    if (!sportCounts[wName]) {
      sportCounts[wName] = { count: 0, name: wName, icon: wIcon };
    }
    sportCounts[wName].count += 1;

    if (log.intensity) {
      const key = log.intensity.toLowerCase();
      intensityCounts[key] = (intensityCounts[key] ?? 0) + 1;
    }

    return {
      id: log.id,
      emoji: wIcon,
      name: wName,
      intensity: intensityMap[log.intensity] ?? "Sedang",
      duration: log.duration_min,
      xp: log.xp_earned,
      timestamp: new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(log.logged_at)),
    };
  });

  const topSport = Object.values(sportCounts).sort(
    (a, b) => b.count - a.count,
  )[0];
  const topIntensityKey = Object.keys(intensityCounts).sort(
    (a, b) => intensityCounts[b] - intensityCounts[a],
  )[0];

  const monthlyData: MonthlyData = {
    session: stats?.total_sessions ?? 0,
    totalMinutes: stats?.total_minutes ?? 0,
    expEarned: stats?.monthly_xp ?? stats?.xp_total ?? 0,
    favSportName: topSport?.name ?? "Belum Ada",
    favSportEmoji: topSport?.icon ?? "🏃",
    favIntensity: intensityMap[topIntensityKey] ?? "Sedang",
  };

  return { monthlyData, formattedLogs };
};

export const formatHeatmapData = (
  rawLogs: { logged_at: string }[] | null,
): HeatCell[] => {
  if (!rawLogs) return [];

  const counts: Record<string, number> = {};

  rawLogs.forEach((log) => {
    // Ambil tanggal saja (YYYY-MM-DD)
    const date = new Date(log.logged_at).toISOString().split("T")[0];
    // Ganti strip jadi slash sesuai format Heatmap lu "YYYY/MM/DD"
    const formattedDate = date.replace(/-/g, "/");
    counts[formattedDate] = (counts[formattedDate] || 0) + 1;
  });

  return Object.entries(counts).map(([date, count]) => ({
    date,
    count,
  }));
};
