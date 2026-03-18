import React from "react";
import { WorkoutHistory, WorkoutLog } from "./activity/WorkoutHistory";
import { MonthlyStatsPanel, RecapMonthlyData } from "./activity/MontlyStats";
import { ActivityHeatmap } from "./activity/HeatMap";

interface ActivityTabsProps {
  monthlyData: RecapMonthlyData;
  workoutHistory: WorkoutLog[];
}

const ActivityTabs = ({ monthlyData, workoutHistory }: ActivityTabsProps) => (
  <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
    {/* Kolom Kiri*/}
    <div className="flex flex-col gap-6">
      <ActivityHeatmap />
      <WorkoutHistory logs={workoutHistory} />
    </div>

    {/* Kolom Kanan */}
    <div className="lg:sticky lg:top-6">
      <MonthlyStatsPanel data={monthlyData} />
    </div>
  </section>
);

export default ActivityTabs;
