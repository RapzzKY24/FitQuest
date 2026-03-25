"use client";

import {useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {saveOnboarding} from "../actions/auth.actions";
import {onboardingSchema} from "../schemas/auth.schemas";
import {GOAL_LABELS} from "../types/auth.types";
import type {OnboardingSchema} from "../schemas/auth.schemas";
import type {UserGoal} from "../types/auth.types";
import {Input} from "@/src/components/ui/Input";
import {Button} from "@/src/components/ui/Button";

const GOALS = Object.entries(GOAL_LABELS) as [
  UserGoal,
  (typeof GOAL_LABELS)[UserGoal],
][];

// Step indicator
function StepDots({current, total}: {current: number; total: number}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({length: total}).map((_, i) => (
        <div
          key={i}
          className={`h-1 transition-all duration-300 cc-xs ${
            i < current
              ? "bg-primary w-6"
              : i === current
                ? "bg-primary w-8"
                : "bg-border w-4"
          }`}
        />
      ))}
    </div>
  );
}

export function OnboardingFlow() {
  const [step, setStep] = useState(0); // 0 = goal, 1 = body data
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
  });

  const selectedGoal = useWatch({control, name: "goal"});

  async function onSubmit(data: OnboardingSchema) {
    setIsLoading(true);
    setServerError(null);

    const result = await saveOnboarding(data);

    if (result?.error) {
      setServerError(result.error);
      setIsLoading(false);
    }
    // Sukses → redirect ke /dashboard (dari action)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10">
          <StepDots current={step} total={2} />
          <div className="mt-6">
            <p className="font-mono text-[10px] tracking-[4px] uppercase text-primary mb-3">
              {step === 0 ? "// LANGKAH 1 DARI 2" : "// LANGKAH 2 DARI 2"}
            </p>
            <h2 className="font-display font-black text-4xl uppercase text-broken-white leading-none">
              {step === 0 ? (
                <>
                  APA TUJUAN
                  <br />
                  <span className="text-primary">UTAMAMU?</span>
                </>
              ) : (
                <>
                  DATA FISIK
                  <br />
                  <span className="text-primary">OPSIONAL</span>
                </>
              )}
            </h2>
            <p className="font-body text-broken-white text-sm mt-3">
              Ini bantu kami sesuaikan quest & rekomendasi workout buatmu.
            </p>
          </div>
        </div>

        {/* Server error */}
        {serverError && (
          <div className="mb-6 px-4 py-3 bg-danger/10 border border-danger/30 cc-sm">
            <p className="font-body text-sm text-danger">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ── Step 0: Goal selection ── */}
          {step === 0 && (
            <div className="space-y-3">
              {GOALS.map(([key, {label, emoji, desc}]) => (
                <Button
                  key={key}
                  type="button"
                  onClick={() => setValue("goal", key, {shouldValidate: true})}
                  className={`w-full flex items-center gap-4 px-5 py-4 border transition-all duration-150 cc-md text-left ${
                    selectedGoal === key
                      ? "border-primary bg-primary/80"
                      : "border-border bg-surface hover:border-border"
                  }`}>
                  <span className="text-2xl">{emoji}</span>
                  <div className="flex-1">
                    <p
                      className={`font-display font-bold text-sm uppercase tracking-wider text-broken-white`}>
                      {label}
                    </p>
                    <p className="font-body text-xxs md:text-xs text-broken-white mt-0.5">
                      {desc}
                    </p>
                  </div>
                  {/* Radio indicator */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 border-border`}>
                    {selectedGoal === key && (
                      <div className="w-2 h-2 rounded-full bg-border" />
                    )}
                  </div>
                </Button>
              ))}

              {errors.goal && (
                <p className="font-body text-xs text-danger">
                  {errors.goal.message ?? "Pilih salah satu tujuan"}
                </p>
              )}

              <Button
                variant="secondary"
                type="button"
                disabled={!selectedGoal}
                onClick={() => setStep(1)}
                className="w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed">
                LANJUTKAN
              </Button>
            </div>
          )}

          {/* ── Step 1: Body data (optional) ── */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Height */}
              <div>
                <Input
                  {...register("heightCm", {valueAsNumber: true})}
                  type="number"
                  placeholder="Contoh: 170"
                  min={100}
                  max={250}
                  label="Tinggi Badan"
                  error={errors?.heightCm?.message}
                />
              </div>

              {/* Weight */}
              <div>
                <Input
                  {...register("weightKg", {valueAsNumber: true})}
                  label="Berat Badan"
                  type="number"
                  placeholder="Contoh: 65"
                  min={20}
                  max={300}
                  error={errors?.weightKg?.message}
                />
              </div>

              <div className="flex gap-3 pt-2">
                {/* Back */}
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setStep(0)}
                  className="btn-outline flex-1 py-3 text-sm">
                  KEMBALI
                </Button>

                {/* Skip or Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex-2 py-3 text-sm disabled:opacity-50">
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Menyimpan...
                    </span>
                  ) : (
                    "MULAI QUEST!"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
