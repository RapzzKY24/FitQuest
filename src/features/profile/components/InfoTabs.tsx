/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/src/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import React from "react";
import { Achievement } from "../../achievement/components/AchievementCard";
import { ToastContainer, useToast } from "@/src/components/ui/Toast";
import { useForm } from "react-hook-form";
import {
  updatePersonalInfoAction,
  updatePhysicalInformation,
} from "../actions/profile.actions";
import { UserProfileData } from "../types/profile.types";
import { Select } from "@/src/components/ui/Select";

interface InfoTabProps {
  achievements: Achievement[];
  userData: UserProfileData;
}

const InfoTabs = ({ achievements, userData }: InfoTabProps) => {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-4 md:gap-6 items-start">
      <div className="flex flex-col gap-4 md:gap-6 w-full min-w-0">
        <PersonalInformation userData={userData} />
        <PhysicalStats userData={userData} />
      </div>

      <div className="flex flex-col gap-4 md:gap-6 w-full min-w-0">
        <LeaderboardAchievement achievements={achievements} />
      </div>
    </section>
  );
};

type PhysicalFormValues = {
  height: string;
  weight: string;
  goal: string;
};

const GOAL_OPTIONS = [
  { value: "lose_weight", label: "Lose Weight 🔥" },
  { value: "build_muscle", label: "Build Muscle 💪" },
  { value: "increase_stamina", label: "Increase Stamina ⚡" },
  { value: "general_fitness", label: "General Fitness 🏃‍♂️" },
];

