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
import {ToastContainer, useToast} from "@/src/components/ui/Toast";

const QuestPage = ({initialQuests, userStats}: QuestPageProps) => {
  const {toasts, show: showToast, dismiss: dismissToast} = useToast();
  const [tabVal, setTabVal] = React.useState("daily");
  const [isClaiming, setIsClaiming] = React.useState(false);

  // 1. Bikin fungsi kecil buat ngitung quest yang siap diklaim berdasarkan tipe
  const getClaimableCount = (type: string) => {
    const count = initialQuests.filter(
      (q) =>
        q.quests?.quest_type === type && // Tipenya cocok (daily/weekly/special)
        q.is_completed === true && // Udah selesai
        q.is_claimed === false, // Belum diklaim
    ).length;

    // Kalau ada isinya, balikin angkanya sebagai string. Kalau 0, balikin undefined biar badge-nya ngilang
    return count > 0 ? count.toString() : undefined;
  };

  // ... (Kodingan getClaimableCount & QUEST_TABS lu yang tadi) ...

  // Hitung statistik untuk Header Cards
  const questsTersedia = initialQuests.filter((q) => !q.is_completed).length;

  const questSelesai = initialQuests.filter((q) => q.is_completed).length;

  // Pake reduce buat ngejumlahin semua xp_reward dari quest yang belum diklaim
  const xpTersisa = initialQuests
    .filter((q) => !q.is_claimed)
    .reduce((total, q) => total + (q.quests?.xp_reward || 0), 0);

  // 2. Terapin fungsinya ke array QUEST_TABS lu
  const QUEST_TABS = [
    {
      value: "daily",
      label: "Daily",
      badge: getClaimableCount("daily"),
    },
    {
      value: "weekly",
      label: "Weekly",
      badge: getClaimableCount("weekly"),
    },
    {
      value: "special",
      label: "Special",
      badge: getClaimableCount("special"),
    },
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
              <p className="text-primary font-extrabold text-3xl">
                {questsTersedia}
              </p>
              <p className="font-mono text-muted tracking-[0.3em] text-xs">
                QUEST TERSEDIA
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-success font-extrabold text-3xl">
                {questSelesai}
              </p>
              <p className="font-mono text-muted tracking-[0.3em] text-xs">
                SELESAI HARI INI
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-accent font-extrabold text-3xl">{xpTersisa}</p>
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
                              KLAIM
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

            {tabVal === "weekly" && (
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
                              KLAIM
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

            {tabVal === "special" && (
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
                              KLAIM
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
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
};

export default QuestPage;
