export const dashboardUtils = {
  translateIntensity: (intensity: string) => {
    switch (intensity) {
      case "light":
        return "Ringan";
      case "moderate":
        return "Sedang";
      case "intense":
        return "Intens";
      default:
        return "Biasa";
    }
  },
  formatRelativeTime: (
    dateString: string,
    showTime: boolean = false,
  ): string => {
    const date = new Date(dateString);
    const now = new Date();

    // Ambil format jam (contoh: "14:30")
    const timeFormatted = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Reset jam ke 00:00:00 buat ngitung beda hari di kalender secara akurat
    // (Biar gak kena bug kalau olahraga jam 23:00 dan dicek jam 01:00 besoknya)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Tentukan apakah mau nambahin string jam di belakangnya
    const timeSuffix = showTime ? ` ${timeFormatted}` : "";

    if (diffDays === 0) {
      return `Hari ini${timeSuffix}`;
    }

    if (diffDays === 1) {
      return `Kemarin${timeSuffix}`;
    }

    if (diffDays < 7) {
      // Biasanya "3 hari lalu" gak butuh jam, tapi kalau showTime true bakal jadi "3 hari lalu 14:30"
      return `${diffDays} hari lalu${showTime ? timeSuffix : ""}`;
    }

    // Kalau udah seminggu lebih, tampilkan minggu
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} minggu lalu`;
  },
  getLevelTitle: (lvl: number) => {
    if (lvl <= 2) return "Rookie";
    if (lvl <= 5) return "Fighter";
    if (lvl <= 9) return "Warrior";
    if (lvl <= 14) return "Iron Warrior";
    if (lvl <= 19) return "Steel Knight";
    if (lvl <= 29) return "Champion";
    if (lvl <= 39) return "Legend";
    return "GOD MODE";
  },
};