const PhysicalStats = ({ userData }: { userData: any }) => {
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PhysicalFormValues>({
    defaultValues: {
      height: userData?.height || "",
      weight: userData?.weight || "",
      goal: userData?.fitness_goal || "",
    },
  });

  const currentGoal = watch("goal");

  const onSubmit = async (data: PhysicalFormValues) => {
    const result = await updatePhysicalInformation(data);
    if (result.success) {
      showToast({
        type: "success",
        title: "Berhasil!",
        message: result.message,
      });
    } else {
      showToast({ type: "danger", title: "Gagal", message: result.error });
    }
  };

  return (
    <section>
      <Card className="px-4 md:px-6 space-y-3 w-full border-border bg-surface">
        <CardHeader className="pt-6 pb-2">
          <div className="flex items-center gap-4 uppercase tracking-[0.15rem] md:tracking-[0.2em] text-muted text-xs md:text-sm font-bold">
            <h2 className="whitespace-nowrap">{"//"} Data Tubuh</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input
                  {...register("weight")}
                  placeholder="Berat Badan Anda"
                  label="Berat Badan (KG)"
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <Input
                  {...register("height")}
                  placeholder="Tinggi Badan Anda"
                  label="Tinggi Badan (CM)"
                  type="number"
                />
              </div>
            </div>

            <div className="space-y-1 relative z-50">
              <Select
                label="Tujuan Fitnes"
                placeholder="Pilih tujuan..."
                options={GOAL_OPTIONS}
                value={currentGoal}
                onChange={(val) => setValue("goal", val, { shouldDirty: true })}
              />
              <input type="hidden" {...register("goal")} />
            </div>

            <div className="flex justify-start pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Data Tubuh"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
};

const PRESET_EMOJIS = [
  "🦍",
  "🦁",
  "🦅",
  "🐺",
  "🐉",
  "🥷",
  "🤖",
  "👽",
  "🔥",
  "⚡",
];

type ProfileFormValues = {
  display_name: string;
  username: string;
  avatar_emoji: string;
};

export const PersonalInformation = ({ userData }: { userData: any }) => {
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      display_name: userData?.name || "",
      username: userData?.username || "",
      avatar_emoji: userData?.avatar || "🦍",
    },
  });

  const currentEmoji = watch("avatar_emoji");

  const onSubmit = async (data: ProfileFormValues) => {
    const result = await updatePersonalInfoAction(data);
    if (result.success) {
      showToast({
        type: "success",
        title: "Berhasil!",
        message: result.message,
      });
    } else {
      showToast({ type: "danger", title: "Gagal", message: result.error });
    }
  };

  return (
    <section>
      <Card className="px-4 md:px-6 space-y-3 w-full overflow-hidden bg-surface border-border">
        <CardHeader className="pt-6 pb-2">
          <div className="flex items-center gap-4 uppercase tracking-[0.15rem] md:tracking-[0.2em] text-muted text-xs md:text-sm font-bold">
            <h2 className="whitespace-nowrap">{"//"} Informasi Pribadi</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <form
            className="flex flex-col justify-center gap-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-3">
              <label className="text-[10px] md:text-xs font-mono text-muted uppercase tracking-widest">
                Pilih Avatar Emoji
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {PRESET_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setValue("avatar_emoji", emoji, { shouldDirty: true })
                    }
                    className={`
                      w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xl md:text-2xl rounded-lg md:rounded-xl transition-all duration-300
                      ${
                        currentEmoji === emoji
                          ? "bg-primary/20 border-2 border-primary scale-110 shadow-[0_0_15px_rgba(255,77,0,0.3)]"
                          : "bg-elevated border border-white/5 hover:bg-white/10 grayscale hover:grayscale-0"
                      }
                    `}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Input
                  {...register("display_name", {
                    required: "Nama tidak boleh kosong",
                  })}
                  placeholder="Nama Lengkap"
                  label="Display Name"
                />
                {errors.display_name && (
                  <span className="text-red-500 text-[10px] md:text-xs">
                    {errors.display_name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Input
                  {...register("username", {
                    required: "Username tidak boleh kosong",
                  })}
                  placeholder="Username"
                  label="Username"
                />
                {errors.username && (
                  <span className="text-red-500 text-[10px] md:text-xs">
                    {errors.username.message}
                  </span>
                )}
              </div>
            </div>

            <Input
              defaultValue={userData?.email}
              placeholder="email@example.com"
              label="Email"
              disabled
            />

            <div className="flex justify-start pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
};

interface LeaderboardAchievementProps {
  achievements: Achievement[];
}

const rarityColorMap: Record<string, string> = {
  legendary: "text-primary drop-shadow-[0_0_8px_rgba(255,77,0,0.5)]",
  epic: "text-purple-500",
  rare: "text-info",
  common: "text-muted",
};

const LeaderboardAchievement = ({
  achievements = [],
}: LeaderboardAchievementProps) => {
  const unlockedAchievements = achievements.filter(
    (a) => a.status === "unlocked" || a.status === "claimable",
  );

  const rarityWeight: Record<string, number> = {
    legendary: 4,
    epic: 3,
    rare: 2,
    common: 1,
  };

  const topAchievements = unlockedAchievements
    .sort((a, b) => rarityWeight[b.rarity] - rarityWeight[a.rarity])
    .slice(0, 3);

  return (
    <Card className="px-4 space-y-3 w-full overflow-hidden bg-warning/10">
      <CardHeader>
        <div className="flex items-center gap-4 uppercase tracking-[0.2rem] text-muted text-xs md:text-sm font-bold">
          <h2 className="whitespace-nowrap">{"//"} Top Achievement</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5 pb-4">
        {topAchievements.length > 0 ? (
          topAchievements.map((item) => (
            <Card
              key={item.id}
              className="p-3 bg-primary/10 border border-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 shrink-0 text-2xl">
                  {item.icon}
                </div>
                <div className="flex flex-col justify-center gap-y-1 min-w-0">
                  <h1 className="text-broken-white text-[14px] md:text-[15px] font-bold leading-none truncate">
                    {item.title}
                  </h1>
                  <p
                    className={`uppercase text-[10px] font-mono font-bold tracking-[0.15em] ${rarityColorMap[item.rarity]}`}
                  >
                    {item.rarity}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-4 text-center border border-dashed border-border/50 rounded bg-surface/50">
            <p className="text-xs text-muted font-mono uppercase">
              Belum ada pencapaian.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoTabs;
