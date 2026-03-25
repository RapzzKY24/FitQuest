import QuestsContainer from "@/src/features/quests/QuestContainer";
import { constructMetadata } from "@/src/utils/metadata";
import { Suspense } from "react";
import QuestLoading from "@/src/features/quests/components/QuestLoading";

export const metadata = constructMetadata({
  title: "Quest",
});

export default async function QuestsRoute() {
  return (
    <Suspense fallback={<QuestLoading />}>
      <QuestsContainer />
    </Suspense>
  );
}
