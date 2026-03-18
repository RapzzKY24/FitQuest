import React from "react";
import { WorkoutHistory, WorkoutLog } from "./activity/WorkoutHistory";
import { MonthlyStatsPanel, RecapMonthlyData } from "./activity/MontlyStats";
import { ActivityHeatmap } from "./activity/HeatMap";
import { HeatCell } from "../types/profile.types";

interface ActivityTabsProps {
  monthlyData: RecapMonthlyData;
  workoutHistory: WorkoutLog[];
  heatmapData: HeatCell[];
}

const ActivityTabs = ({
  monthlyData,
  workoutHistory,
  heatmapData,
}: ActivityTabsProps) => (
  <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
    {/* Kolom Kiri*/}
    <div className="flex flex-col gap-6">
      <ActivityHeatmap data={heatmapData} />
      <WorkoutHistory logs={workoutHistory} />
    </div>

    {/* Kolom Kanan */}
    <div className="lg:sticky lg:top-6">
      <MonthlyStatsPanel data={monthlyData} />
    </div>
  </section>
);

export default ActivityTabs;
