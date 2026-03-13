import {BadgePill} from "@/src/components/ui/badge-pill";
import {Button} from "@/src/components/ui/Button";
import {Card, CardContent} from "@/src/components/ui/Card";
import {ProgressBar} from "@/src/components/ui/ProgressBar";
import {Dot, X} from "lucide-react";
import React from "react";

const FeedTabs = () => {
  return (
    <section className="flex gap-4">
      <Card className="w-full flex-8">
        <CardContent className="text-xs text-muted space-y-8">
          {/* Card Header */}
          <div className="flex items-center gap-3">
            <p className="uppercase tracking-[0.3em] text-nowrap">FEED TEMAN</p>
            <div className="h-px w-full bg-white/10" />
          </div>

          {/* Activities */}
          <section className="space-y-3">
            <div className="flex gap-4 w-full">
              {/* avatar */}
              <div>
                <BadgePill color="muted">
                  <span className="text-xl">🤖</span>
                </BadgePill>
              </div>

              {/* Activity Information */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2">
                  {/* Username */}
                  <span className="text-primary font-black">
                    Warrior Adi
                  </span>{" "}
                  {/* Activity */}
                  <p>Baru saja log workout</p>
                </div>

                {/* Block Section */}
                <div
                  className="flex justify-between items-center bg-elevated p-2"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🤸</span>
                    <div>
                      <p className="text-broken-white text-sm">
                        Gym - Chest Day
                      </p>
                      <div className="flex items-center">
                        <span>Intense</span> <Dot size={12} />{" "}
                        <span>75 Menit</span> <Dot size={12} />
                        <span className="text-primary">+120 XP</span>
                      </div>
                    </div>
                  </div>
                  <BadgePill>🔥 INTENSE</BadgePill>
                </div>

                {/* User Reaction */}
                <div className="flex gap-2">
                  <BadgePill>💪🏻 12</BadgePill>
                  <BadgePill color="muted">🔥 8</BadgePill>
                  <BadgePill color="muted">⚡️ 3</BadgePill>
                </div>

                {/* Update Time */}
                <p>2 menit yang lalu</p>
              </div>
            </div>
            <div className="h-px w-full bg-white/10" />
          </section>

          <section className="space-y-3">
            <div className="flex gap-4 w-full">
              {/* avatar */}
              <div>
                <BadgePill color="muted">
                  <span className="text-xl">🌊</span>
                </BadgePill>
              </div>

              {/* Activity Information */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2">
                  {/* Username */}
                  <span className="text-primary font-black">
                    Fitri Sari
                  </span>{" "}
                  {/* Activity */}
                  <p>membuka achievement baru!</p>
                </div>

                {/* Block Section */}
                <div
                  className="flex justify-between items-center bg-purple-500/10 border border-purple-500/20 p-2"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">💎</span>
                    <div>
                      <p className="text-broken-white text-sm">Iron Will</p>
                      <div className="flex items-center text-purple-500/80">
                        <span>Epic</span> <Dot size={12} />{" "}
                        <span>Streak 7 hari</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Reaction */}
                <div className="flex gap-2">
                  <BadgePill color="muted">💪🏻 12</BadgePill>
                  <BadgePill>🔥 8</BadgePill>
                  <BadgePill color="muted">⚡️ 3</BadgePill>
                </div>

                {/* Update Time */}
                <p>11 menit yang lalu</p>
              </div>
            </div>
            <div className="h-px w-full bg-white/10" />
          </section>

          <section className="space-y-3">
            <div className="flex gap-4 w-full">
              {/* avatar */}
              <div>
                <BadgePill color="muted">
                  <span className="text-xl">🎃</span>
                </BadgePill>
              </div>

              {/* Activity Information */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2">
                  {/* Username */}
                  <span className="text-primary font-black">
                    Runner Dewa
                  </span>{" "}
                  {/* Activity */}
                  <p>naik level!</p>
                </div>

                {/* Block Section */}
                <div
                  className="flex justify-between items-center bg-primary/10 border border-primary/20 p-2"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">⚡️</span>
                    <div>
                      <p className="text-broken-white text-sm">
                        Level 10 - Steel Lord
                      </p>
                      <div className="flex items-center text-primary/80">
                        <span>Level up 🔥</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Reaction */}
                <div className="flex gap-2">
                  <BadgePill color="muted">💪🏻 12</BadgePill>
                  <BadgePill color="muted">🔥 8</BadgePill>
                  <BadgePill>⚡️ 3</BadgePill>
                </div>

                {/* Update Time */}
                <p>23 menit yang lalu</p>
              </div>
            </div>
            <div className="h-px w-full bg-white/10" />
          </section>

          <section className="space-y-3">
            <div className="flex gap-4 w-full">
              {/* avatar */}
              <div>
                <BadgePill color="muted">
                  <span className="text-xl">👑</span>
                </BadgePill>
              </div>

              {/* Activity Information */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2">
                  {/* Username */}
                  <span className="text-primary font-black">
                    King Yoga
                  </span>{" "}
                  {/* Activity */}
                  <p>menyelesaikan quest</p>
                </div>

                {/* Block Section */}
                <div
                  className="flex justify-between items-center bg-success/10 border border-success/20 p-2"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-broken-white text-sm">
                        30 Menit Non-Stop
                      </p>
                      <div className="flex items-center text-success/80">
                        <span>+150 XP Diklaim!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Reaction */}
                <div className="flex gap-2">
                  <BadgePill color="muted">💪🏻 12</BadgePill>
                  <BadgePill color="muted">🔥 8</BadgePill>
                  <BadgePill>⚡️ 3</BadgePill>
                </div>

                {/* Update Time */}
                <p>23 menit yang lalu</p>
              </div>
            </div>
            <div className="h-px w-full bg-white/10" />
          </section>
        </CardContent>
      </Card>

      <section className="flex-2 space-y-4">
        <Card className="w-full border-primary/30 bg-primary/5">
          <CardContent className="text-muted text-xs space-y-4">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap text-primary font-black">
                {"//"} POSISIKU
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Card Body */}

            {/* avatar */}
            <section className="flex gap-3">
              <div>
                <BadgePill>
                  <span className="text-xl">💪🏻</span>
                </BadgePill>
              </div>
              <div>
                <p className="text-broken-white font-black">Budi Warrior</p>
                <p className="flex items-center gap-1">
                  budiwarrior <Dot size={10} /> LV. 7
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
                <p className="text-xl text-primary font-black">#7</p>
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
            <section>
              <div className="flex items-center justify-between mb-2">
                <p className="flex items-center gap-4">XP MENGEJAR #6</p>
                <p>400 / 700</p>
              </div>
              <ProgressBar
                value={400}
                max={700}
                variant="orange"
                type="linear"
              />
            </section>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="text-muted text-xs space-y-4">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                {"//"} ONLINE SEKARANG
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Users List*/}
            <section className="flex justify-between items-center">
              <div className="flex gap-3">
                {/* avatar */}
                <div>
                  <BadgePill color="muted">
                    <span className="text-base">🤖</span>
                  </BadgePill>
                </div>
                {/* User Info */}
                <div>
                  <p className="text-broken-white font-black">Ardi Epic</p>
                  <p className="flex items-center gap-1 text-success font-black">
                    <span className="p-1 rounded-full bg-success" /> Online
                  </p>
                </div>
              </div>
              <Button variant="outline" size="xs" className="p-0">
                <X size={10} />
              </Button>
            </section>

            <section className="flex justify-between items-center">
              <div className="flex gap-3">
                {/* avatar */}
                <div>
                  <BadgePill color="muted">
                    <span className="text-base">🌊</span>
                  </BadgePill>
                </div>
                {/* User Info */}
                <div>
                  <p className="text-broken-white font-black">Fit Sari</p>
                  <p className="flex items-center gap-1 text-success font-black">
                    <span className="p-1 rounded-full bg-success" /> Online
                  </p>
                </div>
              </div>
              <Button variant="outline" size="xs" className="p-0">
                <X size={10} />
              </Button>
            </section>

            <section className="flex justify-between items-center">
              <div className="flex gap-3">
                {/* avatar */}
                <div>
                  <BadgePill color="muted">
                    <span className="text-base">👑</span>
                  </BadgePill>
                </div>
                {/* User Info */}
                <div>
                  <p className="text-muted font-black">Yoga King</p>
                  <p className="flex items-center gap-1 text-muted font-black">
                    <span className="p-1 rounded-full bg-muted" /> Offline
                  </p>
                </div>
              </div>
              <Button variant="outline" size="xs" className="p-0">
                <X size={10} />
              </Button>
            </section>
          </CardContent>
        </Card>
      </section>
    </section>
  );
};

export default FeedTabs;
