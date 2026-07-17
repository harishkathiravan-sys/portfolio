"use client";

import { useRef, useEffect } from "react";

interface DomOverlayProps {
  progress: { current: number };
}

export function DomOverlay({ progress }: DomOverlayProps) {
  const hkRef = useRef<HTMLDivElement>(null!);
  const nameRef = useRef<HTMLDivElement>(null!);
  const subtitleRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    let raf: number;

    const tick = () => {
      const p = progress.current;

      // HK: appear 0.62-0.72, fade out 0.78-0.85
      if (hkRef.current) {
        if (p < 0.62) {
          hkRef.current.style.opacity = "0";
        } else if (p < 0.72) {
          const t = (p - 0.62) / 0.10;
          hkRef.current.style.opacity = String(t);
          hkRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
          hkRef.current.style.transform = `scale(${0.85 + t * 0.15})`;
        } else if (p < 0.78) {
          hkRef.current.style.opacity = "1";
          hkRef.current.style.filter = "blur(0px)";
          hkRef.current.style.transform = "scale(1)";
        } else if (p < 0.85) {
          const t = 1 - (p - 0.78) / 0.07;
          hkRef.current.style.opacity = String(t);
          hkRef.current.style.transform = `scale(${1 + (1 - t) * 0.1})`;
        } else {
          hkRef.current.style.opacity = "0";
        }
      }

      // Name: appear 0.72-0.80, PERSIST through dissolve
      // During arrive phase (0.88-1.0), animate position toward hero heading
      if (nameRef.current) {
        if (p < 0.72) {
          nameRef.current.style.opacity = "0";
          nameRef.current.style.clipPath = "inset(0 100% 0 0)";
        } else if (p < 0.80) {
          const t = (p - 0.72) / 0.08;
          nameRef.current.style.opacity = String(t * 0.95);
          nameRef.current.style.clipPath = `inset(0 ${(1 - t) * 100}% 0 0)`;
        } else if (p < 0.88) {
          // Hold visible during push phase
          nameRef.current.style.opacity = "0.95";
          nameRef.current.style.clipPath = "inset(0 0% 0 0)";
        } else if (p < 1.0) {
          // During arrive: start fading as hero takes over
          const t = (p - 0.88) / 0.12;
          nameRef.current.style.opacity = String(0.95 * (1 - t * 0.8));
        } else {
          nameRef.current.style.opacity = "0";
        }
      }

      // Subtitles: appear 0.80-0.86, then fade during push
      if (subtitleRef.current) {
        const items = subtitleRef.current.children;
        if (p < 0.80) {
          for (let i = 0; i < items.length; i++) {
            (items[i] as HTMLElement).style.opacity = "0";
          }
        } else if (p < 0.87) {
          for (let i = 0; i < items.length; i++) {
            const itemT = Math.max(0, Math.min(1, (p - 0.80 - i * 0.012) / 0.03));
            const el = items[i] as HTMLElement;
            el.style.opacity = String(itemT);
            el.style.transform = `translateY(${(1 - itemT) * 8}px)`;
          }
        } else if (p < 0.92) {
          for (let i = 0; i < items.length; i++) {
            const el = items[i] as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        } else {
          // Fade out subtitles during arrive
          const fadeT = Math.min(1, (p - 0.92) / 0.06);
          for (let i = 0; i < items.length; i++) {
            (items[i] as HTMLElement).style.opacity = String(1 - fadeT);
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      {/* HK initials */}
      <div
        ref={hkRef}
        className="font-[family-name:var(--font-space-grotesk)] text-[clamp(4rem,12vw,10rem)] font-bold tracking-[-0.04em] leading-none"
        style={{
          opacity: 0,
          color: "rgba(255,255,255,0.92)",
          textShadow: "0 0 40px rgba(255,255,255,0.05)",
        }}
      >
        HK
      </div>

      {/* Full name — PERSISTS through dissolve */}
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
              style={{ opacity: 0, transform: "translateY(8px)" }}
            >
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
}
