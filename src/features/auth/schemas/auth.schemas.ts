import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Minimal 2 karakter")
      .max(50, "Maksimal 50 karakter"),
    username: z
      .string()
      .min(3, "Minimal 3 karakter")
      .max(20, "Maksimal 20 karakter")
      .regex(/^[a-z0-9_]+$/, "Hanya huruf kecil, angka, dan underscore"),
    email: z.string().email("Format email tidak valid"),
    password: z
      .string()
      .min(8, "Minimal 8 karakter")
      .regex(/[A-Z]/, "Harus ada 1 huruf kapital")
      .regex(/[0-9]/, "Harus ada 1 angka"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const onboardingSchema = z.object({
  goal: z.enum([
    "lose_weight",
    "build_muscle",
    "increase_stamina",
    "general_fitness",
  ]),
  heightCm: z.number().min(100).max(250).optional(),
  weightKg: z.number().min(20).max(300).optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type OnboardingSchema = z.infer<typeof onboardingSchema>;
