"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Unlocked", value: 18 },
  { name: "Locked", value: 24 },
];

const PieDiagram = () => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  const percentage = Math.round((data[0].value / total) * 100);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
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
        <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
          Done
        </span>
      </div>
    </>
  );
};

export default PieDiagram;
