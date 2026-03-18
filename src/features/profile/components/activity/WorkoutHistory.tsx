import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { SectionLabel } from "../shared/SectionLabel";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { Button } from "@/src/components/ui/Button";

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
    <CardHeader className="px-6 pt-6 pb-0">
      <div className="flex items-center justify-between gap-4">
        <SectionLabel>{"// "}Riwayat Workout</SectionLabel>

        <Button variant="outline">LIHAT SEMUA →</Button>
      </div>
    </CardHeader>

    <CardContent className="px-6 pb-6 pt-4 flex flex-col gap-0">
      {logs && logs.length > 0 ? (
        logs.map((log) => <WorkoutRow key={log.id} log={log} />)
      ) : (
        <div className="py-10 text-center f-mono text-muted text-sm border border-dashed border-border mt-4">
          Belum ada riwayat workout.
          <br />
          <span className="text-primary">Ayo mulai bergerak! 🔥</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const WorkoutRow = ({ log }: { log: WorkoutLog }) => (
  <div className="flex items-center gap-5 py-5 border-b border-border last:border-b-0">
    <BadgePill color="accent">
      <span className="text-3xl p-2">{log.emoji}</span>
    </BadgePill>

    <div className="flex-1 min-w-0">
      <p className="text-lg font-bold text-broken-white leading-tight">
        {log.name}
      </p>
      <p className="text-sm text-muted mt-1.5">
        <span className={intensityClass(log.intensity)}>{log.intensity}</span>
        {" · "}
        {log.duration} mnt · {log.timestamp}
      </p>
    </div>

    <BadgePill>
      <h1 className="text-[16px] font-bold text-accent">+{log.xp} XP</h1>
    </BadgePill>
  </div>
);
