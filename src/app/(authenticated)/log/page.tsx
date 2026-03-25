import { constructMetadata } from "@/src/utils/metadata";
import { Suspense } from "react";
import { LogWorkoutLoading } from "@/src/features/logWorkoutDashboard/components/LogWorkoutLoading";
import LogWorkoutPages from "@/src/features/logWorkoutDashboard/pages/LogWorkout";

export const metadata = constructMetadata({
  title: "Log Workout",
  description: "Lihat progres latihan harianmu dan klaim XP hari ini!",
});

export default function LogWorkoutPage() {
  return (
    <Suspense fallback={<LogWorkoutLoading />}>
      <LogWorkoutPages />
    </Suspense>
  );
}
