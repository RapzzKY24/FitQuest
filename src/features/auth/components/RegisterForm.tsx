"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUp } from "../actions/auth.actions";
import { registerSchema } from "../schemas/auth.schemas";
import type { RegisterSchema } from "../schemas/auth.schemas";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { ToastContainer, useToast } from "@/src/components/ui/Toast";
import { useRouter } from "next/navigation";
import { EyeClosedIcon, EyeIcon, Zap } from "lucide-react";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ karakter", ok: password.length >= 8 },
    { label: "Huruf kapital", ok: /[A-Z]/.test(password) },
    { label: "Angka", ok: /[0-9]/.test(password) },
  ];
  const strength = checks.filter((c) => c.ok).length;
  const colors = [
    "bg-(--muted)",
    "bg-(--danger)",
    "bg-(--warning)",
    "bg-(--success)",
  ];
  // const labels = ["", "Lemah", "Lumayan", "Kuat"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Progress bars */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 cc-xs transition-colors duration-300 ${
              i < strength ? colors[strength] : "bg-border"
            }`}
          />
        ))}
      </div>
      {/* Checklist */}
      <div className="flex gap-4">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`font-mono text-xxs tracking-wide transition-colors ${
              c.ok ? "text-success" : "text-muted"
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
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();
  const [inputType, setInputType] = useState<string>("password");

  const handleChangeInputType = (type: string) => {
    setInputType(type);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue =
    useWatch({ control, name: "password", defaultValue: "" }) ?? "";

  async function onSubmit(data: RegisterSchema) {
    setIsLoading(true);
    setServerError(null);

    const result = await signUp(data);

    if (result?.error) {
      setServerError(result.error);
      setIsLoading(false);
      return; // Stop eksekusi di sini kalau gagal
    }

    if (result?.success) {
      showToast({
        type: "success",
        title: "Berhasil Membuat Akun!",
        message: "Silakan periksa email anda untuk verifikasi!.",
      });
    }
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 ">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-primary cc-xs flex items-center justify-center">
            <span className="font-display font-black text-sm">
              <Zap fill="#fff" />
            </span>
          </div>
          <span className="font-display font-black text-lg tracking-wider uppercase">
            FitQuest
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[4px] uppercase text-primary mb-3">
            MULAI PERJALANANMU
          </p>
          <h2 className="font-display font-black text-4xl uppercase leading-none">
            BUAT AKUN
            <br />
            <span className="text-primary">WARRIOR</span>
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
          {/* Display Name */}
          <div>
            <Input
              label="Profile Name"
              type="text"
              placeholder="Contoh: Budi Setiawan"
              autoComplete="name"
              error={errors?.displayName?.message as string} // Tip: You can pass the error directly to your component!
              {...register("displayName")}
            />
          </div>

          {/* Username */}
          <div>
            <Input
              {...register("username")}
              type="text"
              label="Username"
              placeholder="budisetiawan"
              autoComplete="username"
              error={errors?.username?.message as string}
            />
          </div>

          {/* Email */}
          <div>
            <Input
              {...register("email")}
              type="email"
              label="Email"
              placeholder="kamu@email.com"
              autoComplete="email"
              error={errors?.email?.message}
            />
          </div>

          {/* Password */}
          <div>
            <Input
              suffixNode={
                inputType === "password" ? (
                  <EyeIcon
                    className="cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleChangeInputType("text")}
                  />
                ) : (
                  <EyeClosedIcon
                    className="cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleChangeInputType("password")}
                  />
                )
              }
              {...register("password")}
              type={inputType}
              label="Password"
              placeholder="Min. 8 karakter"
              autoComplete="new-password"
              error={errors?.password?.message}
            />
            <PasswordStrength password={passwordValue} />
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              suffixNode={
                inputType === "password" ? (
                  <EyeIcon
                    className="cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleChangeInputType("text")}
                  />
                ) : (
                  <EyeClosedIcon
                    className="cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleChangeInputType("password")}
                  />
                )
              }
              {...register("confirmPassword")}
              type={inputType}
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              autoComplete="new-password"
              error={errors?.confirmPassword?.message}
            />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full">
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
        <p className="font-body text-center text-sm text-muted mt-7">
          Sudah punya akun?{" "}
          <Link
            href="/auth/login"
            className="text-primary font-semibold hover:text-secondary transition-colors"
          >
            Masuk
          </Link>
        </p>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
