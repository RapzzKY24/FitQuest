import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";

export interface WorkoutLog {
  id: string;
  emoji: string;
  name: string;
  intensity: string;
  duration: number;
  xp: number;
  timestamp: string;
}

interface WorkoutHistoryProps {
  logs: WorkoutLog[];
}

function intensityClass(i: string) {
  if (i === "Intens") return "text-danger";
  if (i === "Sedang") return "text-warning";
  if (i === "Ringan") return "text-info";
  return "text-muted";
}

export const WorkoutHistory = ({ logs }: WorkoutHistoryProps) => (
  <Card className="w-full border-border bg-surface">
    {/* Padding dikurangin di mobile (px-4), dilebarin di tablet ke atas (sm:px-6) */}
    <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
      <div className="flex items-center justify-between gap-4">
        <h1 className="uppercase tracking-[0.15rem] sm:tracking-[0.2rem] text-muted font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
          {"// "}Riwayat Workout
        </h1>
      </div>
    </CardHeader>

    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4 flex flex-col gap-0">
      {logs && logs.length > 0 ? (
        logs.map((log) => <WorkoutRow key={log.id} log={log} />)
      ) : (
        <div className="py-8 sm:py-10 text-center f-mono text-muted text-xs sm:text-sm border border-dashed border-border mt-4 mx-2 sm:mx-0 rounded-md">
          Belum ada riwayat workout.
          <br className="hidden sm:block" />
          <span className="text-primary block sm:inline mt-1 sm:mt-0">
            Ayo mulai bergerak! 🔥
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

const WorkoutRow = ({ log }: { log: WorkoutLog }) => (
  <div className="flex items-center gap-3 sm:gap-4 md:gap-5 py-4 sm:py-5 border-b border-border last:border-b-0">
    <BadgePill color="accent" className="shrink-0">
      <span className="text-xl sm:text-2xl md:text-3xl p-1.5 sm:p-2">
        {log.emoji}
      </span>
    </BadgePill>
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <p className="text-sm md:text-base font-bold text-broken-white truncate">
        {log.name}
      </p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 sm:mt-1.5 text-xs text-muted">
        <span
          className={`${intensityClass(log.intensity)} font-medium text-[10px] sm:text-xs`}
        >
          {log.intensity}
        </span>
        <span className="hidden sm:inline-block text-muted/40">•</span>
        <span className="text-[10px] sm:text-xs md:text-sm truncate">
          {log.duration} mnt · {log.timestamp}
        </span>
      </div>
    </div>
    <div className="shrink-0">
      <BadgePill>
        <h1 className="text-xs sm:text-sm md:text-base font-bold text-accent whitespace-nowrap">
          +{log.xp} XP
        </h1>
      </BadgePill>
    </div>
  </div>
);
