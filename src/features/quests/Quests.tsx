"use client";
import {BadgePill} from "@/src/components/ui/badge-pill";
import {Button} from "@/src/components/ui/Button";
import {Card, CardContent} from "@/src/components/ui/Card";
import {ProgressBar} from "@/src/components/ui/ProgressBar";
import {Tabs} from "@/src/components/ui/Tabs";
import {ArrowRight, Check} from "lucide-react";
import React from "react";
import {claimQuestReward} from "./actions/quest";
import {
  QuestPageProps,
  UserQuestWithDetails,
} from "@/src/features/quests/types/quest";
import {useToast} from "@/src/components/ui/Toast";

const QuestPage = ({initialQuests, userStats}: QuestPageProps) => {
  const {toasts, show: showToast} = useToast();
  const [tabVal, setTabVal] = React.useState("daily");
  const [isClaiming, setIsClaiming] = React.useState(false);
  const QUEST_TABS = [
    {value: "daily", label: "Daily", badge: "3"},
    {value: "weekly", label: "Weekly", badge: "2"},
    {value: "special", label: "Special"},
  ];

  // Filter quest berdasarkan tab yang dipilih (daily/weekly)
  const activeQuests = initialQuests.filter(
    (q) => q.quests.quest_type === tabVal,
  );

  const handleClaim = async (userQuestId: string) => {
    setIsClaiming(true);
    const res = await claimQuestReward(userQuestId);
    setIsClaiming(false);

    if (res?.success) {
      showToast({
        type: "success",
        title: "Berhasil",
        message: "Quest Berhasil Di Klaim!",
      });
    } else {
      alert("Gagal klaim: " + res?.error);
      showToast({
        type: "danger",
        title: "Error",
        message: "Gagal Mengklaim Quest!.",
      });
    }
  };

  return (
    <main className="w-full ">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* header page */}
        <div className="spacey-y-3.5">
          <p className="text-sm font-light tracking-[0.3em] uppercase text-primary">
            Tantangan Harian & Mingguan
          </p>
          <h1 className="font-extrabold text-4xl text-white uppercase">
            Quest <span className="text-primary">Board</span>
          </h1>
        </div>

        {/* quest card */}
        <section className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent>
              <p className="text-primary font-extrabold text-3xl">3</p>
              <p className="font-mono text-muted tracking-[0.3em] text-xs">
                QUEST TERSEDIA
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-success font-extrabold text-3xl">2</p>
              <p className="font-mono text-muted tracking-[0.3em] text-xs">
                SELESAI HARI INI
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-accent font-extrabold text-3xl">+350</p>
              <p className="font-mono text-muted tracking-[0.3em] text-xs">
                XP TERSISA
              </p>
            </CardContent>
          </Card>
        </section>

        {/* tabs heading */}

        <Tabs
          tabs={QUEST_TABS}
          value={tabVal}
          onChange={setTabVal}
          variant="underline"
        />
        <div className="flex justify-between gap-6">
          <section className="w-full">
            {/* tabs content */}
            {tabVal === "daily" && (
              // <section className="py-6 space-y-3">
              //   <Card>
              //     <CardContent className="flex items-center justify-between gap-6">
              //       <div>
              //         <BadgePill>
              //           <span className="text-3xl">🏃‍♂️</span>
              //         </BadgePill>
              //       </div>
              //       <div className="space-y-2 basis-full">
              //         {/* Task Title & Desc */}
              //         <div className="space-y-1">
              //           <div className="flex gap-6">
              //             <h2 className="text-xl font-semibold">
              //               Lari 3 Kali Minggu Ini
              //             </h2>
              //             <BadgePill className="h-fit">Daily</BadgePill>
              //           </div>
              //           <p className="text-muted text-sm">
              //             Catat 3 sesi lari dalam 7 hari terakhir
              //           </p>
              //         </div>

              //         {/* Task Progress Bar */}
              //         <div className="flex text-muted items-center gap-3 tracking-[0.5em] text-sm">
              //           <ProgressBar
              //             value={1}
              //             max={3}
              //             variant="orange"
              //             type="linear"
              //           />{" "}
              //           <span>1/3</span>
              //         </div>
              //       </div>

              //       {/* Task XP & Progress Status */}
              //       <div className="space-y-2 text-end">
              //         <BadgePill>+150 XP</BadgePill>
              //         <BadgePill color="muted">IN PROGRESS</BadgePill>
              //       </div>
              //     </CardContent>
              //   </Card>

              //   <Card className="border-success/30 bg-success/5">
              //     <CardContent className="flex items-center justify-between gap-6">
              //       <div>
              //         <BadgePill color="success">
              //           <span className="text-3xl">💧</span>
              //         </BadgePill>
              //       </div>
              //       <div className="space-y-2 basis-full">
              //         {/* Task Title & Desc */}
              //         <div className="space-y-1">
              //           <div className="flex gap-6">
              //             <h2 className="text-xl font-semibold">
              //               30 Menit Non-Stop
              //             </h2>
              //             <BadgePill className="h-fit">Daily</BadgePill>
              //           </div>
              //           <p className="text-muted text-sm">
              //             Satu sesi minimal 30 menit tanpa henti
              //           </p>
              //         </div>

              //         {/* Task Progress Bar */}
              //         <div className="flex items-center gap-3 tracking-tight text-sm text-success">
              //           <ProgressBar
              //             value={1}
              //             max={1}
              //             variant="green"
              //             type="linear"
              //           />{" "}
              //           <Check size={14} />
              //           DONE
              //         </div>
              //       </div>

              //       {/* Task XP & Progress Status */}
              //       <div className="space-y-2 text-end">
              //         <BadgePill color="success">+150 XP</BadgePill>
              //         <Button size="xs">KLAIM</Button>
              //       </div>
              //     </CardContent>
              //   </Card>

              //   <Card className="border-success/30 bg-success/5">
              //     <CardContent className="flex items-center justify-between gap-6">
              //       <div>
              //         <BadgePill color="success">
              //           <span className="text-3xl">🔥</span>
              //         </BadgePill>
              //       </div>
              //       <div className="space-y-2 basis-full">
              //         {/* Task Title & Desc */}
              //         <div className="space-y-1">
              //           <div className="flex gap-6">
              //             <h2 className="text-xl font-semibold">
              //               Streak Terjaga
              //             </h2>
              //             <BadgePill className="h-fit">Daily</BadgePill>
              //           </div>
              //           <p className="text-muted text-sm">
              //             Login dan log workout 7 hari berturut-turut
              //           </p>
              //         </div>

              //         {/* Task Progress Bar */}
              //         <div className="flex items-center gap-3 tracking-tight text-sm text-success">
              //           <ProgressBar
              //             value={1}
              //             max={1}
              //             variant="green"
              //             type="linear"
              //           />{" "}
              //           <Check size={14} />
              //           DONE
              //         </div>
              //       </div>

              //       {/* Task XP & Progress Status */}
              //       <div className="space-y-2 text-end">
              //         <BadgePill color="success">+200 XP</BadgePill>
              //         <Button size="xs">KLAIM</Button>
              //       </div>
              //     </CardContent>
              //   </Card>
              //   <Card className="opacity-50">
              //     <CardContent className="flex items-center justify-between gap-6">
              //       <div>
              //         <BadgePill color="muted">
              //           <span className="text-3xl">⚡️</span>
              //         </BadgePill>
              //       </div>
              //       <div className="space-y-2 basis-full">
              //         {/* Task Title & Desc */}
              //         <div className="space-y-1">
              //           <div className="flex gap-6">
              //             <h2 className="text-xl font-semibold">
              //               First Log Today
              //             </h2>
              //             <BadgePill className="h-fit" color="muted">
              //               CLAIMED
              //             </BadgePill>
              //           </div>
              //           <p className="text-muted text-sm">
              //             Log workout pertamamu hari ini
              //           </p>
              //         </div>

              //         {/* Task Progress Bar */}
              //         <div className="flex items-center gap-3 tracking-tight text-sm text-muted">
              //           <ProgressBar
              //             value={1}
              //             max={1}
              //             variant="green"
              //             type="linear"
              //           />{" "}
              //           <Check size={14} />
              //           CLAIMED
              //         </div>
              //       </div>

              //       {/* Task XP & Progress Status */}
              //       <div className="space-y-2 text-end">
              //         <BadgePill color="muted">+50 XP</BadgePill>
              //         <BadgePill color="muted">
              //           <Check size={14} /> CLAIMED
              //         </BadgePill>
              //       </div>
              //     </CardContent>
              //   </Card>
              // </section>

              <section className="py-6 space-y-3">
                {/* MAPPING DATA QUEST DI SINI */}
                {activeQuests.map((uq) => {
                  const quest = uq.quests;
                  const isDone = uq.is_completed;
                  const isClaimed = uq.is_claimed;

                  return (
                    <Card
                      key={uq.id}
                      // Ganti warna card sesuai status
                      className={
                        isClaimed
                          ? "opacity-50"
                          : isDone
                            ? "border-success/30 bg-success/5"
                            : ""
                      }>
                      <CardContent className="flex items-center justify-between gap-6">
                        <div>
                          <BadgePill
                            color={
                              isDone && !isClaimed
                                ? "success"
                                : isClaimed
                                  ? "muted"
                                  : "primary"
                            }>
                            <span className="text-3xl">{quest.icon}</span>
                          </BadgePill>
                        </div>

                        <div className="space-y-2 basis-full">
                          <div className="space-y-1">
                            <div className="flex gap-6">
                              <h2 className="text-xl font-semibold">
                                {quest.title}
                              </h2>
                              {isClaimed && (
                                <BadgePill color="muted">CLAIMED</BadgePill>
                              )}
                            </div>
                            <p className="text-muted text-sm">
                              {quest.description}
                            </p>
                          </div>

                          {/* Progress Bar Dinamis */}
                          <div className="flex items-center gap-3 tracking-tight text-sm text-success">
                            <ProgressBar
                              value={uq.progress}
                              max={quest.target_value}
                              variant={isDone ? "green" : "orange"}
                              type="linear"
                            />
                            {isDone ? (
                              <>
                                <Check size={14} />{" "}
                                {isClaimed ? "CLAIMED" : "DONE"}
                              </>
                            ) : (
                              <span className="text-muted">
                                {uq.progress}/{quest.target_value}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 text-end">
                          <BadgePill
                            color={isDone && !isClaimed ? "success" : "muted"}>
                            +{quest.xp_reward} XP
                          </BadgePill>

                          {/* LOGIC TOMBOL CLAIM */}
                          {isDone && !isClaimed ? (
                            <Button
                              size="xs"
                              onClick={() => handleClaim(uq.id)}
                              disabled={isClaiming}>
                              {isClaiming ? "..." : "KLAIM"}
                            </Button>
                          ) : isClaimed ? (
                            <BadgePill color="muted">
                              <Check size={14} /> CLAIMED
                            </BadgePill>
                          ) : (
                            <BadgePill color="muted">IN PROGRESS</BadgePill>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            )}
          </section>

          {/* user card stat */}
          <section className="space-y-4 basis-1/3">
            <Card>
              <CardContent className="text-muted space-y-4">
                <div className="flex items-center gap-3">
                  <p className="uppercase tracking-[0.3em] text-nowrap">
                    {"//"} XP HARI INI
                  </p>
                  <div className="h-px w-full bg-white/10" />
                </div>
                <section className="space-y-4">
                  <p>
                    <span className="text-primary font-black text-4xl">
                      350
                    </span>{" "}
                    / 700 XP
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <p className="tracking-[0.3em]">PROGRESS HARI INI</p>
                    <p>50%</p>
                  </div>
                  <ProgressBar
                    value={350}
                    max={700}
                    variant="orange"
                    type="linear"
                  />

                  {/* divider */}
                  <div className="h-px w-full bg-white/10 my-6" />

                  <ul className="list-disc ml-4 space-y-4">
                    <li className="text-broken-white">
                      <p className="flex items-center justify-between">
                        Lari 3X Minggu Ini{" "}
                        <span className="tracking-[0.3em] text-muted text-xxs">
                          1/3
                        </span>
                      </p>
                    </li>
                    <li className="text-success">
                      <p className="flex items-center justify-between">
                        30 Menit Non-Stop <Check size={12} />
                      </p>
                    </li>
                    <li className="text-success">
                      <p className="flex items-center justify-between">
                        Streak Terjaga <Check size={12} />
                      </p>
                    </li>
                    <li>
                      <p className="flex items-center justify-between">
                        First Log Today{" "}
                        <span className="flex items-center text-xxs gap-1">
                          <Check size={12} /> CLAIMED
                        </span>
                      </p>
                    </li>
                  </ul>
                </section>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-muted space-y-4">
                <div className="flex items-center gap-3">
                  <p className="uppercase tracking-[0.3em] text-nowrap">
                    {"//"} STATUS WARIOR
                  </p>
                  <div className="h-px w-full bg-white/10" />
                </div>
                <section className="text-xxs space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🔥</span>
                      <div>
                        <p className="tracking-[0.3em]">CURRENT STREAK</p>
                        <p className="text-primary font-black text-3xl">
                          12 HARI
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p>BEST</p>
                      <p className="text-broken-white text-base">18 HARI</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="tracking-[0.3em] flex items-center gap-4">
                      LV.7 <ArrowRight size={12} /> LV.8
                    </p>
                    <p>400 / 700</p>
                  </div>
                  <ProgressBar
                    value={400}
                    max={700}
                    variant="orange"
                    type="linear"
                  />
                  <p>300 XP lagi untuk naik level</p>
                </section>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5 text-muted text-center text-xs">
              <CardContent className="space-y-4">
                <h2 className="text-primary tracking-[0.3em]">
                  {"//"} RESET BESOK
                </h2>
                <p className="text-broken-white text-3xl">12 : 05 : 06</p>
                <p>Quest baru tersedia pukul 00:00</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};

export default QuestPage;
