import { createClient } from "@/src/utils/supabase/server";
import WeeklyActivityClient from "./client/WeeklyActivityClient";
import { DashboardService } from "../services/dashboard.service";

export default async function WeeklyActivity() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 1. Tentukan Tanggal Awal & Akhir Minggu Ini (Senin - Minggu)
  const { daysSinceMonday, logs } = await DashboardService.weeklyActivity(
    supabase,
    user.id,
  );

  // 2. Siapkan kerangka data kosong (Senin-Minggu)
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

  // 3. Masukin data dari DB ke kerangka hari yang sesuai
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

  return <WeeklyActivityClient weeklyData={weeklyData} totals={totals} />;
}
