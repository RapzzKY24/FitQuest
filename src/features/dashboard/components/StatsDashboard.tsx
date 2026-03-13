"use client";
import { Card, CardContent } from "@/src/components/ui/Card";
import React from "react";

const MockDataDashboard = [
  {
    id: 1,
    icon: "⚡",
    value: "340",
    valueColor: "text-primary",
    label: "XP Hari Ini",
    trend: "↑ +90 dari kemarin",
    trendColor: "text-success",
  },
  {
    id: 2,
    icon: "⏱️",
    value: "45",
    valueColor: "text-info",
    label: "Menit Workout",
    trend: "↓ -5 dari kemarin",
    trendColor: "text-danger",
  },
  {
    id: 3,
    icon: "🔥",
    value: "420",
    valueColor: "text-danger",
    label: "Kalori Terbakar",
    trend: "↑ +120 dari kemarin",
    trendColor: "text-success",
  },
  {
    id: 4,
    icon: "🎯",
    value: "12",
    valueColor: "text-accent",
    label: "Sesi Bulan Ini",
    trend: "On track bro! 💪",
    trendColor: "text-primary-hover",
  },
];

const StatsDashboard = () => {
  return (
    <>
      {MockDataDashboard.map((stat) => (
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
