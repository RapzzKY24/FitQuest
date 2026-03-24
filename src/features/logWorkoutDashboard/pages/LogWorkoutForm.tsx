"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { Slider } from "@/src/components/ui/Slider";
import { Textarea } from "@/src/components/ui/TextArea"; // Import Textarea lu
import HeaderCard from "../components/shared/HeaderCard";
import { Button } from "@/src/components/ui/Button";
import { ArrowLeft, Zap } from "lucide-react";
import { logWorkoutSession } from "../actions/workout";
import { useRouter } from "next/navigation";
import { useToast, ToastContainer } from "@/src/components/ui/Toast";

// 1. Schema Zod (Update: notes dibatasin 200 karakter)
const workoutSchema = z.object({
  workout_type_id: z.number("Pilih jenis olahraga dulu cuy!"),
  duration_min: z
    .number()
    .min(5, "Minimal 5 menit dong")
    .max(300, "Maksimal 300 menit!"),
  intensity: z.enum(["light", "moderate", "intense"]),
  notes: z
    .string()
    .max(200, "Kepanjangan bro, maksimal 200 karakter aja!")
    .optional(),
});

type WorkoutFormValues = z.infer<typeof workoutSchema>;

// Bikin tipe data (karena lu pakai TypeScript)
type WorkoutType = {
  id: number;
  name: string;
  icon: string;
  category: string;
};

