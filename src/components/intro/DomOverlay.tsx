"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface DomOverlayProps {
  progress: { current: number };
}

export function DomOverlay({ progress }: DomOverlayProps) {
  const hkRef = useRef<HTMLDivElement>(null!);
  const nameRef = useRef<HTMLDivElement>(null!);
  const subtitleRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    let raf: number;
    let lastPhase = "";

    const tick = () => {
      const p = progress.current;

      // HK: crossfade in at 0.73-0.80
      if (hkRef.current) {
        if (p >= 0.73 && p <= 0.80) {
          const t = (p - 0.73) / 0.07;
          hkRef.current.style.opacity = String(t);
          hkRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
          hkRef.current.style.transform = `scale(${0.85 + t * 0.15})`;
        } else if (p > 0.80) {
          hkRef.current.style.opacity = "1";
          hkRef.current.style.filter = "blur(0px)";
          hkRef.current.style.transform = "scale(1)";
        } else {
          hkRef.current.style.opacity = "0";
        }
      }

      // Name: crossfade in at 0.82-0.88
      if (nameRef.current) {
        if (p >= 0.82 && p <= 0.88) {
          const t = (p - 0.82) / 0.06;
          nameRef.current.style.opacity = String(t * 0.9);
          nameRef.current.style.clipPath = `inset(0 ${(1 - t) * 100}% 0 0)`;
        } else if (p > 0.88) {
          nameRef.current.style.opacity = "0.9";
          nameRef.current.style.clipPath = "inset(0 0% 0 0)";
        } else {
          nameRef.current.style.opacity = "0";
        }
      }

      // Subtitles: stagger in at 0.88-0.92
      if (subtitleRef.current) {
        const items = subtitleRef.current.children;
        if (p >= 0.88 && p <= 0.93) {
          for (let i = 0; i < items.length; i++) {
            const itemT = Math.max(0, Math.min(1, (p - 0.88 - i * 0.01) / 0.03));
            const el = items[i] as HTMLElement;
            el.style.opacity = String(itemT);
            el.style.transform = `translateY(${(1 - itemT) * 10}px)`;
          }
        } else if (p > 0.93) {
          for (let i = 0; i < items.length; i++) {
            (items[i] as HTMLElement).style.opacity = "1";
            (items[i] as HTMLElement).style.transform = "translateY(0)";
          }
        }
      }

      // Name persistence: during dissolve (0.90-1.0), keep name visible
      // Then fade name out as hero heading appears
      if (p > 0.92 && nameRef.current) {
        const fadeT = Math.max(0, (p - 0.95) / 0.05);
        nameRef.current.style.opacity = String(0.9 * (1 - fadeT));
        if (hkRef.current) {
          hkRef.current.style.opacity = String(1 - fadeT);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
    >
      {/* HK initials */}
      <div
        ref={hkRef}
        className="font-[family-name:var(--font-space-grotesk)] text-[clamp(4rem,12vw,10rem)] font-bold tracking-[-0.04em] leading-none"
        style={{
          opacity: 0,
          color: "rgba(255,255,255,0.92)",
          textShadow: "0 0 40px rgba(255,255,255,0.05)",
          transition: "none",
        }}
      >
        HK
      </div>

      {/* Full name */}
      <div
        ref={nameRef}
        className="mt-4 overflow-hidden"
        style={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      >
        <p className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1rem,3vw,2rem)] font-semibold tracking-[0.08em] text-white/80">
          HARISH KATHIRAVAN
        </p>
      </div>

      {/* Subtitles */}
      <div
        ref={subtitleRef}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        {["AI Engineer", "Machine Learning", "Computer Vision", "Full Stack Developer"].map(
          (item) => (
            <span
              key={item}
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/30"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
}
