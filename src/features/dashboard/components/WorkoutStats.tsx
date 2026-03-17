import React from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import Link from "next/link";
import { createClient } from "@/src/utils/supabase/server";
import { dashboardUtils } from "@/src/utils/DashboardUtils";
import { DashboardService } from "../services/dashboard.service";

export type RecentWorkoutLog = {
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

const WorkoutStats = async () => {
  const supabase = await createClient();

  // 1. Cek User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. Tarik log terakhir (Join table workout_logs & workout_types)
  const { recentWorkouts } = await DashboardService.workoutStats(
    supabase,
    user.id,
  );

  // 3. Format data dari DB biar pas sama UI lu
  const formattedWorkouts =
    recentWorkouts?.map((log) => ({
      id: log.id,
      title: log.workout_types?.name || "Olahraga",
      icon: log.workout_types?.icon || "⚡",
      subtitle: `${dashboardUtils.translateIntensity(log.intensity)} · ${log.duration_min} mnt · ${dashboardUtils.formatRelativeTime(log.logged_at)}`,
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
