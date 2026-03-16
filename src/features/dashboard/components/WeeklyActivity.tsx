import { createClient } from "@/src/utils/supabase/server";
import WeeklyActivityClient from "./client/WeeklyActivityClient";

export default async function WeeklyActivity() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 1. Tentukan Tanggal Awal & Akhir Minggu Ini (Senin - Minggu)
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Minggu, 1 = Senin, dst
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - daysSinceMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // 2. Tarik data dari DB khusus rentang minggu ini
  const { data: logs, error } = await supabase
    .from("workout_logs")
    .select("xp_earned, duration_min, logged_at")
    .eq("user_id", user.id)
    .gte("logged_at", startOfWeek.toISOString())
    .lte("logged_at", endOfWeek.toISOString());

  if (error) {
    console.error("Gagal narik data mingguan:", error.message);
  }

  // 3. Siapkan kerangka data kosong (Senin-Minggu)
  const daysLabel = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const todayIndex = daysSinceMonday; // Buat nentuin hari ini

  const weeklyData = {
    xp: daysLabel.map((day, idx) => ({
      day,
      value: 0,
      isToday: idx === todayIndex,
    })),
    menit: daysLabel.map((day, idx) => ({
      day,
      value: 0,
      isToday: idx === todayIndex,
    })),
  };

  const totals = { sessions: 0, minutes: 0, xp: 0 };

  // 4. Masukin data dari DB ke kerangka hari yang sesuai
  logs?.forEach((log) => {
    const logDate = new Date(log.logged_at);
    const logDay = logDate.getDay();
    // Ubah format index JS (Minggu=0) jadi format kita (Senin=0, Minggu=6)
    const index = logDay === 0 ? 6 : logDay - 1;

    // Tambahin value-nya
    weeklyData.xp[index].value += log.xp_earned;
    weeklyData.menit[index].value += log.duration_min;

    // Kalkulasi Total Bawah
    totals.sessions += 1;
    totals.minutes += log.duration_min;
    totals.xp += log.xp_earned;
  });

  // 5. Lempar data matang ke UI Client
  return <WeeklyActivityClient weeklyData={weeklyData} totals={totals} />;
}
