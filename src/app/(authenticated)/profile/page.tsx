import { FetchUserAchievement } from "@/src/features/achievement/service/achievement.service";
import ProfilePages from "@/src/features/profile/pages/ProfilePage";
import {
  formatHeatmapData,
  formatMonthlyAndLogs,
  formatProfileData,
} from "@/src/features/profile/utils/profile.utils";
import { constructMetadata } from "@/src/utils/metadata";
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return constructMetadata({ title: "Profile" });

  const { data: profileData } = await supabase
    .from("user_profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const displayName = profileData?.username || "Player";

  return constructMetadata({
    title: `${displayName}'s Profile`,
    description: `Lihat statistik, heatmap, dan pencapaian workout dari ${displayName}.`,
  });
}

const ProfilePage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const [
    { data: profileData },
    { data: statsData },
    { count: achievementCount },
    { data: logsData },
    { data: heatmapLogs },
  ] = await Promise.all([
    supabase.from("user_profiles").select("*").eq("id", user.id).single(),
    supabase.from("user_stats").select("*").eq("id", user.id).single(),
    supabase
      .from("user_badges")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("workout_logs")
      .select(
        `
        id,
        intensity,
        duration_min,
        xp_earned,
        logged_at,
        workout_types ( name, icon )
      `,
      )
      .eq("user_id", user.id)
      .order("logged_at", { ascending: false })
      .limit(5),
    supabase.from("workout_logs").select("logged_at").eq("user_id", user.id),
  ]);

  const achievementsData = await FetchUserAchievement(user.id);

  const userData = formatProfileData(
    profileData,
    statsData,
    achievementCount,
    user?.email,
    profileData?.height_cm,
    profileData?.weight_kg,
    profileData?.goal,
  );
  const { monthlyData, formattedLogs } = formatMonthlyAndLogs(
    logsData,
    statsData,
  );

  const heatmapData = formatHeatmapData(heatmapLogs);

  return (
    <ProfilePages
      heatMapData={heatmapData}
      userData={userData}
      monthlyData={monthlyData}
      workoutLog={formattedLogs}
      achievement={achievementsData}
    />
  );
};

export default ProfilePage;
