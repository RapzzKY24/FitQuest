import BottomNav from "@/src/components/ui/BottomNavbar";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { createClient } from "@/src/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FitQuest - Level Up Your Life",
    template: "%s - FitQuest",
  },
  description: "Gamified fitness tracker for the ultimate gym bros.",
};

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
    xp: user_stats?.[0]?.xp_current,
    xpMax: user_stats?.[0]?.xp_to_next,
    streak: user_stats?.[0]?.streak_current,
    avatar: user_profiles?.[0]?.avatar_emoji,
  };

  return (
    <main className="h-screen w-full overflow-hidden relative">
      <div className="flex h-full md:gap-10">
        <div className="hidden lg:block h-full">
          <Sidebar user={formattedUser} />
        </div>

        <div className="flex-1 h-full overflow-y-auto pb-24 md:pb-10 px-4 md:px-0 md:pr-10 pt-4 md:pt-0">
          {children}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </main>
  );
}
