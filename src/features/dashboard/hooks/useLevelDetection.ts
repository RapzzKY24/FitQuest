import { useState, useEffect } from "react";

export const useLevelDetection = (currentLevel: number) => {
  const [showLevelUpDialog, setShowLevelUpDialog] = useState(false);

  useEffect(() => {
    // Ambil data level terakhir dari browser
    const savedLevelStr = localStorage.getItem("fitquest_last_level");

    if (savedLevelStr) {
      const savedLevel = parseInt(savedLevelStr, 10);
      // Kalau level dari prop > level di browser, berarti NAIK LEVEL!
      if (currentLevel > savedLevel) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowLevelUpDialog(true);
      }
    }

    // Selalu update browser dengan level terbaru, biar gak spam dialog
    localStorage.setItem("fitquest_last_level", currentLevel.toString());
  }, [currentLevel]);

  // Fungsi helper untuk menutup dialog
  const closeLevelUpDialog = () => setShowLevelUpDialog(false);

  return {
    showLevelUpDialog,
    closeLevelUpDialog,
  };
};
