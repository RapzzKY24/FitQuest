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
  const [timeLeft, setTimeLeft] = React.useState<string>("00:00:00");

  // Efek Countdown Timer sampai jam 00:00 (Reset harian)
  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setUTCHours(24, 0, 0, 0); // Set ke jam 7 malam nanti

      const diff = midnight.getTime() - now.getTime();

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const m = Math.floor((diff / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");
      const s = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, "0");

      setTimeLeft(`${h}:${m}:${s}`);
    };

    updateTimer(); // Panggil sekali biar gak nunggu 1 detik
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

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
          <p className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-primary">
            {"//"}Tantangan Harian & Mingguan
          </p>
          <h1 className="font-black text-2xl md:text-4xl text-white uppercase">
            Quest <span className="text-primary">Board</span>
          </h1>
        </div>

        {/* quest card */}
        <section className="grid md:grid-cols-3 gap-3">
          <Card>
            <CardContent>
              <p className="text-primary font-extrabold text-2xl md:text-3xl">
                {questsTersedia}
              </p>
              <p className="font-mono text-muted tracking-[0.3em] text-xxs md:text-xs">
                QUEST TERSEDIA
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-success font-extrabold text-2xl md:text-3xl">
                {questSelesai}
              </p>
              <p className="font-mono text-muted tracking-[0.3em] text-xxs md:text-xs">
                SELESAI HARI INI
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-accent font-extrabold text-2xl md:text-3xl">
                +{xpTersisa}
              </p>
              <p className="font-mono text-muted tracking-[0.3em] text-xxs md:text-xs">
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
        <div className="flex flex-col lg:flex-row justify-between md:gap-6">
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
                      <CardContent className="flex items-center justify-between gap-2 lg:gap-6">
                        <div>
                          <BadgePill
                            color={
                              isDone && !isClaimed
                                ? "success"
                                : isClaimed
                                  ? "muted"
                                  : "primary"
                            }>
                            <span className="text-lg md:text-3xl">
                              {quest.icon}
                            </span>
                          </BadgePill>
                        </div>

                        <div className="space-y-2 basis-full">
                          <div className="space-y-1">
                            <div className="flex gap-6">
                              <h2 className="md:text-xl font-semibold">
                                {quest.title}
                              </h2>
                            </div>
                            <p className="text-muted text-xs md:text-sm">
                              {quest.description}
                            </p>
                          </div>

                          {/* Progress Bar Dinamis */}
                          <div className="flex items-center gap-1 md:gap-3 tracking-tight text-xxs md:text-sm text-success">
                            <ProgressBar
                              value={uq.progress}
                              max={quest.target_value}
                              variant={isDone ? "green" : "orange"}
                              type="linear"
                            />
                            {isDone ? (
                              <>
                                <Check size={24} className="hidden md:block" />{" "}
                                <span> {isClaimed ? "CLAIMED" : "DONE"}</span>
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
                            <span className="text-[8px] md:text-xs">
                              +{quest.xp_reward} XP
                            </span>
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
                            <BadgePill color="muted">CLAIMED</BadgePill>
                          ) : (
                            <BadgePill color="muted" className="text-nowrap">
                              IN PROGRESS
                            </BadgePill>
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
                      <CardContent className="flex items-center justify-between gap-2 lg:gap-6">
                        <div>
                          <BadgePill
                            color={
                              isDone && !isClaimed
                                ? "success"
                                : isClaimed
                                  ? "muted"
                                  : "primary"
                            }>
                            <span className="text-lg md:text-3xl">
                              {quest.icon}
                            </span>
                          </BadgePill>
                        </div>

                        <div className="space-y-2 basis-full">
                          <div className="space-y-1">
                            <div className="flex gap-6">
                              <h2 className="md:text-xl font-semibold">
                                {quest.title}
                              </h2>
                            </div>
                            <p className="text-muted text-xs md:text-sm">
                              {quest.description}
                            </p>
                          </div>

                          {/* Progress Bar Dinamis */}
                          <div className="flex items-center gap-1 md:gap-3 tracking-tight text-xxs md:text-sm text-success">
                            <ProgressBar
                              value={uq.progress}
                              max={quest.target_value}
                              variant={isDone ? "green" : "orange"}
                              type="linear"
                            />
                            {isDone ? (
                              <>
                                <Check size={24} className="hidden md:block" />{" "}
                                <span> {isClaimed ? "CLAIMED" : "DONE"}</span>
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
                            <span className="text-[8px] md:text-xs">
                              +{quest.xp_reward} XP
                            </span>
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
                            <BadgePill color="muted">CLAIMED</BadgePill>
                          ) : (
                            <BadgePill color="muted" className="text-nowrap">
                              IN PROGRESS
                            </BadgePill>
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
                      <CardContent className="flex items-center justify-between gap-2 lg:gap-6">
                        <div>
                          <BadgePill
                            color={
                              isDone && !isClaimed
                                ? "success"
                                : isClaimed
                                  ? "muted"
                                  : "primary"
                            }>
                            <span className="text-lg md:text-3xl">
                              {quest.icon}
                            </span>
                          </BadgePill>
                        </div>

                        <div className="space-y-2 basis-full">
                          <div className="space-y-1">
                            <div className="flex gap-6">
                              <h2 className="md:text-xl font-semibold">
                                {quest.title}
                              </h2>
                            </div>
                            <p className="text-muted text-xs md:text-sm">
                              {quest.description}
                            </p>
                          </div>

                          {/* Progress Bar Dinamis */}
                          <div className="flex items-center gap-1 md:gap-3 tracking-tight text-xxs md:text-sm text-success">
                            <ProgressBar
                              value={uq.progress}
                              max={quest.target_value}
                              variant={isDone ? "green" : "orange"}
                              type="linear"
                            />
                            {isDone ? (
                              <>
                                <Check size={24} className="hidden md:block" />{" "}
                                <span> {isClaimed ? "CLAIMED" : "DONE"}</span>
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
                            <span className="text-[8px] md:text-xs">
                              +{quest.xp_reward} XP
                            </span>
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
                            <BadgePill color="muted">CLAIMED</BadgePill>
                          ) : (
                            <BadgePill color="muted" className="text-nowrap">
                              IN PROGRESS
                            </BadgePill>
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
                  <p className="uppercase tracking-[0.3em] text-nowrap text-xs">
                    {"//"} STATUS WARIOR
                  </p>
                  <div className="h-px w-full bg-white/10" />
                </div>
                <section className="text-xxs space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl xl:text-3xl">🔥</span>
                      <div>
                        <p className="tracking-[0.3em] text-xxs text-nowrap">CURRENT STREAK</p>
                        <p className="text-primary font-black text-3xl">
                          {userStats?.streak_current} HARI
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p>BEST</p>
                      <p className="text-broken-white text-base text-nowrap">
                        {userStats?.streak_best} HARI
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="tracking-[0.3em] flex items-center gap-4">
                      LV.{userStats?.level} <ArrowRight size={12} /> LV.
                      {userStats?.level + 1}
                    </p>
                    <p>
                      {userStats?.xp_current} / {userStats?.xp_to_next}
                    </p>
                  </div>
                  <ProgressBar
                    value={userStats?.xp_current}
                    max={userStats?.xp_to_next}
                    variant="orange"
                    type="linear"
                  />
                  <p>
                    {userStats?.xp_to_next - userStats?.xp_current} XP lagi
                    untuk naik level
                  </p>
                </section>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5 text-muted text-center text-xs">
              <CardContent className="space-y-4">
                <h2 className="text-primary tracking-[0.3em]">
                  {"//"} WAKTU RESET
                </h2>
                <p className="text-broken-white text-3xl">{timeLeft}</p>
                <p>Quest baru tersedia pukul 07:00</p>
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
