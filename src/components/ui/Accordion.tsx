"use client";
import React, { useState } from "react";
import { C } from "./Theme";

export interface AccordionItem {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((p) =>
        p.includes(id) ? p.filter((i) => i !== id) : [...p, id],
      );
    } else {
      setOpenIds((p) => (p.includes(id) ? [] : [id]));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            style={{
              background: C.surface,
              border: `1px solid ${isOpen ? C.primary : C.border}`,
              clipPath:
                "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
              transition: "border-color 0.3s",
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              style={{
                width: "100%",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isOpen ? C.primary : C.text,
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {item.title}
              <span
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                  fontSize: 14,
                }}
              >
                ▼
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease-in-out",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: "0 16px 16px",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: C.muted,
                    lineHeight: 1.6,
                  }}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
