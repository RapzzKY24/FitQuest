"use client";
import React, { useState } from "react";
import ProfileCard, { UserProfileData } from "../components/ProfileCard";
import { Tabs } from "@/src/components/ui/Tabs";
import InfoTabs from "../components/InfoTabs";
import ActivityTabs from "../components/ActivityTabs";
import Gymbro from "../components/Gymbro";
import { RecapMonthlyData } from "../components/activity/MontlyStats";
import { WorkoutLog } from "../components/activity/WorkoutHistory";
import { HeatCell } from "../types/profile.types";

interface ProfilePagesProps {
  userData: UserProfileData;
  monthlyData: RecapMonthlyData;
  workoutLog: WorkoutLog[];
  heatMapData: HeatCell[];
}

const ProfilePages = ({
  userData,
  monthlyData,
  workoutLog,
  heatMapData,
}: ProfilePagesProps) => {
  const [tabVal, setTabVal] = useState("info");
  const PROFILE_TABS = [
    { value: "info", label: "Info dan Edit" },
    { value: "aktivitas", label: "Aktivitas" },
    { value: "gymbro", label: "GymBro" },
  ];
  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* header page */}
        <div className="spacey-y-3.5">
          <p className="text-sm font-light tracking-[0.3em] uppercase text-primary">
            {"//"} Akun Saya
          </p>
          <h1 className="font-extrabold text-4xl text-white uppercase">
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
        {tabVal == "info" && <InfoTabs />}
        {tabVal == "aktivitas" && (
          <ActivityTabs
            monthlyData={monthlyData}
            workoutHistory={workoutLog}
            heatmapData={heatMapData}
          />
        )}
        {tabVal == "gymbro" && <Gymbro />}
      </div>
    </main>
  );
};

export default ProfilePages;
