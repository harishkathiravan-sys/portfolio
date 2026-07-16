"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Layers, Globe, Cpu } from "lucide-react";

const principles = [
  {
    icon: Cpu,
    title: "AI-first",
    desc: "Designing systems around intelligence, not afterthoughts.",
  },
  {
    icon: Sparkles,
    title: "Product-minded",
    desc: "Focus on reliability, usability, and maintainability.",
  },
  {
    icon: Layers,
    title: "Full stack",
    desc: "End-to-end delivery from UI to data flow.",
  },
  {
    icon: Globe,
    title: "Cross-platform",
    desc: "Web and mobile experiences with Flutter and React.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-40 sm:py-48">
      <div className="section-divider mb-24" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-white/30">
          About
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white/90">
          A builder focused on
          <br />
          <span className="text-gradient-static">production-ready AI experiences.</span>
        </h2>
      </motion.div>

      {/* Content grid */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Bio card */}
        <motion.div
          className="glass-card group rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-1"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[15px] leading-[1.85] text-white/55 sm:text-[16px]">
            I am passionate about building intelligent applications that are not only technically
            strong but also polished, intuitive, and ready for real users. My work sits at the
            intersection of AI engineering, software craftsmanship, and product thinking.
          </p>
          <p className="mt-6 text-[15px] leading-[1.85] text-white/40 sm:text-[16px]">
            I enjoy combining AI with web and mobile development to create systems that feel fast,
            modern, and trustworthy. Whether working on computer vision, NLP, or full stack
            applications, I aim to ship production-ready experiences with clear architecture and
            clean UX.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass-card group rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                <p.icon className="h-5 w-5 text-white/60" />
              </div>
              <p className="font-[family-name:var(--font-space-grotesk)] text-[14px] font-semibold text-white/85">
                {p.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/40">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
