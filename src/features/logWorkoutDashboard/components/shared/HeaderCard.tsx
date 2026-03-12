import { CardHeader } from "@/src/components/ui/Card";
import React from "react";

type HeaderCardProps = {
  title: string;
};

const HeaderCard = ({ title }: HeaderCardProps) => {
  return (
    <CardHeader>
      <div className="flex items-center gap-4 w-full mb-2">
        <h1 className="text-sm font-bold tracking-[0.3em] uppercase text-muted">
          {title}
        </h1>
        <div className="h-px flex-1 bg-border " />
      </div>
    </CardHeader>
  );
};

export default HeaderCard;
