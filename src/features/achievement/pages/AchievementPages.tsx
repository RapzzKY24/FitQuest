"use client";
import React from "react";
import StatisticCard from "../components/StatisticCard";
import BadgeCategoryAchievement from "../components/BadgeCategoryAchievement";
import { Achievement, AchievementCard } from "../components/AchievementCard";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import PieDiagram from "../components/PieDiagram";
import { dashboardUtils } from "@/src/utils/DashboardUtils";
import { useAchievements } from "../hooks/useAchievement";

interface AchievementPagesProps {
  achievements: Achievement[];
}

const AchievementPages = ({ achievements }: AchievementPagesProps) => {
  const {
    selectedCategory,
    setSelectedCategory,
    filteredAchievements,
    stats,
    recentlyUnlocked,
    almostUnlocked,
  } = useAchievements(achievements);

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
          <StatisticCard
            totalUnlocked={stats.unlocked}
            maxBadges={stats.total}
            legendaryCount={stats.rarity.legendary.unlocked}
            epicCount={stats.rarity.epic.unlocked}
            completionRate={stats.completionRate}
          />
          <div className="h-px w-full bg-broken-white/10" />
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
              <div className="h-60 flex items-center justify-center border border-dashed border-broken-white/10 rounded-lg">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  Data Tidak Ditemukan
                </p>
              </div>
            )}
          </div>

          {/* Sidebar (Col Span 1) */}
          <div className="lg:col-span-1 flex flex-col gap-y-6">
            {/* COMPLETION CARD */}
            <Card className="w-full ">
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
                <div className="relative flex items-center justify-center h-50 w-full">
                  <PieDiagram
                    unlockedCount={stats.unlocked}
                    lockedCount={stats.locked}
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Card className="w-full" variant="stat">
                    <CardContent>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="font-bold text-2xl">{stats.unlocked}</h1>
                        <p className="text-muted text-[10px] uppercase tracking-[0.3]">
                          UNLOCKED
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full" variant="stat">
                    <CardContent>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="font-bold text-2xl text-muted">
                          {stats.locked}
                        </h1>
                        <p className="text-muted text-[10px] uppercase tracking-[0.3]">
                          LOCKED
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-px border text-broken-white/10" />

                <div className="flex flex-col justify-center gap-y-4">
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#ffab40] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]">
                      Legendary
                    </li>
                    <p className="text-accent font-extralight">
                      {stats.rarity.legendary.unlocked}/
                      {stats.rarity.legendary.total}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#ab47bc] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]">
                      Epic
                    </li>
                    <p className="text-[#AB47BC] font-extralight">
                      {stats.rarity.epic.unlocked}/{stats.rarity.epic.total}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#42a5f5] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]">
                      Rare
                    </li>
                    <p className="text-info font-extralight">
                      {stats.rarity.rare.unlocked}/{stats.rarity.rare.total}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <li className="flex items-center text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#78909c] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]">
                      Common
                    </li>
                    <p className="text-muted font-extralight">
                      {stats.rarity.common.unlocked}/{stats.rarity.common.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TERBARU DIBUKA CARD */}
            <Card className="w-full ">
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
              <CardContent className="space-y-4">
                {recentlyUnlocked.length > 0 ? (
                  recentlyUnlocked.map((achieve, index) => (
                    <div
                      key={achieve.id}
                      className="flex flex-col justify-center space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <p className="text-2xl">{achieve.icon}</p>
                          <div className="flex-1">
                            <h1 className="text-broken-white font-bold text-sm">
                              {achieve.title}
                            </h1>
                            <p className="text-muted text-xs">
                              {achieve.unlockedAt
                                ? dashboardUtils.formatRelativeTime(
                                    achieve.unlockedAt,
                                  )
                                : "Baru saja"}
                            </p>
                          </div>
                        </div>
                        <BadgePill
                          color={
                            achieve.rarity === "legendary"
                              ? "accent"
                              : achieve.rarity === "epic"
                                ? "info"
                                : achieve.rarity === "rare"
                                  ? "info"
                                  : "muted"
                          }
                        >
                          <span className="capitalize">{achieve.rarity}</span>
                        </BadgePill>
                      </div>
                      {/* Biar item terakhir gak ada garis bawahnya */}
                      {index !== recentlyUnlocked.length - 1 && (
                        <div className="h-px w-full bg-border text-broken-white/10" />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-zinc-500 text-xs py-4">
                    Belum ada pencapaian.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* HAMPIR UNLOCKED CARD */}
            {almostUnlocked && (
              <Card className="w-full bg-danger/10 border-danger/20">
                <CardHeader>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-nowrap">
                      <p className="uppercase tracking-[3] text-primary font-bold ">
                        Hampir Unlocked
                      </p>
                      <div className="h-px w-full bg-white/10" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col justify-center gap-y-4">
                    <div className="flex items-center gap-4">
                      <BadgePill>
                        <span className="text-3xl text-center">
                          {almostUnlocked.icon}
                        </span>
                      </BadgePill>
                      <div className="flex-1">
                        <h1 className="font-bold text-broken-white">
                          {almostUnlocked.title}
                        </h1>
                        <p className="text-muted text-xs">
                          {almostUnlocked.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-y-2.5">
                      <div className="flex justify-between items-center">
                        <h1 className="uppercase text-muted text-xs tracking-[0.5]">
                          Progress
                        </h1>
                        <p className="font-extralight tracking-[0.5] text-info text-sm">
                          {almostUnlocked.progress}/{almostUnlocked.max}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <ProgressBar
                          value={almostUnlocked.progress!}
                          max={almostUnlocked.max!}
                          variant="blue"
                        />
                        <h1 className="uppercase text-xs text-muted tracking-[0.5]">
                          {almostUnlocked.max! - almostUnlocked.progress!} lagi
                          untuk unlock!
                        </h1>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AchievementPages;
