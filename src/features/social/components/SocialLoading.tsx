import { Card, CardContent } from "@/src/components/ui/Card";
import { Skeleton } from "@/src/components/ui/Skeleton";

const FeedItemSkeleton = () => (
  <section className="space-y-3">
    <div className="flex gap-4 w-full">
      <div className="shrink-0">
        <Skeleton width={44} height={40} />
      </div>

      <div className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton width={120} height={14} />
          <Skeleton width={160} height={12} />
        </div>

        <div className="p-2 bg-elevated space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton width={24} height={24} />
            <div className="w-full space-y-1">
              <Skeleton width={180} height={12} />
              <Skeleton width="65%" height={11} />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton width={64} height={24} />
          <Skeleton width={72} height={24} />
          <Skeleton width={66} height={24} />
        </div>

        <Skeleton width={110} height={10} />
      </div>
    </div>
    <div className="h-px w-full bg-white/10" />
  </section>
);

const SocialLoading = () => {
  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4">
        {/* Header */}
        <div className="md:space-y-3.5">
          <Skeleton width={210} height={14} />
          <Skeleton width={190} height={42} className="mt-2 md:mt-0" />
        </div>

        {/* Tabs */}
        <div className="flex gap-6 sm:gap-8 border-b border-white/5 pb-3 overflow-x-auto scrollbar-hide">
          {[110, 104, 72].map((w, i) => (
            <Skeleton key={i} width={w} height={14} className="shrink-0" />
          ))}
        </div>

        {/* Default layout follows Feed tab */}
        <section className="flex flex-col-reverse lg:flex-row gap-4">
          <Card className="w-full flex-8">
            <CardContent className="text-xs text-muted space-y-8">
              <div className="flex items-center gap-3">
                <Skeleton width={98} height={12} />
                <div className="h-px w-full bg-white/10" />
              </div>

              {[...Array(3)].map((_, i) => (
                <FeedItemSkeleton key={i} />
              ))}
            </CardContent>
          </Card>

          <section className="flex-2 space-y-4">
            <Card className="w-full border-primary/30 bg-primary/5">
              <CardContent className="text-muted text-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton width={92} height={12} />
                  <div className="h-px w-full bg-white/10" />
                </div>

                <section className="flex gap-3">
                  <Skeleton width={44} height={40} />
                  <div className="space-y-1">
                    <Skeleton width={110} height={14} />
                    <Skeleton width={140} height={11} />
                  </div>
                </section>

                <section className="flex gap-3 items-center">
                  <Skeleton height={72} className="w-full" />
                  <Skeleton height={72} className="w-full" />
                </section>

                <section className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton width={96} height={11} />
                    <Skeleton width={52} height={11} />
                  </div>
                  <Skeleton height={8} className="w-full" />
                </section>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardContent className="text-muted text-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton width={86} height={12} />
                  <div className="h-px w-full bg-white/10" />
                </div>

                {[...Array(4)].map((_, i) => (
                  <section key={i} className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <Skeleton width={36} height={32} />
                      <Skeleton width={90} height={12} />
                    </div>
                    <Skeleton width={10} height={10} className="rounded-full" />
                  </section>
                ))}
              </CardContent>
            </Card>
          </section>
        </section>
      </div>
    </main>
  );
};

export default SocialLoading;
