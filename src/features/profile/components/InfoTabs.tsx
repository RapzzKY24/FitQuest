import { Button } from "@/src/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { BadgePill } from "@/src/components/ui/badge-pill";
import React from "react";

const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    title: "Iron Will",
    rarity: "Epic",
    icon: "💎",
    color: "text-[#e066ff]",
  },
  {
    id: 2,
    title: "Intensity Master",
    rarity: "Epic",
    icon: "⚡",
    color: "text-[#e066ff]",
  },
  {
    id: 3,
    title: "Early Bird",
    rarity: "Rare",
    icon: "🌅",
    color: "text-info",
  },
];

const InfoTabs = () => {
  return (
    <section className="space-y-4 grid grid-cols-4 gap-3">
      <div className="grid col-span-3 space-y-4 ">
        <PersonalInformation />
        <PhysicalStats />
      </div>
      <div className="grid col-span-1">
        <div className="flex flex-col space-y-4">
          <GymBroInformation />
          <LeaderboardAchievement />
        </div>
      </div>
    </section>
  );
};

const PhysicalStats = () => {
  return (
    <Card className="px-4 space-y-3 w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4 uppercase tracking-[0.2em] text-muted">
          <h2 className="whitespace-nowrap">Data Tubuh</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-y-5 ">
          {/* nama lengakp dan username */}
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Berat Badan Anda" label="Berat Badan(KG)" />
            <Input placeholder="Tinggi Badan Anda" label="Tinggi Badan(CM)" />
          </div>
          <Input placeholder="Tujuan Fitnes Anda" label="Tujuan Fitnes" />
        </div>
      </CardContent>
    </Card>
  );
};

const PersonalInformation = () => {
  return (
    <Card className="px-4 space-y-3 w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4 uppercase tracking-[0.2em] text-muted">
          <h2 className="whitespace-nowrap">Informasi Pribadi</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-y-5 ">
          {/* nama lengakp dan username */}
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Nama Lengkap" label="Nama Lengkap" />
            <Input placeholder="Username" label="Username" />
          </div>
          <Input placeholder="email@example.com" label="Email" />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Usia Anda" label="Usia" />
            <Input placeholder="Pria / Wanita" label="Jenis Kelamin" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const GymBroInformation = () => {
  return (
    <Card className="px-4 space-y-3 w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4 uppercase tracking-[0.2em] text-muted">
          <h2 className="whitespace-nowrap">Gymbro</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <BadgePill color="muted">
              <span className="text-6xl p-6">💪</span>
            </BadgePill>
            <div className="flex flex-col items-center justify-center gap-y-1.5">
              <h1 className="font-extrabold text-3xl tracking-normal">
                Stage 2 — Fighter
              </h1>
              <p className="text-muted tracking-[2]">
                47 / 100 sesi untuk Stage 3
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#42a5f5] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]" />
              <span className="text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#42a5f5] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]" />
              <span className="text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#42a5f5] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]" />
              <span className="text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#42a5f5] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]" />
              <span className="text-white before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-3 before:bg-[#42a5f5] before:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,25%_100%,0_75%)]" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-y-4">
            <div className="flex justify-between items-center text-muted uppercase">
              <h1>STAGE PROGRESS</h1>
              <p>47%</p>
            </div>
            <ProgressBar value={47} max={100} />
            <Button variant="outline">LIHAT DETAIL →</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LeaderboardAchievement = () => {
  return (
    <Card className="px-4 space-y-3 w-full overflow-hidden bg-warning/10">
      <CardHeader>
        <div className="flex items-center gap-4 uppercase tracking-[0.2em] text-muted">
          <h2 className="whitespace-nowrap text-warning">
            {"//"} Top Achievement
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {ACHIEVEMENTS_DATA.map((item) => (
          <Card key={item.id} className="p-3 bg-primary/10">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex flex-col justify-center gap-y-2">
                <h1 className="text-broken-white text-md font-bold">
                  {item.title}
                </h1>
                <p className={`uppercase ${item.color}`}>{item.rarity}</p>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default InfoTabs;
