import { BadgePill } from "@/src/components/ui/badge-pill";
import React from "react";

const StreakBadgePill = () => {
  return (
    <BadgePill className=" p-6 rounded-sm flex flex-col items-center min-w-[140px] relative">
      <span className="text-4xl mb-2 drop-shadow-[0_0_10px_rgba(255,77,0,0.3)]">
        🔥
      </span>
      <h1 className="font-black text-5xl text-primary leading-none mb-1">12</h1>
      <p className="text-xxs text-muted uppercase font-bold tracking-[0.2em]">
        Day Streak
      </p>
      <p className="text-xxs text-muted uppercase mt-2 ">Best: 18</p>
    </BadgePill>
  );
};

export default StreakBadgePill;
