"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { ProgressBar } from "@/src/components/ui/ProgressBar"; // Sesuaikan path

// --- MOCK DATA ---
const weeklyData = {
  xp: [
    { day: "Sen", value: 0 },
    { day: "Sel", value: 80 },
    { day: "Rab", value: 155 },
    { day: "Kam", value: 0 },
    { day: "Jum", value: 48 },
    { day: "Sab", value: 105 },
    { day: "Min", value: 90, isToday: true },
  ],
  menit: [
    { day: "Sen", value: 0 },
    { day: "Sel", value: 45 },
    { day: "Rab", value: 60 },
    { day: "Kam", value: 0 },
    { day: "Jum", value: 30 },
    { day: "Sab", value: 75 },
    { day: "Min", value: 45, isToday: true },
  ],
};

const WeeklyActivity = () => {
  // State untuk toggle tab (XP atau Menit)
  const [activeTab, setActiveTab] = useState<"xp" | "menit">("xp");

  // Ambil data sesuai tab yang aktif
  const currentData = weeklyData[activeTab];

  // Cari nilai max buat patokan 100% progress bar
  const maxValue = Math.max(...currentData.map((d) => d.value), 1);

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-10">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Aktivitas Minggu Ini
          </span>

          {/* Toggle Tab */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("xp")}
              className={`font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                activeTab === "xp"
                  ? "text-primary"
                  : "text-muted hover:text-broken-white"
              }`}
            >
              XP
            </button>
            <button
              onClick={() => setActiveTab("menit")}
              className={`font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                activeTab === "menit"
                  ? "text-blue-500"
                  : "text-muted hover:text-broken-white"
              }`}
            >
              Menit
            </button>
          </div>
        </div>

        {/* --- BAR CHART AREA --- */}
        <div className="flex justify-between items-end gap-2 w-full mb-8">
          {currentData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col flex-1 items-center gap-2"
            >
              {/* Angka Value (Cuma muncul kalau nilainya > 0) */}
              <span
                className={`font-mono text-[9px] font-bold h-3 ${
                  activeTab === "xp" ? "text-primary" : "text-blue-500"
                }`}
              >
                {item.value > 0 ? item.value : ""}
              </span>

              {/* Progress Bar Horizontal */}
              <ProgressBar
                value={item.value}
                max={maxValue}
                variant={activeTab === "xp" ? "orange" : "blue"}
                className="w-full"
              />

              {/* Label Hari */}
              <span
                className={`font-mono text-[10px] tracking-wider mt-1 font-bold ${
                  item.isToday ? "text-broken-white" : "text-muted"
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>

        {/* --- BOTTOM STATS --- */}
        <div className="grid grid-cols-3 border-t border-border/60 pt-6">
          {/* Total Sesi */}
          <div className="flex flex-col items-center justify-center border-r border-border/60">
            <h2 className="text-broken-white font-black text-3xl md:text-4xl mb-1 drop-shadow-sm">
              4
            </h2>
            <p className="text-muted font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
              Sesi
            </p>
          </div>

          {/* Total Menit */}
          <div className="flex flex-col items-center justify-center border-r border-border/60">
            <h2 className="text-broken-white font-black text-3xl md:text-4xl mb-1 drop-shadow-sm">
              144
            </h2>
            <p className="text-muted font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
              Menit
            </p>
          </div>

          {/* Total XP */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-primary font-black text-3xl md:text-4xl mb-1 drop-shadow-sm">
              +680
            </h2>
            <p className="text-muted font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
              XP
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyActivity;
