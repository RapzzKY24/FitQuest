export interface RawProfile {
  display_name: string | null;
  username: string | null;
  avatar_emoji: string | null;
  created_at: string;
}

export interface RawStats {
  level: number;
  level_title: string;
  xp_current: number;
  xp_to_next: number;
  streak_current: number;
  total_sessions: number;
  total_minutes: number;
  xp_total: number;
  monthly_xp: number;
}

export interface RawWorkoutLog {
  id: string;
  intensity: string;
  duration_min: number;
  xp_earned: number;
  logged_at: string;
  workout_types:
    | {
        name: string;
        icon: string;
      }
    | {
        name: string;
        icon: string;
      }[]
    | null;
}

export interface UserProfileData {
  name: string;
  username: string;
  email?: string;
  avatar: string;
  weight?: number;
  height?: number;
  fitness_goal?: string;
  created_at: string;
  level: number;
  title: string;
  xp: number;
  xpMax: number;
  streak: number;
  total_sessions: number;
  total_minutes: number;
  total_xp: number;
  total_achievements: number;
}

export interface MonthlyData {
  session: number;
  totalMinutes: number;
  expEarned: number;
  favSportName: string;
  favSportEmoji: string;
  favIntensity: string;
}

export interface FormattedWorkoutLog {
  id: string;
  emoji: string;
  name: string;
  intensity: string;
  duration: number;
  xp: number;
  timestamp: string;
}

export interface HeatCell {
  date: string;
  count: number;
}
