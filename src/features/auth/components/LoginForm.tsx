// src/features/auth/components/LoginForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "../actions/auth.actions";
import { loginSchema } from "../schemas/auth.schemas";
import type { LoginSchema } from "../schemas/auth.schemas";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { ToastContainer, useToast } from "@/src/components/ui/Toast";
import { EyeIcon, EyeOffIcon, Zap } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState<string>("password");

  const handleChangeInputType = (type: string) => {
    setInputType(type);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    setIsLoading(true);
    setServerError(null);

    const result = await signIn(data);

    // Kalau ada error (redirect tidak terjadi), tampilkan pesan
    if (result?.error) {
      setServerError(result.error);
      setIsLoading(false);
      return;
    }

    if (result?.success) {
      showToast({
        type: "success",
        title: "Login Berhasil!",
        // Pesan beda tergantung arah redirect
        message:
          result.redirectTo === "/auth/register/onboarding"
            ? "Mari lengkapi data fisikmu dulu..."
            : "Selamat datang kembali!",
      });

      // Biarkan tombol muter (loading), arahin sesuai hasil deteksi server
      setTimeout(() => {
        router.push(result.redirectTo as string);
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 2px, transparent 2px), linear-gradient(90deg, var(--text) 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Orange accent blob */}
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full pointer-events-none bg-primary/70 blur-3xl"
          // style={{
          //   background:
          //     "radial-gradient(circle, rgba(255,77,0,0.12) 0%, transparent 70%)",
          //   filter: "blur(40px)",
          // }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-primary cc-sm flex items-center justify-center">
            <span className="font-display font-black text-white text-base leading-none">
              <Zap fill="#fff" />
            </span>
          </div>
          <span className="font-display font-black text-xl tracking-wider uppercase">
            FitQuest
          </span>
        </div>

        {/* Center copy */}
        <div className="relative z-10">
          <p className="font-mono text-xxs tracking-[4px] uppercase text-primary mb-6">
            LEVEL UP YOUR LIFE
          </p>
          <h1 className="font-display font-black text-6xl leading-none uppercase mb-6">
            EVERY REP
            <br />
            <span className="text-primary">COUNTS.</span>
          </h1>
          <p className="font-mono text-base max-w-sm leading-relaxed">
            Workout harian jadi quest. XP numpuk tiap sesi. GymBro-mu evolve
            seiring progresmu.
          </p>
        </div>

        {/* Stats teaser */}
        <div className="relative z-10 flex gap-8">
          {[
            { value: "2.4K+", label: "Warriors Aktif" },
            { value: "18K+", label: "Sesi Dilog" },
            { value: "94%", label: "Konsistensi" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display font-black text-2xl">{stat.value}</p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-primary cc-xs flex items-center justify-center">
              <span className="font-display font-black text-white text-sm">
                <Zap fill="#fff" />
              </span>
            </div>
            <span className="font-display font-black text-lg tracking-wider uppercase">
              FitQuest
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[4px] uppercase text-primary mb-3">
              WELCOME BACK
            </p>
            <h2 className="font-display font-black text-4xl uppercase leading-none">
              MASUK KE
              <br />
              <span className="text-primary">AKUNMU</span>
            </h2>
          </div>

          {/* Server error */}
          {serverError && (
            <div className="mb-6 px-4 py-3 bg-danger/10 border border-danger/30 cc-sm">
              <p className="font-body text-sm text-danger">{serverError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="kamu@email.com"
                autoComplete="email"
                label="Email"
                error={errors?.email?.message}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                {/* <Link
                  href="/forgot-password"
                  className="font-body text-xs text-fq-muted hover:text-fq-primary transition-colors"
                >
                  Lupa password?
                </Link> */}
              </div>
              <Input
                suffixNode={
                  inputType === "password" ? (
                    <EyeIcon
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleChangeInputType("text")}
                    />
                  ) : (
                    <EyeOffIcon
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleChangeInputType("password")}
                    />
                  )
                }
                {...register("password")}
                type={inputType}
                placeholder="••••••••"
                label="Password"
                autoComplete="current-password"
                error={errors?.password?.message}
              />
            </div>

            {/* Submit */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : (
                "MASUK SEKARANG"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
              atau
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Register link */}
          <p className="font-body text-center text-sm text-muted">
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-semibold hover:text-secondary transition-colors"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
