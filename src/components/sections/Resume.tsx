"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Mail, BadgeCheck, FileText } from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";

const githubProfile = "https://github.com/harishkathiravan-sys";
const resumePath = "/Harish_Kathiravan_AI_Engineer_Resume.pdf";

const highlights = [
  "AI and ML systems with explainability and practical deployment thinking.",
  "Full stack apps using modern React, Node.js, and data-driven architecture.",
  "Computer vision prototypes and intelligent mobile experiences with Flutter.",
];

export function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" ref={ref} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Resume
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Download a concise overview of
          <br />
          <span className="text-gradient-static">experience, projects &amp; strengths.</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        {/* Resume card */}
        <motion.div
          className="glass-card gradient-border group relative overflow-hidden rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="card-shimmer" />
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            <FileText className="h-5 w-5 text-violet-400" />
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.3em] text-violet-300/50">
              Resume
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-[22px] font-semibold text-white/90">
              Harish Kathiravan
            </h3>
          </div>

          <p className="relative mt-5 text-[14px] leading-relaxed text-white/40">
            A focused summary of work in AI engineering, computer vision, machine learning, full
            stack development, and Flutter-based mobile products.
          </p>

          <div className="relative mt-6 flex flex-wrap gap-3">
            <MagneticButton ripple>
              <a
                href="#contact"
                className="cta-premium text-[13px] py-2.5 px-5"
              >
                <Mail className="h-3.5 w-3.5" />
                Request Resume
              </a>
            </MagneticButton>
            <a
              href={resumePath}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white/80 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="glass-card gradient-border rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="space-y-3">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03] hover:translate-y-[-1px]"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/70" />
                <p className="text-[13px] leading-relaxed text-white/50">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
