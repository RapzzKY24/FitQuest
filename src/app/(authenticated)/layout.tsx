import { Sidebar } from "@/src/components/ui/Sidebar";
import { createClient } from "@/src/utils/supabase/server";

export default async function AutheticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: user_profiles } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user?.id);

  const { data: user_stats } = await supabase
    .from("user_stats")
    .select("*")
    .eq("id", user?.id);

  const formattedUser = {
    name: user_profiles?.[0]?.name,
    username: user_profiles?.[0]?.username,
    level: user_stats?.[0]?.level,
    title: user_stats?.[0]?.level_title,
    xp: user_stats?.[0].xp_current,
    xpMax: user_stats?.[0]?.xp_to_next,
    streak: user_stats?.[0]?.streak_current,
    avatar: user_profiles?.[0]?.avatar_emoji,
  };

  return (
    <main>
      <div className="flex gap-10">
        <Sidebar user={formattedUser} />
        {children}
      </div>
    </main>
  );
}