export const WorkoutLogForm = ({
  workoutTypes,
  isLimitReached,
}: {
  workoutTypes: WorkoutType[];
  isLimitReached: boolean;
}) => {
  const router = useRouter();

  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  // --- MOCK DATA ---

  const MockDataSliderTime = [
    { id: 1, duration: 5 }, // Nilai Min
    { id: 2, duration: 30 },
    { id: 3, duration: 60 },
    { id: 4, duration: 90 },
    { id: 5, duration: 120 }, // Nilai Max
  ];

  const colorStyles = {
    Biru: {
      border: "border-cyan-500",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      shadow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    },
    Kuning: {
      border: "border-yellow-500",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      shadow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    },
    Merah: {
      border: "border-red-500",
      bg: "bg-red-500/10",
      text: "text-red-400",
      shadow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    },
  };

  const intensityMockData = [
    {
      id: "1",
      icon: "🚶",
      label: "Ringan",
      exp: "×0.8 XP",
      color: "Biru",
      value: "light",
    },
    {
      id: "2",
      icon: "🏃",
      label: "Sedang",
      exp: "x1.0 XP",
      color: "Kuning",
      value: "moderate",
    },
    {
      id: "3",
      icon: "🔥",
      label: "Intens",
      exp: "x1.3 XP",
      color: "Merah",
      value: "intense",
    },
  ] as const;

  // --- INIT FORM ---
  const {
    register, // Tambahin register buat Textarea
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      duration_min: 30,
      intensity: "moderate",
      notes: "", // Default notes kosong
    },
  });

  // Pantau state form
  const selectedSportId = useWatch({ control, name: "workout_type_id" });
  const currentDuration = useWatch({ control, name: "duration_min" });
  const currentIntensity = useWatch({ control, name: "intensity" });

  const onSubmit = async (data: WorkoutFormValues) => {
    // 1. Panggil Server Action
    const result = await logWorkoutSession(data);

    // 2. Handle Responnya
    if (!result.success) {
      // Tampilkan error (bisa diganti pake Toast dari Shadcn kalau lu pake)
      showToast({
        type: "danger",
        title: "Error",
        message: "Gagal menyimpan log.",
      });
      return;
    }

    // 3. Kalau sukses!
    // alert("⚡ Workout berhasil dicatat! XP kamu udah nambah!");
    showToast({
      type: "xp",
      title: `+${result?.data?.xpEarned} XP`,
      message: "Workout selesai.",
    });

    // Opsional: Redirect user ke Dashboard atau reset form-nya
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* SECTION 1: WORKOUT TYPE (Grid UI) */}
      <section>
        <Card className="w-full bg-black/40 border-white/5">
          <HeaderCard title="Jenis Olahraga" />
          <CardContent>
            {/* ... (Kode Grid Olahraga sama persis kayak sebelumnya) ... */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {workoutTypes.map((item) => {
                const isSelected = selectedSportId === item.id;
                return (
                  <Card
                    key={item.id}
                    variant={isSelected ? "achievement" : "stat"}
                    onClick={() =>
                      setValue("workout_type_id", item.id, {
                        shouldValidate: true,
                      })
                    }
                    className={`flex flex-col items-center justify-center p-5 cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary border-2 bg-primary/10"
                        : "opacity-40 hover:opacity-100"
                    }`}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div
                      className={`text-[10px] font-bold tracking-widest uppercase text-center ${
                        isSelected ? "text-primary" : "text-white/60"
                      }`}
                    >
                      {item.name}
                    </div>
                  </Card>
                );
              })}
            </div>
            {errors.workout_type_id && (
              <p className="text-red-500 text-sm mt-2">
                {errors.workout_type_id.message}
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* SECTION 2: DURASI (Slider UI) */}
      <section>
        <Card className="w-full bg-black/40 border-white/5">
          <CardHeader className="flex flex-row justify-between items-center px-6 pt-6">
            <h1 className="text-sm font-bold tracking-[0.3em] uppercase text-muted">
              Durasi
            </h1>
            <h2 className="text-2xl font-bold tracking-[0.3em] uppercase text-primary">
              {currentDuration}
              <span className="text-muted text-sm ml-1">Menit</span>
            </h2>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6 pt-2">
            <Slider
              min={5}
              max={120}
              step={5}
              value={currentDuration}
              onChange={(val) =>
                setValue("duration_min", val, { shouldValidate: true })
              }
              unit=" min"
            />
            <div className="flex items-center justify-between px-1">
              {MockDataSliderTime.map((time) => (
                <h1
                  key={time.id}
                  onClick={() =>
                    setValue("duration_min", time.duration, {
                      shouldValidate: true,
                    })
                  }
                  className={`text-sm font-bold cursor-pointer transition-colors ${
                    currentDuration === time.duration
                      ? "text-primary"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {time.duration}m
                </h1>
              ))}
            </div>
            {errors.duration_min && (
              <p className="text-red-500 text-sm mt-2">
                {errors.duration_min.message}
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* SECTION 3: INTENSITAS (Custom Color UI Lu) */}
      <section>
        {/* ... (Kode Card Intensitas sama persis kayak sebelumnya) ... */}
        <Card className="w-full bg-black/40 backdrop-blur-md border-white/5">
          <HeaderCard title="Intensitas" />
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {intensityMockData.map((item) => {
                const isSelected = currentIntensity === item.value;
                const style =
                  colorStyles[item.color as keyof typeof colorStyles];

                return (
                  <Card
                    key={item.id}
                    variant={isSelected ? "achievement" : "stat"}
                    onClick={() =>
                      setValue("intensity", item.value, {
                        shouldValidate: true,
                      })
                    }
                    className={`
                      flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300
                      ${
                        isSelected
                          ? `border-2 ${style.border} ${style.bg} ${style.shadow} scale-105`
                          : "opacity-40 hover:opacity-100 border-white/5 hover:bg-white/5"
                      }
                    `}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="text-center space-y-1">
                      <div
                        className={`text-[11px] font-bold tracking-[0.2em] uppercase ${
                          isSelected ? style.text : "text-white/80"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div
                        className={`text-[9px] font-medium tracking-widest ${
                          isSelected ? style.text : "text-white/40"
                        }`}
                      >
                        {item.exp}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            {errors.intensity && (
              <p className="text-red-500 text-sm mt-2">
                {errors.intensity.message}
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* SECTION 4: CATATAN (Notes UI Lu) */}
      <section>
        <Card className="w-full bg-black/40 border-white/5">
          <CardContent className="pt-6">
            {" "}
            {/* Padding atas disesuaikan biar rapi */}
            <Textarea
              {...register("notes")} // Daftarin ke RHF
              label="Catatan Sesi"
              placeholder="Gimana rasanya workout hari ini?"
              hint="Maksimal 200 karakter"
              rows={3}
              error={errors.notes?.message} // Nampilin pesan error kalau kepanjangan
            />
          </CardContent>
        </Card>
      </section>

      {isLimitReached && (
        <Card className="border-warning/50 p-2">
          <p className="text-warning text-xs text-center font-mono tracking-wider uppercase">
            ⚠️ Limit Harian Tercapai.Kamu bisa mencatat lagi besok untuk
            mendapatkan XP!
          </p>
        </Card>
      )}

      <div className="w-full flex items-center gap-4">
        <Button variant="outline" className="w-[35%]" disabled={isSubmitting}>
          <div className="flex items-center gap-2 text-xs lg:text-base">
            <ArrowLeft size={14} />
            Batal
          </div>
        </Button>
        <Button
          className="w-[65%]"
          type="submit"
          disabled={isSubmitting || isLimitReached}
        >
          <div className="flex items-center gap-2 text-xs lg:text-base">
            <Zap
              className={`h-4 w-4 ${isLimitReached ? "text-gray-500" : "text-yellow-500 fill-yellow-500"}`}
            />
            {isSubmitting
              ? "Mencatat..."
              : isLimitReached
                ? "Limit Tercapai"
                : "Simpan dan Klaim EXP"}
          </div>
        </Button>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </form>
  );
};
