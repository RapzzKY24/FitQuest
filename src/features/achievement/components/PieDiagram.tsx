"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// 1. Definisikan props yang mau diterima
interface PieDiagramProps {
  unlockedCount: number;
  lockedCount: number;
}

const PieDiagram = ({ unlockedCount, lockedCount }: PieDiagramProps) => {
  // 2. Masukin data dari props ke array data Recharts
  const data = [
    { name: "Unlocked", value: unlockedCount },
    { name: "Locked", value: lockedCount },
  ];

  const total = unlockedCount + lockedCount;
  // 3. Pake ternary operator biar aman dari error NaN kalau total badge = 0
  const percentage = total > 0 ? Math.round((unlockedCount / total) * 100) : 0;

  return (
    // Kasih min-h-[150px] atau ukuran spesifik di div bungkusnya biar ResponsiveContainer recharts mau nampil
    <div className="w-full h-[150px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={75}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // fill-primary buat Unlocked (index 0), fill-muted buat Locked (index 1)
                className={`${index === 0 ? "fill-primary" : "fill-muted"} outline-none`}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Persentase Tengah */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="block text-3xl font-black text-white leading-none">
          {percentage}%
        </span>
        <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
          Done
        </span>
      </div>
    </div>
  );
};

export default PieDiagram;
