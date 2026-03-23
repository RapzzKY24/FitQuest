import { Card, CardContent } from "@/src/components/ui/Card";
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
  <Card className="cc-sm bg-elevated overflow-hidden w-full transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
    <CardContent className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col items-center justify-center gap-y-1 sm:gap-y-2">
        <div className="text-2xl sm:text-3xl leading-none">{emoji}</div>

        <p className="f-mono text-muted text-xxs sm:text-[14px] md:text-[16px] uppercase tracking-[1px] sm:tracking-[1.5px] mt-1 text-center ">
          {label}
        </p>

        <p className="text-xxs sm:text-sm md:text-base font-bold text-broken-white mt-0.5 sm:mt-1 text-center">
          {value}
        </p>
      </div>
    </CardContent>
  </Card>
);

const StatProgressRow = ({ stat }: { stat: MonthStat }) => (
  <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
    <div className="flex items-center justify-between gap-3">
      <span className="f-mono text-muted text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[2px] truncate">
        {stat.label}
      </span>
      <span
        className={`f-mono text-xs sm:text-sm font-bold shrink-0 ${textColorMap[stat.gradient]}`}
      >
        {stat.value}
      </span>
    </div>

    <ProgressBar
      value={stat.percent}
      max={100}
      variant={variantMap[stat.gradient]}
      type="linear"
      className="h-1.5 sm:h-2 cc-xs w-full"
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
      <h1 className="uppercase tracking-[0.2rem] text-muted font-bold whitespace-nowrap text-xs md:text-base">
        {"// "}Statistik Bulan Ini
      </h1>

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
