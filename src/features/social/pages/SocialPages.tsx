// SocialPages.tsx
"use client";
import { Tabs } from "@/src/components/ui/Tabs";
import React from "react";
import FeedTabs from "../components/FeedTabs";
import LeaderboardTabs from "../components/LeaderboardTabs";
import FriendTabs from "../components/FriendTabs";
import {
  ActivityFeedRecord,
  FriendshipRecord,
  WeeklyLeaderboardRecord,
} from "../types/social.types";

interface SocialPagesProps {
  initialPending: FriendshipRecord[];
  initialFriends: FriendshipRecord[];
  initialLeaderboard: WeeklyLeaderboardRecord[];
  initialFeed: ActivityFeedRecord[];
  currentUserId: string;
}

const SocialPages = ({
  initialPending,
  initialFriends,
  currentUserId,
  initialLeaderboard,
  initialFeed,
}: SocialPagesProps) => {
  const [tabVal, setTabVal] = React.useState("feed"); // Gua set default 'friend' buat testing

  // Hitung badge (notification) untuk jumlah pending request
  const pendingCount = initialPending.length;

  const SOCIAL_TABS = [
    { value: "feed", label: "Activity Feed" },
    { value: "leaderboard", label: "Leaderboard" },
    {
      value: "friend",
      label: "Teman",
      badge: pendingCount > 0 ? pendingCount.toString() : undefined, // Otomatis hilang kalau 0
    },
  ];

  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* ... (Header tetap sama) ... */}
        <div className="md:space-y-3.5">
          <p className="text-xxs lg:text-sm font-light tracking-[0.3em] uppercase text-primary">
            {"//"} KOMUNITAS WARIOR
          </p>
          <h1 className="font-extrabold text-2xl lg:text-4xl text-broken-white uppercase">
            so<span className="text-primary">cial</span>
          </h1>
        </div>

        <Tabs
          tabs={SOCIAL_TABS}
          value={tabVal}
          onChange={setTabVal}
          variant="underline"
        />

        {tabVal == "feed" && (
          <FeedTabs
            currentUserId={currentUserId}
            feedData={initialFeed}
            friends={initialFriends}
            leaderboardData={initialLeaderboard}
          />
        )}

        {tabVal == "leaderboard" && (
          <LeaderboardTabs
            leaderboardData={initialLeaderboard}
            currentUserId={currentUserId}
          />
        )}

        {/* Oper datanya ke FriendTabs */}
        {tabVal == "friend" && (
          <FriendTabs
            pendingRequests={initialPending}
            friends={initialFriends}
            currentUserId={currentUserId}
          />
        )}
      </div>
    </main>
  );
};

export default SocialPages;
