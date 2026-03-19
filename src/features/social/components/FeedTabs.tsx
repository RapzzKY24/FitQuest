"use client";
import {BadgePill} from "@/src/components/ui/badge-pill";
import {Card, CardContent} from "@/src/components/ui/Card";
import {ProgressBar} from "@/src/components/ui/ProgressBar";
import {Dot} from "lucide-react";
import React from "react";

import {toggleReaction} from "@/src/features/social/actions/friendship"; // Sesuaikan path
import {
  ActivityFeedRecord,
  FriendshipRecord,
  WeeklyLeaderboardRecord,
} from "../types/social.types";

interface FeedTabsProps {
  feedData: ActivityFeedRecord[];
  leaderboardData: WeeklyLeaderboardRecord[];
  friends: FriendshipRecord[];
  currentUserId: string;
}

// Fungsi pembantu buat ngitung "X menit yang lalu"
const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);

  if (diffInMinutes < 1) return "Baru saja";
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
  if (diffInMinutes < 1440)
    return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
  return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`;
};

// Fungsi pembantu buat styling UI berdasarkan tipe aktivitas
const getActivityConfig = (type: string) => {
  switch (type) {
    case "workout":
      return {
        actionText: "Baru saja log workout",
        icon: "🤸",
        bg: "bg-elevated",
        border: "",
        badgeColor: "default",
      };
    case "badge":
      return {
        actionText: "membuka achievement baru!",
        icon: "💎",
        bg: "bg-purple-500/10",
        border: "border border-purple-500/20",
        badgeColor: "default",
      };
    case "level_up":
      return {
        actionText: "naik level!",
        icon: "⚡️",
        bg: "bg-primary/10",
        border: "border border-primary/20",
        badgeColor: "default",
      };
    case "quest":
      return {
        actionText: "menyelesaikan quest",
        icon: "🎯",
        bg: "bg-success/10",
        border: "border border-success/20",
        badgeColor: "default",
      };
    default:
      return {
        actionText: "melakukan aktivitas",
        icon: "📌",
        bg: "bg-elevated",
        border: "",
        badgeColor: "default",
      };
  }
};

const FeedTabs = ({
  feedData,
  leaderboardData,
  friends,
  currentUserId,
}: FeedTabsProps) => {
  // Data buat panel "POSISIKU" di kanan
  const myData = leaderboardData.find((u) => u.user_id === currentUserId);
  const myRank = myData?.rank || 0;
  const userAbove = leaderboardData.find((u) => u.rank === myRank - 1);
  const xpToCatchUp =
    userAbove && myData
      ? (userAbove.weekly_xp || 0) - (myData.weekly_xp || 0)
      : 0;

  // Fungsi Action React
  const handleReact = async (feedId: string, emoji: string) => {
    const res = await toggleReaction(feedId, emoji);
    if (!res.success) console.error(res.error);
  };

  return (
    <section className="flex gap-4">
      {/* KIRI: ACTIVITY FEED LIST */}
      <Card className="w-full flex-8">
        <CardContent className="text-xs text-muted space-y-8">
          <div className="flex items-center gap-3">
            <p className="uppercase tracking-[0.3em] text-nowrap">FEED TEMAN</p>
            <div className="h-px w-full bg-white/10" />
          </div>

          {feedData.length === 0 && (
            <p className="text-center italic py-10">
              Belum ada aktivitas dari temanmu.
            </p>
          )}

          {feedData.map((feed) => {
            const config = getActivityConfig(feed.activity_type);

            return (
              <section key={feed.feed_id} className="space-y-3">
                <div className="flex gap-4 w-full">
                  {/* Avatar */}
                  <div>
                    <BadgePill color="muted">
                      <span className="text-xl">
                        {feed.actor_avatar || "👤"}
                      </span>
                    </BadgePill>
                  </div>

                  {/* Activity Info */}
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-black">
                        {feed.actor_username}
                      </span>
                      <p>{config.actionText}</p>
                    </div>

                    {/* Block Section Content */}
                    <div
                      className={`flex justify-between items-center p-2 ${config.bg} ${config.border}`}
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                      }}>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{config.icon}</span>
                        <div>
                          <p className="text-broken-white text-sm">
                            {feed.title}
                          </p>
                          <div className="flex items-center flex-wrap gap-1">
                            {feed.description && (
                              <span>{feed.description}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Reactions */}
                    <div className="flex gap-2">
                      {/* Tombol React 🔥 */}
                      <button
                        onClick={() => handleReact(feed.feed_id, "🔥")}
                        className="hover:scale-105 transition-transform">
                        <BadgePill color={"primary"}>
                          🔥 {feed.reaction_counts?.["🔥"] || 0}
                        </BadgePill>
                      </button>

                      {/* Tombol React 💪🏻 */}
                      <button
                        onClick={() => handleReact(feed.feed_id, "💪🏻")}
                        className="hover:scale-105 transition-transform">
                        <BadgePill color={"accent"}>
                          💪🏻 {feed.reaction_counts?.["💪🏻"] || 0}
                        </BadgePill>
                      </button>

                      {/* Tombol React ⚡️ */}
                      <button
                        onClick={() => handleReact(feed.feed_id, "⚡️")}
                        className="hover:scale-105 transition-transform">
                        <BadgePill color={"info"}>
                          ⚡️ {feed.reaction_counts?.["⚡️"] || 0}
                        </BadgePill>
                      </button>
                    </div>

                    {/* Waktu */}
                    <p>{timeAgo(feed.created_at)}</p>
                  </div>
                </div>
                <div className="h-px w-full bg-white/10" />
              </section>
            );
          })}
        </CardContent>
      </Card>

      {/* KANAN: STATISTIK & ONLINE */}
      <section className="flex-2 space-y-4">
        {/* POSISIKU (Pake data asli dari Leaderboard) */}
        <Card className="w-full border-primary/30 bg-primary/5">
          <CardContent className="text-muted text-xs space-y-4">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap text-primary font-black">
                {"//"} POSISIKU
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            <section className="flex gap-3">
              <div>
                <BadgePill>
                  <span className="text-xl">
                    {myData?.avatar_emoji || "👤"}
                  </span>
                </BadgePill>
              </div>
              <div>
                <p className="text-broken-white font-black">
                  {myData?.display_name || myData?.username}
                </p>
                <p className="flex items-center gap-1">
                  {myData?.username} <Dot size={10} /> LV. {myData?.level || 1}
                </p>
              </div>
            </section>

            <section className="flex gap-3 items-center">
              <div
                className="flex flex-col w-full text-nowrap text-center bg-elevated py-2 px-4"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}>
                <p className="text-xl text-primary font-black">
                  #{myRank > 0 ? myRank : "-"}
                </p>
                <p>Rank Global</p>
              </div>
              <div
                className="flex flex-col w-full text-nowrap text-center bg-elevated py-2 px-4"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}>
                <p className="text-xl text-accent font-black">
                  {friends.length}
                </p>
                <p>Jumlah Teman</p>
              </div>
            </section>

            {myRank > 1 && userAbove && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <p className="flex items-center gap-4">
                    XP MENGEJAR #{userAbove.rank}
                  </p>
                  <p>{xpToCatchUp} XP</p>
                </div>
                <ProgressBar
                  value={myData?.weekly_xp || 0}
                  max={userAbove.weekly_xp || 100}
                  variant="orange"
                  type="linear"
                />
              </section>
            )}
          </CardContent>
        </Card>

        {/* ONLINE SEKARANG (Daftar Teman) */}
        <Card className="w-full">
          <CardContent className="text-muted text-xs space-y-4">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                {"//"} TEMANMU
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            {friends.length === 0 && (
              <p className="italic text-center py-2">Belum ada teman.</p>
            )}

            {/* Render 5 teman pertama aja biar sidebar ga kepanjangan */}
            {friends.slice(0, 5).map((friend) => {
              const isRequester = friend.requester_id === currentUserId;
              const friendAvatar = isRequester
                ? friend.add_avatar
                : friend.req_avatar;
              const friendUsername = isRequester
                ? friend.add_username
                : friend.req_username;

              return (
                <section
                  key={friend.id}
                  className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <div>
                      <BadgePill color="muted">
                        <span className="text-base">
                          {friendAvatar || "👤"}
                        </span>
                      </BadgePill>
                    </div>
                    <div>
                      <p className="text-broken-white font-black">
                        {friendUsername}
                      </p>
                    </div>
                  </div>
                </section>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </section>
  );
};

export default FeedTabs;
