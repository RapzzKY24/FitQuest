import { Skeleton } from "@/src/components/ui/Skeleton";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";

// ─── SKELETON PROFIL CARD (selalu tampil di semua tab) ───────────────────────
const ProfileCardSkeleton = () => (
  <Card className="w-full animate-pulse">
    <CardContent className="p-6 space-y-0">
      {/* Baris atas: avatar + info tengah + day streak */}
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <Skeleton width={120} height={120} className="rounded-lg shrink-0" />

        {/* Info tengah */}
        <div className="flex-1 space-y-3 pt-1">
          {/* Nama + badge */}
          <div className="flex items-center gap-3">
            <Skeleton width={260} height={32} />
            <Skeleton width={130} height={28} className="rounded-md" />
          </div>
          {/* Username + join date */}
          <div className="flex items-center gap-3">
            <Skeleton width={90} height={13} />
            <Skeleton width={6} height={6} className="rounded-full" />
            <Skeleton width={160} height={13} />
          </div>
          {/* XP progress */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <Skeleton width={130} height={12} />
              <Skeleton width={80} height={12} />
            </div>
            <Skeleton width="100%" height={8} className="rounded-full" />
            <Skeleton width={220} height={12} />
          </div>
        </div>

        {/* Day Streak card */}
        <Skeleton width={120} height={110} className="rounded-lg shrink-0" />
      </div>

      {/* Garis pemisah + stats row */}
      <div className="border-t border-white/5 mt-6 pt-4 grid grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 ${i !== 3 ? "border-r border-white/5" : ""}`}
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
  <div className="flex gap-8 border-b border-white/5 pb-3">
    {[110, 90, 80].map((w, i) => (
      <Skeleton key={i} width={w} height={14} />
    ))}
  </div>
);

// ─── SKELETON TAB: INFO DAN EDIT ──────────────────────────────────────────────
export const InfoTabSkeleton = () => (
  <section className="grid grid-cols-4 gap-3 animate-pulse">
    {/* Kiri — col-span-3 */}
    <div className="col-span-3 space-y-4">
      {/* Informasi Pribadi */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader>
          <Skeleton width={190} height={14} />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Emoji picker */}
          <div className="space-y-2">
            <Skeleton width={150} height={11} />
            <div className="flex gap-3 flex-wrap">
              {[...Array(10)].map((_, i) => (
                <Skeleton
                  key={i}
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
              ))}
            </div>
          </div>
          {/* Display Name + Username */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton width="100%" height={56} className="rounded-lg" />
            <Skeleton width="100%" height={56} className="rounded-lg" />
          </div>
          {/* Email (disabled) */}
          <Skeleton width="100%" height={56} className="rounded-lg" />
          {/* Submit button */}
          <Skeleton width={150} height={36} className="rounded-lg" />
        </CardContent>
      </Card>

      {/* Data Tubuh */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader>
          <Skeleton width={110} height={14} />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton width="100%" height={56} className="rounded-lg" />
            <Skeleton width="100%" height={56} className="rounded-lg" />
          </div>
          {/* Select fitness goal */}
          <Skeleton width="100%" height={56} className="rounded-lg" />
          <Skeleton width={150} height={36} className="rounded-lg" />
        </CardContent>
      </Card>
    </div>

    {/* Kanan — col-span-1 */}
    <div className="col-span-1 space-y-4">
      {/* GymBro card */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader>
          <Skeleton width={70} height={14} />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Skeleton width={96} height={96} className="rounded-2xl" />
          <Skeleton width={170} height={28} />
          <Skeleton width={150} height={13} />
          {/* Stars/icons row */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} width={16} height={16} />
            ))}
          </div>
          {/* Progress section */}
          <div className="w-full space-y-3">
            <div className="flex justify-between">
              <Skeleton width={110} height={12} />
              <Skeleton width={32} height={12} />
            </div>
            <Skeleton width="100%" height={8} className="rounded-full" />
            <Skeleton width="100%" height={36} className="rounded-lg" />
          </div>
        </CardContent>
      </Card>

      {/* Top Achievement */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader>
          <Skeleton width={150} height={14} />
        </CardHeader>
        <CardContent className="space-y-2.5">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width="100%" height={60} className="rounded-lg" />
          ))}
        </CardContent>
      </Card>
    </div>
  </section>
);

