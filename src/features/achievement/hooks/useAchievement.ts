import { useState, useMemo } from "react";
import { Achievement } from "../components/AchievementCard";

export const useAchievements = (achievements: Achievement[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  // 1. FILTERING MAIN GRID
  const filteredAchievements = useMemo(() => {
    return achievements.filter((item) => {
      if (selectedCategory === "Semua") return true;
      if (selectedCategory === "Locked") return item.status === "locked";
      return item.rarity.toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [achievements, selectedCategory]);

  // 2. KALKULASI STATS COMPLETION
  const stats = useMemo(() => {
    const totalAchievements = achievements.length;
    const unlockedCount = achievements.filter(
      (a) => a.status === "unlocked",
    ).length;
    const lockedCount = totalAchievements - unlockedCount;

    const countRarity = (rarityStr: string) => {
      const total = achievements.filter((a) => a.rarity === rarityStr).length;
      const unlocked = achievements.filter(
        (a) => a.rarity === rarityStr && a.status === "unlocked",
      ).length;
      return { unlocked, total };
    };

    const completionRate =
      totalAchievements > 0
        ? Math.round((unlockedCount / totalAchievements) * 100)
        : 0;

    return {
      total: totalAchievements,
      unlocked: unlockedCount,
      locked: lockedCount,
      completionRate,
      rarity: {
        legendary: countRarity("legendary"),
        epic: countRarity("epic"),
        rare: countRarity("rare"),
        common: countRarity("common"),
      },
    };
  }, [achievements]);

  // 3. KALKULASI TERBARU DIBUKA
  const recentlyUnlocked = useMemo(() => {
    return [...achievements]
      .filter((a) => a.status === "unlocked" && a.unlockedAt)
      .sort(
        (a, b) =>
          new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime(),
      )
      .slice(0, 3);
  }, [achievements]);

  // 4. KALKULASI HAMPIR UNLOCKED
  const almostUnlocked = useMemo(() => {
    return [...achievements]
      .filter((a) => a.status === "in-progress" && a.progress && a.max)
      .sort((a, b) => {
        const pctA = (a.progress! / a.max!) * 100;
        const pctB = (b.progress! / b.max!) * 100;
        return pctB - pctA; // Descending
      })[0];
  }, [achievements]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredAchievements,
    stats,
    recentlyUnlocked,
    almostUnlocked,
  };
};
