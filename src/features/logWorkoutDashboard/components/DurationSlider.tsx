"use client";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { Slider } from "@/src/components/ui/Slider";
import React, { useState } from "react";

export const DurationSlider = () => {
  const [duration, setDuration] = useState(30);

  const MockDataSliderTime = [
    { id: 1, duration: 15 },
    { id: 2, duration: 30 },
    { id: 3, duration: 45 },
    { id: 4, duration: 60 },
    { id: 5, duration: 75 },
    { id: 6, duration: 80 },
  ];

  return (
    <section>
      <Card className="w-full  bg-black/40">
        <CardHeader className="flex flex-row justify-between items-center">
          <h1 className="text-sm font-bold tracking-[0.3em] uppercase text-muted">
            Duration
          </h1>
          <h2 className="text-2xl font-bold tracking-[0.3em] uppercase text-primary">
            {duration}
            <span className="text-muted text-sm ml-1">Menit</span>
          </h2>
        </CardHeader>

        <CardContent className="space-y-4">
          {" "}
          <Slider
            min={5}
            max={120}
            step={5}
            value={duration}
            onChange={(val) => setDuration(val)}
            unit=" min"
          />
          <div className="flex items-center justify-between px-1">
            {MockDataSliderTime.map((time) => (
              <h1
                key={time.id}
                className={`text-sm font-bold transition-colors ${
                  duration === time.duration ? "text-primary" : "text-muted/50"
                }`}
              >
                {time.duration}m
              </h1>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
