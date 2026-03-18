import { Card, CardContent } from "@/src/components/ui/Card";
import { SectionLabel } from "../shared/SectionLabel";
import { ProgressBar } from "@/src/components/ui/ProgressBar";

interface MonthStat {
  label: string;
  value: string;
  percent: number;
  gradient: "primary" | "info" | "accent";
}

export interface RecapMonthlyData {
  session: number;
  totalMinutes: number;
  expEarned: number;
  favSportName?: string;
  favSportEmoji?: string;
  favIntensity?: string;
}

interface MonthlyStatsPanelProps {
  data: RecapMonthlyData;
}

const variantMap: Record<MonthStat["gradient"], "orange" | "blue" | "yellow"> =
  {
    primary: "orange",
    info: "blue",
    accent: "yellow",
  };

const textColorMap: Record<MonthStat["gradient"], string> = {
  primary: "text-primary",
  info: "text-info",
  accent: "text-accent",
};

const FavCard = ({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string;
}) => (
  <Card className="cc-sm bg-elevated overflow-hidden w-full">
    <CardContent>
      <div className="flex flex-col items-center justify-center gap-y-2 ">
        <div className="text-3xl leading-none">{emoji}</div>
        <p className="f-mono text-muted text-[16px] uppercase tracking-[1.5px] mt-1">
          {label}
        </p>
        <p className="text-sm font-bold text-broken-white mt-1 text-center">
          {value}
        </p>
      </div>
    </CardContent>
  </Card>
);

const StatProgressRow = ({ stat }: { stat: MonthStat }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="f-mono text-muted text-xs uppercase tracking-[2px]">
        {stat.label}
      </span>
      <span
        className={`f-mono text-sm font-bold ${textColorMap[stat.gradient]}`}
      >
        {stat.value}
      </span>
    </div>

    <ProgressBar
      value={stat.percent}
      max={100}
      variant={variantMap[stat.gradient]}
      type="linear"
      className="h-2 cc-xs"
    />
  </div>
);

const getDynamicTarget = (current: number, milestones: number[]) => {
  const target = milestones.find((m) => current < m);
  return target || current * 1.5;
};

export const MonthlyStatsPanel = ({ data }: MonthlyStatsPanelProps) => {
  // Nilai saat ini (default 0)
  const currentSession = data?.session || 0;
  const currentMinutes = data?.totalMinutes || 0;
  const currentExp = data?.expEarned || 0;

  // Milestone bertingkat (sesuaikan dengan keseharian)
  const sessionMilestones = [5, 10, 15, 20, 30, 50]; // Sesi per bulan
  const minutesMilestones = [150, 300, 500, 1000, 2000]; // Menit per bulan
  const expMilestones = [500, 1000, 2500, 5000, 10000]; // XP per bulan

  // Tentukan target saat ini berdasarkan data user
  const targetSession = getDynamicTarget(currentSession, sessionMilestones);
  const targetMinutes = getDynamicTarget(currentMinutes, minutesMilestones);
  const targetExp = getDynamicTarget(currentExp, expMilestones);

  // Kalkulasi persentase (maksimal 100%)
  const sessionPercent = Math.min((currentSession / targetSession) * 100, 100);
  const minutesPercent = Math.min((currentMinutes / targetMinutes) * 100, 100);
  const expPercent = Math.min((currentExp / targetExp) * 100, 100);

  const MONTH_STATS: MonthStat[] = [
    {
      label: "SESI WORKOUT",
      value: `${currentSession} sesi`,
      percent: sessionPercent,
      gradient: "primary",
    },
    {
      label: "TOTAL MENIT",
      value: `${currentMinutes.toLocaleString()} mnt`,
      percent: minutesPercent,
      gradient: "info",
    },
    {
      label: "XP EARNED",
      value: `${currentExp.toLocaleString()}  XP`,
      percent: expPercent,
      gradient: "accent",
    },
  ];

  const FAV_STATS = {
    sport: {
      emoji: data?.favSportEmoji || "🏃",
      label: "Olahraga",
      value: data?.favSportName || "Belum Ada",
    },
    intensity: {
      emoji: "🔥",
      label: "Intensitas",
      value: data?.favIntensity || "Belum Ada",
    },
  };

  return (
    <div className="border border-border bg-surface p-6 cc-lg flex flex-col gap-6">
      <SectionLabel>{"// "}Statistik Bulan Ini</SectionLabel>

      <div className="flex flex-col gap-6">
        {MONTH_STATS.map((stat) => (
          <StatProgressRow key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="border-t border-border pt-5 grid grid-cols-2 gap-4">
        <FavCard {...FAV_STATS.sport} />
        <FavCard {...FAV_STATS.intensity} />
      </div>
    </div>
  );
};
