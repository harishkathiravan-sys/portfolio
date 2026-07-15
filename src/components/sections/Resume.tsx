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
    <section id="resume" ref={ref} className="relative py-32 sm:py-40">
      <div className="section-divider mb-24" />

      {/* ── Section heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="text-center"
      >
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Resume
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Download a concise overview of
          <br />
          <span className="text-gradient-static">experience, projects &amp; strengths.</span>
        </h2>
      </motion.div>

      {/* ── Grid ── */}
      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_0.9fr]">

        {/* ── Resume card ── */}
        <motion.div
          className="glass-card gradient-border group relative overflow-hidden rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Gradient accent bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-500/0 via-violet-400/60 to-violet-500/0" />

          <div className="card-shimmer" />

          {/* Icon */}
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-violet-600/5 shadow-[0_0_30px_rgba(139,92,246,0.12)] ring-1 ring-violet-400/10">
            <FileText className="h-6 w-6 text-violet-400" />
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.3em] text-violet-300/50">
              Resume
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-[22px] font-semibold text-white/90">
              Harish Kathiravan
            </h3>
          </div>

          <p className="relative mt-6 text-[14px] leading-[1.8] text-white/40">
            A focused summary of work in AI engineering, computer vision, machine learning, full
            stack development, and Flutter-based mobile products.
          </p>

          <div className="relative mt-8 flex flex-wrap gap-3">
            <MagneticButton ripple>
              <a
                href="#contact"
                className="cta-premium text-[13px] py-3 px-6"
              >
                <Mail className="h-4 w-4" />
                Request Resume
              </a>
            </MagneticButton>
            <a
              href={resumePath}
              download
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[13px] font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/25 hover:bg-violet-500/[0.06] hover:text-white/85 hover:shadow-[0_0_24px_rgba(139,92,246,0.1)]"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* ── Highlights card ── */}
        <motion.div
          className="glass-card gradient-border rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Gradient accent bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-400/50 to-emerald-500/0" />

          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-emerald-400/40">
            Highlights
          </p>

          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03] hover:translate-y-[-1px]"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 shadow-[0_0_8px_rgba(52,211,153,0.08)]">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-400/80" />
                </div>
                <p className="text-[13px] leading-[1.7] text-white/50">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
