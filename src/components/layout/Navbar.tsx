"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
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
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "92%"]);
  const navRadius = useTransform(scrollY, [0, 100], ["0px", "22px"]);

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
            ? "border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,16,0.72)] shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
            : "border-b border-[rgba(255,255,255,0.06)] bg-transparent",
        )}
        style={{
          top: scrolled ? "12px" : "0px",
          width: navWidth,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: navRadius,
          backdropFilter: scrolled ? "blur(40px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(40px) saturate(1.2)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="#hero" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] transition-all duration-300 group-hover:border-[rgba(255,255,255,0.16)]">
              <span className="font-[family-name:var(--font-space-grotesk)] text-[11px] font-semibold text-white/70">
                H
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="font-[family-name:var(--font-space-grotesk)] text-[12px] font-semibold tracking-[0.06em] text-white/80">
                Harish
              </p>
              <p className="text-[9px] tracking-[0.08em] text-white/30 uppercase">AI Engineer</p>
            </div>
          </Link>

          {/* Nav items */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.02em] transition-all duration-300",
                    isActive
                      ? "text-white/90"
                      : "text-white/35 hover:text-white/60",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.08)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDarkMode((v) => !v)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-white/40 transition-all duration-300 hover:border-[rgba(255,255,255,0.14)] hover:text-white/70"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-white/40 transition-all duration-300 hover:border-[rgba(255,255,255,0.14)] hover:text-white/70 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(15,15,16,0.95)] px-5 py-4 backdrop-blur-[40px] lg:hidden"
          >
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-[13px] text-white/40 transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:text-white/70"
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
