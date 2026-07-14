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
    gradient: "from-violet-500/15 to-transparent",
  },
  {
    label: "Domains Built",
    value: 6,
    suffix: "+",
    icon: Layers,
    color: "#06b6d4",
    gradient: "from-cyan-500/15 to-transparent",
  },
  {
    label: "Production Systems",
    value: 4,
    suffix: "+",
    icon: Server,
    color: "#34d399",
    gradient: "from-emerald-500/15 to-transparent",
  },
  {
    label: "Years Learning",
    value: 3,
    suffix: "+",
    icon: CalendarDays,
    color: "#d946ef",
    gradient: "from-fuchsia-500/15 to-transparent",
  },
];

function CountUp({ value, isVisible }: { value: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const start = performance.now();
    const duration = 1200;
    let raf: number;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
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
    <section id="stats" ref={ref} className="relative py-24 sm:py-32">
      <div className="section-divider mb-20" />

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

      <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="glass-card gradient-border group relative overflow-hidden rounded-3xl p-7">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative">
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${stat.color}12` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>

                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/30">
                    {stat.label}
                  </p>

                  <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-[42px] font-semibold leading-none text-white/90">
                    <CountUp value={stat.value} isVisible={isInView} />
                    <span className="text-[28px] text-white/40">{stat.suffix}</span>
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
