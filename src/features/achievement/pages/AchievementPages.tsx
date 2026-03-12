"use client";
import React, { useState } from "react";
import StatisticCard from "../components/StatisticCard";
import BadgeCategoryAchievement from "../components/BadgeCategoryAchievement";
import { Achievement, AchievementCard } from "../components/AchievementCard";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Century Club",
    desc: "100 sesi workout sepanjang masa",
    rarity: "legendary",
    icon: "👑",
    status: "in-progress",
    progress: 47,
    max: 100,
  },
  {
    id: 2,
    title: "Iron Will",
    desc: "Streak 7 hari berturut-turut",
    rarity: "epic",
    icon: "💎",
    status: "unlocked",
  },
  {
    id: 3,
    title: "Night Owl",
    desc: "10x workout setelah jam 10 malam",
    rarity: "epic",
    icon: "🦉",
    status: "locked",
  },
  {
    id: 4,
    title: "First Step",
    desc: "Log workout pertamamu",
    rarity: "common",
    icon: "👟",
    status: "unlocked",
  },
  {
    id: 5,
    title: "Versatile",
    desc: "Catat 5 jenis olahraga berbeda",
    rarity: "rare",
    icon: "🎯",
    status: "in-progress",
    progress: 3,
    max: 5,
  },
  {
    id: 6,
    title: "Speed Demon",
    desc: "Lari dengan kecepatan di atas 12km/jam",
    rarity: "common",
    icon: "🏃",
    status: "unlocked",
  },
];

const AchievementPages = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredAchievements = MOCK_ACHIEVEMENTS.filter((item) => {
    if (selectedCategory === "Semua") return true;
    if (selectedCategory === "Locked") return item.status === "locked";
    return item.rarity.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <main className="w-full bg-black">
      <div className="px-4 py-6 flex flex-col gap-y-8">
        {/* Header */}
        <div className="space-y-3.5">
          <p className="text-sm font-light tracking-[0.3em] uppercase text-primary">
            Koleksi Pencapaian
          </p>
          <h1 className="font-extrabold text-4xl text-broken-white uppercase ">
            Achieve<span className="text-primary">ment</span>
          </h1>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <StatisticCard />
          <div className="h-px w-full bg-brotext-broken-white/10" />
        </div>

        {/* Main Grid 3:1 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-y-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              <BadgeCategoryAchievement
                activeCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {filteredAchievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAchievements.map((achieve) => (
                  <AchievementCard key={achieve.id} achievement={achieve} />
                ))}
              </div>
            ) : (
              <div className="h-60 flex items-center justify-center border border-dashed border-brotext-broken-white/10 rounded-lg">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  Data Tidak Ditemukan
                </p>
              </div>
            )}
          </div>

          {/* Sidebar (Col Span 1) */}
          <div className="lg:col-span-1 flex flex-col gap-y-6">
            {/* Completion */}
            <Card className="w-full bg-black/40">
              <CardHeader>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-nowrap">
                    <p className="uppercase tracking-[3] text-muted ">
                      COMPLETION
                    </p>
                    <div className="h-px w-full bg-border text-broken-white/10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center items-center gap-2">
                  {/* stats */}
                  <Card className="w-full" variant="stat">
                    <CardContent>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="font-bold text-2xl">18</h1>
                        <p className="text-muted uppercase tracking-[0.3]">
                          UNLOCKED
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full" variant="stat">
                    <CardContent>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="font-bold text-2xl text-muted">24</h1>
                        <p className="text-muted uppercase tracking-[0.3]">
                          LOCKED
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="h-px border text-broken-white/10" />
                <div className="flex flex-col justify-center gap-y-4">
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#ffab40] before:[clip-path:polygon(0_0,_75%_0,_100%_25%,_100%_100%,_25%_100%,_0_75%)]">
                      Legendary
                    </li>
                    <p className="text-accent font-extralight">0/4</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#ab47bc] before:[clip-path:polygon(0_0,_75%_0,_100%_25%,_100%_100%,_25%_100%,_0_75%)]">
                      Epic
                    </li>
                    <p className="text-[#AB47BC] font-extralight">0/7</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#42a5f5] before:[clip-path:polygon(0_0,_75%_0,_100%_25%,_100%_100%,_25%_100%,_0_75%)]">
                      Rare
                    </li>
                    <p className="text-info font-extralight">0/4</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#78909c] before:[clip-path:polygon(0_0,_75%_0,_100%_25%,_100%_100%,_25%_100%,_0_75%)]">
                      Common
                    </li>
                    <p className="text-muted font-extralight">0/4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* terbaru dibuka */}
            <Card className="w-full bg-black/40">
              <CardHeader>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-nowrap">
                    <p className="uppercase tracking-[3] text-muted ">
                      TERBARU DIBUKA
                    </p>
                    <div className="h-px w-full bg-border text-broken-white/10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* list */}
                <div className="flex flex-col justify-center space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <p>💎</p>
                      <div className="flex-1">
                        <h1 className="text-broken-white font-bold">
                          Iron Will
                        </h1>
                        <p className="text-muted">2 Hari lalu</p>
                      </div>
                    </div>
                    <BadgePill color="purple">Epic</BadgePill>
                  </div>
                  <div className="h-px w-full bg-border text-broken-white/10" />
                </div>
              </CardContent>
              <CardContent>
                {/* list */}
                <div className="flex flex-col justify-center space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <p>🌅</p>
                      <div className="flex-1">
                        <h1 className="text-broken-white font-bold">
                          Early Bird
                        </h1>
                        <p className="text-muted">4 hari lalu</p>
                      </div>
                    </div>
                    <BadgePill color="blue">Rare</BadgePill>
                  </div>
                  <div className="h-px w-full bg-white/10" />
                </div>
              </CardContent>
              <CardContent>
                {/* list */}
                <div className="flex flex-col justify-center space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <p>👟</p>
                      <div className="flex-1">
                        <h1 className="text-white font-bold">First Step</h1>
                        <p className="text-muted">7 hari lalu</p>
                      </div>
                    </div>
                    <BadgePill color="muted">Common</BadgePill>
                  </div>
                  <div className="h-px w-full bg-white/10" />
                </div>
              </CardContent>
            </Card>
            {/* hampir unclock */}
            <Card className="w-full bg-danger/10">
              <CardHeader>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-nowrap">
                    <p className="uppercase tracking-[3] text-primary font-bold ">
                      Hampir Unclock
                    </p>
                    <div className="h-px w-full bg-white/10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-center gap-y-4">
                  <div className="flex items-center gap-4">
                    <BadgePill>
                      <span className="text-3xl text-center">🎯</span>
                    </BadgePill>
                    <div className="flex-1">
                      <h1 className="font-bold text-broken-white">Versatile</h1>
                      <p className="text-muted">5 jenis olahraga berbeda</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-y-2.5">
                    <div className="flex justify-between items-center">
                      <h1 className="uppercase text-muted tracking-[0.5]">
                        Progress
                      </h1>
                      <p className="font-extralight  tracking-[0.5] text-info">
                        3/5
                      </p>
                    </div>
                    <div className="space-y-3">
                      <ProgressBar value={3} max={5} variant="blue" />
                      <h1 className="uppercase text-sm text-muted tracking-[0.5]">
                        2 jenis lagi untuk unlock!
                      </h1>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AchievementPages;
