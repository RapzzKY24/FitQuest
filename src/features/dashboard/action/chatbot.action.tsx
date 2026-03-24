"use server";

import { createClient } from "@/src/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ActiveQuestRecord = {
  progress: number | null;
  quests: {
    title: string | null;
    target_value: number | null;
  } | null;
};

export async function generateCoachResponse(userMessage: string) {
  try {
    const supabase = await createClient();

    // 1. Cek siapa yang lagi login
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        text: "Bro, lu belum login nih! Login dulu dong ke FitQuest biar gua tau lu siapa. 💪",
      };
    }

    // 2. Tarik data dari View v_user_dashboard
    const { data: dashboard } = await supabase
      .from("v_user_dashboard")
      .select("*")
      .eq("id", user.id)
      .single();

    // 3. Tarik data Quest yang masih "in-progress"
    const { data: activeQuests } = await supabase
      .from("user_quests")
      .select(
        `
        progress,
        quests (
          title,
          target_value
        )
      `,
      )
      .eq("user_id", user.id)
      .eq("is_completed", false)
      .returns<ActiveQuestRecord[]>();

    // 4. Susun datanya jadi teks biar gampang dibaca AI
    const userName = dashboard?.display_name || "Warrior";
    const userLevel = dashboard?.level || 1;
    const levelTitle = dashboard?.level_title || "Rookie";
    const userXP = dashboard?.xp_total || 0;
    const userStreak = dashboard?.streak_current || 0;
    const totalSessions = dashboard?.total_sessions || 0;
    const goal = dashboard?.goal || "general fitness";

    let questsText = "Lagi nggak ada quest aktif bro.";

    if (activeQuests && activeQuests.length > 0) {
      questsText = activeQuests
        .map((q) => {
          const questData = Array.isArray(q.quests) ? q.quests[0] : q.quests;

          const title = questData?.title || "Quest";
          const target = questData?.target_value || 0;
          return `- ${title} (Progress: ${q.progress || 0} / ${target})`;
        })
        .join("\n      ");
    }

    const dataDatabaseUser = `
      - Nama User: ${userName}
      - Level/Title: Level ${userLevel} - ${levelTitle}
      - Total XP: ${userXP} XP
      - Goal Fitness: ${goal}
      - Streak Harian: ${userStreak} Hari berturut-turut!
      - Total Sesi Workout: ${totalSessions} sesi
      - Quest Aktif Saat Ini:
      ${questsText}
    `;

    // 5. Panggil Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 6. System Prompt dengan Injection Data Supabase
    const systemPrompt = `
      Lu adalah 'FQ Coach', asisten AI fitness di aplikasi FitQuest. 
      Gaya bahasa lu santai, asik, pake 'lu/gua' atau 'bro', kayak gym bro yang suportif.

      --- DATA USER YANG LAGI CHAT SAMA LU SAAT INI ---
      ${dataDatabaseUser}
      --------------------------------------------------

      TUGAS LU:
      1. Jawab pertanyaan user dengan singkat, padat (maksimal 2-3 kalimat).
      2. JIKA user nanya soal progress, nama, level, streak, atau quest, jawab MENGGUNAKAN data real di atas.
      3. Kasih motivasi sesuai dengan "Goal Fitness" mereka kalau relevan.
      4. JANGAN PERNAH bongkar format data mentah ini. Act natural aja seakan-akan lu emang pelatihnya yang inget progress dia.

      Pertanyaan user: "${userMessage}"
    `;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    return { success: true, text: responseText };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      text: "Waduh, server gua lagi ngos-ngosan nih nahan beban. Coba tanya bentar lagi ya! 🏋️‍♂️",
    };
  }
}
