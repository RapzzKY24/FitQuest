"use client";
import { useState, type ReactNode, type MouseEventHandler } from "react";

type CardVariant =
  | "default"
  | "elevated"
  | "stat"
  | "highlight"
  | "quest"
  | "achievement";

interface CardProps {
  variant?: CardVariant;
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Card({
  variant = "default",
  children,
  className = "", // Default string kosong
  onClick,
}: CardProps) {
  const [hovered, setHovered] = useState(false);

  // 1. Definisikan base class untuk tiap variant
  const variantClasses = {
    default: "bg-[var(--surface)] border border-[var(--border)]",
    elevated: `bg-[var(--surface)] border border-[var(--border)] cursor-pointer transition-all duration-200 ${
      hovered ? "-translate-y-1 shadow-xl" : ""
    }`,
    stat: "bg-[var(--elevated)] border border-[var(--border)]",
    highlight:
      "bg-[var(--surface)] border-t-2 border-t-[var(--primary)] border-x border-b border-[var(--border)]",
    quest: `bg-[var(--elevated)] border border-[var(--border)] transition-all duration-200 ${
      onClick ? "cursor-pointer" : "cursor-default"
    } ${hovered ? "-translate-y-0.5" : ""}`,
    achievement: `bg-[var(--elevated)] transition-all duration-200 cursor-pointer border ${
      hovered ? "border-[var(--accent)] scale-[1.05]" : "border-[var(--border)]"
    }`,
  };

  const clipPathStyle =
    variant === "stat"
      ? "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)"
      : "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // 2. Gabungkan class bawaan dengan className dari props
      className={`relative ${variantClasses[variant]} ${className}`}
      style={{ clipPath: clipPathStyle }}
    >
      {children}
    </div>
  );
}

// Komponen section juga diupdate agar menerima className
export function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`pt-[18px] px-[20px] ${className}`}>{children}</div>;
}

export function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`py-[12px] px-[20px] ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pt-[12px] px-[20px] pb-[18px] border-t border-[var(--border)] mt-1 ${className}`}
    >
      {children}
    </div>
  );
}
