"use client";
import { useState, type ReactNode, type CSSProperties, type MouseEventHandler } from "react";

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

interface CardSectionProps {
  children?: ReactNode;
  style?: CSSProperties;
}

export function Card({
  variant = "default",
  children,
  className = "",
  onClick,
}: CardProps) {
  const [hovered, setHovered] = useState(false);

  const variants = {
    default: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      clipPath:
        "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
    },
    elevated: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      clipPath:
        "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
      transform: hovered ? "translateY(-4px)" : "none",
      boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4)" : "none",
      transition: "all 0.2s ease",
      cursor: "pointer",
    },
    stat: {
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)",
    },
    highlight: {
      background: "var(--surface)",
      borderTop: "2px solid var(--primary)",
      borderRight: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      borderLeft: "1px solid var(--border)",
      clipPath:
        "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
    },
    quest: {
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      clipPath:
        "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
      transform: hovered ? "translateY(-3px)" : "none",
      transition: "all 0.2s ease",
      cursor: onClick ? "pointer" : "default",
    },
    achievement: {
      background: "var(--elevated)",
      border: hovered ? "1px solid var(--accent)" : "1px solid var(--border)",
      clipPath:
        "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
      transform: hovered ? "scale(1.03)" : "none",
      transition: "all 0.2s ease",
      cursor: "pointer",
    },
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        ...variants[variant as keyof typeof variants],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, style }: CardSectionProps) {
  return <div style={{ padding: "18px 20px 0", ...style }}>{children}</div>;
}

export function CardContent({ children, style }: CardSectionProps) {
  return <div style={{ padding: "12px 20px", ...style }}>{children}</div>;
}

export function CardFooter({ children, style }: CardSectionProps) {
  return (
    <div
      style={{
        padding: "12px 20px 18px",
        borderTop: "1px solid var(--border)",
        marginTop: 4,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
