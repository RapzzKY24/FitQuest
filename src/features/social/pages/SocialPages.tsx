// SocialPages.tsx
"use client";
import {Tabs} from "@/src/components/ui/Tabs";
import React from "react";
import FeedTabs from "../components/FeedTabs";
import LeaderboardTabs from "../components/LeaderboardTabs";
import FriendTabs from "../components/FriendTabs";
import { FriendshipRecord } from "../types/social.types";

// Bikin tipe data props-nya (Biar TypeScript lu gak marah)
interface SocialPagesProps {
  initialPending: FriendshipRecord[];
  initialFriends: FriendshipRecord[];
  currentUserId: string;
}

const SocialPages = ({ initialPending, initialFriends, currentUserId }: SocialPagesProps) => {
  const [tabVal, setTabVal] = React.useState("friend"); // Gua set default 'friend' buat testing
  
  // Hitung badge (notification) untuk jumlah pending request
  const pendingCount = initialPending.length;
  
  const SOCIAL_TABS = [
    {value: "feed", label: "Activity Feed", badge: "3"},
    {value: "leaderboard", label: "Leaderboard"},
    {
      value: "friend", 
      label: "Teman", 
      badge: pendingCount > 0 ? pendingCount.toString() : undefined // Otomatis hilang kalau 0
    },
  ];

  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* ... (Header tetap sama) ... */}

        <Tabs
          tabs={SOCIAL_TABS}
          value={tabVal}
          onChange={setTabVal}
          variant="underline"
        />

        {tabVal == "feed" && <FeedTabs />}
        {tabVal == "leaderboard" && <LeaderboardTabs />}
        
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