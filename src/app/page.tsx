"use client";
import {useState, useEffect} from "react";
import {motion, useScroll, useTransform, AnimatePresence} from "motion/react";
import {
  Zap,
  ChevronRight,
  LayoutGrid,
  Users,
  Bell,
  Flame,
  Target,
  Award,
  TrendingUp,
  Menu,
  X,
  Trophy,
  Instagram,
  Twitter,
  Music,
  MessageSquare,
  Dumbbell,
  Dot,
} from "lucide-react";
import Link from "next/link";
import {Button} from "@/src/components/ui/Button";
import Image from "next/image";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {scrollYProgress} = useScroll();

  // Transition section background color transform
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.3, 0.45],
    ["#121212", "#FFFFFF"],
  );

  const textColor = useTransform(
    scrollYProgress,
    [0.3, 0.45],
    ["#FFFFFF", "#121212"],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div style={{backgroundColor}} className="min-h-screen">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-surface/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href={"#"}>
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-sm">
                <Zap className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tighter text-white uppercase italic">
                FitQuest
              </span>
            </div>
          </Link>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Beranda", "Fitur", "FAQ"].map((item) => (
              <a
                key={item}
                href={`${item === "Beranda" ? `#` : ` #${item.toLowerCase().replace(" ", "-")}`}`}
                className="text-sm font-semibold text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Right: Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href={"/auth/login"}>
              <Button size="sm">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              className="absolute top-full left-0 right-0 bg-surface border-t border-white/10 p-6 flex flex-col gap-4 md:hidden">
              {["Beranda", "Fitur", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`${item === "Beranda" ? `#` : ` #${item.toLowerCase().replace(" ", "-")}`}`}
                  className="text-lg font-bold text-white/80"
                  onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <hr className="border-white/10" />
              <Link href={"/auth/login"}>
                <Button className="w-full">Login</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Background Image with Blur and Grid */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full opacity-30 lg:opacity-40 blur-[2px]">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
              alt="Athlete Training"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
          {/* Geometric Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10 lg:opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #FF6B00 2px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{opacity: 0, x: -30}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8, ease: "easeOut", delay: 1.5}}
            className="text-center lg:text-left">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter italic uppercase text-white mb-8">
              Burn <span className="text-primary text-glow">Calories</span>
              <br />
              Earn <span className="text-primary text-glow">Trophies</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Ubah setiap tetes keringat menjadi pencapaian. FitQuest
              menggabungkan performa atletik dengan petualangan digital yang
              memacu adrenalin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 lg:mb-0">
              <Link href={"/auth/register"}>
                <Button>Mulai Petualangan</Button>
              </Link>
              <Link href={"#fitur"}>
                <Button variant="outline">Pelajari Fitur</Button>
              </Link>
            </div>
          </motion.div>

          {/* Gamified Hook Card */}
          <motion.div
            initial={{opacity: 0, x: 30}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1, delay: 1.5}}
            className="relative w-full max-w-sm sm:max-w-md mx-auto lg:ml-auto">
            <div className="bg-surface/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden text-left">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />

              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="font-mono text-[10px] sm:text-xs font-bold text-primary tracking-widest uppercase">
                  {"//"} Notification
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-primary flex items-center justify-center bg-background">
                    <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-primary fill-current" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                    LVL 19
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold italic uppercase leading-none mb-1">
                    LEVEL UP!
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-medium">
                    Steel Knight Arrived
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/5">
                <p className="text-xs sm:text-sm leading-relaxed">
                  <span className="text-primary font-bold">Abilll</span> baru
                  saja mencapai{" "}
                  <span className="text-white font-bold">
                    Level 19 Steel Knight!
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-surface bg-white/10 overflow-hidden relative">
                      <Image
                        fill
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                      />
                    </div>
                  ))}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-[8px] sm:text-[10px] font-bold">
                    +42
                  </div>
                </div>
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </div>

            {/* Floating Elements - Hidden on very small screens, adjusted for mobile */}
            <motion.div
              animate={{y: [0, -10, 0]}}
              transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
              className="absolute -top-6 -right-4 sm:-top-10 sm:-right-10 bg-primary p-3 sm:p-4 rounded-xl shadow-lg z-20">
              <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{y: [0, 15, 0]}}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-10 bg-white p-3 sm:p-4 rounded-xl shadow-lg z-20">
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM/SOLUTION TRANSITION */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8}}>
            <motion.h2
              style={{color: textColor}}
              className="font-display text-5xl md:text-8xl font-bold italic uppercase tracking-tighter leading-none">
              UBAH KERINGAT JADI KEMENANGAN.
              <br />
              <span className="text-primary">
                FITNESS BUKAN LAGI BEBAN, TAPI PETUALANGAN.
              </span>
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* FITUR SECTION (WHITE) */}
      <section
        id="fitur"
        className="py-32 bg-white text-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="font-display text-primary text-6xl md:text-8xl font-bold italic uppercase tracking-tighter leading-none mb-4">
              Features
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-32">
            {/* 1. Visual Progress Dashboard */}
            <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              className="bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2.5 sm:p-3 rounded-2xl">
                    <LayoutGrid className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold italic uppercase">
                    Visual Progress
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                  {/* Activity Ring */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                      <div className="relative w-24 h-24 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-white/5"
                          />
                          <motion.circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray="251.2"
                            initial={{strokeDashoffset: 251.2}}
                            whileInView={{strokeDashoffset: 251.2 * 0.33}}
                            className="text-primary"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-black italic">
                          67%
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-surface uppercase tracking-widest">
                      Activity Ring
                    </p>
                  </div>

                  {/* Weekly Stats */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-end gap-1 h-20 sm:h-24 mb-4">
                      {[40, 70, 45, 90, 60, 85, 30].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{height: 0}}
                          whileInView={{height: `${h}%`}}
                          className={`flex-1 rounded-t-sm ${i === 3 ? "bg-primary" : "bg-slate-200"}`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-surface uppercase tracking-widest">
                      Weekly Stats
                    </p>
                  </div>
                </div>

                {/* Streak Calendar (GitHub Style) */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] sm:text-xs font-bold text-surface uppercase tracking-widest">
                      Streak Calendar
                    </p>
                    <div className="flex items-center gap-1 text-primary font-bold text-[10px] sm:text-sm italic">
                      <Flame className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />{" "}
                      14 Day Streak
                    </div>
                  </div>
                </div>

                {/* Body Progress Tracker */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] sm:text-xs font-bold text-surface uppercase tracking-widest">
                      Body Progress
                    </p>
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-xl sm:text-2xl font-display font-bold italic">
                        72.5{" "}
                        <span className="text-xs sm:text-sm font-sans text-surface not-italic">
                          KG
                        </span>
                      </div>
                      <div className="text-[8px] sm:text-[10px] font-bold text-green-500 uppercase">
                        -1.2KG THIS WEEK
                      </div>
                    </div>
                    <div className="w-20 sm:w-24 h-6 sm:h-8 bg-slate-50 rounded-lg overflow-hidden relative">
                      <svg className="w-full h-full" viewBox="0 0 100 40">
                        <path
                          d="M0 30 Q 25 20, 50 25 T 100 10"
                          fill="none"
                          stroke="#FF6B00"
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Reward System */}
            <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.2}}
              className="bg-background rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/20 p-2.5 sm:p-3 rounded-2xl">
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold italic uppercase">
                    Reward System
                  </h3>
                </div>

                {/* XP & Level System */}
                <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl mb-6 sm:mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 sm:p-4">
                    <motion.div
                      animate={{scale: [1, 1.1, 1]}}
                      transition={{duration: 2, repeat: Infinity}}
                      className="bg-primary text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-full italic">
                      LEVEL UP SOON!
                    </motion.div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-primary flex items-center justify-center bg-surface relative flex-shrink-0">
                      <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-primary fill-current" />
                      <div className="absolute -bottom-2 bg-primary text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                        LVL 24
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-display text-xl sm:text-2xl font-bold italic uppercase">
                          Iron Titan
                        </span>
                        <span className="font-mono text-[10px] font-bold text-white/40">
                          2,450 / 3,000 XP
                        </span>
                      </div>
                      <div className="h-2.5 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{width: 0}}
                          whileInView={{width: "82%"}}
                          className="h-full bg-primary shadow-[0_0_15px_rgba(255,107,0,0.5)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge & Achievement */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                  {[
                    {
                      icon: Flame,
                      label: "7 Day Streak",
                      color: "text-orange-500",
                    },
                    {icon: Zap, label: "First 5KM", color: "text-yellow-400"},
                    {icon: Award, label: "100 Push-up", color: "text-blue-400"},
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center group-hover:bg-white/10 transition-colors">
                      <badge.icon
                        className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 ${badge.color} fill-current`}
                      />
                      <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tighter leading-tight">
                        {badge.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Level Up Animation Placeholder */}
                <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl text-center">
                  <motion.div
                    animate={{y: [0, -5, 0]}}
                    transition={{duration: 2, repeat: Infinity}}>
                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3" />
                  </motion.div>
                  <p className="font-display text-lg sm:text-xl font-bold italic uppercase text-primary">
                    Satisfying Level Up FX
                  </p>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">
                    Unlock new badges
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mb-24 sm:mb-32">
            {/* 3. Quest System */}
            <motion.div
              initial={{opacity: 0, scale: 0.95}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              className="bg-slate-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 border border-slate-200">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-2.5 sm:p-3 rounded-2xl">
                      <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-3xl sm:text-5xl font-bold italic uppercase">
                      Quest System
                    </h3>
                  </div>
                  <p className="text-lg sm:text-xl text-slate-500 mb-8 sm:mb-10 leading-relaxed italic">
                    Mecahin target besar jadi kecil-kecil biar nggak berasa
                    berat.
                  </p>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4 sm:gap-6 group hover:border-primary transition-colors">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center font-display text-xl sm:text-2xl font-bold italic text-primary flex-shrink-0">
                        01
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-1">
                          Daily Quest
                        </h4>
                        <p className="text-xs sm:text-sm text-surface font-medium">
                          Misi harian yang gampang buat jaga momentum.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4 sm:gap-6 group hover:border-primary transition-colors">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center font-display text-xl sm:text-2xl font-bold italic text-primary flex-shrink-0">
                        02
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-1">
                          Weekly Challenge
                        </h4>
                        <p className="text-xs sm:text-sm text-surface font-medium">
                          Tantangan mingguan buat dapet XP gede & badge langka.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <h4 className="font-display text-xl sm:text-2xl font-bold italic uppercase tracking-tight">
                      Active Quests
                    </h4>
                    <span className="bg-primary/10 text-primary text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-full">
                      3 AVAILABLE
                    </span>
                  </div>
                  <div className="space-y-5 sm:space-y-6">
                    {[
                      {
                        title: "Morning Runner",
                        xp: "+150 XP",
                        progress: 60,
                        icon: Flame,
                      },
                      {
                        title: "Push-up Master",
                        xp: "+200 XP",
                        progress: 36,
                        icon: Zap,
                      },
                      {
                        title: "Weekend Warrior",
                        xp: "+500 XP",
                        progress: 20,
                        icon: Trophy,
                      },
                    ].map((quest, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <quest.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <span className="font-bold text-sm sm:text-base text-slate-700">
                              {quest.title}
                            </span>
                          </div>
                          <span className="font-mono text-xs sm:text-sm font-bold text-primary italic">
                            {quest.xp}
                          </span>
                        </div>
                        <div className="h-2 sm:h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{width: 0}}
                            whileInView={{width: `${quest.progress}%`}}
                            transition={{duration: 1, delay: i * 0.2}}
                            className="h-full bg-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 4. Social Features */}
            <motion.div
              initial={{opacity: 0, x: -40}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              className="bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2.5 sm:p-3 rounded-2xl">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold italic uppercase">
                  Leaderboard
                </h3>
              </div>
              <p className="text-base sm:text-lg text-slate-500 mb-8 sm:mb-10 italic">
                Olahraga bareng temen biar makin kompetitif & seru.
              </p>

              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100">
                <h4 className="font-display text-lg sm:text-xl font-bold italic uppercase mb-4 sm:mb-6 text-surface">
                  Friend Leaderboard
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      name: "Raka.fit",
                      xp: "10.359",
                      rank: 1,
                      streak: "12",
                      avatar: "😏",
                      level: "14",
                    },
                    {
                      name: "Abilll",
                      xp: "8.395",
                      rank: 2,
                      streak: "8",
                      active: true,
                      avatar: "👑",
                      level: "10",
                    },
                    {
                      name: "Siska_Run",
                      xp: "4.972",
                      rank: 3,
                      streak: "4",
                      avatar: "😎",
                      level: "8",
                    },
                  ].map((user) => (
                    <div
                      key={user.name}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${user.active ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 border-slate-100"}`}>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          className={`font-mono text-xs sm:text-base font-bold ${user.active ? "text-white/60" : "text-slate-300"}`}>
                          #{user.rank}
                        </span>
                        <span className="text-xl lg:text-2xl">
                          {user?.avatar}
                        </span>
                        <div>
                          <span className="font-bold text-sm sm:text-base">
                            {user.name}
                          </span>
                          <div className="flex items-center text-nowrap text-xs">
                            <p className="sm:text-base">Lv. {user.level}</p>
                            <Dot size={24} />
                            <span>{user?.streak} Streak</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xxs sm:text-base font-bold">
                        {user.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 40}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              className="bg-background rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/20 p-2.5 sm:p-3 rounded-2xl">
                  <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold italic uppercase">
                  Activity Feed
                </h3>
              </div>
              <p className="text-base sm:text-lg text-white/40 mb-8 sm:mb-10 italic">
                Lihat pencapaian temen kamu secara real-time.
              </p>

              <div className="space-y-12">
                {[
                  {
                    name: "abilll",
                    type: "GYM/LIFT",
                    intensity: "Intense",
                    time: 120,
                    img: "32",
                    ago: "1 jam yang lalu",
                  },
                  {
                    name: "abilll",
                    type: "GYM/LIFT",
                    intensity: "Moderate",
                    time: 90,
                    img: "32",
                    ago: "23 jam yang lalu",
                  },
                ].map((user, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Left: Avatar Container */}
                    <div className="w-12 h-12 bg-charcoal border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xl">
                      <div className="w-8 h-8 rounded-md overflow-hidden bg-primary/20 flex items-center justify-center">
                        {/* <img src={`https://i.pravatar.cc/100?img=${user.img}`} className="w-full h-full object-cover" alt="" /> */}
                        <span className="text-xl lg:text-2xl">👑</span>
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-primary font-bold text-sm uppercase tracking-tight">
                          {user.name}
                        </span>
                        <span className="text-white/40 text-[10px] font-bold">
                          Baru saja log workout
                        </span>
                      </div>

                      {/* Workout Bar with Clipped Corner */}
                      <div
                        className="bg-white/5 p-4 relative mb-4 group hover:bg-white/10 transition-colors"
                        style={{
                          clipPath:
                            "polygon(0 0, 98% 0, 100% 15%, 100% 100%, 0 100%)",
                        }}>
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                            <span className="text-xl lg:text-2xl">💪🏻</span>
                          </div>
                          <div>
                            <p className="text-white font-display text-lg font-bold italic uppercase leading-none mb-1">
                              {user.type}
                            </p>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                              {user.intensity} • {user.time} Menit
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats Badges */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 bg-[#FF6321]/10 border border-[#FF6321]/20 px-3 py-1.5 rounded-md">
                          <Flame className="w-3.5 h-3.5 text-[#FF6321] fill-current" />
                          <span className="text-[10px] font-bold text-[#FF6321]">
                            12
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#A88544]/10 border border-[#A88544]/20 px-3 py-1.5 rounded-md">
                          <Dumbbell className="w-3.5 h-3.5 text-[#A88544]" />
                          <span className="text-[10px] font-bold text-[#A88544]">
                            24
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#4466A8]/10 border border-[#4466A8]/20 px-3 py-1.5 rounded-md">
                          <Zap className="w-3.5 h-3.5 text-[#4466A8] fill-current" />
                          <span className="text-[10px] font-bold text-[#4466A8]">
                            10
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        {user.ago}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        id="faq"
        className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200 text-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-primary font-display text-5xl sm:text-6xl md:text-8xl font-bold italic uppercase tracking-tighter leading-none mb-4">
              FAQ
            </h2>
            <p className="text-lg sm:text-xl text-slate-500 font-medium italic">
              Punya pertanyaan? Kami punya jawabannya.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Apa bedanya FitQuest dengan aplikasi fitness atau tracker biasa?",
                a: "Aplikasi biasa umumnya kaku dan cuma mencatat angka. FitQuest mengubah rutinitas olahraga kamu menjadi petualangan. Kami menggunakan elemen gamification—seperti XP, Level, dan Badge—untuk memberikan reward instan setiap kali kamu selesai berkeringat. Olahraga bukan lagi sekadar kewajiban yang membosankan, tapi pencapaian yang menyenangkan.",
              },
              {
                q: "Saya sering gagal konsisten karena targetnya terlalu berat. Gimana FitQuest bisa bantu?",
                a: `Kami paham kalau target besar seperti "turun 10 kg" seringkali bikin demotivasi di awal. Di FitQuest, kami memecah target besar tersebut melalui Sistem Quest. Kamu akan mendapatkan Daily Quest (Misi Harian) dan Weekly Challenge yang realistis—seperti "Olahraga 15 menit hari ini". Fokus selesaikan misi kecilnya, dan biarkan konsistensi kamu terbangun secara natural.`,
              },
              {
                q: "Apa yang saya dapatkan kalau rajin menyelesaikan Quest?",
                a: 'Setiap misi yang selesai akan memberikan kamu XP (Experience Points) untuk naik level. Semakin konsisten, level status kamu (seperti Steel Knight) akan terus naik. Kamu juga akan membuka Badge eksklusif untuk setiap pencapaian, seperti "7 Day Streak" atau "First 5KM", yang semuanya divisualisasikan dengan keren di Dashboard kamu.',
              },
              {
                q: "Jujur, saya gampang bosan kalau olahraga sendirian. Ada solusinya?",
                a: "Pasti ada. Konsistensi butuh komunitas. FitQuest dilengkapi fitur sosial di mana kamu bisa terhubung dengan teman, melihat Activity Feed mereka untuk saling memotivasi, dan bersaing secara sehat di Leaderboard mingguan.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{opacity: 0, x: 40}}
                whileInView={{opacity: 1, x: 0}}>
                <FAQItem key={i} question={item.q} answer={item.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-32 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl sm:text-7xl md:text-9xl font-bold italic uppercase text-white mb-8 sm:mb-10 tracking-tighter leading-none">
            Siap Untuk
            <br />
            Level Up?
          </h2>
          <Link href={"/auth/register"}>
            <button
              className="w-full sm:w-auto group relative bg-background text-white px-8 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
              }}>
              <span className="relative z-10">Mulai Petualangan Sekarang</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background pt-20 sm:pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-16 sm:mb-20">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary p-1.5 rounded-sm">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-bold tracking-tighter text-white uppercase italic">
                  FitQuest
                </span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed mb-8 text-sm sm:text-base">
                Ubah setiap tetes keringat menjadi kemenangan. Platform
                gamifikasi fitness terbaik untuk kamu yang ingin konsisten
                dengan cara yang seru.
              </p>
              <div className="flex gap-4">
                {[
                  {name: "Instagram", icon: Instagram},
                  {name: "Twitter", icon: Twitter},
                  {name: "TikTok", icon: Music},
                  {name: "Discord", icon: MessageSquare},
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all">
                    <span className="sr-only">{social.name}</span>
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg sm:text-xl font-bold italic uppercase text-white mb-6">
                Navigasi
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-bold text-white/40">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#fitur"
                    className="hover:text-primary transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg sm:text-xl font-bold italic uppercase text-white mb-6">
                Bantuan
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-bold text-white/40">
                <li>
                  <a
                    href="#faq"
                    className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 sm:pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] sm:text-sm font-mono text-white/20 text-center md:text-left">
              © 2026 FitQuest Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-white/20">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
  key?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left">
        <span className="font-bold text-base sm:text-lg text-slate-800 pr-4">
          {question}
        </span>
        <ChevronRight
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{height: 0, opacity: 0}}
            animate={{height: "auto", opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{duration: 0.3}}>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
