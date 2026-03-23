"use client";

import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { SectionLabel } from "../shared/SectionLabel";
import React, { useMemo } from "react";
import { HeatCell } from "../../types/profile.types";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const HEATMAP_DATA: HeatCell[] = [
  { date: "2026/01/11", count: 2 },
  { date: "2026/01/12", count: 20 },
  { date: "2026/01/13", count: 10 },
  ...[...Array(17)].map((_, i) => ({
    date: `2026/02/${String(i + 10).padStart(2, "0")}`,
    count: Math.floor(Math.random() * 20) + 1,
  })),
  { date: "2026/03/01", count: 2 },
  { date: "2026/03/05", count: 15 },
  { date: "2026/03/10", count: 5 },
  { date: "2026/03/12", count: 22 },
];

// ─── Build week grid ───────────────────────────────────────────────────────

function buildWeekGrid(data: HeatCell[], totalWeeks = 26) {
  const countMap = new Map<string, number>();
  data.forEach(({ date, count }) =>
    countMap.set(date.replace(/\//g, "-"), count),
  );

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - totalWeeks * 7 + 1);
  start.setDate(start.getDate() - start.getDay()); // snap to Sunday

  const weeks: Array<Array<{ date: Date; count: number }>> = [];
  const cur = new Date(start);

  while (cur <= today) {
    const week: { date: Date; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const key = cur.toISOString().split("T")[0];
      week.push({ date: new Date(cur), count: countMap.get(key) ?? 0 });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

// ─── Intensity level ───────────────────────────────────────────────────────

function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 7) return 2;
  if (count < 15) return 3;
  return 4;
}

const CELL_BG: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-elevated",
  1: "bg-primary/25",
  2: "bg-primary/50",
  3: "bg-primary/75",
  4: "bg-primary",
};

const LEGEND_LEVELS = [0, 1, 2, 3, 4] as const;

// ─── Component ─────────────────────────────────────────────────────────────

export const ActivityHeatmap = ({
  data = HEATMAP_DATA,
}: {
  data?: HeatCell[];
}) => {
  const weeks = useMemo(() => buildWeekGrid(data, 26), [data]);

  return (
    <Card className="w-full overflow-hidden border-border bg-surface">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="uppercase tracking-[0.15rem] md:tracking-[0.2rem] text-muted font-bold whitespace-nowrap text-xs md:text-base">
            {"//"} Activity Heatmap
          </h1>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4 sm:pt-5">
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
          <div
            className="grid gap-[2px] sm:gap-[3px] min-w-[500px] lg:min-w-full pr-4 sm:pr-0"
            style={{
              gridTemplateColumns: `max-content repeat(${weeks.length}, minmax(0, 1fr))`,
            }}
          >
            <div />
            {/* Render nama bulan */}
            {weeks.map((week, wi) => {
              const first = week.find((d) => d.date.getDate() === 1);
              return (
                <div key={wi} className="relative h-4 sm:h-5">
                  {first && (
                    <span className="absolute bottom-1 left-0 font-mono text-muted text-[8px] sm:text-[9px] whitespace-nowrap z-10">
                      {MONTHS[first.date.getMonth()]}
                    </span>
                  )}
                </div>
              );
            })}
            {/* ── BARIS 2-8: Nama Hari & Kotak Heatmap ── */}
            {WEEK_DAYS.map((dayName, dayIdx) => (
              <React.Fragment key={dayName}>
                {/* Kolom 1: Nama Hari */}
                <div className="flex items-center justify-end pr-2 sm:pr-3">
                  <span className="font-mono text-muted text-[8px] sm:text-[9px] leading-none">
                    {dayName}
                  </span>
                </div>
                {/* Kolom 2 - 27: Kotak Heatmap */}
                {weeks.map((week, wi) => {
                  const { date, count } = week[dayIdx];
                  const level = toLevel(count);
                  const tip = `${date.toLocaleDateString("id-ID", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}: ${count} workout`;
                  return (
                    <div
                      key={`${wi}-${dayIdx}`}
                      title={tip}
                      // rounded disesuaikan biar gak terlalu tajam/kotak banget di ukuran kecil
                      className={`w-full aspect-square rounded-sm sm:rounded-[2px] cursor-default transition-opacity hover:opacity-70 ${CELL_BG[level]}`}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-4 sm:mt-5">
          <span className="font-mono text-muted text-[8px] sm:text-[9px] uppercase tracking-[1px] sm:tracking-[2px]">
            Less
          </span>
          <div className="flex gap-1">
            {LEGEND_LEVELS.map((lv) => (
              <div
                key={lv}
                className={`size-3 sm:size-3.5 rounded-sm ${CELL_BG[lv]}`}
              />
            ))}
          </div>
          <span className="font-mono text-muted text-[8px] sm:text-[9px] uppercase tracking-[1px] sm:tracking-[2px]">
            More
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
