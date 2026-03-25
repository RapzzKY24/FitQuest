import { Card, CardContent } from "@/src/components/ui/Card";
import { Skeleton } from "@/src/components/ui/Skeleton";

const QuestItemSkeleton = () => (
  <Card>
    <CardContent className="flex items-center justify-between gap-2 lg:gap-6">
      <div className="shrink-0">
        <Skeleton width={52} height={44} />
      </div>

      <div className="space-y-2 basis-full min-w-0">
        <div className="space-y-1">
          <Skeleton width={220} height={20} />
          <Skeleton width="90%" height={14} />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Skeleton height={8} className="w-full" />
          <Skeleton width={56} height={14} />
        </div>
      </div>

      <div className="space-y-2 text-end shrink-0">
        <Skeleton width={72} height={22} />
        <Skeleton width={64} height={26} />
      </div>
    </CardContent>
  </Card>
);

const QuestLoading = () => {
  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4">
        {/* Header */}
        <div className="md:space-y-3.5">
          <Skeleton width={260} height={14} />
          <Skeleton width={220} height={44} className="mt-2 md:mt-0" />
        </div>

        {/* Top stat cards */}
        <section className="grid md:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent>
                <Skeleton width={76} height={36} />
                <Skeleton width={130} height={12} className="mt-2" />
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Tabs */}
        <div className="flex gap-6 sm:gap-8 border-b border-white/5 pb-3 overflow-x-auto scrollbar-hide">
          {[96, 104, 98].map((w, i) => (
            <Skeleton key={i} width={w} height={14} className="shrink-0" />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between md:gap-6">
          {/* Left: quest list */}
          <section className="w-full py-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <QuestItemSkeleton key={i} />
            ))}
          </section>

          {/* Right: user stat cards */}
          <section className="space-y-4 basis-1/3">
            <Card>
              <CardContent className="text-muted space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton width={128} height={12} />
                  <div className="h-px w-full bg-white/10" />
                </div>

                <section className="space-y-3">
                  <div className="flex justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Skeleton width={36} height={36} />
                      <div className="space-y-1">
                        <Skeleton width={120} height={10} />
                        <Skeleton width={100} height={24} />
                      </div>
                    </div>
                    <div className="text-end space-y-1">
                      <Skeleton width={36} height={10} />
                      <Skeleton width={70} height={16} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Skeleton width={140} height={12} />
                    <Skeleton width={86} height={12} />
                  </div>

                  <Skeleton height={8} className="w-full" />
                  <Skeleton width={170} height={12} />
                </section>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5 text-muted text-center text-xs">
              <CardContent className="space-y-4">
                <Skeleton width={138} height={14} className="mx-auto" />
                <Skeleton width={120} height={34} className="mx-auto" />
                <Skeleton width={180} height={12} className="mx-auto" />
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};

export default QuestLoading;
