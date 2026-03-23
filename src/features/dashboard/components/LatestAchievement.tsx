import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { createClient } from "@/src/utils/supabase/server";
import { dashboardUtils } from "@/src/utils/DashboardUtils";
import { DashboardService } from "../services/dashboard.service";

export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export type RarityStyle = {
  border: string;
  bg: string;
  progress: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pill: "accent" | "purple" | "info" | "muted" | "default" | any;
};

const rarityConfig: Record<AchievementRarity, RarityStyle> = {
  legendary: {
    border: "border-primary",
    bg: "bg-primary/10",
    progress: "bg-primary",
    pill: "accent",
  },
  epic: {
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    progress: "bg-purple-500",
    pill: "purple",
  },
  rare: {
    border: "border-info",
    bg: "bg-info/10",
    progress: "bg-info",
    pill: "info",
  },
  common: {
    border: "border-muted",
    bg: "bg-muted/10",
    progress: "bg-muted",
    pill: "muted",
  },
};

export type UserBadgeLog = {
  earned_at: string;
  badges: {
    id: number;
    name: string;
    description: string;
    icon: string;
    rarity: AchievementRarity;
  } | null;
};

const LatestAchievements = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { recentBadges } = await DashboardService.latestAchievement(
    supabase,
    user.id,
  );

  const formattedAchievements =
    recentBadges
      ?.filter((log) => log.badges !== null)
      .map((log, index) => {
        const badge = log.badges!;
        const style = rarityConfig[badge.rarity] || rarityConfig.common;

        return {
          id: `${badge.id}-${index}`,
          title: badge.name,
          icon: badge.icon || "🏅",
          subtitle: `${badge.description} · ${dashboardUtils.formatRelativeTime(log.earned_at)}`,
          badgeText: badge.rarity.toUpperCase(),
          badgeColor: style.pill,
          iconBg: `${style.bg} ${style.border}`,
        };
      }) || [];

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] font-bold uppercase">
            Achievement Terbaru
          </span>
          <div className="flex-1 h-px bg-border mx-2 md:mx-4"></div>
          <Link
            href="/achievement"
            className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] font-semibold uppercase hover:text-broken-white transition-colors"
          >
            Lihat Semua &rarr;
          </Link>
        </div>

        <div className="flex flex-col">
          {formattedAchievements.length === 0 ? (
            <p className="text-muted text-xs md:text-sm text-center py-4">
              Belum ada achievement. Tetap semangat latihan! 💪
            </p>
          ) : (
            formattedAchievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4 ${
                  index !== formattedAchievements.length - 1
                    ? "border-b border-border/60"
                    : "pt-3 md:pt-4 pb-0"
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div
                    className={`shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border text-xl md:text-2xl shadow-inner ${achievement.iconBg}`}
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    {achievement.icon}
                  </div>

                  <div className="flex flex-col gap-1 md:gap-1.5 min-w-0">
                    <h3 className="text-broken-white font-bold text-sm md:text-[15px] tracking-wide leading-none truncate">
                      {achievement.title}
                    </h3>
                    <p className="text-muted font-mono text-[9px] md:text-[10px] tracking-wider uppercase leading-none mt-0.5 md:mt-1 truncate">
                      {achievement.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <BadgePill color={achievement.badgeColor}>
                    {achievement.badgeText}
                  </BadgePill>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestAchievements;
