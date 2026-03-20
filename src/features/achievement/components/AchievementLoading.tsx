import { Skeleton } from "@/src/components/ui/Skeleton";

const AchievementLoading = () => {
  return (
    <div className="px-4 py-6 flex flex-col gap-y-8">
      <div className="space-y-3.5">
        <Skeleton width={180} height={16} />
        <Skeleton width={300} height={40} />
      </div>
      <Skeleton width="100%" height={120} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 flex flex-col gap-y-6">
          <div className="flex gap-3">
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Skeleton height={280} />
            <Skeleton height={280} />
            <Skeleton height={280} />
            <Skeleton height={280} />
            <Skeleton height={280} />
            <Skeleton height={280} />
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-y-6">
          <Skeleton width="100%" height={320} />
          <Skeleton width="100%" height={280} />
        </div>
      </div>
    </div>
  );
};

export default AchievementLoading;
