import React, { Suspense } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import StatsDashboard from "../components/StatsDashboard";
import DailyQuest from "../components/DailyQuest";
import WorkoutStats from "../components/WorkoutStats";
import LatestAchievements from "../components/LatestAchievement";
import LeaderboardWidget from "../components/LeaderboardWidget";
import LevelProgressWidget from "../components/LevelProgresWidget";
import WeeklyActivity from "../components/WeeklyActivity";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { FQCoachWidget } from "../components/FQCoachWidget";

const DashboardPages = () => {
  return (
    <main className="flex flex-col gap-6 p-4 lg:p-6 relative">
      <Suspense fallback={<Skeleton height={100} />}>
        <HeaderDashboard />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <Suspense
          fallback={
            <>
              <Skeleton height={120} />
              <Skeleton height={120} />
              <Skeleton height={120} />
              <Skeleton height={120} />
            </>
          }
        >
          <StatsDashboard />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Suspense fallback={<Skeleton height={300} />}>
              <WeeklyActivity />
            </Suspense>
            <Suspense fallback={<Skeleton height={250} />}>
              <WorkoutStats />
            </Suspense>
          </div>

          <div className="flex flex-col gap-6">
            <Suspense fallback={<Skeleton height={250} />}>
              <DailyQuest />
            </Suspense>
            <Suspense fallback={<Skeleton height={200} />}>
              <LatestAchievements />
            </Suspense>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Suspense fallback={<Skeleton height={150} />}>
            <LevelProgressWidget />
          </Suspense>
          <Suspense fallback={<Skeleton height={400} />}>
            <LeaderboardWidget />
          </Suspense>
        </div>
      </div>

      <FQCoachWidget />
    </main>
  );
};

export default DashboardPages;
