"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUp } from "../actions/auth.actions";
import { registerSchema } from "../schemas/auth.schemas";
import type { RegisterSchema } from "../schemas/auth.schemas";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ karakter", ok: password.length >= 8 },
    { label: "Huruf kapital", ok: /[A-Z]/.test(password) },
    { label: "Angka", ok: /[0-9]/.test(password) },
  ];
  const strength = checks.filter((c) => c.ok).length;
  const colors = [
    "bg-fq-muted",
    "bg-fq-danger",
    "bg-fq-warning",
    "bg-fq-success",
  ];
  const labels = ["", "Lemah", "Lumayan", "Kuat"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Progress bars */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 cc-xs transition-colors duration-300 ${
              i < strength ? colors[strength] : "bg-fq-border"
            }`}
          />
        ))}
      </div>
      {/* Checklist */}
      <div className="flex gap-4">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`font-mono text-[9px] tracking-wide transition-colors ${
              c.ok ? "text-fq-success" : "text-fq-muted"
            }`}
          >
            {c.ok ? "✓" : "○"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  async function onSubmit(data: RegisterSchema) {
    setIsLoading(true);
    setServerError(null);

    const result = await signUp(data);

    console.log(result);

    if (result?.error) {
      setServerError(result.error);
      setIsLoading(false);
    }
    // Kalau sukses → redirect ke /register/onboarding (dari action)
  }

  return (
    <div className="min-h-screen bg-fq-bg flex items-center justify-center p-6 ">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-fq-primary cc-xs flex items-center justify-center">
            <span className="font-display font-black text-white text-sm">
              FQ
            </span>
          </div>
          <span className="font-display font-black text-fq-text text-lg tracking-wider uppercase">
            FitQuest
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[4px] uppercase text-fq-primary mb-3">
            MULAI PERJALANANMU
          </p>
          <h2 className="font-display font-black text-4xl uppercase text-fq-text leading-none">
            BUAT AKUN
            <br />
            <span className="text-fq-primary">WARRIOR</span>
          </h2>
        </div>

        {/* Server error */}
        {serverError && (
          <div className="mb-6 px-4 py-3 bg-fq-danger/10 border border-fq-danger/30 cc-sm">
            <p className="font-body text-sm text-fq-danger">{serverError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Display Name */}
          <div>
            <Input
              label="Profile Name"
              {...register("displayName")}
              type="text"
              placeholder="Contoh: Budi Setiawan"
              autoComplete="name"
            />
            {errors.displayName && (
              <p className="font-body text-xs text-fq-danger mt-1.5">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-fq-muted pointer-events-none">
                @
              </span>
              <Input
                {...register("username")}
                type="text"
                label="Username"
                placeholder="budisetiawan"
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <p className="font-body text-xs text-fq-danger mt-1.5">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              {...register("email")}
              type="email"
              label="Email"
              placeholder="kamu@email.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="font-body text-xs text-fq-danger mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              {...register("password")}
              type="password"
              label="Password"
              placeholder="Min. 8 karakter"
              autoComplete="new-password"
            />
            <PasswordStrength password={passwordValue} />
            {errors.password && (
              <p className="font-body text-xs text-fq-danger mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              {...register("confirmPassword")}
              type="password"
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="font-body text-xs text-fq-danger mt-1.5">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Membuat akun...
              </span>
            ) : (
              "BUAT AKUN SEKARANG"
            )}
          </Button>
        </form>

        {/* Login link */}
        <p className="font-body text-center text-sm text-fq-muted mt-7">
          Sudah punya akun?{" "}
          <Link
            href="/auth/login"
            className="text-fq-primary font-semibold hover:text-fq-secondary transition-colors"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
