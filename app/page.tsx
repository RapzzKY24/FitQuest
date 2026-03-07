"use client";
import { useState } from "react";

// ── Imports UI Dasar ──
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { Dialog } from "@/components/ui/Dialog";
import { BadgePill } from "@/components/ui/badge-pill";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

// ── Imports Form Kit ──
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { Toggle } from "@/components/ui/Toggle";
import { Tabs } from "@/components/ui/Tabs";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { useToast, ToastContainer } from "@/components/ui/Toast";

// ── Mock Data ──
const WORKOUT_OPTIONS = [
  { value: "run", label: "Running", icon: "🏃" },
  { value: "pushup", label: "Push-up", icon: "💪" },
  { value: "gym", label: "Gym / Lift", icon: "🏋️" },
];

const GOAL_OPTIONS = [
  {
    value: "lose",
    label: "Lose Weight",
    icon: "📉",
    description: "Reduce body fat & improve cardio",
  },
  {
    value: "muscle",
    label: "Gain Muscle",
    icon: "💪",
    description: "Build strength & mass",
  },
];

const QUEST_TABS = [
  { value: "daily", label: "Daily", icon: "📅", badge: "3" },
  { value: "weekly", label: "Weekly", icon: "📆", badge: "2" },
  { value: "special", label: "Special", icon: "⭐" },
];

