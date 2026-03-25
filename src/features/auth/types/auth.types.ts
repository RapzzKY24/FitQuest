export type UserGoal =
  | "lose_weight"
  | "build_muscle"
  | "increase_stamina"
  | "general_fitness";

export const GOAL_LABELS: Record<
  UserGoal,
  { label: string; emoji: string; desc: string }
> = {
  lose_weight: {
    label: "Turunkan Berat",
    emoji: "🔥",
    desc: "Bakar lemak, jadi lebih ramping",
  },
  build_muscle: {
    label: "Bangun Otot",
    emoji: "💪",
    desc: "Tambah massa otot & kekuatan",
  },
  increase_stamina: {
    label: "Tingkatkan Stamina",
    emoji: "⚡",
    desc: "Tahan lama, nggak gampang capek",
  },
  general_fitness: {
    label: "Kebugaran Umum",
    emoji: "🏃",
    desc: "Hidup sehat & aktif secara keseluruhan",
  },
};

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  displayName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OnboardingFormData {
  goal: UserGoal;
  heightCm?: number;
  weightKg?: number;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
  redirectTo?:string;
}
