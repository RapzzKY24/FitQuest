import { Card, CardContent } from "@/src/components/ui/Card";
import { createClient } from "@/src/utils/supabase/server";
import React from "react";

const StatsDashboard = async () => {
  const supabase = await createClient();

  // 1. Cek User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null; // Atau render state empty/redirect
  }

  // 2. Tarik data dari View v_user_dashboard
  const { data: vDashboard } = await supabase
    .from("v_user_dashboard")
    .select("*")
    .eq("id", user.id)
    .single();

  // 3. Map data DB ke format Card lu
  // Fallback ke 0 kalau datanya belum ada (misal user baru daftar)
  const RealDataDashboard = [
    {
      id: 1,
      icon: "⚡",
      value: vDashboard?.weekly_xp || 0,
      valueColor: "text-primary",
      label: "XP Minggu Ini",
      trend: "Kumpulkan terus XP-mu!",
      trendColor: "text-success",
    },
    {
      id: 2,
      icon: "⏱️",
      value: vDashboard?.total_minutes || 0,
      valueColor: "text-info",
      label: "Total Menit",
      trend: "Waktu aktif olahragamu",
      trendColor: "text-info",
    },
    {
      id: 3,
      icon: "🔥",
      value: vDashboard?.streak_current || 0,
      valueColor: "text-danger",
      label: "Streak Aktif",
      // Ambil best streak buat dimunculin di tulisan kecil bawahnya
      trend: `Rekor terbaik: ${vDashboard?.streak_best || 0} Hari`,
      trendColor: "text-success",
    },
    {
      id: 4,
      icon: "⚔️",
      value: vDashboard?.total_sessions || 0,
      valueColor: "text-accent",
      label: "Total Sesi",
      trend: "On track bro! 💪",
      trendColor: "text-primary-hover",
    },
  ];

  return (
    <>
      {RealDataDashboard.map((stat) => (
        <Card key={stat.id} className="overflow-hidden" variant="stat">
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-center">
              <div className="space-y-2.5">
                <span className="text-2xl">{stat.icon}</span>
                <h1 className={`font-extrabold text-5xl ${stat.valueColor}`}>
                  {stat.value}
                </h1>
                <p className="text-muted tracking-[0.2rem] uppercase text-[10px] font-bold">
                  {stat.label}
                </p>
                <p
                  className={`tracking-[0.1rem] text-[11px] font-semibold ${stat.trendColor}`}
                >
                  {stat.trend}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default StatsDashboard;
