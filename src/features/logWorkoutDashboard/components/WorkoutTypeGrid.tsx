"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import HeaderCard from "./shared/HeaderCard";

export const WorkoutTypeGrid = () => {
  const sports = [
    { id: "lari", label: "Lari", icon: "🏃" },
    { id: "gym", label: "Gym", icon: "🏋️" },
    { id: "sepeda", label: "Bersepeda", icon: "🚴" },
    { id: "renang", label: "Renang", icon: "🏊" },
    { id: "yoga", label: "Yoga", icon: "🧘" },
    { id: "futsal", label: "Futsal", icon: "⚽" },
    { id: "boxing", label: "Boxing", icon: "🥊" },
    { id: "calisthenics", label: "Calisthenics", icon: "🤸" },
  ];

  const [selectedSport, setSelectedSport] = useState("renang");
  return (
    <section>
      <Card className="w-full bg-black/40">
        <HeaderCard title="Jenis Olahraga" />

        <CardContent>
          {/* Grid untuk Mapping Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sports.map((item) => {
              const isSelected = selectedSport === item.id;

              return (
                <Card
                  key={item.id}
                  variant={isSelected ? "achievement" : "stat"}
                  onClick={() => setSelectedSport(item.id)}
                  className={`
                  flex flex-col items-center justify-center p-5 cursor-pointer transition-all
                  ${
                    isSelected
                      ? "border-primary border-2 bg-primary/10"
                      : "opacity-40 hover:opacity-100"
                  }
                `}
                >
                  <div className={"text-2xl mb-2"}>{item.icon}</div>
                  <div
                    className={`
                  text-[10px] font-bold tracking-widest uppercase
                  ${isSelected ? "text-primary" : "text-white/60"}
                `}
                  >
                    {item.label}
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
