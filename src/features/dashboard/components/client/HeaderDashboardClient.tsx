"use client";

import { Card, CardContent } from "@/src/components/ui/Card";
import React from "react";
import { Button } from "@/src/components/ui/Button";
import StreakBadgePill from "../../../profile/components/shared/StreakBadgePill"; // Sesuaikan path
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import Link from "next/link";

interface Props {
  displayName: string;
  sessionsToday: number;
  streak: number;
}

const HeaderDashboardClient = ({
  displayName,
  sessionsToday,
  streak,
}: Props) => {
  // Bikin tanggal otomatis sesuai hari ini (Contoh output: "Selasa, 17 Maret 2026")
  const todayFormatted = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="w-full overflow-hidden" variant="default">
      <CardContent className="p-8">
        <div className="flex justify-between items-center">
          {/* BAGIAN KIRI: Teks & Button */}
          <div className="flex flex-col justify-center gap-y-2">
            <h2 className="text-primary tracking-[0.1rem] uppercase font-semibold text-sm">
              {"//"} {todayFormatted}
            </h2>
            <h1 className="text-broken-white text-4xl tracking-[0.1rem] uppercase font-extrabold ">
              Selamat Datang,{" "}
              <span className="text-primary">{displayName}!</span>
            </h1>
            <p className="text-muted text-sm font-medium mb-4">
              {streak > 0
                ? `Streak kamu lagi panas 🔥 — jangan putus hari ini!`
                : `Yuk mulai olahraga pertamamu hari ini! 💪`}
            </p>
            <Button variant="primary" size="sm" className="w-[50%]">
              <Link href={"/log"}>⚡ LOG WORKOUT SEKARANG</Link>
            </Button>
          </div>

          {/* BAGIAN KANAN: Pie Chart & Streak */}
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-28 h-28">
                {/* Oper jumlah sesi hari ini ke komponen chart */}
                <PieDiagramSession sesiSelesai={sessionsToday} />
              </div>

              <span className="text-muted text-[11px] font-bold tracking-[0.3em] uppercase">
                Sesi Hari Ini
              </span>
            </div>

            {/* Asumsi komponen lu bisa nerima props streak, atau kalau dia nge-fetch sendiri, kosongi aja props-nya */}
            <StreakBadgePill streak={streak} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Komponen Chart dipisah di bawahnya
const PieDiagramSession = ({ sesiSelesai }: { sesiSelesai: number }) => {
  const totalSesi = 3; // Sesuai limit maksimal XP per hari di Trigger DB lu

  // Biar chartnya gak error kalau user rajin banget (lebih dari 3 sesi)
  const safeSelesai = sesiSelesai > totalSesi ? totalSesi : sesiSelesai;
  const safeSisa = totalSesi - safeSelesai;

  const data = [
    { name: "Selesai", value: safeSelesai },
    { name: "Sisa", value: safeSisa },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
            cornerRadius={40}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className={`${index === 0 ? "fill-primary" : "fill-muted opacity-20"} outline-none`}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="text-primary text-4xl font-black leading-none">
          {safeSelesai}
        </span>
        <span className="text-muted text-xs font-bold tracking-widest mt-1">
          / {totalSesi}
        </span>
      </div>
    </>
  );
};

export default HeaderDashboardClient;
