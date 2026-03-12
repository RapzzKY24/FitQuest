import React from "react";
import {
  DurationSlider,
  IntensityCard,
  Notes,
  StepperLog,
  WorkoutTypeGrid,
} from "..";
import { Button } from "@/src/components/ui/Button";
import { ArrowLeft, Zap } from "lucide-react";
import ExpBreakdown from "../components/ExpBreakdown";

const LogWorkoutPages = () => {
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
        {/* stepper */}
        <StepperLog />
        {/* grid section log */}
        <div className="grid grid-cols-5 gap-3">
          <div className="grid col-span-4  gap-y-2.5">
            <WorkoutTypeGrid />
            <DurationSlider />
            <IntensityCard />
            <Notes />
            <div className="w-full flex items-center gap-4">
              <Button variant="outline" className="w-[35%]">
                <div className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Batal
                </div>
              </Button>
              <Button className="w-[65%]">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  Simpan dan Klaim EXP
                </div>
              </Button>
            </div>
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
