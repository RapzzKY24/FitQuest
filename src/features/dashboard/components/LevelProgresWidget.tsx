import React from "react";
import { createClient } from "@/src/utils/supabase/server";
import LevelProgressClient from "./client/LevelProgressClient";

// Helper dari sebelumnya
const getLevelTitle = (lvl: number) => {
  if (lvl <= 2) return "Rookie";
  if (lvl <= 5) return "Fighter";
  if (lvl <= 9) return "Warrior";
  if (lvl <= 14) return "Iron Warrior";
  if (lvl <= 19) return "Steel Knight";
  if (lvl <= 29) return "Champion";
  if (lvl <= 39) return "Legend";
  return "GOD MODE";
};

const LevelProgressWidget = async () => {
  const supabase = await createClient();

  // 1. Cek User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. Tarik data dari View
  const { data: vDashboard, error } = await supabase
    .from("v_user_dashboard")
    .select("level, level_title, xp_current, xp_to_next, xp_pct")
    .eq("id", user.id)
    .single();

  if (error || !vDashboard) return null;

  // 3. Mapping Data
  const currentLevel = vDashboard.level || 1;
  const currentTitle = vDashboard.level_title || "Rookie";
  const nextLevel = currentLevel + 1;
  const nextTitle = getLevelTitle(nextLevel);
  const currentXp = vDashboard.xp_current || 0;
  const targetXp = vDashboard.xp_to_next || 200;

  const xpLeft = Math.max(0, targetXp - currentXp);
  const percentage =
    vDashboard.xp_pct || Math.floor((currentXp / targetXp) * 100);

  // 4. Lempar ke Client Component
  return (
    <LevelProgressClient
      currentLevel={currentLevel}
      currentTitle={currentTitle}
      nextLevel={nextLevel}
      nextTitle={nextTitle}
      currentXp={currentXp}
      targetXp={targetXp}
      xpLeft={xpLeft}
      percentage={percentage}
    />
  );
};

export default LevelProgressWidget;
