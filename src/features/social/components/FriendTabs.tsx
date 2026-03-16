import {BadgePill} from "@/src/components/ui/badge-pill";
import {Button} from "@/src/components/ui/Button";
import {Card, CardContent} from "@/src/components/ui/Card";
import {Input} from "@/src/components/ui/Input";
import {Check, Dot, X} from "lucide-react";
import React from "react";

const friendRequestList = [
  {
    name: "Iron Mike",
    avatar: "🎃",
    level: 8,
    sessions: 22,
    xp: 12670,
  },
  {
    name: "Sarah Connor",
    avatar: "🚀",
    level: 7,
    sessions: 18,
    xp: 11840,
  },
];

const friendList = [
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

const FriendTabs = () => {
  return (
    <section>
      <section className="space-y-4">
        <Card>
          <CardContent className="text-muted text-xs p-24">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                Cari Teman
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>
            {/* Input Search */}
            <div className="py-4">
              <Input prefixNode="🔍" placeholder="Cari username atau nama..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-muted text-xs">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                Permintaan Teman
              </p>
              <span className="text-primary">(2)</span>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Friend Requests List */}
            {friendRequestList?.map((data) => (
              <React.Fragment key={data.name}>
                <section className="flex items-center justify-between p-4">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4">
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
                  <div className="text-right space-x-4">
                    <Button
                      size="xs"
                      icon={<Check size={12} />}
                      variant="success">
                      TERIMA
                    </Button>
                    <Button
                      size="xs"
                      icon={<X size={12} />}
                      variant="danger"></Button>
                  </div>
                </section>
                <div className="h-px w-full bg-white/10" />
              </React.Fragment>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-muted text-xs">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                Temanku
              </p>
              <span className="text-primary">(12)</span>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Friend Requests List */}
            {friendList?.map((data, index) => (
              <React.Fragment key={data.name}>
                <section className="flex items-center justify-between p-2">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <BadgePill color="muted">
                        <span className="text-xl">{data?.avatar}</span>
                      </BadgePill>
                      {index % 2 == 0 ? (
                        <div className="p-1 bg-success rounded-full absolute right-0 bottom-0" />
                      ) : (
                        <div className="p-1 bg-muted rounded-full absolute right-0 bottom-0" />
                      )}
                    </div>

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
                    <p className="text-accent font-black mb-1">{data?.xp} XP</p>
                  </div>
                </section>
                <div className="h-px w-full bg-white/10" />
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      </section>
    </section>
  );
};

export default FriendTabs;
