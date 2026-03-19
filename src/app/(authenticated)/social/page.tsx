// page.tsx
import SocialPages from "@/src/features/social/pages/SocialPages";
import React from "react";
import {createClient} from "@/src/utils/supabase/server"; // Sesuaikan path utils lu
import {redirect} from "next/navigation";

const Social = async () => {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Narik Pending Requests (Orang yang nge-add user lu)
  const {data: pendingRequests, error: pendingError} = await supabase
    .from("v_user_friendships")
    .select("*")
    .eq("addressee_id", user.id)
    .eq("status", "pending");

  // 2. Narik Friend List (Temen yang udah diterima)
  const {data: friendsList, error: friendsError} = await supabase
    .from("v_user_friendships")
    .select("*")
    .eq("status", "accepted")
    .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

  return (
    <SocialPages
      initialPending={pendingRequests || []}
      initialFriends={friendsList || []}
      currentUserId={user.id}
    />
  );
};

export default Social;
