"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ChevronDown, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";

/* ─────────────────────────────────────────────────────
   GEOMETRIC SVG LOGO
   ───────────────────────────────────────────────────── */
function GeometricLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      {/* Hexagon outer ring */}
      <path
        className="logo-path"
        d="M60 5 L105 30 L105 90 L60 115 L15 90 L15 30 Z"
        stroke="url(#logo-grad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner hexagon */}
      <path
        className="logo-path"
        d="M60 20 L90 38 L90 82 L60 100 L30 82 L30 38 Z"
        stroke="url(#logo-grad)"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* H monogram — left vertical */}
      <line className="logo-path" x1="42" y1="42" x2="42" y2="78" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
      {/* H monogram — right vertical */}
      <line className="logo-path" x1="78" y1="42" x2="78" y2="78" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
      {/* H monogram — horizontal bar */}
      <line className="logo-path" x1="42" y1="60" x2="78" y2="60" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Decorative dots at hexagon vertices */}
      <circle className="logo-dot" cx="60" cy="5" r="2.5" fill="#8b5cf6" />
      <circle className="logo-dot" cx="105" cy="30" r="2" fill="#22d3ee" />
      <circle className="logo-dot" cx="105" cy="90" r="2" fill="#d946ef" />
      <circle className="logo-dot" cx="60" cy="115" r="2.5" fill="#8b5cf6" />
      <circle className="logo-dot" cx="15" cy="90" r="2" fill="#22d3ee" />
      <circle className="logo-dot" cx="15" cy="30" r="2" fill="#d946ef" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   NEURAL NETWORK CANVAS
   ───────────────────────────────────────────────────── */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

function NeuralNetworkCanvas({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const isMobile = w < 768;
    const count = isMobile ? 15 : 30;
    const colors = ["#8b5cf6", "#22d3ee", "#d946ef", "#34d399"];

    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions with mouse parallax
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Subtle mouse attraction
        if (mx > 0 && my > 0) {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            node.x += dx * 0.001;
            node.y += dy * 0.001;
          }
        }

        // Bounce off edges
        if (node.x < 0 || node.x > cw) node.vx *= -1;
        if (node.y < 0 || node.y > ch) node.vy *= -1;
        node.x = Math.max(0, Math.min(cw, node.x));
        node.y = Math.max(0, Math.min(ch, node.y));
      }

      // Draw connecting lines
      const maxDist = isMobile ? 100 : 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        // Glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(0, node.color.replace(")", `, ${node.alpha * 0.4})`).replace("rgb", "rgba").replace("#", ""));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        // Draw glow using simple fill
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${node.alpha * 0.15})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-canvas"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}
    />
  );
}

/* ─────────────────────────────────────────────────────
   CINEMATIC INTRO COMPONENT
   ───────────────────────────────────────────────────── */
export function CinematicIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [animPhase, setAnimPhase] = useState(0); // 0=black, 1=logo, 2=name, 3=subtitle, 4=network+cta
  const [introComplete, setIntroComplete] = useState(false);

  // Scroll-linked transforms for the transition
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end start"],
  });
  const introOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.6, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  const introBlur = useTransform(scrollYProgress, [0.3, 0.8], [0, 10]);
  const introY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // GSAP timeline
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setAnimPhase(4);
      setIntroComplete(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIntroComplete(true),
      });

      // Phase 1: Logo draw in
      tl.call(() => setAnimPhase(1), [], 0.3);

      // Animate logo paths via stroke-dashoffset
      tl.fromTo(
        ".logo-path",
        { strokeDasharray: 200, strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.1 },
        0.5
      );

      // Logo dots appear
      tl.fromTo(
        ".logo-dot",
        { scale: 0, opacity: 0, transformOrigin: "center" },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)" },
        1.2
      );

      // Phase 2: Name letters
      tl.call(() => setAnimPhase(2), [], 2.2);

      tl.fromTo(
        ".intro-letter",
        { filter: "blur(10px)", opacity: 0, y: 20, rotationX: 20 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
        },
        2.4
      );

      // Phase 3: Subtitle
      tl.call(() => setAnimPhase(3), [], 3.4);

      tl.fromTo(
        ".intro-subtitle",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "power2.inOut" },
        3.6
      );

      // Phase 4: Network + CTA + scroll indicator
      tl.call(() => setAnimPhase(4), [], 4.4);

      tl.fromTo(
        ".intro-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        4.6
      );

      tl.fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        5.0
      );

      // Logo glow pulse after draw completes
      tl.to(
        ".intro-logo-container",
        {
          filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 60px rgba(34, 211, 238, 0.25))",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        2.0
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const name = "HARISH KATHIRAVAN";
  const subtitle = "AI Engineer  •  Machine Learning  •  Computer Vision  •  Full Stack Developer";

  return (
    <div ref={ref}>
      <motion.div
        ref={timelineRef}
        className="intro-canvas"
        style={{
          opacity: introOpacity,
          scale: introScale,
          y: introY,
        }}
      >
        {/* Neural network background */}
        <NeuralNetworkCanvas visible={animPhase >= 4} />

        {/* Content layer */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Geometric Logo */}
          <motion.div
            className="intro-logo-container mb-8"
            style={{ filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))" }}
          >
            <GeometricLogo className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32" />
          </motion.div>

          {/* Name */}
          <h1
            className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2.2rem,7vw,6rem)] leading-[0.95] font-bold tracking-[-0.02em] perspective-[1000px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="intro-letter inline-block"
                style={{
                  opacity: animPhase >= 2 ? undefined : 0,
                  color: i < 6 ? "transparent" : undefined,
                  background: i < 6 ? "linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #67e8f9 100%)" : undefined,
                  WebkitBackgroundClip: i < 6 ? "text" : undefined,
                  backgroundClip: i < 6 ? "text" : undefined,
                }}
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div className="mt-6 overflow-hidden">
            <p
              className="intro-subtitle font-[family-name:var(--font-space-grotesk)] text-[clamp(0.7rem,1.8vw,1.1rem)] tracking-[0.08em]"
              style={{
                opacity: animPhase >= 3 ? undefined : 0,
                background: "linear-gradient(135deg, #a78bfa 0%, #67e8f9 50%, #d946ef 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* CTA Button */}
          <div className="intro-cta mt-12" style={{ opacity: animPhase >= 4 ? undefined : 0 }}>
            <MagneticButton>
              <button
                onClick={scrollToAbout}
                className="cta-premium group"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" style={{ opacity: animPhase >= 4 ? undefined : 0 }}>
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>

        {/* Decorative corner accents */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Top-left accent */}
          <div className="absolute left-8 top-8 h-16 w-16 border-l border-t border-white/[0.06] opacity-40" />
          {/* Bottom-right accent */}
          <div className="absolute bottom-8 right-8 h-16 w-16 border-b border-r border-white/[0.06] opacity-40" />
        </div>
      </motion.div>

      {/* Spacer — allows scrolling past the intro */}
      <div className="h-[10vh]" />
    </div>
  );
}
