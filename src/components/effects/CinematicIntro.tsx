"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

/* ─────────────────────────────────────────────────────
   MINIMAL HERO — Apple-style
   ───────────────────────────────────────────────────── */
export function CinematicIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [animPhase, setAnimPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end start"],
  });
  const introOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const introY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setAnimPhase(2);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.call(() => setAnimPhase(1), [], 0.2);
      tl.fromTo(
        ".hero-name",
        { opacity: 0, y: 24, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
        0.3
      );
      tl.call(() => setAnimPhase(2), [], 0.8);
      tl.fromTo(
        ".hero-role",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.9
      );
      tl.fromTo(
        ".hero-tagline",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        1.2
      );
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        1.5
      );
      tl.fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        2.0
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={ref}>
      <motion.div
        ref={timelineRef}
        className="intro-canvas"
        style={{ opacity: introOpacity, y: introY }}
      >
        {/* Content — minimal, centered, lots of whitespace */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Name */}
          <h1
            className="hero-name font-[family-name:var(--font-space-grotesk)] text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] font-bold tracking-[-0.04em]"
            style={{ opacity: animPhase >= 1 ? undefined : 0 }}
          >
            <span className="text-gradient-static">Harish</span>
            <br />
            <span className="text-gradient-static">Kathiravan</span>
          </h1>

          {/* Role */}
          <div className="mt-8 overflow-hidden">
            <p
              className="hero-role font-[family-name:var(--font-space-grotesk)] text-[clamp(0.8rem,2vw,1.1rem)] tracking-[0.04em] font-medium"
              style={{
                opacity: animPhase >= 2 ? undefined : 0,
                color: "var(--text-secondary)",
              }}
            >
              AI Engineer
            </p>
          </div>

          {/* Tagline */}
          <p
            className="hero-tagline mt-4 max-w-md text-[14px] leading-relaxed"
            style={{
              opacity: animPhase >= 2 ? undefined : 0,
              color: "var(--text-tertiary)",
            }}
          >
            Building intelligent systems at the intersection of AI engineering,
            product craftsmanship, and clean architecture.
          </p>

          {/* CTA */}
          <div className="hero-cta mt-12" style={{ opacity: animPhase >= 2 ? undefined : 0 }}>
            <button
              onClick={scrollToAbout}
              className="cta-premium"
            >
              View Work
              <ArrowDown className="h-3.5 w-3.5 opacity-50" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" style={{ opacity: animPhase >= 2 ? undefined : 0 }}>
          <span>Scroll</span>
          <ArrowDown className="h-3 w-3" />
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="h-[8vh]" />
    </div>
  );
}
