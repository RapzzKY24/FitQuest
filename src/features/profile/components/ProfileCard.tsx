import { Card, CardContent } from "@/src/components/ui/Card";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { BadgePill } from "@/src/components/ui/badge-pill";
import React from "react";
import StreakBadgePill from "./shared/StreakBadgePill";
import { UserProfileData } from "../types/profile.types";

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: string;
  className?: string;
}

interface ProfileCardProps {
  user: UserProfileData;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const joinDate = user?.created_at
    ? new Intl.DateTimeFormat("id-ID", {
        month: "long",
        year: "numeric",
      }).format(new Date(user.created_at))
    : "Baru Saja";

  const currentXp = user?.xp || 0;
  const targetXp = user?.xpMax || 100;
  const xpRemaining = targetXp - currentXp;

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-5 sm:p-6 lg:p-8">
        {/* TOP SECTION */}
        <div className="flex justify-between items-start mb-8 lg:mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 lg:gap-8 w-full">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#141414] border-2 border-[#272727] rounded-sm flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl shadow-inner font-black text-white/50 uppercase">
                {user?.avatar}
              </div>
            </div>

            <div className="flex flex-col gap-y-4 lg:gap-y-6 w-full text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter">
                  {user?.name}
                </h1>
                <BadgePill className="bg-[#1c1c1c] border border-[#272727] px-3 py-1 rounded-sm flex items-center gap-3 w-max">
                  <span className="font-bold text-xs sm:text-sm">
                    LV.{user?.level}
                  </span>
                  <span className="w-px h-3 bg-[#555]"></span>
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                    {user?.title}
                  </span>
                </BadgePill>
              </div>

              {/* Username & Date */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-muted text-xs sm:text-sm font-medium tracking-widest sm:tracking-[0.2em] uppercase">
                <span className="hover:text-broken-white transition-colors">
                  @
                  {user?.username ||
                    user?.name?.toLowerCase().replace(/\s/g, "")}
                </span>
                <span className="text-muted/40 hidden sm:inline">•</span>
                <span className="w-full sm:w-auto mt-1 sm:mt-0">
                  Bergabung {joinDate}
                </span>
              </div>

              {/* Progress Bar XP */}
              <div className="space-y-2 sm:space-y-3 mt-2 sm:mt-0">
                <div className="flex justify-between items-end">
                  <h2 className="uppercase text-muted text-[10px] sm:text-xxs font-bold tracking-[0.2em] sm:tracking-[0.3em]">
                    Xp ke level {(user?.level || 0) + 1}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold">
                    {currentXp} <span className="text-muted">/ {targetXp}</span>
                  </p>
                </div>

                <ProgressBar
                  value={currentXp}
                  max={targetXp}
                  className="h-1.5 sm:h-2 bg-[#1c1c1c]"
                />

                <p className="uppercase text-[#555] text-[9px] sm:text-[10px] font-bold tracking-widest sm:tracking-[0.2em] text-left">
                  {xpRemaining > 0
                    ? `${xpRemaining} XP lagi untuk naik level`
                    : "Siap Level Up!"}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block shrink-0 ml-4">
            <StreakBadgePill streak={user?.streak || 0} />
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-4  gap-y-8 border-t border-[#272727] pt-8">
          <StatBox
            label="Total Sesi"
            value={user?.total_sessions || 0}
            className="border-r border-[#272727]"
          />
          <StatBox
            label="Total Menit"
            value={(user?.total_minutes || 0).toLocaleString("id-ID")}
            color="text-[#3b82f6]"
            className="lg:border-r lg:border-[#272727]"
          />
          <StatBox
            label="Total XP"
            value={(user?.total_xp || 0).toLocaleString("id-ID")}
            color="text-[#ffb347]"
            className="border-r border-[#272727]"
          />
          <StatBox
            label="Achievement"
            value={user?.total_achievements || 0}
            color="text-[#e066ff]"
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
  className = "",
}: StatBoxProps) => (
  <div
    className={`flex flex-col items-center justify-center px-2 text-center ${className}`}
  >
    <h1 className={`text-2xl sm:text-3xl font-black mb-1 ${color}`}>{value}</h1>
    <p className="text-[10px] sm:text-xxs text-muted uppercase font-bold tracking-widest sm:tracking-[0.3em]">
      {label}
    </p>
  </div>
);

export default ProfileCard;
