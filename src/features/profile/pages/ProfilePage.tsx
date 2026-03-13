"use client";
import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { Tabs } from "@/src/components/ui/Tabs";
import InfoTabs from "../components/InfoTabs";
import ActivityTabs from "../components/ActivityTabs";
import Gymbro from "../components/Gymbro";

const ProfilePages = () => {
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
        <ProfileCard />
        <Tabs
          tabs={PROFILE_TABS}
          value={tabVal}
          onChange={setTabVal}
          variant="underline"
        />
        {/* tabs section */}
        {tabVal == "info" && <InfoTabs />}
        {tabVal == "aktivitas" && <ActivityTabs />}
        {tabVal == "gymbro" && <Gymbro />}
      </div>
    </main>
  );
};

export default ProfilePages;
