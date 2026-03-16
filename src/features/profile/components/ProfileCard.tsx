import { Card, CardContent } from "@/src/components/ui/Card";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { BadgePill } from "@/src/components/ui/badge-pill";
import React from "react";
import StreakBadgePill from "./shared/StreakBadgePill";

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: string;
  isLast?: boolean;
}

const ProfileCard = () => {
  return (
    <Card className="w-full  overflow-hidden">
      <CardContent className="p-8">
        {/* TOP SECTION: Profile & Streak */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-8">
            {/* Profile Emoji Container */}
            <div className="relative">
              <div className="w-32 h-32 bg-[#141414] border-2 border-[#272727] rounded-sm flex items-center justify-center text-6xl shadow-inner">
                💪
              </div>
            </div>

            {/* Biodata & Progress */}
            <div className="flex flex-col gap-y-6 min-w-[400px]">
              {/* Name and Level */}
              <div className="flex items-center gap-4">
                <h1 className="font-black text-4xl uppercase tracking-tighter">
                  Budi Warrior
                </h1>
                <BadgePill className="bg-[#1c1c1c] border border-[#272727] px-3 py-1 rounded-sm flex items-center gap-3">
                  <span className="font-bold text-sm">LV.7</span>
                  <span className="w-px h-3 bg-[#555]"></span>
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Iron Warrior
                  </span>
                </BadgePill>
              </div>

              {/* Username & Join Date */}
              <div className="flex items-center gap-3 text-muted text-sm font-medium tracking-[0.2em] uppercase">
                <span className="hover:text-broken-white transition-colors">
                  @budiwarrior
                </span>
                <span className="text-muted/40">•</span>
                <span>Bergabung Maret 2025</span>
              </div>

              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <h2 className="uppercase text-muted text-xxs font-bold tracking-[0.3em]">
                    Xp ke level 8
                  </h2>
                  <p className="text-sm font-bold">
                    340 <span className="text-muted">/ 600</span>
                  </p>
                </div>

                <ProgressBar
                  value={340}
                  max={600}
                  className="h-2 bg-[#1c1c1c]"
                />

                <p className="uppercase text-[#555] text-[10px] font-bold tracking-[0.2em]">
                  260 XP lagi untuk naik level
                </p>
              </div>
            </div>
          </div>

          <StreakBadgePill streak={17} />
        </div>

        {/* BOTTOM SECTION: Statistics Grid */}
        <div className="grid grid-cols-4 border-t border-[#272727] pt-8">
          <StatBox label="Total Sesi" value="47" />
          <StatBox label="Total Menit" value="2,840" />
          <StatBox label="Total XP" value="12,450" color="text-[#ffb347]" />
          <StatBox
            label="Achievement"
            value="18"
            color="text-[#3b82f6]"
            isLast
          />
        </div>
      </CardContent>
    </Card>
  );
};

const StatBox = ({
  label,
  value,
  color = "text-primary",
  isLast = false,
}: StatBoxProps) => (
  <div
    className={`flex flex-col items-center justify-center ${
      !isLast ? "border-r border-border/50" : ""
    }`}
  >
    <h1 className={`text-3xl font-black mb-1 ${color}`}>{value}</h1>
    <p className="text-xxs text-muted uppercase font-bold tracking-[0.3em]">
      {label}
    </p>
  </div>
);

export default ProfileCard;
