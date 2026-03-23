import { Skeleton } from "@/src/components/ui/Skeleton";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";

// ─── SKELETON PROFIL CARD ─────────────────────────────────────────────────────
const ProfileCardSkeleton = () => (
  <Card className="w-full animate-pulse overflow-hidden">
    <CardContent className="p-5 sm:p-6 lg:p-8">
      {/* Baris atas: avatar + info tengah + day streak */}
      <div className="flex justify-between items-start mb-8 lg:mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 lg:gap-8 w-full">
          {/* Avatar - Mengecil di HP */}
          <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-lg shrink-0" />

          {/* Info tengah - Di-center di HP, left-align di Desktop */}
          <div className="flex flex-col gap-y-4 lg:gap-y-6 w-full items-center sm:items-start">
            {/* Nama + badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <Skeleton width={200} height={36} className="sm:w-[260px]" />
              <Skeleton width={130} height={28} className="rounded-md" />
            </div>
            {/* Username + join date */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
              <Skeleton width={90} height={14} />
              <Skeleton
                width={6}
                height={6}
                className="rounded-full hidden sm:block"
              />
              <Skeleton width={160} height={14} />
            </div>
            {/* XP progress */}
            <div className="space-y-2 pt-2 w-full max-w-sm">
              <div className="flex justify-between items-center">
                <Skeleton width={130} height={12} />
                <Skeleton width={80} height={12} />
              </div>
              <Skeleton width="100%" height={8} className="rounded-full" />
              <Skeleton width={220} height={12} className="mx-auto sm:mx-0" />
            </div>
          </div>
        </div>

        {/* Day Streak card - Disembunyikan di layar kecil */}
        <div className="hidden lg:block shrink-0 ml-4">
          <Skeleton width={140} height={40} className="rounded-full" />
        </div>
      </div>

      {/* Garis pemisah + stats row - Sembunyi di HP, 2 kolom di md, 4 kolom di lg */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-y-8 border-t border-white/5 pt-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 ${
              i === 0 || i === 2 ? "border-r border-white/5" : ""
            } ${i === 1 ? "lg:border-r lg:border-white/5" : ""}`}
          >
            <Skeleton width={56} height={40} />
            <Skeleton width={90} height={12} />
          </div>
        ))}
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
