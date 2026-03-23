import { Skeleton } from "@/src/components/ui/Skeleton";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";

export function LogWorkoutLoading() {
  return (
    <main className="w-full">
      <div className="px-4 py-6 flex flex-col justify-center gap-y-4">
        {/* Header Skeleton  */}
        <div className="space-y-3.5">
          <Skeleton width={160} height={12} />
          <Skeleton width={280} height={36} />
        </div>

        {/* Grid section  */}
        <div className="flex flex-col-reverse lg:flex-row gap-3 animate-pulse">
          {/* KIRI: Form (col-span-4) */}
          <div className="flex-7 gap-y-2.5">
            {/* Skeleton Jenis Olahraga */}
            <Card className="w-full bg-black/40 border-white/5">
              <CardHeader>
                <Skeleton width={150} height={20} />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton
                      key={i}
                      width="100%"
                      height={90}
                      className="rounded-xl"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skeleton Durasi */}
            <Card className="w-full bg-black/40 border-white/5">
              <CardHeader className="flex flex-row justify-between">
                <Skeleton width={100} height={16} />
                <Skeleton width={80} height={32} />
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <Skeleton width="100%" height={24} />
                <div className="flex justify-between">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} width={30} height={14} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skeleton Intensitas */}
            <Card className="w-full bg-black/40 border-white/5">
              <CardHeader>
                <Skeleton width={120} height={20} />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      width="100%"
                      height={110}
                      className="rounded-xl"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skeleton Notes */}
            <Card className="w-full bg-black/40 border-white/5">
              <CardContent className="pt-6">
                <Skeleton width="100%" height={80} />
              </CardContent>
            </Card>

            {/* Skeleton Buttons */}
            <div className="flex gap-4 p-2">
              <Skeleton width="35%" height={48} className="rounded-lg" />
              <Skeleton width="65%" height={48} className="rounded-lg" />
            </div>
          </div>

          {/* KANAN: Exp Breakdown */}
          <div className="flex-3 h-fit">
            <Card className="w-full bg-black/60 border-none">
              <CardHeader>
                <Skeleton width={50} height={12} />
              </CardHeader>
              <CardContent className="flex flex-col gap-y-7">
                {/* Sesi Hari ini */}
                <div className="p-4 space-y-4 border border-white/5 rounded-xl">
                  <div className="flex justify-between">
                    <Skeleton width={80} height={14} />
                    <Skeleton width={40} height={20} />
                  </div>
                  <Skeleton width="100%" height={12} />
                </div>
                {/* Daily Quests */}
                <div className="space-y-3">
                  <Skeleton width={100} height={14} />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} width="100%" height={60} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
