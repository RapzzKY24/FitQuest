// page.tsx
import SocialPages from "@/src/features/social/pages/SocialPages";
import React from "react";
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/src/utils/metadata";

export const metadata = constructMetadata({
  title: "Social",
});

const Social = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Narik Pending Requests (Orang yang nge-add user lu)
  const { data: pendingRequests, error: pendingError } = await supabase
    .from("v_user_friendships")
    .select("*")
    .eq("addressee_id", user.id)
    .eq("status", "pending");

  // 2. Narik Friend List (Temen yang udah diterima)
  const { data: friendsList, error: friendsError } = await supabase
    .from("v_user_friendships")
    .select("*")
    .eq("status", "accepted")
    .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

  // 3. Narik Data Leaderboard Mingguan
  const { data: leaderboardData, error: leadError } = await supabase
    .from("v_weekly_leaderboard")
    .select("*")
    .order("rank", { ascending: true }) // ⚡ Urutin dari rank 1 ke bawah
    .limit(50);

  // 4. Narik Data Activity Feed (Pake Filter Viewer!)
  const { data: feedData } = await supabase
    .from("v_friend_activity_feed")
    .select("*")
    .eq("viewer_id", user.id) // ⚡ Tambahin baris ini!
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <SocialPages
      initialPending={pendingRequests || []}
      initialFriends={friendsList || []}
      initialLeaderboard={leaderboardData || []}
      initialFeed={feedData || []} // ⚡ Tambahin ini
      currentUserId={user.id}
    />
  );
};

export default Social;
