import { Card, CardContent } from "@/src/components/ui/Card";
import React from "react";

const StatisticCard = () => {
  const statsCards = [
    {
      id: 1,
      value: "18",
      subValue: "/ 42",
      label: "Total Unlocked",
      color: "text-white",
    },
    {
      id: 2,
      value: "2",
      label: "Legendary",
      color: "text-amber-500",
    },
    {
      id: 3,
      value: "4",
      label: "Epic",
      color: "text-purple-500",
    },
    {
      id: 4,
      value: "43%",
      label: "Completion",
      color: "text-orange-600",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.id} className="w-full bg-black/40" variant="stat">
            <CardContent className="flex flex-col justify-center gap-y-2">
              <div className="flex items-baseline gap-1">
                <h1
                  className={`text-4xl font-black  tracking-tighter ${stat.color}`}
                >
                  {stat.value}
                </h1>
                {stat.subValue && (
                  <span className="text-muted font-bold text-lg ">
                    {stat.subValue}
                  </span>
                )}
              </div>
              <p className="text-xxs font-bold text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StatisticCard;
