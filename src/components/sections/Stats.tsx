"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Layers, Server, CalendarDays } from "lucide-react";

const stats = [
  {
    label: "AI Projects",
    value: 12,
    suffix: "+",
    icon: Activity,
    color: "#8b5cf6",
    gradient: "from-violet-500/20 to-transparent",
    glowColor: "rgba(139, 92, 246, 0.12)",
    numberGradient: "linear-gradient(135deg, #c084fc, #8b5cf6)",
  },
  {
    label: "Domains Built",
    value: 6,
    suffix: "+",
    icon: Layers,
    color: "#06b6d4",
    gradient: "from-cyan-500/20 to-transparent",
    glowColor: "rgba(6, 182, 212, 0.12)",
    numberGradient: "linear-gradient(135deg, #67e8f9, #06b6d4)",
  },
  {
    label: "Production Systems",
    value: 4,
    suffix: "+",
    icon: Server,
    color: "#34d399",
    gradient: "from-emerald-500/20 to-transparent",
    glowColor: "rgba(52, 211, 153, 0.12)",
    numberGradient: "linear-gradient(135deg, #6ee7b7, #34d399)",
  },
  {
    label: "Years Learning",
    value: 3,
    suffix: "+",
    icon: CalendarDays,
    color: "#d946ef",
    gradient: "from-fuchsia-500/20 to-transparent",
    glowColor: "rgba(217, 70, 239, 0.12)",
    numberGradient: "linear-gradient(135deg, #f0abfc, #d946ef)",
  },
];

function CountUp({ value, isVisible, color }: { value: number; isVisible: boolean; color: string }) {
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const start = performance.now();
    const duration = 1800;
    let raf: number;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      // Dramatic overshoot ease: fast start, slight overshoot, settle
      const ease = progress < 0.8
        ? 1 - Math.pow(1 - progress / 0.8, 3) * 0.08
        : 1 - 0.08 * Math.pow(1 - (progress - 0.8) / 0.2, 2);
      setCount(Math.floor(Math.min(ease * value, value)));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setCount(value);
        setCompleted(true);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, value]);

  return (
    <span
      className={completed ? "glow-pulse" : ""}
      style={{
        background: completed ? color : "none",
        WebkitBackgroundClip: completed ? "text" : "unset",
        backgroundClip: completed ? "text" : "unset",
        WebkitTextFillColor: completed ? "transparent" : "unset",
        filter: completed ? `drop-shadow(0 0 24px ${color})` : "none",
        transition: "all 0.6s ease",
      }}
    >
      {count}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stats" ref={ref} className="relative py-32 sm:py-40">
      <div className="section-divider mb-24" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          GitHub Stats
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Numbers that reflect an
          <br />
          <span className="text-gradient-static">engineering-first learning curve.</span>
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.12 + i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="glass-card gradient-border group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_8px_60px_rgba(139,92,246,0.12)]">
                {/* Ambient background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />

                {/* Background glow orb */}
                <div
                  className="pointer-events-none absolute -bottom-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100"
                  style={{ background: stat.glowColor }}
                />

                <div className="relative">
                  {/* Icon container */}
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:shadow-lg group-hover:scale-110"
                    style={{
                      background: `${stat.color}12`,
                      boxShadow: `0 0 0 1px ${stat.color}15`,
                    }}
                  >
                    <Icon className="h-7 w-7" style={{ color: stat.color }} />
                  </div>

                  {/* Label */}
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30">
                    {stat.label}
                  </p>

                  {/* Stat number */}
                  <p
                    className="mt-4 font-[family-name:var(--font-space-grotesk)] text-[56px] font-bold leading-none tracking-[-0.03em]"
                    style={{
                      background: stat.numberGradient,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: `drop-shadow(0 2px 16px ${stat.glowColor})`,
                    }}
                  >
                    <CountUp value={stat.value} isVisible={isInView} color={stat.numberGradient} />
                    <span
                      className="text-[32px] font-semibold"
                      style={{
                        background: stat.numberGradient,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        opacity: 0.5,
                      }}
                    >
                      {stat.suffix}
                    </span>
                  </p>

                  {/* Subtle bottom accent line */}
                  <div
                    className="mt-5 h-[1px] w-0 transition-all duration-700 group-hover:w-full"
                    style={{
                      background: `linear-gradient(90deg, ${stat.color}60, transparent)`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
