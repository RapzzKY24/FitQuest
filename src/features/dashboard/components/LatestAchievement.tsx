import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { createClient } from "@/src/utils/supabase/server";

// --- TYPES (Biar Anti-Error TypeScript!) ---
type UserBadgeLog = {
  earned_at: string;
  badges: {
    id: number;
    name: string;
    description: string;
    icon: string;
    rarity: "common" | "rare" | "epic" | "legendary";
  } | null;
};

// --- HELPER FUNCTIONS ---
// 1. Format waktu ("2 hari lalu")
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari lalu`;
  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks} minggu lalu`;
};

// 2. Mapping Styling Rarity (Warnanya dibikin dinamis sesuai level)
const getRarityStyle = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return {
        badgeColor: "warning",
        iconBg: "bg-orange-500/10 border-orange-500/20",
      };
    case "epic":
      return {
        badgeColor: "purple",
        iconBg: "bg-purple-500/10 border-purple-500/20",
      };
    case "rare":
      return {
        badgeColor: "info",
        iconBg: "bg-blue-500/10 border-blue-500/20",
      };
    case "common":
    default:
      return { badgeColor: "muted", iconBg: "bg-elevated border-border" };
  }
};

const LatestAchievements = async () => {
  const supabase = await createClient();

  // 1. Cek User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. Tarik log achievement terakhir (Join tabel user_badges & badges)
  const { data: recentBadges, error } = await supabase
    .from("user_badges")
    .select(
      `
      earned_at,
      badges (
        id,
        name,
        description,
        icon,
        rarity
      )
    `,
    )
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false }) // Urutkan dari yang paling baru didapet
    .limit(3) // Ambil 3 aja buat di dashboard
    .returns<UserBadgeLog[]>();

  if (error) {
    console.error("Gagal narik achievement:", error.message);
  }

  // 3. Format Data DB biar pas sama Desain UI lu
  // Kita filter out yang badges-nya null (buat jaga-jaga kalau datanya rusak)
  const formattedAchievements =
    recentBadges
      ?.filter((log) => log.badges !== null)
      .map((log, index) => {
        const badge = log.badges!;
        const style = getRarityStyle(badge.rarity);

        return {
          id: `${badge.id}-${index}`,
          title: badge.name,
          icon: badge.icon || "🏅",
          subtitle: `${badge.description} · ${formatRelativeTime(log.earned_at)}`,
          badgeText: badge.rarity.toUpperCase(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          badgeColor: style.badgeColor as any,
          iconBg: style.iconBg,
        };
      }) || [];

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Achievement Terbaru
          </span>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <Link
            href="/achievement"
            className="text-muted tracking-[0.2em] text-[11px] font-semibold uppercase hover:text-broken-white transition-colors"
          >
            Lihat Semua &rarr;
          </Link>
        </div>

        {/* --- LIST ACHIEVEMENT --- */}
        <div className="flex flex-col">
          {formattedAchievements.length === 0 ? (
            <p className="text-muted text-sm text-center py-4">
              Belum ada achievement. Tetap semangat latihan! 💪
            </p>
          ) : (
            formattedAchievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`py-4 flex items-center justify-between ${
                  index !== formattedAchievements.length - 1
                    ? "border-b border-border/60"
                    : "pt-4 pb-0"
                }`}
              >
                {/* Info Kiri (Icon + Teks) */}
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center border text-2xl shadow-inner ${achievement.iconBg}`}
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    {achievement.icon}
                  </div>

                  {/* Text Stack */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-broken-white font-bold text-[15px] tracking-wide leading-none">
                      {achievement.title}
                    </h3>
                    <p className="text-muted font-mono text-[10px] tracking-wider uppercase leading-none mt-1">
                      {achievement.subtitle}
                    </p>
                  </div>
                </div>

                {/* Rarity Badge Kanan */}
                <BadgePill color={achievement.badgeColor}>
                  {achievement.badgeText}
                </BadgePill>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestAchievements;
