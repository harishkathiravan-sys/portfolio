"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Layers, Server, CalendarDays } from "lucide-react";

const stats = [
  { label: "AI Projects", value: 12, suffix: "+", icon: Activity },
  { label: "Domains Built", value: 6, suffix: "+", icon: Layers },
  { label: "Production Systems", value: 4, suffix: "+", icon: Server },
  { label: "Years Learning", value: 3, suffix: "+", icon: CalendarDays },
];

function CountUp({ value, isVisible }: { value: number; isVisible: boolean; color?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const start = performance.now();
    const duration = 1800;
    let raf: number;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = progress < 0.8
        ? 1 - Math.pow(1 - progress / 0.8, 3) * 0.08
        : 1 - 0.08 * Math.pow(1 - (progress - 0.8) / 0.2, 2);
      setCount(Math.floor(Math.min(ease * value, value)));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, value]);

  return <span>{count}</span>;
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
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white/25">
          GitHub Stats
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Numbers that reflect an
          <br />
          engineering-first learning curve.
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.12 + i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="glass-card group rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1">
                <div className="relative">
                  {/* Icon container */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05]">
                    <Icon className="h-7 w-7 text-white/40" />
                  </div>

                  {/* Label */}
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/25">
                    {stat.label}
                  </p>

                  {/* Stat number */}
                  <p className="mt-4 font-[family-name:var(--font-space-grotesk)] text-[48px] font-bold leading-none tracking-[-0.03em] text-white/90">
                    <CountUp value={stat.value} isVisible={isInView} />
                    <span className="text-[32px] font-semibold text-white/40">
                      {stat.suffix}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
