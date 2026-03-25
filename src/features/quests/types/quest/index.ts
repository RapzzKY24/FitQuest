// 1. Tipe data untuk Master Quest (dari tabel quests)
export interface QuestMaster {
  id: number;
  title: string;
  description: string | null;
  icon: string;
  quest_type: "daily" | "weekly" | "special";
  target_value: number;
  xp_reward: number;
}

// 2. Tipe data untuk User Quest (dari tabel user_quests JOIN quests)
export interface UserQuestWithDetails {
  id: string; // UUID
  progress: number;
  is_completed: boolean;
  is_claimed: boolean;
  period_start: string; // Tanggal dalam format ISO string
  quests: QuestMaster; // Hasil join dari Supabase ngebentuk object ini
}

// 3. Tipe data untuk Dashboard Stats (dari View v_user_dashboard)
export interface DashboardStats {
  id: string;
  display_name: string;
  username: string;
  avatar_emoji: string;
  goal: string;
  level: number;
  level_title: string;
  xp_total: number;
  xp_current: number;
  xp_to_next: number;
  xp_pct: number;
  streak_current: number;
  streak_best: number;
  total_sessions: number;
  total_minutes: number;
  weekly_xp: number;
  gymbro_stage: number;
  badge_count: number;
}

// 4. Props untuk Komponen QuestPage lu
export interface QuestPageProps {
  initialQuests: UserQuestWithDetails[];
  userStats: DashboardStats;
}