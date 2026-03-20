import LogWorkoutPages from "@/src/features/logWorkoutDashboard/pages/LogWorkout";
import { constructMetadata } from "@/src/utils/metadata";

export const metadata = constructMetadata({
  title: "Log Workout",
  description: "Lihat progres latihan harianmu dan klaim XP hari ini!",
});

const LogWorkout = () => {
  return <LogWorkoutPages />;
};

export default LogWorkout;
