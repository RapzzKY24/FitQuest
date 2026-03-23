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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { recentWorkouts } = await DashboardService.workoutStats(
    supabase,
    user.id,
  );

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
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] font-bold uppercase">
            Workout Terakhir
          </span>
          <div className="flex-1 h-px bg-border mx-2 md:mx-4"></div>
          <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] font-semibold uppercase cursor-pointer hover:text-broken-white transition-colors">
            <Link href={"/log"}>Lihat Semua &rarr;</Link>
          </span>
        </div>

        <div className="flex flex-col">
          {formattedWorkouts.length === 0 ? (
            <p className="text-muted text-xs md:text-sm text-center py-4">
              Belum ada riwayat workout. Yuk mulai!
            </p>
          ) : (
            formattedWorkouts.map((workout, index) => (
              <div
                key={workout.id}
                className={`py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4 ${
                  index !== formattedWorkouts.length - 1
                    ? "border-b border-border/60"
                    : "pt-3 md:pt-4 pb-0"
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div
                    className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-elevated/50 border border-border text-xl md:text-2xl shadow-inner"
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    {workout.icon}
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-broken-white font-bold text-sm md:text-[15px] tracking-wide truncate">
                      {workout.title}
                    </h3>
                    <p className="text-muted text-[10px] md:text-[12px] font-medium tracking-wide truncate">
                      {workout.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <BadgePill color="primary">{workout.xp}</BadgePill>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutStats;
