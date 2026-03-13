import React from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import StatsDashboard from "../components/StatsDashboard";
import DailyQuest from "../components/DailyQuest";
import WorkoutStats from "../components/WorkoutStats";
import LatestAchievements from "../components/LatestAchievement";
import GymbroWidget from "../components/GymbroWidget";
import LeaderboardWidget from "../components/LeaderboardWidget";
import LevelProgressWidget from "../components/LevelProgresWidget";
import WeeklyActivity from "../components/WeeklyActivity";

const DashboardPages = () => {
  return (
    <main className="flex flex-col gap-6 p-6">
      <HeaderDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <StatsDashboard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <WeeklyActivity />
            <WorkoutStats />
          </div>
          <div className="flex flex-col gap-6">
            <DailyQuest />
            <LatestAchievements />
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <GymbroWidget />
          <LevelProgressWidget />
          <LeaderboardWidget />
        </div>
      </div>
    </main>
  );
};

export default DashboardPages;