// ─── SKELETON TAB: AKTIVITAS ──────────────────────────────────────────────────
export const ActivityTabSkeleton = () => (
  <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start animate-pulse">
    {/* Kiri */}
    <div className="flex flex-col gap-6">
      {/* Activity Heatmap */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader className="flex flex-row justify-between items-center">
          <Skeleton width={180} height={14} />
          <Skeleton width={150} height={12} />
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Month labels row */}
          <div className="flex gap-2 pl-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} width={60} height={11} className="flex-1" />
            ))}
          </div>
          {/* Grid heatmap — 7 rows (Sun-Sat) */}
          {[...Array(7)].map((_, row) => (
            <div key={row} className="flex items-center gap-2">
              <Skeleton width={24} height={11} />
              <div className="flex gap-1 flex-1">
                {[...Array(26)].map((_, col) => (
                  <Skeleton
                    key={col}
                    width="100%"
                    height={14}
                    className="rounded-sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Workout History */}
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader>
          <Skeleton width={160} height={14} />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} width="100%" height={64} className="rounded-lg" />
          ))}
        </CardContent>
      </Card>
    </div>

    {/* Kanan — Monthly Stats Panel */}
    <div>
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader>
          <Skeleton width={200} height={14} />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 3 stat rows */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton width={120} height={12} />
                <Skeleton width={80} height={12} />
              </div>
              <Skeleton width="100%" height={6} className="rounded-full" />
            </div>
          ))}
          {/* 2 icon cards */}
          <div className="grid grid-cols-2 gap-3">
            <Skeleton width="100%" height={80} className="rounded-lg" />
            <Skeleton width="100%" height={80} className="rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

// ─── SKELETON TAB: GYMBRO ─────────────────────────────────────────────────────
export const GymbroTabSkeleton = () => (
  <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start animate-pulse">
    {/* Kiri — col-span-3: main avatar card */}
    <div className="col-span-3">
      <Card className="w-full bg-black/40 border-white/5">
        <CardHeader>
          <Skeleton width={240} height={14} />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pb-8">
          {/* Avatar badge */}
          <Skeleton width={120} height={120} className="rounded-2xl" />
          {/* Title area */}
          <div className="flex flex-col items-center gap-2">
            <Skeleton width={160} height={28} className="rounded-full" />
            <Skeleton width={260} height={32} />
            <Skeleton width={200} height={12} />
          </div>
          {/* Progress */}
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between">
              <Skeleton width={130} height={12} />
              <Skeleton width={80} height={12} />
            </div>
            <Skeleton width="100%" height={8} className="rounded-full" />
            <Skeleton width={200} height={12} className="mx-auto" />
          </div>
          {/* Stepper */}
          <div className="w-full flex justify-between pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Skeleton width={28} height={28} className="rounded-full" />
                <Skeleton width={60} height={11} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Kanan — col-span-1: stage list */}
    <Card className="w-full bg-black/40 border-white/5">
      <CardHeader>
        <Skeleton width={150} height={14} />
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Progress summary */}
        <div className="flex justify-between items-center mb-2">
          <Skeleton width={80} height={12} />
          <Skeleton width={70} height={24} className="rounded-full" />
        </div>
        {/* Stage list items */}
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} width="100%" height={60} className="rounded-lg" />
        ))}
        {/* Footer */}
        <div className="flex justify-between pt-3 border-t border-white/5">
          <Skeleton width={80} height={12} />
          <Skeleton width={60} height={24} />
        </div>
      </CardContent>
    </Card>
  </section>
);

// ─── SKELETON UTAMA (export default) ─────────────────────────────────────────
export function ProfilePageSkeleton() {
  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4">
        {/* Header */}
        <div className="space-y-3.5">
          <Skeleton width={130} height={12} />
          <Skeleton width={200} height={36} />
        </div>

        {/* ProfileCard */}
        <ProfileCardSkeleton />

        {/* Tabs */}
        <TabsSkeleton />

        {/* Default: Info tab (tab pertama yang muncul) */}
        <InfoTabSkeleton />
      </div>
    </main>
  );
}
