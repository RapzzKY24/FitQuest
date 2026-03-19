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

export interface UserProfileData {
  name: string;
  username: string;
  avatar: string;
  created_at: string;
  level: number;
  title: string;
  xp: number;
  xpMax: number;
  streak: number;
  total_sessions: number;
  total_minutes: number;
  total_xp: number;
  total_achievements: number;
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
      <CardContent className="p-8">
        {/* TOP SECTION */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-[#141414] border-2 border-[#272727] rounded-sm flex items-center justify-center text-6xl shadow-inner font-black text-white/50 uppercase">
                {user?.avatar}
              </div>
            </div>

            <div className="flex flex-col gap-y-6 min-w-[400px]">
              <div className="flex items-center gap-4">
                <h1 className="font-black text-4xl uppercase tracking-tighter">
                  {user?.name}
                </h1>
                <BadgePill className="bg-[#1c1c1c] border border-[#272727] px-3 py-1 rounded-sm flex items-center gap-3">
                  <span className="font-bold text-sm">LV.{user?.level}</span>
                  <span className="w-px h-3 bg-[#555]"></span>
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {user?.title}
                  </span>
                </BadgePill>
              </div>

              <div className="flex items-center gap-3 text-muted text-sm font-medium tracking-[0.2em] uppercase">
                <span className="hover:text-broken-white transition-colors">
                  @
                  {user?.username ||
                    user?.name?.toLowerCase().replace(/\s/g, "")}
                </span>
                <span className="text-muted/40">•</span>
                <span>Bergabung {joinDate}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <h2 className="uppercase text-muted text-xxs font-bold tracking-[0.3em]">
                    Xp ke level {(user?.level || 0) + 1}
                  </h2>
                  <p className="text-sm font-bold">
                    {currentXp} <span className="text-muted">/ {targetXp}</span>
                  </p>
                </div>

                <ProgressBar
                  value={currentXp}
                  max={targetXp}
                  className="h-2 bg-[#1c1c1c]"
                />

                <p className="uppercase text-[#555] text-[10px] font-bold tracking-[0.2em]">
                  {xpRemaining > 0
                    ? `${xpRemaining} XP lagi untuk naik level`
                    : "Siap Level Up!"}
                </p>
              </div>
            </div>
          </div>

          <StreakBadgePill streak={user?.streak || 0} />
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-4 border-t border-[#272727] pt-8">
          <StatBox label="Total Sesi" value={user?.total_sessions || 0} />
          <StatBox
            label="Total Menit"
            value={(user?.total_minutes || 0).toLocaleString("id-ID")}
            color="text-[#3b82f6]"
          />
          <StatBox
            label="Total XP"
            value={(user?.total_xp || 0).toLocaleString("id-ID")}
            color="text-[#ffb347]"
          />
          <StatBox
            label="Achievement"
            value={user?.total_achievements || 0}
            color="text-[#e066ff]"
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
