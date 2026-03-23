"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Trophy,
  MoreHorizontal,
  User,
  Users,
  Dumbbell,
  Target,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

// ─────────────────────────────────────────────────────────
// NAV CONFIG
// ─────────────────────────────────────────────────────────

const LEFT_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Home",
    icon: <LayoutDashboard size={20} strokeWidth={1.8} />,
  },
  {
    href: "/quest",
    label: "Quest",
    icon: <Target size={20} strokeWidth={1.8} />,
  },
];

const RIGHT_ITEMS: NavItem[] = [
  {
    href: "/achievement",
    label: "Achievement",
    icon: <Trophy size={20} strokeWidth={1.8} />,
  },
  // placeholder — replaced by MoreMenu
  {
    href: "#more",
    label: "Lainnya",
    icon: <MoreHorizontal size={20} strokeWidth={1.8} />,
  },
];

const MORE_ITEMS: NavItem[] = [
  {
    href: "/social",
    label: "Social",
    icon: <Users size={18} strokeWidth={1.8} />,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: <User size={18} strokeWidth={1.8} />,
  },
];

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────

/** Single nav button */
const NavBtn = ({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={item.href}
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative group"
  >
    {/* active indicator pill */}
    {active && (
      <span
        className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary"
        style={{
          clipPath:
            "polygon(0 0,calc(100% - 2px) 0,100% 2px,100% 100%,2px 100%,0 calc(100% - 2px))",
        }}
      />
    )}

    <span
      className={`transition-colors duration-150 ${
        active ? "text-primary" : "text-muted group-hover:text-broken-white"
      }`}
    >
      {item.icon}
    </span>

    <span
      className={`f-mono text-[7px] uppercase tracking-[2px] transition-colors duration-150 ${
        active ? "text-primary" : "text-muted group-hover:text-broken-white"
      }`}
    >
      {item.label}
    </span>
  </Link>
);

// ─────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────

export const BottomNav = () => {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const isMoreActive = MORE_ITEMS.some((i) => isActive(i.href));

  return (
    <>
      {/* ── MORE POPOVER (compact, above button) ── */}
      {moreOpen && (
        <>
          {/* invisible backdrop — closes on tap outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMoreOpen(false)}
          />

          {/*
           * Popover anchored above the "Lainnya" button.
           * right-0 aligns it to the right edge of the screen,
           * bottom-[60px] = sits just above the nav bar.
           */}
          <div
            className="fixed right-3 bottom-[68px] z-50 bg-surface border border-border"
            style={{
              clipPath:
                "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
              animation: "popUp .18s ease both",
              minWidth: 160,
              /* little arrow pointing down-right */
            }}
          >
            {/* arrow tip */}
            <div className="absolute -bottom-[5px] right-6 w-2.5 h-2.5 bg-surface border-r border-b border-border rotate-45" />

            {MORE_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                className={[
                  "flex items-center gap-3 px-4 py-3 transition-colors",
                  i < MORE_ITEMS.length - 1 ? "border-b border-border" : "",
                  isActive(item.href)
                    ? "text-primary bg-primary/5"
                    : "text-muted hover:text-broken-white hover:bg-white/2",
                ].join(" ")}
              >
                {item.icon}
                <span className="f-mono text-[10px] uppercase tracking-[2px] font-bold">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ── BOTTOM NAV BAR ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border"
        style={{ height: 60 }}
      >
        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px" />

        <div className="flex items-stretch h-full relative">
          {/* ── LEFT ITEMS ── */}
          {LEFT_ITEMS.map((item) => (
            <NavBtn key={item.href} item={item} active={isActive(item.href)} />
          ))}

          {/* ── CENTER SPACER (for FAB) ── */}
          <div className="flex-1" />

          {/* ── RIGHT ITEMS ── */}
          {RIGHT_ITEMS.map((item) =>
            item.href === "#more" ? (
              /* More button */
              <button
                key="more"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative group"
              >
                {isMoreActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary"
                    style={{
                      clipPath:
                        "polygon(0 0,calc(100% - 2px) 0,100% 2px,100% 100%,2px 100%,0 calc(100% - 2px))",
                    }}
                  />
                )}
                <MoreHorizontal
                  size={20}
                  strokeWidth={1.8}
                  className={`transition-colors ${
                    isMoreActive || moreOpen
                      ? "text-primary"
                      : "text-muted group-hover:text-broken-white"
                  }`}
                />
                <span
                  className={`f-mono text-[7px] uppercase tracking-[2px] transition-colors ${
                    isMoreActive || moreOpen
                      ? "text-primary"
                      : "text-muted group-hover:text-broken-white"
                  }`}
                >
                  Lainnya
                </span>
              </button>
            ) : (
              <NavBtn
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ),
          )}
        </div>

        {/* ── CENTER FAB — Log Workout ── */}
        {/*
         * Positioned absolute, centered, lifts above the nav bar.
         * bottom: calc(60px / 2) centers it vertically relative to nav,
         * then we push it up more so it floats nicely.
         */}
        <Link
          href="/log"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: 0 }} /* top:0 = top edge of nav, -50% = floats up */
        >
          <span
            className="relative flex items-center justify-center rounded-full bg-primary"
            style={{
              width: 52,
              height: 52,
              boxShadow: "0 4px 20px rgba(255,77,0,.5), 0 0 0 3px #0a0a0a",
              transition: "transform .15s, box-shadow .15s",
            }}
          >
            <Dumbbell size={22} strokeWidth={2.2} className="text-white" />
          </span>

          {/* label below FAB */}
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 f-mono text-[7px] uppercase tracking-[2px] text-primary whitespace-nowrap">
            Log
          </span>
        </Link>
      </nav>

      {/* keyframes */}
      <style>{`
        @keyframes fabRing {
          0%,100%{transform:scale(1);opacity:.4;}
          50%{transform:scale(1.15);opacity:.9;}
        }
        @keyframes popUp {
          from{opacity:0;transform:translateY(8px) scale(.97);}
          to{opacity:1;transform:translateY(0) scale(1);}
        }
      `}</style>
    </>
  );
};

export default BottomNav;
