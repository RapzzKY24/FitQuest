"use client";
import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { Tabs } from "@/src/components/ui/Tabs";
import InfoTabs from "../components/InfoTabs";
import ActivityTabs from "../components/ActivityTabs";
import { RecapMonthlyData } from "../components/activity/MontlyStats";
import { WorkoutLog } from "../components/activity/WorkoutHistory";
import { HeatCell, UserProfileData } from "../types/profile.types";
import { Achievement } from "../../achievement/components/AchievementCard";
import Gymbro from "../components/Gymbro";

interface ProfilePagesProps {
  userData: UserProfileData;
  monthlyData: RecapMonthlyData;
  workoutLog: WorkoutLog[];
  heatMapData: HeatCell[];
  achievement: Achievement[];
}

const ProfilePages = ({
  userData,
  monthlyData,
  workoutLog,
  heatMapData,
  achievement,
}: ProfilePagesProps) => {
  const [tabVal, setTabVal] = useState("info");
  const PROFILE_TABS = [
    {value: "info", label: "Info dan Edit"},
    {value: "aktivitas", label: "Aktivitas"},
    {value: "gymbro", label: "GymBro"},
  ];
  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* header page */}
        <div className="md:space-y-3.5">
         <p className="text-xxs lg:text-sm font-light tracking-[0.3em] uppercase text-primary">
            {"//"} Akun Saya
          </p>
          <h1 className="font-extrabold text-2xl lg:text-4xl text-broken-white uppercase">
            Pro<span className="text-primary">file</span>
          </h1>
        </div>
        <ProfileCard user={userData} />
        <Tabs
          tabs={PROFILE_TABS}
          value={tabVal}
          onChange={setTabVal}
          variant="underline"
        />
        {/* tabs section */}
        {tabVal == "info" && (
          <InfoTabs achievements={achievement} userData={userData} />
        )}
        {tabVal == "aktivitas" && (
          <ActivityTabs
            heatmapData={heatMapData}
            monthlyData={monthlyData}
            workoutHistory={workoutLog}
          />
        )}
        {tabVal == "gymbro" && <Gymbro />}
      </div>
    </main>
  );
};

export default ProfilePages;
