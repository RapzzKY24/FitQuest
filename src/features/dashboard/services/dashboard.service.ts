import { UserBadgeLog } from "../components/LatestAchievement";
import { RecentWorkoutLog } from "../components/WorkoutStats";
import { SupabaseClient } from "@supabase/supabase-js";

export const DashboardService = {
  dailyQuest: async (
    supabase: SupabaseClient,
    userId: string,
    todayStrId: string,
  ) => {
    // 2. Tarik data Master Quest & Progress User secara BERSAMAAN (Paralel)
    const [questsResponse, progressResponse] = await Promise.all([
      supabase
        .from("quests")
        .select("*")
        .eq("quest_type", "daily")
        .eq("is_active", true)
        .order("id", { ascending: true }),
      supabase
        .from("user_quests")
        .select("quest_id, progress, is_completed, is_claimed")
        .eq("user_id", userId)
        .eq("period_start", todayStrId),
    ]);

    // 3. Handle Error jika salah satu query gagal
    if (questsResponse.error) {
      console.error("Gagal fetch daily quests:", questsResponse.error.message);
      return null; // Atau return [] tergantung kebutuhan UI
    }
    if (progressResponse.error) {
      console.error(
        "Gagal fetch user progress:",
        progressResponse.error.message,
      );
    }

    return {
      allDailyQuests: questsResponse.data || [],
      userProgress: progressResponse.data || [],
    };
  },

  headerDashboard: async (supabase: SupabaseClient, userId: string) => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const [{ value: mo }, , { value: da }, , { value: ye }] =
      formatter.formatToParts(now);

    // ISO String untuk jam 00:00:00 WIB (UTC+7)
    const startOfTodayWIB = `${ye}-${mo}-${da}T00:00:00+07:00`;

    // Fetch Dashboard & Hitung Sesi secara BERSAMAAN (Paralel)
    const [vDashboardResponse, sessionsResponse] = await Promise.all([
      supabase
        .from("v_user_dashboard")
        .select("display_name, streak_current")
        .eq("id", userId)
        .single(),
      supabase
        .from("workout_logs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("logged_at", startOfTodayWIB),
    ]);

    if (vDashboardResponse.error) {
      console.error(
        "Gagal fetch dashboard view:",
        vDashboardResponse.error.message,
      );
    }
    if (sessionsResponse.error) {
      console.error(
        "Gagal hitung sesi hari ini:",
        sessionsResponse.error.message,
      );
    }

    return {
      vDashboard: vDashboardResponse.data,
      sessionsToday: sessionsResponse.count || 0,
    };
  },

  latestAchievement: async (supabase: SupabaseClient, userId: string) => {
    const { data: recentBadges, error } = await supabase
      .from("user_badges")
      .select(
        `
      earned_at,
      badges (
        id,
        name,
        description,
        icon,
        rarity
      )
    `,
      )
      .eq("user_id", userId)
      .order("earned_at", { ascending: false }) // Urutkan dari yang paling baru didapet
      .limit(3) // Ambil 3 aja buat di dashboard
      .returns<UserBadgeLog[]>();

    if (error) {
      console.error("Gagal narik achievement:", error.message);
    }
    return {
      recentBadges,
    };
  },

  leaderboard: async (supabase: SupabaseClient, userId: string) => {
    const { data: topUsers } = await supabase
      .from("v_weekly_leaderboard")
      .select("*")
      .order("rank", { ascending: true })
      .limit(3);

    // 3. Tarik Posisi & Data User Saat Ini
    const { data: currentUserData } = await supabase
      .from("v_weekly_leaderboard")
      .select("*")
      .eq("user_id", userId)
      .single();
    return {
      topUsers,
      currentUserData,
    };
  },

  levelProgres: async (supabase: SupabaseClient, userId: string) => {
    const { data: vDashboard, error } = await supabase
      .from("v_user_dashboard")
      .select("level, level_title, xp_current, xp_to_next, xp_pct")
      .eq("id", userId)
      .single();

    if (error || !vDashboard) {
      return null;
    }

    return { vDashboard };
  },

  statsDashboard: async (supabase: SupabaseClient, userId: string) => {
    const { data: vDashboard } = await supabase
      .from("v_user_dashboard")
      .select("*")
      .eq("id", userId)
      .single();
    return {
      vDashboard,
    };
  },

  weeklyActivity: async (supabase: SupabaseClient, userId: string) => {
    const now = new Date();

    const startOfWeek = new Date(now);
    const dayOfWeek = now.getDay(); // 0 = Minggu, 1 = Senin, dst
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    startOfWeek.setDate(now.getDate() - daysSinceMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    const { data: logs, error } = await supabase
      .from("workout_logs")
      .select("xp_earned, duration_min, logged_at")
      .eq("user_id", userId)
      .gte("logged_at", startOfWeek.toISOString())
      .lte("logged_at", endOfWeek.toISOString());

    if (error) {
      console.error("Gagal narik data mingguan:", error.message);
    }
    return {
      logs,
      daysSinceMonday,
    };
  },

  workoutStats: async (supabase: SupabaseClient, userId: string) => {
    const { data: recentWorkouts, error } = await supabase
      .from("workout_logs")
      .select(
        `
      id,
      duration_min,
      intensity,
      xp_earned,
      logged_at,
      workout_types (
        name,
        icon
      )
    `,
      )
      .eq("user_id", userId)
      .order("logged_at", { ascending: false }) // Urutkan dari yang terbaru
      .limit(3)
      .returns<RecentWorkoutLog[]>();

    if (error) {
      console.error("Gagal narik riwayat workout:", error.message);
    }
    return {
      recentWorkouts,
    };
  },
};
