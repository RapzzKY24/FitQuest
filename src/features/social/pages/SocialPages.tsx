"use client";
import {BadgePill} from "@/src/components/ui/badge-pill";
import {Card, CardContent} from "@/src/components/ui/Card";
import {Tabs} from "@/src/components/ui/Tabs";
import {Dot} from "lucide-react";
import React from "react";
import FeedTabs from "../FeedTabs";

const SocialPages = () => {
  const [tabVal, setTabVal] = React.useState("feed");
  const SOCIAL_TABS = [
    {value: "feed", label: "Activity Feed", badge: "3"},
    {value: "leaderboard", label: "Leaderboard", badge: "2"},
    {value: "friend", label: "Teman"},
  ];
  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* header page */}
        <div className="spacey-y-3.5">
          <p className="text-sm font-light tracking-[0.3em] uppercase text-primary">
            {"//"} Komunitas Warrior
          </p>
          <h1 className="font-extrabold text-4xl text-white uppercase">
            So<span className="text-primary">cial</span>
          </h1>
        </div>
        {/* tabs heading */}

        <Tabs
          tabs={SOCIAL_TABS}
          value={tabVal}
          onChange={setTabVal}
          variant="underline"
        />

        {tabVal == "feed" && (
         <FeedTabs/>
        )}
        
      </div>
    </main>
  );
};

export default SocialPages;
