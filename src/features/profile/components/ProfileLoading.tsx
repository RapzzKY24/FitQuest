import { Skeleton } from "@/src/components/ui/Skeleton";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";

// ─── SKELETON PROFIL CARD ─────────────────────────────────────────────────────
const ProfileCardSkeleton = () => (
  <Card className="w-full overflow-hidden">
    <CardContent className="p-5 sm:p-6 lg:p-8">
      {/* TOP SECTION */}
      <div className="flex justify-between items-start mb-8 lg:mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 lg:gap-8 w-full">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#141414] border-2 border-[#272727] rounded-sm flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl shadow-inner font-black text-white/50 uppercase"></div>
          </div>

          <div className="flex flex-col gap-y-4 lg:gap-y-6 w-full text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter">
                <Skeleton width={220} height={40} />
              </h1>
              <div className="bg-[#1c1c1c] border border-[#272727] px-3 py-1 rounded-sm flex items-center gap-3 w-max">
                <span className="font-bold text-xs sm:text-sm">
                  <Skeleton width={48} height={14} />
                </span>
                <span className="w-px h-3 bg-[#555]"></span>
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                  <Skeleton width={84} height={14} />
                </span>
              </div>
            </div>

            {/* Username & Date */}
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-muted text-xs sm:text-sm font-medium tracking-widest sm:tracking-[0.2em] uppercase">
              <span className="hover:text-broken-white transition-colors">
                <Skeleton width={112} height={14} />
              </span>
              <span className="text-muted/40 hidden sm:inline">•</span>
              <span className="w-full sm:w-auto mt-1 sm:mt-0">
                <Skeleton width={136} height={14} />
              </span>
            </div>

            {/* Progress Bar XP */}
            <div className="space-y-2 sm:space-y-3 mt-2 sm:mt-0">
              <div className="flex justify-between items-end">
                <h2 className="uppercase text-muted text-[10px] sm:text-xxs font-bold tracking-[0.2em] sm:tracking-[0.3em]">
                    <Skeleton width={120} height={12} />
                </h2>
                <p className="text-xs sm:text-sm font-bold">
                    <Skeleton width={88} height={14} />
                </p>
              </div>

              <Skeleton height={8} className="w-full" />

              <p className="uppercase text-[#555] text-[9px] sm:text-[10px] font-bold tracking-widest sm:tracking-[0.2em] text-left">
                <Skeleton width={176} height={12} />
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block shrink-0 ml-4">
          <Skeleton />
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-4  gap-y-8 border-t border-[#272727] pt-8">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </CardContent>
  </Card>
);

// ─── SKELETON TABS ────────────────────────────────────────────────────────────
const TabsSkeleton = () => (
  <div className="flex gap-6 sm:gap-8 border-b border-white/5 pb-3 overflow-x-auto scrollbar-hide">
    {[110, 90, 80].map((w, i) => (
      <Skeleton key={i} width={w} height={14} className="shrink-0" />
    ))}
  </div>
);

// ─── SKELETON TAB: INFO DAN EDIT ──────────────────────────────────────────────
export const InfoTabSkeleton = () => (
  <section className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-4 md:gap-6 items-start animate-pulse">
    {/* Kiri */}
    <div className="flex flex-col gap-4 md:gap-6 w-full min-w-0">
      {/* Informasi Pribadi */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader className="pt-6 pb-2 px-4 md:px-6">
          <Skeleton width={190} height={14} />
        </CardHeader>
        <CardContent className="space-y-6 pb-6 px-4 md:px-6">
          {/* Emoji picker */}
          <div className="space-y-3">
            <Skeleton width={150} height={11} />
            <div className="flex gap-2 md:gap-3 flex-wrap">
              {[...Array(10)].map((_, i) => (
                <Skeleton
                  key={i}
                  width={40}
                  height={40}
                  className="rounded-lg md:w-12 md:h-12 md:rounded-xl"
                />
              ))}
            </div>
          </div>
          {/* Display Name + Username - Numpuk di HP, Sejajar di MD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton width="100%" height={56} className="rounded-lg" />
            <Skeleton width="100%" height={56} className="rounded-lg" />
          </div>
          {/* Email */}
          <Skeleton width="100%" height={56} className="rounded-lg" />
          {/* Submit button - Full width di HP */}
          <div className="pt-2">
            <Skeleton height={36} className="w-full sm:w-[150px] rounded-lg" />
          </div>
        </CardContent>
      </Card>

      {/* Data Tubuh */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader className="pt-6 pb-2 px-4 md:px-6">
          <Skeleton width={110} height={14} />
        </CardHeader>
        <CardContent className="space-y-5 pb-6 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton width="100%" height={56} className="rounded-lg" />
            <Skeleton width="100%" height={56} className="rounded-lg" />
          </div>
          <Skeleton width="100%" height={56} className="rounded-lg" />
          <div className="pt-2">
            <Skeleton height={36} className="w-full sm:w-[150px] rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Kanan */}
    <div className="flex flex-col gap-4 md:gap-6 w-full min-w-0">
      {/* Top Achievement */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader className="px-4 md:px-6">
          <Skeleton width={150} height={14} />
        </CardHeader>
        <CardContent className="space-y-2.5 px-4 md:px-6 pb-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width="100%" height={60} className="rounded-lg" />
          ))}
        </CardContent>
      </Card>
    </div>
  </section>
);

// ─── SKELETON UTAMA (export default) ─────────────────────────────────────────
export function ProfilePageSkeleton() {
  return (
    <main className="w-full">
      <div className="px-4 sm:px-6 py-6 flex flex-col justify-center gap-y-4 md:gap-y-6">
        {/* Header */}
        <div className="space-y-2 md:space-y-3.5 mb-2">
          <Skeleton width={130} height={12} />
          <Skeleton width={200} height={36} className="md:h-[40px]" />
        </div>

        {/* ProfileCard */}
        <ProfileCardSkeleton />

        {/* Tabs */}
        <TabsSkeleton />

        {/* Default: Info tab */}
        <InfoTabSkeleton />
      </div>
    </main>
  );
}
