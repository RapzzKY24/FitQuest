"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Target,
  Trophy,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
  LogOut,
} from "lucide-react";
import { BadgePill } from "./badge-pill";
import { signOut } from "@/src/features/auth/actions/auth.actions";
import { Button } from "./Button";

// ─── Types ───────────────────────────────────────────────────
interface SidebarUser {
  name: string;
  username: string;
  level: number;
  title: string;
  xp: number;
  xpMax: number;
  streak: number;
  avatar: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

// ─── Nav config ──────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Log Workout", href: "/log", icon: Dumbbell },
  { label: "Quest", href: "/quest", icon: Target },
  { label: "Achievement", href: "/achievement", icon: Trophy },
  { label: "Social", href: "/social", icon: Users },
  { label: "Profile", href: "/profile", icon: User },
];

// ─── clip-path constants ──────────────────────────────────────
const CC_SM =
  "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))";
const CC_XS =
  "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))";
// const CC_6 =
//   "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))";
const CC_BAR =
  "polygon(0 0,calc(100% - 3px) 0,100% 3px,100% 100%,3px 100%,0 calc(100% - 3px))";

// ─── Tooltip (muncul saat collapsed) ─────────────────────────
function Tooltip({ label }: { label: string }) {
  return (
    <div
      style={{ clipPath: CC_XS }}
      className="absolute left-full ml-3 px-3 py-1.5 z-50 bg-elevated border border-border f-dm text-[11px] font-semibold text-broken-white whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
    >
      {label}
    </div>
  );
}

// ─── XP Bar ──────────────────────────────────────────────────
function XPBar({ xp, xpMax }: { xp: number; xpMax: number }) {
  const pct = Math.min((xp / xpMax) * 100, 100);
  return (
    <div
      style={{ clipPath: CC_BAR }}
      className="h-1 w-full bg-elevated overflow-hidden"
    >
      <div
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, #FF4D00, #FF8C42)",
          transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
        className="h-full"
      />
    </div>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────
// ─── Mock user (hapus setelah useAuth jalan) ─────────────────
const MOCK_USER: SidebarUser = {
  name: "Budi Warrior",
  username: "budiwarrior",
  level: 7,
  title: "Iron Warrior",
  xp: 340,
  xpMax: 600,
  streak: 12,
  avatar: "💪",
};

interface SidebarProps {
  user?: SidebarUser; // optional — fallback ke MOCK_USER
  onSignOut?: () => void;
}

export function Sidebar({ user = MOCK_USER }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const onUserSignOut = () => {
    localStorage.clear();
    signOut();
  };

  return (
    <aside
      className={`relative flex flex-col h-screen shrink-0 bg-surface border-r border-border transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-[220px]"
      }`}
    >
      {/* ── Collapse toggle ── */}
      <button
        type="button"
        onClick={() => setCollapsed((p) => !p)}
        style={{ clipPath: CC_XS }}
        className="absolute -right-3 top-6 z-10 w-6 h-6 flex items-center justify-center bg-elevated border border-border text-muted hover:text-broken-white hover:border-primary/50 transition-all duration-150"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* ── Logo ── */}
      <div
        className={`flex items-center border-b border-border ${
          collapsed ? "px-3.5 py-4 justify-center" : "px-5 py-4 gap-3"
        }`}
      >
        <div
          style={{ clipPath: CC_SM }}
          className="w-8 h-8 shrink-0 flex items-center justify-center bg-primary"
        >
          <Zap size={15} fill="white" className="text-white" />
        </div>

        {!collapsed && (
          <span className="t-heading text-base tracking-widest text-broken-white leading-none">
            FitQuest
          </span>
        )}
      </div>

      {/* ── User card ── */}
      <div
        className={`border-b border-border ${
          collapsed ? "px-3 py-4" : "px-4 py-4"
        }`}
      >
        {collapsed ? (
          /* Avatar only */
          <div className="group relative flex justify-center">
            <div
              style={{ clipPath: CC_SM }}
              className="w-9 h-9 flex items-center justify-center bg-elevated text-xl"
            >
              {user.avatar}
            </div>
            <Tooltip label={`${user.name} · Lv.${user.level}`} />
          </div>
        ) : (
          /* Full user info */
          <div className="space-y-3">
            {/* Avatar + name row */}
            <div className="flex items-center gap-3">
              <div
                style={{ clipPath: CC_SM }}
                className="w-10 h-10 shrink-0 flex items-center justify-center bg-elevated text-xl"
              >
                {user.avatar}
              </div>
              <div className="min-w-0">
                <p className="t-eyebrow text-[9px] truncate">{user.title}</p>
                <p className="f-dm font-bold text-sm text-broken-white truncate leading-tight">
                  {user.name}
                </p>
                <p className="f-mono text-[9px] text-muted truncate">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* Level + XP bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="f-mono text-[9px] text-muted tracking-widest uppercase">
                  LV.{user.level}
                </span>
                <span className="f-mono text-[9px] text-muted">
                  <span className="text-broken-white font-bold">{user.xp}</span>
                  {" / "}
                  {user.xpMax} XP
                </span>
              </div>
              <XPBar xp={user.xp} xpMax={user.xpMax} />
            </div>

            {/* Streak badge */}
            <BadgePill className="w-full">
              <Flame size={12} className="text-primary mr-2" /> {user.streak}{" "}
              Day Streak
            </BadgePill>
          </div>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {!collapsed && (
          <p className="fq-section-label px-5 !mb-2 !text-[9px]">Menu</p>
        )}

        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{ clipPath: CC_SM }}
                  className={`group relative flex items-center gap-3 py-2.5 outline-none border-l-2 transition-all duration-150 ${
                    collapsed ? "justify-center px-2" : "px-3"
                  } ${
                    isActive
                      ? "bg-primary/10 border-primary text-broken-white"
                      : "border-transparent text-muted hover:bg-white/[0.03] hover:text-broken-white"
                  }`}
                >
                  <Icon
                    size={16}
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted group-hover:text-broken-white"
                    }`}
                  />

                  {!collapsed && (
                    <span className="f-dm font-semibold text-sm leading-none flex-1">
                      {item.label}
                    </span>
                  )}

                  {!collapsed && item.badge != null && item.badge > 0 && (
                    <span
                      style={{ clipPath: CC_XS }}
                      className="f-mono text-[8px] font-bold px-1.5 py-0.5 bg-primary text-white leading-none"
                    >
                      {item.badge}
                    </span>
                  )}

                  {collapsed && <Tooltip label={item.label} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Sign out ── */}
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          type="button"
          onClick={onUserSignOut}
          style={{ clipPath: CC_SM }}
          className={`group relative w-full flex items-center gap-3 py-2.5 text-muted hover:text-danger hover:bg-danger/5 transition-all duration-150 ${
            collapsed ? "justify-center px-2" : "px-3"
          }`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && (
            <span className="f-dm font-semibold text-sm">Sign Out</span>
          )}
          {collapsed && <Tooltip label="Sign Out" />}
        </Button>
      </div>
    </aside>
  );
}
