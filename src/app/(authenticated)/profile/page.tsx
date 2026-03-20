import React, { Suspense } from "react";
import ProfileContainer from "@/src/features/profile/pages/ProfileContainer";
import { constructMetadata } from "@/src/utils/metadata";
import { createClient } from "@/src/utils/supabase/server";
import { ProfilePageSkeleton } from "@/src/features/profile/components/ProfileLoading";

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

export default function Page() {
  return (
    <main className="w-full">
      <Suspense fallback={<ProfilePageSkeleton />}>
        <ProfileContainer />
      </Suspense>
    </main>
  );
}
