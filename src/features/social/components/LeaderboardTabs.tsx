import {BadgePill} from "@/src/components/ui/badge-pill";
import {Card, CardContent} from "@/src/components/ui/Card";
import {ProgressBar} from "@/src/components/ui/ProgressBar";
import {ArrowUp, Dot} from "lucide-react";
import React from "react";

export const leaderboardUsers = [
  {
    rank: 4,
    name: "Iron Mike",
    avatar: "🎃",
    level: 8,
    sessions: 22,
    xp: 12670,
    xpGain: 250,
  },
  {
    rank: 5,
    name: "Sarah Connor",
    avatar: "🚀",
    level: 7,
    sessions: 18,
    xp: 11840,
    xpGain: 180,
  },
  {
    rank: 6,
    name: "John Wick",
    avatar: "🐶",
    level: 7,
    sessions: 16,
    xp: 11220,
    xpGain: 140,
  },
  {
    rank: 7,
    name: "Tony Stark",
    avatar: "🤖",
    level: 6,
    sessions: 14,
    xp: 10450,
    xpGain: 120,
  },
  {
    rank: 8,
    name: "Lara Croft",
    avatar: "🏹",
    level: 6,
    sessions: 13,
    xp: 9980,
    xpGain: 95,
  },
];

const LeaderboardTabs = () => {
  return (
    <section className="flex gap-4">
      <section className="flex-8">
        <Card>
          <CardContent className="text-xs text-muted">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                GLOBAL RANKING
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Podium */}

            <section className="flex items-end gap-4 pt-24 pb-6">
              <div className="w-full text-center space-y-4">
                <BadgePill color="accent">
                  <span className="text-4xl">🎃</span>
                </BadgePill>
                <div>
                  <p className="text-broken-white text-sm font-black">
                    Warrior Adi
                  </p>
                  <p className="text-accent">13.450 XP</p>
                </div>
                <div
                  className="text-center p-6 bg-accent/10 border border-accent/30"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <p className="text-accent font-black text-2xl">1</p>
                </div>
              </div>
              <div className="order-first w-full text-center space-y-4">
                <BadgePill color="blue">
                  <span className="text-4xl">🌊</span>
                </BadgePill>
                <div>
                  <p className="text-broken-white text-sm font-black">
                    FitriSari
                  </p>
                  <p className="text-info">14.450 XP</p>
                </div>
                <div
                  className="text-center p-3 bg-info/10 border border-info/30"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <p className="text-info font-black text-xl">2</p>
                </div>
              </div>
              <div className="order-last w-full text-center space-y-4">
                <BadgePill color="primary">
                  <span className="text-4xl">👾</span>
                </BadgePill>
                <div>
                  <p className="text-broken-white text-sm font-black">
                    Runner Dewa
                  </p>
                  <p className="text-secondary">12.950 XP</p>
                </div>
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

            {/* non-podium */}
            <section className="space-y-4 pt-6">
              {leaderboardUsers?.map((data) => (
                <React.Fragment key={data.name}>
                  {data?.name == "John Wick" ? (
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
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4">
                          <span>{data?.rank}</span>

                          <BadgePill color="primary">
                            <span className="text-xl">{data?.avatar}</span>
                          </BadgePill>

                          <div>
                            <p className="font-black text-sm">
                              {data?.name} (Kamu)
                            </p>
                            <div className="flex items-center gap-1 ">
                              <span>LV. {data.level}</span>
                              <Dot size={10} />
                              <span>{data?.sessions} Sesi</span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="text-right">
                          <p className="text-primary font-black mb-1">
                            {data?.xp} XP
                          </p>
                          <span className="flex items-center justify-end gap-1 text-success">
                            <ArrowUp size={10} /> +{data?.xpGain}
                          </span>
                        </div>
                      </section>
                    </>
                  ) : (
                    <>
                      <section className="flex items-center justify-between p-2">
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4">
                          <span>{data?.rank}</span>

                          <BadgePill color="muted">
                            <span className="text-xl">{data?.avatar}</span>
                          </BadgePill>

                          <div>
                            <p className="text-broken-white font-black text-sm">
                              {data?.name}
                            </p>
                            <div className="flex items-center gap-1">
                              <span>LV.{data.level}</span>
                              <Dot size={10} />
                              <span>{data?.sessions} Sesi</span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="text-right">
                          <p className="text-broken-white font-black mb-1">
                            {data?.xp} XP
                          </p>
                          <span className="flex items-center justify-end gap-1 text-success">
                            <ArrowUp size={10} /> +{data?.xpGain}
                          </span>
                        </div>
                      </section>
                    </>
                  )}
                </React.Fragment>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
      <section className="flex-2 space-y-4">
        <Card className="w-full">
          <CardContent className="text-muted text-xs space-y-4">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                {"//"} STATISTIKKU
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Card Body */}

            <section
              className="bg-primary/10 border border-primary/30 p-4 flex gap-2 flex-col items-center"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}>
              <span className="text-primary text-3xl font-black">#6</span>
              <span>RANK GLOBAL</span>
            </section>

            <section>
              <div className="flex items-center justify-between mb-2">
                <p className="flex items-center gap-4">KEJAR #5</p>
                <p>45 XP</p>
              </div>
              <ProgressBar
                value={400}
                max={700}
                variant="orange"
                type="linear"
              />
            </section>

            <section className="flex gap-3 items-center">
              <div
                className="flex flex-col w-full text-nowrap text-center bg-elevated py-2 px-4"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}>
                <p className="text-xl text-success font-black">#6</p>
                <p>Rank Global</p>
              </div>
              <div
                className="flex flex-col w-full text-nowrap text-center bg-elevated py-2 px-4"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}>
                <p className="text-xl text-accent font-black">12</p>
                <p>Jumlah Teman</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </section>
    </section>
  );
};

export default LeaderboardTabs;
