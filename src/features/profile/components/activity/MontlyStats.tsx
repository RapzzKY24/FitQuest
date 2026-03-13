import { Card, CardContent } from "@/src/components/ui/Card";
import { SectionLabel } from "../shared/SectionLabel";
import { ProgressBar } from "@/src/components/ui/ProgressBar";

interface MonthStat {
  label: string;
  value: string;
  percent: number;
  gradient: "primary" | "info" | "accent";
}

const variantMap: Record<MonthStat["gradient"], "orange" | "blue" | "yellow"> =
  {
    primary: "orange",
    info: "blue",
    accent: "yellow",
  };

const MONTH_STATS: MonthStat[] = [
  { label: "SESI WORKOUT", value: "14 sesi", percent: 70, gradient: "primary" },
  { label: "TOTAL MENIT", value: "840 mnt", percent: 84, gradient: "info" },
  { label: "XP EARNED", value: "3,240 XP", percent: 65, gradient: "accent" },
];

const FAV_STATS = {
  sport: { emoji: "🏃", label: "Olahraga", value: "Lari" },
  intensity: { emoji: "🔥", label: "Intensitas", value: "Intens" },
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
        <p className="text-sm font-bold text-broken-white mt-1">{value}</p>
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
        className={`f-mono text-sm font-bold ${stat.gradient === "accent" ? "text-accent" : "text-broken-white"}`}
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

export const MonthlyStatsPanel = () => (
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
