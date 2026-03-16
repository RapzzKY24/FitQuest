import { createClient } from "@/src/utils/supabase/server"; // Sesuaikan path
import HeaderDashboardClient from "./client/HeaderDashboardClient";

export default async function HeaderDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 1. Tarik Nama & Streak dari View
  const { data: vDashboard } = await supabase
    .from("v_user_dashboard")
    .select("display_name, streak_current")
    .eq("id", user.id)
    .single();

  // 2. Hitung jumlah sesi hari ini
  // Kita set waktu mulai hari ini ke jam 00:00:00
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const { count: sessionsToday, error: countError } = await supabase
    .from("workout_logs")
    .select("*", { count: "exact", head: true }) // head: true bikin enteng karena cuma minta jumlah, bukan isinya
    .eq("user_id", user.id)
    .gte("logged_at", startOfToday.toISOString());

  if (countError) {
    console.error("Gagal hitung sesi hari ini:", countError.message);
  }

  // 3. Oper datanya ke UI
  return (
    <HeaderDashboardClient
      displayName={vDashboard?.display_name || "Warrior"}
      streak={vDashboard?.streak_current || 0}
      sessionsToday={sessionsToday || 0}
    />
  );
}
