"use client";
import { Card, CardContent } from "@/src/components/ui/Card";
import React, { useState } from "react";
import HeaderCard from "./shared/HeaderCard";

export const IntensityCard = () => {
  const colorStyles = {
    Biru: {
      border: "border-cyan-500",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      shadow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    },
    Kuning: {
      border: "border-yellow-500",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      shadow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    },
    Merah: {
      border: "border-red-500",
      bg: "bg-red-500/10",
      text: "text-red-400",
      shadow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    },
  };

  const intensityMockData = [
    { id: "1", icon: "🚶", label: "Ringan", exp: "×0.8 XP", color: "Biru" },
    { id: "2", icon: "🏃", label: "Sedang", exp: "x1.0 XP", color: "Kuning" },
    { id: "3", icon: "🔥", label: "Intens", exp: "x1.3 XP", color: "Merah" },
  ] as const;

  const [selectedIntensity, setSelectedIntensity] = useState("Ringan");

  return (
    <section>
      <Card className="w-full bg-black/40 backdrop-blur-md border-white/5">
        <HeaderCard title="Intensitas" />

        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {intensityMockData.map((item) => {
              const isSelected = selectedIntensity === item.label;
              const style = colorStyles[item.color as keyof typeof colorStyles];

              return (
                <Card
                  key={item.id}
                  variant={isSelected ? "achievement" : "stat"}
                  onClick={() => setSelectedIntensity(item.label)}
                  className={`
                    flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300
                    ${
                      isSelected
                        ? `border-2 ${style.border} ${style.bg} ${style.shadow} scale-105`
                        : "opacity-40 hover:opacity-100 border-white/5 hover:bg-white/5"
                    }
                  `}
                >
                  <div className={"text-3xl mb-3 "}>{item.icon}</div>

                  <div className="text-center space-y-1">
                    <div
                      className={`
                      text-[11px] font-bold tracking-[0.2em] uppercase
                      ${isSelected ? style.text : "text-white/80"}
                    `}
                    >
                      {item.label}
                    </div>

                    <div
                      className={`
                      text-[9px] font-medium tracking-widest
                      ${isSelected ? style.text : "text-white/40"}
                    `}
                    >
                      {item.exp}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
