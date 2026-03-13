"use client";

import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { Stepper, type Step } from "@/src/components/ui/Stepper";
import React from "react";
import { SectionLabel } from "./shared/SectionLabel";
import { GymBroStage, StageListItem } from "./gymbro/StagesListItem";

// TYPES

export interface StageConfig {
  emoji: string;
  stageName: string;
  description: string;
  unlockAt: number;
  sessionRange: string;
}

export const CURRENT_STAGE_IDX: GymBroStage = 2;
const TOTAL_SESSIONS = 47;
const SESSIONS_TO_NEXT = 3;
const PROGRESS_MAX = 50;

const CURRENT_STAGE_DATA: StageConfig = {
  emoji: "💪",
  stageName: "Toning Up",
  description: "Otot mulai terbentuk, lemak mulai pergi.",
  unlockAt: 25,
  sessionRange: "25 – 49 sesi",
};

const NEXT_STAGE_DATA: StageConfig = {
  emoji: "😤",
  stageName: "Lean Mode",
  description: "Jawline muncul. Baju lama kebesaran sekarang.",
  unlockAt: 50,
  sessionRange: "50 – 99 sesi",
};

const STAGES_LIST: StageConfig[] = [
  {
    emoji: "🌱",
    stageName: "Chubby",
    description: "Baru mulai, semangat! Setiap langkah itu progress.",
    unlockAt: 0,
    sessionRange: "0 – 9 sesi",
  },
  {
    emoji: "💪",
    stageName: "Softening",
    description: "Mulai kelihatan! Tubuh sudah mulai merespons.",
    unlockAt: 10,
    sessionRange: "10 – 24 sesi",
  },
  {
    emoji: "⚔️",
    stageName: "Toning Up",
    description: "Otot mulai terbentuk, lemak mulai pergi.",
    unlockAt: 25,
    sessionRange: "25 – 49 sesi",
  },
  {
    emoji: "🦁",
    stageName: "Lean Mode",
    description: "Jawline muncul. Baju lama kebesaran sekarang.",
    unlockAt: 50,
    sessionRange: "50 – 99 sesi",
  },
  {
    emoji: "👑",
    stageName: "Shredded",
    description: "Transformasi complete. GymBro kamu sudah god-tier.",
    unlockAt: 100,
    sessionRange: "100+ sesi",
  },
];

const STEPPER_STEPS: Step[] = STAGES_LIST.map((s) => ({
  label: s.stageName,
  description: `ab ${s.unlockAt} sesi`,
}));

const Gymbro = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      {/* ══ LEFT — Main avatar card ══ */}
      <div className="grid col-span-3">
        <Card className="w-full border-border bg-surface">
          <CardHeader className="px-6 pt-6 pb-0">
            <div className="flex items-center gap-3">
              <SectionLabel>{"//"} Karakter Pendampingmu</SectionLabel>
              <div className="h-px flex-1 bg-border" />
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 pt-6 flex flex-col items-center gap-6">
            {/* Avatar Area */}
            <div className="relative">
              <BadgePill>
                <span className="text-7xl p-3">{CURRENT_STAGE_DATA.emoji}</span>
              </BadgePill>
            </div>

            {/* Title Area */}
            <div className="text-center space-y-1.5">
              <BadgePill color="accent">
                <h1 className="text-[16px]">Turun Berat Badan</h1>
              </BadgePill>

              <h1 className="font-barlow font-black text-3xl text-broken-white uppercase tracking-wide mt-2">
                {CURRENT_STAGE_DATA.stageName}{" "}
                <span className="text-muted text-xl font-bold">
                  — Stage {CURRENT_STAGE_IDX}
                </span>
              </h1>

              <p className="font-mono text-muted text-[10px] tracking-[3px] uppercase">
                {CURRENT_STAGE_DATA.description}
              </p>
            </div>

            {/* Progress Area */}
            <div className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-muted uppercase tracking-[2px]">
                  Stage {CURRENT_STAGE_IDX} → Stage {CURRENT_STAGE_IDX + 1}
                </span>
                <span className="font-mono text-[12px] text-muted">
                  {TOTAL_SESSIONS} / {PROGRESS_MAX} sesi
                </span>
              </div>

              <ProgressBar
                value={TOTAL_SESSIONS}
                max={PROGRESS_MAX}
                variant="orange"
                type="linear"
              />

              <p className="font-mono text-[12px] text-center text-muted">
                <span className="text-primary font-bold">
                  {SESSIONS_TO_NEXT} sesi
                </span>{" "}
                lagi untuk unlock{" "}
                <span className="text-broken-white font-bold">
                  {NEXT_STAGE_DATA.stageName}
                </span>
                !
              </p>
            </div>

            {/* Stepper Area */}
            <div className="w-full pt-2">
              <Stepper steps={STEPPER_STEPS} currentStep={CURRENT_STAGE_IDX} />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* ══ RIGHT — Stage list ══ */}
      <Card className="w-full border-border bg-surface">
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center gap-3">
            <SectionLabel>{"//"} GymBro Stages</SectionLabel>
            <div className="h-px flex-1 bg-border" />
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 pt-4 flex flex-col gap-2">
          {/* Progress Summary Box */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[16px] text-muted uppercase tracking-[2px]">
              Progress
            </span>

            <BadgePill color="muted" className="gap-2.5 cursor-default">
              <div className="flex items-center gap-1.5">
                {([0, 1, 2, 3, 4] as GymBroStage[]).map((s) => (
                  <span
                    key={s}
                    className={`block size-2 transition-all duration-300 ${
                      s < CURRENT_STAGE_IDX
                        ? "bg-success"
                        : s === CURRENT_STAGE_IDX
                          ? "bg-primary"
                          : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <span>{CURRENT_STAGE_IDX}/4</span>
            </BadgePill>
          </div>

          {/* List of Stage Cards */}
          {STAGES_LIST.map((config, idx) => (
            <StageListItem
              key={idx}
              stageIdx={idx as GymBroStage}
              config={config}
              currentStage={CURRENT_STAGE_IDX}
            />
          ))}

          {/* Total Sessions Footer */}
          <div className="mt-2 pt-3 border-t border-border flex items-center justify-between">
            <span className="font-mono text-xs text-muted uppercase tracking-[2px]">
              Total Sesi
            </span>
            <span className="font-barlow font-black text-xl text-broken-white">
              {TOTAL_SESSIONS}
              <span className="text-muted text-sm font-normal ml-1">sesi</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Gymbro;
