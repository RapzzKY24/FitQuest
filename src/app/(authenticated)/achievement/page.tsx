import AchievementContainer from "@/src/features/achievement/pages/AchievementContainer";
import { constructMetadata } from "@/src/utils/metadata";
import { Suspense } from "react";
import { Skeleton } from "@/src/components/ui/Skeleton";
import AchievementLoading from "@/src/features/achievement/components/AchievementLoading";

export const metadata = constructMetadata({
  title: "Achievement",
});

export default function Page() {
  return (
    <main className="w-full bg-black min-h-screen">
      <Suspense fallback={<AchievementLoading />}>
        <AchievementContainer />
      </Suspense>
    </main>
  );
}
