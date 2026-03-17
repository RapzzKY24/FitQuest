import { createClient } from "@/src/utils/supabase/server"; // Sesuaikan path
import HeaderDashboardClient from "./client/HeaderDashboardClient";
import { DashboardService } from "../services/dashboard.service";

export default async function HeaderDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { vDashboard, sessionsToday } = await DashboardService.headerDashboard(
    supabase,
    user.id,
  );

  return (
    <HeaderDashboardClient
      displayName={vDashboard?.display_name || "Warrior"}
      streak={vDashboard?.streak_current || 0}
      sessionsToday={sessionsToday || 0}
    />
  );
}
