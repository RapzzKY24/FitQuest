"use client";
import React, {useState} from "react";
import ProfileCard from "../components/ProfileCard";
import {Tabs} from "@/src/components/ui/Tabs";
import InfoTabs from "../components/InfoTabs";
import ActivityTabs from "../components/ActivityTabs";
import Gymbro from "../components/Gymbro";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { RecapMonthlyData } from "../components/activity/MontlyStats";
import { WorkoutLog } from "../components/activity/WorkoutHistory";
import { HeatCell, UserProfileData } from "../types/profile.types";
import { Achievement } from "../../achievement/components/AchievementCard";
=======
import {RecapMonthlyData} from "../components/activity/MontlyStats";
import {WorkoutLog} from "../components/activity/WorkoutHistory";
import {HeatCell, UserProfileData} from "../types/profile.types";
import {Achievement} from "../../achievement/components/AchievementCard";
>>>>>>> 118fcbe (fix: font usage, header size on social, quest, logworkout, profile , achievement page)

interface ProfilePagesProps {
  userData: UserProfileData;
  monthlyData: RecapMonthlyData;
  workoutLog: WorkoutLog[];
  heatMapData: HeatCell[];
  achievement: Achievement[];
}
>>>>>>> 615013b (feat: connect heatmap to supabase)

const ProfilePages = ({
  userData,
  monthlyData,
  workoutLog,
  heatMapData,
  achievement,
}: ProfilePagesProps) => {
  const [tabVal, setTabVal] = useState("info");
  const PROFILE_TABS = [
<<<<<<< HEAD
    { value: "info", label: "Info dan Edit" },
    { value: "aktivitas", label: "Aktivitas" },
    { value: "gymbro", label: "GymBro" },
    { value: "pengaturan", label: "Pengaturan" },
=======
    {value: "info", label: "Info dan Edit"},
    {value: "aktivitas", label: "Aktivitas"},
    {value: "gymbro", label: "GymBro"},
>>>>>>> 118fcbe (fix: font usage, header size on social, quest, logworkout, profile , achievement page)
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
<<<<<<< HEAD
<<<<<<< HEAD
        {tabVal == "info" && <InfoTabs />}
<<<<<<< HEAD
        {tabVal == "aktivitas" && <ActivityTabs />}
=======
=======
        {tabVal == "info" && <InfoTabs achievements={achievement} />}
>>>>>>> 249ecaa (feat : wire up dynamic achievements to info tabs)
=======
        {tabVal == "info" && (
          <InfoTabs achievements={achievement} userData={userData} />
        )}
>>>>>>> 4f1dbc7 (feat: create form input sync to database in profile and physical form)
        {tabVal == "aktivitas" && (
          <ActivityTabs
            monthlyData={monthlyData}
            workoutHistory={workoutLog}
            heatmapData={heatMapData}
          />
        )}
>>>>>>> 615013b (feat: connect heatmap to supabase)
        {tabVal == "gymbro" && <Gymbro />}
      </div>
    </main>
  );
};

export default ProfilePages;
