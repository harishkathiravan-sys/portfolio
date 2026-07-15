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
  const navPadding = useTransform(scrollY, [0, 100], [20, 12]);
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "96%"]);
  const navRadius = useTransform(scrollY, [0, 100], ["0px", "20px"]);

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
          "fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border border-white/[0.06] bg-[rgba(3,0,20,0.75)] shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(139,92,246,0.04)]"
            : "border-b border-transparent bg-transparent",
        )}
        style={{
          top: navPadding,
          width: navWidth,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: navRadius,
          backdropFilter: scrolled ? "blur(40px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(40px) saturate(1.2)" : "none",
        }}
      >
        {/* Top edge light when scrolled */}
        {scrolled && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-[inherit]" style={{ background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.15) 30%, rgba(34, 211, 238, 0.1) 70%, transparent)" }} />
        )}

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <Link href="#hero" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-violet-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Sparkles className="h-4 w-4 text-violet-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
            </div>
            <div className="hidden sm:block">
              <p className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                Harish
              </p>
              <p className="text-[10px] tracking-wider text-white/40 uppercase">AI Engineer</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300",
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.08]"
                      style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.15)]"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="border-t border-white/[0.06] bg-[rgba(3,0,20,0.95)] px-5 py-4 backdrop-blur-[40px] lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-sm text-white/60 transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
