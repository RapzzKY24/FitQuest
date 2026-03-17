import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/Card";
import { createClient } from "@/src/utils/supabase/server";
import { DashboardService } from "../services/dashboard.service";

const LeaderboardWidget = async () => {
  const supabase = await createClient();

  // 1. Cek User Saat Ini
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. Tarik Top 3 Leaderboard
  const { topUsers, currentUserData } = await DashboardService.leaderboard(
    supabase,
    user.id,
  );

  // 4. Format Data buat Top 3
  const topLeaderboard =
    topUsers?.map((u) => ({
      rank: u.rank,
      // Kasih tanda "(You)" kalau kebetulan user masuk Top 3
      name: u.user_id === user.id ? `${u.username} (You)` : u.username,
      icon: u.avatar_emoji || "😤",
      // Format angka ribuan (14200 -> 14.200)
      xp: `${(u.weekly_xp || 0).toLocaleString("id-ID")} XP`,
    })) || [];

  // 5. Format Data buat User Saat Ini ("Posisimu")
  const currentUserRank = {
    rank: currentUserData?.rank || "-", // Kalau rank belum ada, kasih strip
    name: `${currentUserData?.username || "Kamu"} (You)`,
    icon: currentUserData?.avatar_emoji || "💪",
    xp: `${(currentUserData?.weekly_xp || 0).toLocaleString("id-ID")} XP`,
  };

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Leaderboard
          </span>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <Link
            href="/social"
            className="text-muted tracking-[0.2em] text-[11px] font-semibold uppercase hover:text-broken-white transition-colors"
          >
            Full &rarr;
          </Link>
        </div>

        {/* --- TOP 3 LIST --- */}
        <div className="flex flex-col">
          {topLeaderboard.map((u, index) => (
            <div
              key={u.rank}
              className={`py-4 flex items-center justify-between ${
                index !== topLeaderboard.length - 1
                  ? "border-b border-border/60"
                  : "pb-6"
              }`}
            >
              <div className="flex items-center gap-5">
                {/* Angka Rank */}
                <span className="text-primary font-black text-lg w-4 text-center">
                  {u.rank}
                </span>

                {/* Icon Box */}
                <div
                  className="w-10 h-10 flex items-center justify-center bg-elevated/50 border border-border text-xl shadow-inner"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  {u.icon}
                </div>

                {/* Nama */}
                <h3 className="text-broken-white font-bold text-[15px] tracking-wide truncate max-w-[120px] sm:max-w-[200px]">
                  {u.name}
                </h3>
              </div>

              {/* XP */}
              <span className="text-muted font-mono text-[11px] tracking-widest font-semibold uppercase">
                {u.xp}
              </span>
            </div>
          ))}

          {/* Fallback kalau belum ada data yang masuk DB sama sekali */}
          {topLeaderboard.length === 0 && (
            <p className="text-muted text-sm text-center py-4">
              Belum ada data minggu ini. Jadilah yang pertama!
            </p>
          )}
        </div>

        {/* --- DIVIDER POSISIMU --- */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-primary font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
            Posisimu
          </span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* --- HIGHLIGHT CURRENT USER --- */}
        <div
          className="mt-4 p-4 flex items-center justify-between bg-primary/5 border border-primary/20"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
          }}
        >
          <div className="flex items-center gap-2.5">
            {/* Angka Rank */}
            <span className="text-primary font-black text-lg w-4 text-center">
              {currentUserRank.rank}
            </span>

            {/* Icon Box (Border Primary) */}
            <div
              className="w-10 h-10 flex items-center  justify-center bg-elevated/50 border border-primary text-xl shadow-inner"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              {currentUserRank.icon}
            </div>

            {/* Nama (Text Primary) */}
            <h3 className="text-primary font-bold text-[12px] max-w-[120px] sm:max-w-[180px]">
              {currentUserRank.name}
            </h3>
          </div>

          {/* XP (Text Primary) */}
          <span className="text-primary font-mono text-[12px]  font-semibold uppercase">
            {currentUserRank.xp}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardWidget;
