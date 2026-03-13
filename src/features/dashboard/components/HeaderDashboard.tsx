"use client";
import { Card, CardContent } from "@/src/components/ui/Card";
import React from "react";
import { Button } from "@/src/components/ui/Button";
import StreakBadgePill from "../../profile/components/shared/StreakBadgePill";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const HeaderDashboard = () => {
  return (
    <Card className="w-full overflow-hidden" variant="default">
      <CardContent className="p-8">
        <div className="flex justify-between items-center">
          {/* BAGIAN KIRI: Teks & Button */}
          <div className="flex flex-col justify-center gap-y-2">
            <h2 className="text-primary tracking-[0.1rem] uppercase font-semibold text-sm">
              {"//"} Senin, 12 Maret 2026
            </h2>
            <h1 className="text-broken-white text-4xl tracking-[0.1rem] uppercase font-extrabold ">
              Selamat Datang, <span className="text-primary">Budi!</span>
            </h1>
            <p className="text-muted text-sm font-medium mb-2">
              Streak kamu lagi panas 🔥 — jangan putus hari ini!
            </p>
            <Button variant="primary" size="sm" className="w-[50%]">
              ⚡ LOG WORKOUT SEKARANG
            </Button>
          </div>

          {/* BAGIAN KANAN: Pie Chart & Streak */}
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-28 h-28">
                <PieDiagramSession />
              </div>

              <span className="text-muted text-[11px] font-bold tracking-[0.3em] uppercase">
                Sesi Hari Ini
              </span>
            </div>

            <StreakBadgePill />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PieDiagramSession = () => {
  const totalSesi = 3;
  const sesiSelesai = 1;
  const data = [
    { name: "Selesai", value: sesiSelesai },
    { name: "Sisa", value: totalSesi - sesiSelesai },
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
          {sesiSelesai}
        </span>
        <span className="text-muted text-xs font-bold tracking-widest mt-1">
          / {totalSesi}
        </span>
      </div>
    </>
  );
};

export default HeaderDashboard;
