import React from "react";
import { createClient } from "@/src/utils/supabase/server";
import LevelProgressClient from "./client/LevelProgressClient";
import { dashboardUtils } from "@/src/utils/DashboardUtils";
import { DashboardService } from "../services/dashboard.service";

const LevelProgressWidget = async () => {
  const supabase = await createClient();

  // 1. Cek User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const response = await DashboardService.levelProgres(supabase, user.id);

  if (!response) return null;

  const { vDashboard } = response;

  // 3. Mapping Data
  const currentLevel = vDashboard.level || 1;
  const currentTitle = vDashboard.level_title || "Rookie";
  const nextLevel = currentLevel + 1;
  const nextTitle = dashboardUtils.getLevelTitle(nextLevel);
  const currentXp = vDashboard.xp_current || 0;
  const targetXp = vDashboard.xp_to_next || 200;

  const xpLeft = Math.max(0, targetXp - currentXp);
  const percentage =
    vDashboard.xp_pct || Math.floor((currentXp / targetXp) * 100);

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
