import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { SectionLabel } from "../shared/SectionLabel";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { Button } from "@/src/components/ui/Button";

interface WorkoutLog {
  id: string;
  emoji: string;
  name: string;
  intensity: "Ringan" | "Sedang" | "Intens";
  duration: number;
  xp: number;
  timestamp: string;
}

const RECENT_WORKOUTS: WorkoutLog[] = [
  {
    id: "1",
    emoji: "🏃",
    name: "Lari Pagi",
    intensity: "Sedang",
    duration: 45,
    xp: 90,
    timestamp: "Hari ini, 06:30",
  },
  {
    id: "2",
    emoji: "🏋️",
    name: "Gym — Upper Body",
    intensity: "Intens",
    duration: 60,
    xp: 156,
    timestamp: "Kemarin, 18:00",
  },
  {
    id: "3",
    emoji: "🚴",
    name: "Bersepeda Sore",
    intensity: "Ringan",
    duration: 30,
    xp: 48,
    timestamp: "2 hari lalu",
  },
  {
    id: "4",
    emoji: "🧘",
    name: "Yoga & Meditasi",
    intensity: "Ringan",
    duration: 40,
    xp: 64,
    timestamp: "3 hari lalu",
  },
  {
    id: "5",
    emoji: "🏋️",
    name: "Gym — Leg Day",
    intensity: "Intens",
    duration: 75,
    xp: 195,
    timestamp: "4 hari lalu",
  },
];

function intensityClass(i: WorkoutLog["intensity"]) {
  if (i === "Intens") return "text-danger";
  if (i === "Sedang") return "text-warning";
  return "text-muted";
}

export const WorkoutHistory = ({
  logs = RECENT_WORKOUTS,
}: {
  logs?: WorkoutLog[];
}) => (
  <Card className="w-full border-border bg-surface">
    <CardHeader className="px-6 pt-6 pb-0">
      <div className="flex items-center justify-between gap-4">
        <SectionLabel>Riwayat Workout</SectionLabel>

        <Button variant="outline">LIHAT SEMUA →</Button>
      </div>
    </CardHeader>

    <CardContent className="px-6 pb-6 pt-4">
      {logs.map((log) => (
        <WorkoutRow key={log.id} log={log} />
      ))}
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
      <h1 className="text-[16px]">+{log.xp} XP</h1>
    </BadgePill>
  </div>
);
