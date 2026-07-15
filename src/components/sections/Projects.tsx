"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Cpu } from "lucide-react";
import { TiltCard } from "@/components/effects/TiltCard";

const githubProfile = "https://github.com/harishkathiravan-sys";

const projects = [
  {
    name: "EEG BOT",
    description:
      "Emotion-aware AI assistant that interprets EEG signals and explains predictions with SHAP, LIME, and LangChain-powered responses.",
    tech: [
      { name: "EEG", color: "#8b5cf6" },
      { name: "XGBoost", color: "#06b6d4" },
      { name: "SHAP", color: "#34d399" },
      { name: "LangChain", color: "#fbbf24" },
      { name: "React", color: "#22d3ee" },
    ],
    github: githubProfile,
    metric: "Adaptive neuro-AI interface",
    accent: "#8b5cf6",
  },
  {
    name: "RajiniVision AI",
    description:
      "Real-time hand gesture recognition system built with MediaPipe and OpenCV for interactive computer vision experiences.",
    tech: [
      { name: "MediaPipe", color: "#06b6d4" },
      { name: "OpenCV", color: "#34d399" },
      { name: "Python", color: "#fbbf24" },
      { name: "Real-time AI", color: "#d946ef" },
    ],
    github: githubProfile,
    metric: "Live gesture interpretation",
    accent: "#06b6d4",
  },
  {
    name: "MailShield AI",
    description:
      "AI-powered phishing and email threat detection platform using NLP and machine learning to surface risky content fast.",
    tech: [
      { name: "NLP", color: "#d946ef" },
      { name: "ML", color: "#8b5cf6" },
      { name: "Threat Detection", color: "#fb7185" },
      { name: "Text Analysis", color: "#06b6d4" },
    ],
    github: githubProfile,
    metric: "Defensive AI for inbox security",
    accent: "#d946ef",
  },
  {
    name: "Complaint Routing System",
    description:
      "Intelligent complaint classification engine that automatically routes cases to the right service pipeline using NLP.",
    tech: [
      { name: "NLP", color: "#d946ef" },
      { name: "Classification", color: "#8b5cf6" },
      { name: "Automation", color: "#34d399" },
    ],
    github: githubProfile,
    metric: "Faster support resolution",
    accent: "#d946ef",
  },
  {
    name: "TravelBuddy",
    description:
      "Flutter travel application with personalized recommendations, smart trip planning, and a mobile-first product experience.",
    tech: [
      { name: "Flutter", color: "#06b6d4" },
      { name: "Dart", color: "#34d399" },
      { name: "Recommendations", color: "#fbbf24" },
    ],
    github: githubProfile,
    metric: "Personalized mobile travel companion",
    accent: "#06b6d4",
  },
  {
    name: "KwikKart",
    description:
      "Full-stack e-commerce platform built with React, Node.js, Express, and MongoDB for end-to-end shopping workflows.",
    tech: [
      { name: "React", color: "#22d3ee" },
      { name: "Node.js", color: "#34d399" },
      { name: "MongoDB", color: "#8b5cf6" },
      { name: "Express", color: "#fbbf24" },
    ],
    github: githubProfile,
    metric: "Scalable commerce foundation",
    accent: "#22d3ee",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Featured Projects
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Selected work blending
          <br />
          <span className="text-gradient-static">AI engineering with product design.</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1 + i * 0.06,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <TiltCard className="h-full" glareColor={`${project.accent}18`}>
              <div className="glass-card gradient-border group relative flex h-full flex-col overflow-hidden rounded-3xl p-7">
                {/* Accent glow behind card */}
                <div
                  className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${project.accent}12, transparent 70%)`,
                  }}
                />
                {/* Shimmer */}
                <div className="card-shimmer" />

                {/* Header */}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/25">
                      {project.metric}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-[20px] font-semibold text-white/90">
                      {project.name}
                    </h3>
                  </div>
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/30 transition-all duration-300 group-hover:scale-110 group-hover:text-violet-400 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.15)]"
                  >
                    <Cpu className="h-4 w-4" />
                  </div>
                </div>

                {/* Description */}
                <p className="relative mt-4 text-[13px] leading-relaxed text-white/40">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t.name}
                      className="tech-chip transition-all duration-300 hover:scale-105"
                      style={{
                        borderColor: `${t.color}20`,
                      }}
                    >
                      <span
                        className="tech-chip-dot"
                        style={{ background: t.color }}
                      />
                      {t.name}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="relative mt-auto flex gap-2 pt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-white/50 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white/80 hover:shadow-[0_0_12px_rgba(139,92,246,0.1)]"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-white/50 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white/80 hover:shadow-[0_0_12px_rgba(34,211,238,0.1)]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Demo
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
