"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["about", "skills", "experience", "projects", "stats", "resume", "contact"];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const activeSection = useActiveSection(sectionIds);

  const { scrollY } = useScroll();
  const navTop = useTransform(scrollY, [0, 100], [16, 12]);
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "min(96%, 1200px)"]);
  const navRadius = useTransform(scrollY, [0, 100], ["0px", "24px"]);
  const navPaddingY = useTransform(scrollY, [0, 100], [14, 10]);
  const navPaddingX = useTransform(scrollY, [0, 100], [24, 28]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.classList.toggle("light", !darkMode);
  }, [darkMode]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-50",
        )}
        style={{
          top: navTop,
          width: navWidth,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: navRadius,
          paddingLeft: navPaddingX,
          paddingRight: navPaddingX,
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          background: scrolled
            ? "rgba(10, 10, 30, 0.65)"
            : "transparent",
          border: scrolled
            ? "1px solid rgba(255, 255, 255, 0.06)"
            : "1px solid transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.06)"
            : "1px solid rgba(255, 255, 255, 0.06)",
          backdropFilter: scrolled ? "blur(40px) saturate(1.3)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(40px) saturate(1.3)" : "none",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 80px rgba(139, 92, 246, 0.05)"
            : "none",
          transition: "background 0.5s cubic-bezier(0.23, 1, 0.32, 1), border 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Top edge light line when scrolled */}
        {scrolled && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-[inherit]"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(139, 92, 246, 0.2) 25%, rgba(167, 139, 250, 0.12) 50%, rgba(34, 211, 238, 0.15) 75%, transparent 95%)",
            }}
          />
        )}

        {/* Inner glass highlight when scrolled */}
        {scrolled && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-30"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
            }}
          />
        )}

        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link href="#hero" className="group relative flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-all duration-500 group-hover:border-violet-500/40 group-hover:bg-violet-500/[0.08] group-hover:shadow-[0_0_24px_rgba(139,92,246,0.25)]">
              <Sparkles className="h-4 w-4 text-violet-400 transition-all duration-500 group-hover:text-violet-300 group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            </div>
            <div className="hidden sm:block">
              <p className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold tracking-[0.2em] uppercase text-gradient-static">
                Harish
              </p>
              <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 transition-colors duration-300 group-hover:text-white/50">
                AI Engineer
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-wide transition-all duration-300",
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/75",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-white/[0.08]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)",
                        boxShadow:
                          "0 0 24px rgba(139, 92, 246, 0.12), 0 0 4px rgba(139, 92, 246, 0.08) inset",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode((v) => !v)}
              className="group/btn flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/50 transition-all duration-400 hover:border-violet-500/30 hover:bg-violet-500/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-[15px] w-[15px] transition-transform duration-500 group-hover/btn:rotate-90" />
              ) : (
                <Moon className="h-[15px] w-[15px] transition-transform duration-500 group-hover/btn:-rotate-90" />
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="group/btn flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/50 transition-all duration-400 hover:border-violet-500/30 hover:bg-violet-500/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] lg:hidden"
              aria-label="Toggle navigation menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {menuOpen ? (
                  <X className="h-[15px] w-[15px]" />
                ) : (
                  <Menu className="h-[15px] w-[15px]" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: menuOpen ? "auto" : 0,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={{
            height: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="overflow-hidden lg:hidden"
        >
          <div className="border-t border-white/[0.05] pt-2 pb-1">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={false}
                    animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                    transition={{
                      delay: menuOpen ? index * 0.04 : 0,
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    }}
                    className={cn(
                      "relative rounded-xl px-4 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-300",
                      isActive
                        ? "text-white bg-white/[0.06] border border-white/[0.06]"
                        : "text-white/45 hover:bg-white/[0.05] hover:text-white/80 border border-transparent",
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {/* Hover glow effect per item */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-violet-500/[0.04] to-cyan-500/[0.02]" />
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <div
                        className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(139, 92, 246, 0.6), rgba(34, 211, 238, 0.4))",
                          boxShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}
