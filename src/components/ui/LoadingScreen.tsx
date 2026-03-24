"use client";

import React, { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const duration = 800;
    const intervalTime = 16;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (!isMounted) return;
      currentStep++;

      const easeOut = 1 - Math.pow(1 - currentStep / steps, 4);
      const currentProgress = Math.min(Math.floor(easeOut * 100), 100);

      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          if (!isMounted) return;
          setIsExiting(true);
          setTimeout(() => setIsVisible(false), 500);
        }, 150);
      }
    }, intervalTime);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-100 bg-background flex flex-col items-center justify-center transition-transform duration-500 cubic-bezier(0.87, 0, 0.13, 1) ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center w-full max-w-sm px-8">
        {/* LOGO SOLID */}
        <div className="w-16 h-16 flex items-center justify-center bg-primary cc mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        {/* TEXT, TAGLINE & COUNTER */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-end w-full mb-1">
            <span className="f-barlow font-black text-4xl tracking-widest text-broken-white uppercase">
              FIT<span className="text-primary italic">QUEST</span>
            </span>
            <span className="f-mono font-bold text-3xl text-primary leading-none tracking-tighter">
              {progress}
              <span className="text-base text-muted">%</span>
            </span>
          </div>

          {/* TAGLINE BARU LU DI SINI BANG 🔥 */}
          <div className="w-full text-left mb-4">
            <span className="f-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted font-bold">
              Burn Calories <span className="text-primary">Earn Trophies.</span>
            </span>
          </div>

          {/* PROGRESS BAR SOLID */}
          <div className="w-full h-1.5 bg-surface overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
