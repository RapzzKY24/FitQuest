"use client";
import { BadgePill } from "@/src/components/ui/badge-pill";
import React from "react";

export type AchievementCategory =
  | "Semua"
  | "Common"
  | "Rare"
  | "Epic"
  | "Legendary"
  | "Locked";

interface BadgeCategoryProps {
  activeCategory: string;
  onSelect: (val: string) => void;
}

const BadgeCategoryAchievement = ({
  activeCategory,
  onSelect,
}: BadgeCategoryProps) => {
  const categories = ["Semua", "Common", "Rare", "Epic", "Legendary", "Locked"];

  return (
    <div className="flex items-center gap-2">
      {categories.map((cat) => (
        <div key={cat} onClick={() => onSelect(cat)} className="cursor-pointer">
          <BadgePill
            color={activeCategory === cat ? "primary" : "muted"}
            className="hover:text-white transition-colors"
          >
            {cat}
          </BadgePill>
        </div>
      ))}
    </div>
  );
};

export default BadgeCategoryAchievement;
