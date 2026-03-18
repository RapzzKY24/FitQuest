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
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <SectionLabel>Activity Heatmap</SectionLabel>
          <span className="font-mono text-muted text-xs uppercase tracking-[2px]">
            26 MINGGU TERAKHIR
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-5">
        <div className="w-full">
          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `max-content repeat(${weeks.length}, minmax(0, 1fr))`,
            }}
          >
            <div />

            {/* Render nama bulan */}
            {weeks.map((week, wi) => {
              const first = week.find((d) => d.date.getDate() === 1);
              return (
                <div key={wi} className="relative h-5">
                  {first && (
                    <span className="absolute bottom-1 left-0 font-mono text-muted text-[9px] whitespace-nowrap z-10">
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
                <div className="flex items-center justify-end pr-3">
                  <span className="font-mono text-muted text-[9px] leading-none">
                    {dayName}
                  </span>
                </div>

                {/* Kolom 2 - 27: Kotak Heatmap untuk hari tersebut (di-render per minggu) */}
                {weeks.map((week, wi) => {
                  const { date, count } = week[dayIdx]; // Ambil data sesuai index hari (0-6)
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
                      className={`w-full aspect-square rounded-[2px] cursor-default transition-opacity hover:opacity-70 ${CELL_BG[level]}`}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="flex items-center justify-end gap-2 mt-5">
          <span className="font-mono text-muted text-[9px] uppercase tracking-[2px]">
            Less
          </span>
          <div className="flex gap-1">
            {LEGEND_LEVELS.map((lv) => (
              <div key={lv} className={`size-3.5 rounded-sm ${CELL_BG[lv]}`} />
            ))}
          </div>
          <span className="font-mono text-muted text-[9px] uppercase tracking-[2px]">
            More
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
