import ExpBreakdown from "../components/ExpBreakdown";
import {createClient} from "@/src/utils/supabase/server";
import {WorkoutLogForm} from "./LogWorkoutForm";

const LogWorkoutPages = async () => {
  const supabase = await createClient();

  // Fetch data workout types yang statusnya aktif
  const {data: workoutTypes, error} = await supabase
    .from("workout_types")
    .select("id, name, icon, category")
    .eq("is_active", true)
    .order("name", {ascending: true});

  if (error) {
    console.error("Gagal tarik data workout_types:", error.message);
  }

  return (
    <main className="w-full ">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4 ">
        {/* header page */}
        <div className="spacey-y-3.5">
          <p className="text-sm font-light tracking-[0.3em] uppercase text-primary">
            Catat Aktivitas
          </p>
          <h1 className="font-extrabold text-4xl text-white uppercase">
            Log <span className="text-primary">Workout</span>
          </h1>
        </div>
        {/* HOLD stepper */}
        {/* <StepperLog /> */}

        {/* grid section log */}
        <div className="grid grid-cols-5 gap-3">
          <div className="grid col-span-4  gap-y-2.5">
            <WorkoutLogForm workoutTypes={workoutTypes || []} />
          </div>
          <div className="grid col-span-1 ">
            <ExpBreakdown />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogWorkoutPages;
