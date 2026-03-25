"use client";
import {BadgePill} from "@/src/components/ui/badge-pill";
import {Card, CardContent} from "@/src/components/ui/Card";
import {ProgressBar} from "@/src/components/ui/ProgressBar";
import {Dot} from "lucide-react";
import React from "react";
import {WeeklyLeaderboardRecord} from "../types/social.types";

interface LeaderboardTabsProps {
  leaderboardData: WeeklyLeaderboardRecord[];
  currentUserId: string;
  // Opsional: Kalau lu mau jumlah teman di kanan bawah dinamis, oper dari SocialPages
  // friendsCount?: number;
}

const LeaderboardTabs = ({
  leaderboardData,
  currentUserId,
}: LeaderboardTabsProps) => {
  // 1. Ekstrak Podium (Top 3)
  const rank1 = leaderboardData[0];
  const rank2 = leaderboardData[1];
  const rank3 = leaderboardData[2];

  // 2. Ekstrak Sisanya (Rank 4 ke bawah)
  const nonPodium = leaderboardData.slice(3);

  // 3. Ekstrak Data User Saat Ini (Buat panel "Statistikku" di kanan)
  const myData = leaderboardData.find((u) => u.user_id === currentUserId);
  const myRank = myData?.rank || 0;

  // 4. Logika "Kejar Rank Atas"
  const userAbove = leaderboardData.find((u) => u.rank === myRank - 1);
  const xpToCatchUp =
    userAbove && myData
      ? (userAbove.weekly_xp || 0) - (myData.weekly_xp || 0)
      : 0;

  return (
    <section className="flex flex-col-reverse lg:flex-row gap-4">
      {/* KIRI: DAFTAR LEADERBOARD */}
      <section className="flex-[8]">
        <Card>
          <CardContent className="text-xs text-muted">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                GLOBAL RANKING
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* PODIUM SECTION */}
            <section className="flex items-end gap-4 pt-24 pb-6">
              {/* JUARA 1 (Tengah) */}
              <div className="w-full text-center space-y-4">
                {rank1 ? (
                  <>
                    <BadgePill color="accent">
                      <span className="text-4xl">
                        {rank1.avatar_emoji || "🏆"}
                      </span>
                    </BadgePill>
                    <div>
                      <p className="text-broken-white text-sm font-black">
                        {rank1.display_name || rank1.username}
                      </p>
                      <p className="text-accent">{rank1.weekly_xp || 0} XP</p>
                    </div>
                  </>
                ) : (
                  <div className="h-[100px]" /> /* Placeholder kosong */
                )}
                <div
                  className="text-center p-6 bg-accent/10 border border-accent/30"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <p className="text-accent font-black text-2xl">1</p>
                </div>
              </div>

              {/* JUARA 2 (Kiri) */}
              <div className="order-first w-full text-center space-y-4">
                {rank2 ? (
                  <>
                    <BadgePill color="blue">
                      <span className="text-4xl">
                        {rank2.avatar_emoji || "🥈"}
                      </span>
                    </BadgePill>
                    <div>
                      <p className="text-broken-white text-sm font-black">
                        {rank2.display_name || rank2.username}
                      </p>
                      <p className="text-info">{rank2.weekly_xp || 0} XP</p>
                    </div>
                  </>
                ) : (
                  <div className="h-[70px]" />
                )}
                <div
                  className="text-center p-3 bg-info/10 border border-info/30"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <p className="text-info font-black text-xl">2</p>
                </div>
              </div>

              {/* JUARA 3 (Kanan) */}
              <div className="order-last w-full text-center space-y-4">
                {rank3 ? (
                  <>
                    <BadgePill color="primary">
                      <span className="text-4xl">
                        {rank3.avatar_emoji || "🥉"}
                      </span>
                    </BadgePill>
                    <div>
                      <p className="text-broken-white text-sm font-black">
                        {rank3.display_name || rank3.username}
                      </p>
                      <p className="text-secondary">
                        {rank3.weekly_xp || 0} XP
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="h-[60px]" />
                )}
                <div
                  className="text-center p-1 bg-secondary/10 border border-secondary/30"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <p className="text-secondary font-black text-lg">3</p>
                </div>
              </div>
            </section>
            <div className="h-px w-full bg-white/10" />

            {/* NON-PODIUM (RANK 4 DST) */}
            <section className="space-y-4 pt-6">
              {nonPodium.map((data) => (
                <React.Fragment key={data.user_id}>
                  {data.user_id === currentUserId ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="h-px w-full bg-primary/30" />
                        <p className="uppercase tracking-[0.3em] text-nowrap font-black text-primary">
                          POSISIMU
                        </p>
                        <div className="h-px w-full bg-primary/30" />
                      </div>
                      <section
                        className="flex items-center justify-between p-2 bg-primary/10 border border-primary/30 text-primary"
                        style={{
                          clipPath:
                            "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                        }}>
                        <div className="flex items-center gap-4">
                          <span className="font-bold w-4">{data.rank}</span>
                          <BadgePill color="primary">
                            <span className="text-xl">
                              {data.avatar_emoji || "👤"}
                            </span>
                          </BadgePill>
                          <div>
                            <p className="font-black text-sm">
                              {data.display_name || data.username} (Kamu)
                            </p>
                            <div className="flex items-center gap-1 ">
                              <span>LV. {data.level || 1}</span>
                              <Dot size={10} />
                              <span>{data.streak_current || 0} Streak</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right pr-2">
                          <p className="text-primary font-black mb-1">
                            {data.weekly_xp || 0} XP
                          </p>
                        </div>
                      </section>
                    </>
                  ) : (
                    <section className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-4">
                        <span className="w-4 text-center">{data.rank}</span>
                        <BadgePill color="muted">
                          <span className="text-xl">
                            {data.avatar_emoji || "👤"}
                          </span>
                        </BadgePill>
                        <div>
                          <p className="text-broken-white font-black text-sm">
                            {data.display_name || data.username}
                          </p>
                          <div className="flex items-center gap-1">
                            <span>LV. {data.level || 1}</span>
                            <Dot size={10} />
                            <span>{data.streak_current || 0} Streak</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right pr-2">
                        <p className="text-broken-white font-black mb-1 text-nowrap">
                          {data.weekly_xp || 0} XP
                        </p>
                      </div>
                    </section>
                  )}
                </React.Fragment>
              ))}

              {/* Kalau data kosong */}
              {nonPodium.length === 0 && (
                <p className="text-center text-muted-foreground italic">
                  Belum ada data ranking mingguan.
                </p>
              )}
            </section>
          </CardContent>
        </Card>
      </section>

      {/* KANAN: STATISTIKKU */}
      <section className="flex-2 space-y-4">
        <Card className="w-full">
          <CardContent className="text-muted text-xs space-y-4">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                {"//"} STATISTIKKU
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Rank Global Kamu */}
            <section
              className="bg-primary/10 border border-primary/30 p-4 flex gap-2 flex-col items-center"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}>
              <span className="text-primary text-3xl font-black">
                #{myRank > 0 ? myRank : "-"}
              </span>
              <span>RANK GLOBAL</span>
            </section>

            {/* Kejar XP Orang di Atas Lu */}
            {myRank > 1 && userAbove && (
              <section className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="flex items-center gap-4">
                    KEJAR #{userAbove.rank}
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
      </section>
    </section>
  );
};

export default LeaderboardTabs;
