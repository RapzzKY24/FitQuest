import React from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import Link from "next/link";
import { createClient } from "@/src/utils/supabase/server";

type RecentWorkoutLog = {
  id: string;
  duration_min: number;
  intensity: string;
  xp_earned: number;
  logged_at: string;
  workout_types: {
    name: string;
    icon: string;
  } | null;
};

// --- HELPER FUNCTIONS ---
// Buat nerjemahin intensitas DB ke bahasa UI
const translateIntensity = (intensity: string) => {
  switch (intensity) {
    case "light":
      return "Ringan";
    case "moderate":
      return "Sedang";
    case "intense":
      return "Intens";
    default:
      return "Biasa";
  }
};

// Buat bikin format "Hari ini 06:30" / "Kemarin 18:00"
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const timeFormatted = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0 && now.getDate() === date.getDate()) {
    return `Hari ini ${timeFormatted}`;
  } else if (
    diffDays === 1 ||
    (diffDays === 0 && now.getDate() !== date.getDate())
  ) {
    return `Kemarin ${timeFormatted}`;
  } else {
    return `${diffDays} hari lalu`;
  }
};

const WorkoutStats = async () => {
  const supabase = await createClient();

  // 1. Cek User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. Tarik log terakhir (Join table workout_logs & workout_types)
  const { data: recentWorkouts, error } = await supabase
    .from("workout_logs")
    .select(
      `
      id,
      duration_min,
      intensity,
      xp_earned,
      logged_at,
      workout_types (
        name,
        icon
      )
    `,
    )
    .eq("user_id", user.id)
    .order("logged_at", { ascending: false }) // Urutkan dari yang terbaru
    .limit(3)
    .returns<RecentWorkoutLog[]>();

  if (error) {
    console.error("Gagal narik riwayat workout:", error.message);
  }

  // 3. Format data dari DB biar pas sama UI lu
  const formattedWorkouts =
    recentWorkouts?.map((log) => ({
      id: log.id,
      // Di Supabase join, data relasi ada di dalam object
      title: log.workout_types?.name || "Olahraga",
      icon: log.workout_types?.icon || "⚡",
      subtitle: `${translateIntensity(log.intensity)} · ${log.duration_min} mnt · ${formatRelativeTime(log.logged_at)}`,
      xp: `+${log.xp_earned} XP`,
    })) || [];

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Workout Terakhir
          </span>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <span className="text-muted tracking-[0.2em] text-[11px] font-semibold uppercase cursor-pointer hover:text-broken-white transition-colors">
            <Link href={"/log"}>Lihat Semua &rarr;</Link>
          </span>
        </div>

        {/* --- LIST WORKOUT --- */}
        <div className="flex flex-col">
          {formattedWorkouts.length === 0 ? (
            <p className="text-muted text-sm text-center py-4">
              Belum ada riwayat workout. Yuk mulai!
            </p>
          ) : (
            formattedWorkouts.map((workout, index) => (
              <div
                key={workout.id}
                className={`py-4 flex items-center justify-between ${
                  index !== formattedWorkouts.length - 1
                    ? "border-b border-border/60"
                    : "pt-4 pb-0"
                }`}
              >
                {/* Info Kiri (Icon + Teks) */}
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div
                    className="w-12 h-12 flex items-center justify-center bg-elevated/50 border border-border text-2xl shadow-inner"
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    {workout.icon}
                  </div>

                  {/* Text Stack */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-broken-white font-bold text-[15px] tracking-wide">
                      {workout.title}
                    </h3>
                    <p className="text-muted text-[12px] font-medium tracking-wide">
                      {workout.subtitle}
                    </p>
                  </div>
                </div>

                {/* XP Badge Kanan */}
                <BadgePill color="primary">{workout.xp}</BadgePill>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutStats;
