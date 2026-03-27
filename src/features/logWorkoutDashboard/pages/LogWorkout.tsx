import ExpBreakdown from "../components/ExpBreakdown";
import { createClient } from "@/src/utils/supabase/server";
import { WorkoutLogForm } from "./LogWorkoutForm";

const LogWorkoutPages = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch data workout types yang statusnya aktif
  const { data: workoutTypes, error } = await supabase
    .from("workout_types")
    .select("id, name, icon, category")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Gagal tarik data workout_types:", error.message);
  }

  const todayStrId = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
  }).format(new Date());

  const startOfTodayUTC = `${todayStrId}T00:00:00Z`;

  // 1. Tarik Sesi Hari Ini (Cuma buat bar progress 3 sesi di UI atas)
  const { count: sessionCount } = await supabase
    .from("workout_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .gte("logged_at", startOfTodayUTC);

  const isLimitReached = (sessionCount ?? 0) >= 3;

  // 2. Tarik Master Quest Aktif (Daily)
  const { data: activeQuests } = await supabase
    .from("quests")
    .select("*")
    .eq("is_active", true)
    .eq("quest_type", "daily")
    .limit(3);

  const questIds = activeQuests?.map((q) => q.id) || [];

  // 3. Tarik Jejak Progress dari tabel user_quests
  const { data: userQuestData } = await supabase
    .from("user_quests")
    .select("quest_id, progress, is_completed, is_claimed")
    .eq("user_id", user?.id)
    .in("quest_id", questIds)
    .eq("period_start", todayStrId); // Cocokin sama tanggal hari ini

  // 4. Gabungin Data Quest & Progress-nya
  const questsWithProgress = (activeQuests || []).map((quest) => {
    const uq = userQuestData?.find((u) => u.quest_id === quest.id);
    return {
      ...quest,
      current_progress: uq?.progress || 0,
      is_completed: uq?.is_completed || false,
      is_claimed: uq?.is_claimed || false,
    };
  });

  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* header page */}
        <div className="md:space-y-3.5">
          <p className="text-xxs lg:text-sm font-light tracking-[0.3em] uppercase text-primary">
            {"//"}Catat Aktivitas
          </p>
          <h1 className="font-extrabold text-2xl lg:text-4xl text-white uppercase">
            Log <span className="text-primary">Workout</span>
          </h1>
        </div>

        {/* grid section log */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 w-full">
          <div className="flex-7">
            <WorkoutLogForm
              workoutTypes={workoutTypes || []}
              isLimitReached={isLimitReached}
            />
          </div>
          <div className="flex-2">
            <ExpBreakdown
              todaySessions={sessionCount || 0}
              activeQuests={questsWithProgress} // Oper data yang udah ada flag completed & claimed
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogWorkoutPages;