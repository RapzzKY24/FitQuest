import AchievementPages from "@/src/features/achievement/pages/AchievementPages";
import { FetchUserAchievement } from "@/src/features/achievement/service/achievement.service";
import { constructMetadata } from "@/src/utils/metadata";
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({
  title: "Achievement",
});

export default async function Page() {
  const supabase = await createClient();

  // 1. Cek User yang lagi login
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // 2. FETCH DATA
  const achievementsData = await FetchUserAchievement(user.id);

  return <AchievementPages achievements={achievementsData} />;
}
