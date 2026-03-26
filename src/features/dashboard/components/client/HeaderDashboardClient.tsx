"use client";

import { Card, CardContent } from "@/src/components/ui/Card";
import React from "react";
import { Button } from "@/src/components/ui/Button";
import StreakBadgePill from "../../../profile/components/shared/StreakBadgePill";
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
  const todayFormatted = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="w-full overflow-hidden" variant="default">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          {/* BAGIAN KIRI: Teks & Button */}
          <div className="flex flex-col justify-center gap-y-2 w-full md:w-auto">
            <h2 className="text-primary tracking-[0.1rem] uppercase font-semibold text-xs md:text-sm">
              {"//"} {todayFormatted}
            </h2>
            <h1 className="text-broken-white text-2xl md:text-4xl tracking-[0.1rem] uppercase font-extrabold ">
              Selamat Datang,{" "}
              <span className="text-primary">{displayName}!</span>
            </h1>
            <p className="text-muted text-xs md:text-sm font-medium mb-4">
              {streak > 0
                ? `Streak kamu lagi panas 🔥 — jangan putus hari ini!`
                : `Yuk mulai olahraga pertamamu hari ini! 💪`}
            </p>
            <Link href={"/log"}>
              <Button variant="primary" size="sm" className="w-full md:w-max">
                ⚡ LOG WORKOUT SEKARANG
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-10 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-24 h-24 md:w-28 md:h-28">
                <PieDiagramSession sesiSelesai={sessionsToday} />
              </div>

              <span className="text-muted text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase">
                Sesi Hari Ini
              </span>
            </div>

            <div className="hidden md:block">
              <StreakBadgePill streak={streak} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PieDiagramSession = ({ sesiSelesai }: { sesiSelesai: number }) => {
  const totalSesi = 3;

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
            cornerRadius={40}>
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
        <span className="text-primary text-3xl md:text-4xl font-black leading-none">
          {safeSelesai}
        </span>
        <span className="text-muted text-[10px] md:text-xs font-bold tracking-widest mt-1">
          / {totalSesi}
        </span>
      </div>
    </>
  );
};

export default HeaderDashboardClient;
