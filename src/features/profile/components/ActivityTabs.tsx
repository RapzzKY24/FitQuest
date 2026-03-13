import React from "react";
import { WorkoutHistory } from "./activity/WorkoutHistory";
import { MonthlyStatsPanel } from "./activity/MontlyStats";
import { ActivityHeatmap } from "./activity/HeatMap";

const ActivityTabs = () => (
  <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
    {/* Kolom Kiri*/}
    <div className="flex flex-col gap-6">
      <ActivityHeatmap />
      <WorkoutHistory />
    </div>

    {/* Kolom Kanan */}
    <div className="lg:sticky lg:top-6">
      <MonthlyStatsPanel />
    </div>
  </section>
);

export default ActivityTabs;
