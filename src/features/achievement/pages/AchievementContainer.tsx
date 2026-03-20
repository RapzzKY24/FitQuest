import { createClient } from "@/src/utils/supabase/server";
import { FetchUserAchievement } from "../service/achievement.service";
import AchievementPages from "./AchievementPages";
import { redirect } from "next/navigation";

export default async function AchievementContainer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const achievementsRawData = await FetchUserAchievement(user.id);

  return <AchievementPages achievements={achievementsRawData} />;
}