export default function FitQuestDemoPage() {
  // State Dialogs
  const [dialogs, setDialogs] = useState({
    default: false,
    danger: false,
    levelup: false,
    quest: false,
  });

  const openDialog = (k: keyof typeof dialogs) =>
    setDialogs((p) => ({ ...p, [k]: true }));
  const closeDialog = (k: keyof typeof dialogs) =>
    setDialogs((p) => ({ ...p, [k]: false }));

  // State Toasts
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  // State Forms
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState("");
  const [workout, setWorkout] = useState("");
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState(50);
  const [tabVal, setTabVal] = useState("daily");

  // State Controls
  const [checks, setChecks] = useState({ pushup: true, run: false });
  const [goal, setGoal] = useState("muscle");
  const [toggles, setToggles] = useState({ notif: true, darkmode: true });

  const toggleCheck = (k: keyof typeof checks) =>
    setChecks((p) => ({ ...p, [k]: !p[k] }));
  const handleToggle = (k: keyof typeof toggles) =>
    setToggles((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="fq">
      <div style={{ maxWidth: 900, margin: "0 auto", paddingBottom: "100px" }}>
        <div style={{ marginBottom: 56 }}>
          <p className="t-eyebrow" style={{ marginBottom: 8 }}>
            UI Component Library · Ultimate
          </p>
          <h1
            className="t-display"
            style={{
              fontSize: "3.5rem",
              color: "var(--text)",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            FitQuest <span style={{ color: "var(--primary)" }}>UI KIT</span>
          </h1>
          <p className="t-body" style={{ color: "var(--muted)", fontSize: 14 }}>
            Semua komponen dari fase 1 dan 2 digabung di sini bro!
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            PHASE 1: BASIC UI COMPONENTS
            ═══════════════════════════════════════════════════════════ */}

        {/* ── BUTTONS ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Buttons</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <Button variant="primary" icon="🔥">
              Log Workout
            </Button>
            <Button variant="secondary" icon="⚔️">
              Challenge
            </Button>
            <Button variant="outline" icon="🎯">
              View Quests
            </Button>
            <Button variant="success" icon="✓">
              Quest Done
            </Button>
            <Button variant="danger" icon="✕">
              Delete Log
            </Button>
            <Button variant="ghost" iconRight="→">
              See All
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Saving...</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* ── BADGE PILLS ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Badge Pills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <BadgePill color="primary">🔥 Streak Active</BadgePill>
            <BadgePill color="accent">⚡ Level 12</BadgePill>
            <BadgePill color="success">✓ Quest Done</BadgePill>
            <BadgePill color="info">🏃 Cardio</BadgePill>
            <BadgePill color="muted">Locked</BadgePill>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Cards (Semua Varian)</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
              gap: 12,
            }}
          >
            <Card variant="default">
              <CardHeader>
                <p className="t-eyebrow" style={{ marginBottom: 4 }}>
                  Default Card
                </p>
                <h3
                  className="t-heading"
                  style={{ fontSize: "1.3rem", color: "var(--text)" }}
                >
                  Daily Summary
                </h3>
              </CardHeader>
              <CardContent>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  Surface card dengan cut corner. Digunakan untuk konten umum.
                </p>
              </CardContent>
              <CardFooter
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <BadgePill color="muted">General</BadgePill>
                <Button size="sm" variant="ghost" iconRight="→">
                  Detail
                </Button>
              </CardFooter>
            </Card>

            <Card variant="stat">
              <CardContent style={{ padding: "20px", textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                >
                  1,240
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    color: "var(--muted)",
                    marginTop: 6,
                  }}
                >
                  Total XP
                </p>
                <div
                  style={{
                    marginTop: 12,
                    height: 4,
                    background: "var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: "68%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg,var(--primary),var(--secondary))",
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card variant="quest">
              <CardContent style={{ padding: "16px 18px" }}>
                <div
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      background: "rgba(255,77,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      clipPath:
                        "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))",
                    }}
                  >
                    💪
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <h4
                        className="t-heading"
                        style={{ fontSize: "1rem", color: "var(--text)" }}
                      >
                        Push It
                      </h4>
                      <BadgePill color="accent">+80 XP</BadgePill>
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 12,
                        color: "var(--muted)",
                        marginBottom: 8,
                      }}
                    >
                      Do 3 sets of push-ups today
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="highlight">
              <CardHeader>
                <p className="t-eyebrow" style={{ marginBottom: 4 }}>
                  Highlight Card
                </p>
                <h3
                  className="t-heading"
                  style={{ fontSize: "1.3rem", color: "var(--text)" }}
                >
                  Featured Content
                </h3>
              </CardHeader>
              <CardContent>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  Border atas orange. Digunakan untuk konten penting / featured.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── ALERTS ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Alerts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Alert variant="xp" title="Morning Warrior">
              Kamu menyelesaikan workout sebelum jam 10! Bonus{" "}
              <strong style={{ color: "var(--accent)" }}>
                +50 XP early bird
              </strong>{" "}
              telah ditambahkan.
            </Alert>
            <Alert variant="warning" title="Streak Warning">
              Kamu belum olahraga hari ini. Streak 7 hari akan{" "}
              <strong style={{ color: "var(--warning)" }}>hilang besok</strong>{" "}
              jika kamu skip hari ini.
            </Alert>
            <Alert variant="info" title="Challenge Request">
              Rafi A. mengirim 1v1 challenge. Expired dalam 24 jam.
            </Alert>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            PHASE 2: FORM KIT COMPONENTS
            ═══════════════════════════════════════════════════════════ */}

        {/* ── INPUTS & TEXTAREA ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Inputs & Textarea</div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            <Input
              label="Username"
              placeholder="gym_warrior"
              hint="Akan tampil di leaderboard"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="kamu@email.com"
              success={username.length > 3 ? "Email tersedia!" : undefined}
            />
            <Input
              label="Search"
              prefixNode="🔍"
              placeholder="Cari workout..."
            />
            <Input
              label="Disabled State"
              disabled
              placeholder="Tidak bisa diedit"
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Textarea
              label="Catatan Sesi"
              placeholder="Gimana rasanya workout hari ini?"
              hint="Maksimal 200 karakter"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* ── SELECT & SLIDERS ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Select & Sliders</div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Select
                label="Jenis Olahraga"
                options={WORKOUT_OPTIONS}
                placeholder="Pilih olahraga..."
                value={workout}
                onChange={setWorkout}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                background: "var(--surface)",
                padding: 20,
                border: "1px solid var(--border)",
                clipPath:
                  "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
              }}
            >
              <Slider
                label="Durasi Olahraga"
                min={5}
                max={120}
                step={5}
                value={duration}
                onChange={setDuration}
                unit=" min"
              />
              <Slider
                label="Intensitas"
                min={0}
                max={100}
                step={1}
                value={intensity}
                onChange={setIntensity}
                variant="intensity"
              />
            </div>
          </div>
        </div>

        {/* ── CHECKBOX & RADIO ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Checkbox + Radio</div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: 20,
                clipPath:
                  "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",
              }}
            >
              <p
                className="t-heading"
                style={{
                  fontSize: "1rem",
                  color: "var(--text)",
                  marginBottom: 14,
                }}
              >
                Preferensi Olahraga
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <Checkbox
                  label="Push-up"
                  checked={checks.pushup}
                  onChange={() => toggleCheck("pushup")}
                  description="Strength training"
                />
                <Checkbox
                  label="Running"
                  checked={checks.run}
                  onChange={() => toggleCheck("run")}
                  description="Cardio & endurance"
                />
              </div>
            </div>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: 20,
                clipPath:
                  "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",
              }}
            >
              <p
                className="t-heading"
                style={{
                  fontSize: "1rem",
                  color: "var(--text)",
                  marginBottom: 14,
                }}
              >
                Tujuan Utama
              </p>
              <Radio
                name="goal"
                options={GOAL_OPTIONS}
                value={goal}
                onChange={setGoal}
              />
            </div>
          </div>
        </div>

        {/* ── TOGGLES ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Toggles</div>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: 24,
              clipPath:
                "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Toggle
                  label="Push Notification"
                  description="Notifikasi reminder workout"
                  checked={toggles.notif}
                  onChange={() => handleToggle("notif")}
                />
              </div>
              <div
                style={{
                  padding: "12px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Toggle
                  label="Dark Mode"
                  description="Gunakan tema gelap"
                  checked={toggles.darkmode}
                  onChange={() => handleToggle("darkmode")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Tabs (3 Variants)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 8,
                  letterSpacing: 2,
                }}
              >
                UNDERLINE
              </p>
              <Tabs
                tabs={QUEST_TABS}
                value={tabVal}
                onChange={setTabVal}
                variant="underline"
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 8,
                  letterSpacing: 2,
                }}
              >
                PILL
              </p>
              <Tabs
                tabs={QUEST_TABS}
                value={tabVal}
                onChange={setTabVal}
                variant="pill"
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 8,
                  letterSpacing: 2,
                }}
              >
                CARD
              </p>
              <Tabs
                tabs={QUEST_TABS}
                value={tabVal}
                onChange={setTabVal}
                variant="card"
              />
            </div>
          </div>
        </div>

        {/* ── SKELETON LOADER ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Skeleton Loader</div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            <SkeletonCard />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[80, 60, 90, 50, 70].map((w, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <Skeleton
                    width={36}
                    height={36}
                    circle
                    style={{ flexShrink: 0 }}
                  />
                  <Skeleton width={`${w}%`} height={14} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TRIGGERS (DIALOG & TOAST) ── */}
        <div style={{ marginBottom: 56 }}>
          <div className="fq-section-label">Dialog & Toast Triggers</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Button variant="outline" onClick={() => openDialog("default")}>
              Buka Default Dialog
            </Button>
            <Button variant="danger" onClick={() => openDialog("danger")}>
              Buka Danger Dialog
            </Button>
            <Button
              variant="primary"
              icon="⚡"
              onClick={() => openDialog("levelup")}
            >
              Buka Dialog Level Up!
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  type: "success",
                  title: "Berhasil",
                  message: "Data tersimpan.",
                })
              }
            >
              Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  type: "xp",
                  title: "+120 XP",
                  message: "Workout selesai.",
                })
              }
            >
              XP Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  type: "danger",
                  title: "Error",
                  message: "Gagal menyimpan log.",
                })
              }
            >
              Error Toast
            </Button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          DIALOG RENDERERS & TOAST CONTAINER
          ═══════════════════════════════════════════════════════════ */}

      <Dialog
        open={dialogs.default}
        onClose={() => closeDialog("default")}
        title="Log Workout"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => closeDialog("default")}>
              Cancel
            </Button>
            <Button variant="primary" icon="🔥">
              Save Session
            </Button>
          </>
        }
      >
        <p>Form log workout biasa ditaruh di sini bro.</p>
      </Dialog>

      <Dialog
        open={dialogs.danger}
        onClose={() => closeDialog("danger")}
        title="Delete This Log?"
        variant="danger"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => closeDialog("danger")}>
              Cancel
            </Button>
            <Button variant="danger" icon="✕">
              Yes, Delete
            </Button>
          </>
        }
      >
        <p>Sesi workout ini akan dihapus permanen.</p>
        <br />
        <Alert variant="warning">
          XP yang sudah didapat tidak akan dikembalikan.
        </Alert>
      </Dialog>

      <Dialog
        open={dialogs.levelup}
        onClose={() => closeDialog("levelup")}
        title="You Leveled Up!"
        variant="levelup"
        size="sm"
        footer={
          <Button
            variant="primary"
            onClick={() => closeDialog("levelup")}
            icon="⚡"
          >
            Awesome!
          </Button>
        }
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "4rem",
              fontWeight: 700,
              color: "var(--primary)",
            }}
          >
            13
          </div>
          <p
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "var(--accent)",
            }}
          >
            Iron Warrior
          </p>
        </div>
      </Dialog>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
