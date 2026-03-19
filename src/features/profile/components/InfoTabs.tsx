import { Button } from "@/src/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { BadgePill } from "@/src/components/ui/badge-pill";
import React from "react";
import { Achievement } from "../../achievement/components/AchievementCard";

interface InfoTabProps {
  achievements: Achievement[];
}
const InfoTabs = ({ achievements }: InfoTabProps) => {
  return (
    <section className="space-y-4 grid grid-cols-4 gap-3">
      <div className="grid col-span-3 space-y-4 ">
        <PersonalInformation />
        <PhysicalStats />
      </div>
      <div className="grid col-span-1">
        <div className="flex flex-col space-y-4">
          <GymBroInformation />
          <LeaderboardAchievement achievements={achievements} />
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

interface LeaderboardAchievementProps {
  achievements: Achievement[];
}

const rarityColorMap: Record<string, string> = {
  legendary: "text-primary drop-shadow-[0_0_8px_rgba(255,77,0,0.5)]",
  epic: "text-purple-500",
  rare: "text-info",
  common: "text-muted",
};

const LeaderboardAchievement = ({
  achievements = [],
}: LeaderboardAchievementProps) => {
  const unlockedAchievements = achievements.filter(
    (a) => a.status === "unlocked" || a.status === "claimable",
  );

  // Urutin biar Legendary/Epic muncul di atas
  const rarityWeight: Record<string, number> = {
    legendary: 4,
    epic: 3,
    rare: 2,
    common: 1,
  };

  const topAchievements = unlockedAchievements
    .sort((a, b) => rarityWeight[b.rarity] - rarityWeight[a.rarity])
    .slice(0, 3);
  return (
    <Card className="px-4 space-y-3 w-full overflow-hidden bg-warning/10">
      <CardHeader>
        <div className="flex items-center gap-4 uppercase tracking-[0.2rem] text-muted">
          <h2 className="whitespace-nowrap">{"//"} Top Achievement</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5 pb-4">
        {topAchievements.length > 0 ? (
          topAchievements.map((item) => (
            <Card
              key={item.id}
              className="p-3 bg-primary/10 border border-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 shrink-0 text-2xl">
                  {item.icon}
                </div>

                <div className="flex flex-col justify-center gap-y-1">
                  <h1 className="text-broken-white text-[15px] font-bold leading-none">
                    {item.title}
                  </h1>
                  <p
                    className={`uppercase text-[10px] font-mono font-bold tracking-[0.15em] ${rarityColorMap[item.rarity]}`}
                  >
                    {item.rarity}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-4 text-center border border-dashed border-border/50 rounded bg-surface/50">
            <p className="text-xs text-muted font-mono uppercase">
              Belum ada pencapaian.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoTabs;
