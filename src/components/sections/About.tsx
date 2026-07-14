"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Layers, Globe, Cpu } from "lucide-react";

const principles = [
  {
    icon: Cpu,
    title: "AI-first",
    desc: "Designing systems around intelligence, not afterthoughts.",
    color: "text-violet-400",
    glow: "bg-violet-500/10",
  },
  {
    icon: Sparkles,
    title: "Product-minded",
    desc: "Focus on reliability, usability, and maintainability.",
    color: "text-cyan-400",
    glow: "bg-cyan-500/10",
  },
  {
    icon: Layers,
    title: "Full stack",
    desc: "End-to-end delivery from UI to data flow.",
    color: "text-fuchsia-400",
    glow: "bg-fuchsia-500/10",
  },
  {
    icon: Globe,
    title: "Cross-platform",
    desc: "Web and mobile experiences with Flutter and React.",
    color: "text-emerald-400",
    glow: "bg-emerald-500/10",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          About
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          A builder focused on
          <br />
          <span className="text-gradient-static">production-ready AI experiences.</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Bio */}
        <motion.div
          className="glass-card rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[15px] leading-[1.8] text-white/55 sm:text-[16px]">
            I am passionate about building intelligent applications that are not only technically
            strong but also polished, intuitive, and ready for real users. My work sits at the
            intersection of AI engineering, software craftsmanship, and product thinking.
          </p>
          <p className="mt-5 text-[15px] leading-[1.8] text-white/40 sm:text-[16px]">
            I enjoy combining AI with web and mobile development to create systems that feel fast,
            modern, and trustworthy. Whether working on computer vision, NLP, or full stack
            applications, I aim to ship production-ready experiences with clear architecture and
            clean UX.
          </p>
        </motion.div>

        {/* Principles */}
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass-card gradient-border group rounded-3xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${p.glow}`}>
                <p.icon className={`h-4 w-4 ${p.color}`} />
              </div>
              <p className="font-[family-name:var(--font-space-grotesk)] text-[14px] font-semibold text-white/85">
                {p.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/40">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
