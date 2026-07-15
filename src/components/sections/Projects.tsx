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
    <section id="projects" ref={ref} className="relative py-32 sm:py-40">
      <div className="section-divider mb-24" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="text-center"
      >
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Featured Projects
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Selected work blending
          <br />
          <span className="text-gradient-static">AI engineering with product design.</span>
        </h2>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
      </motion.div>

      {/* Project grid */}
      <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.12 + i * 0.07,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <TiltCard className="h-full" glareColor={`${project.accent}18`}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.035] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>

                {/* Gradient accent bar at top */}
                <div
                  className="h-[3px] w-full shrink-0 transition-all duration-500 group-hover:h-[4px]"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}00, ${project.accent}, ${project.accent}00)`,
                  }}
                />

                {/* Accent glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 50% -10%, ${project.accent}15, transparent 60%)`,
                    boxShadow: `inset 0 1px 0 0 ${project.accent}10`,
                  }}
                />

                {/* Inner shadow for depth */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_2px_20px_-4px_rgba(0,0,0,0.3)] group-hover:shadow-[inset_0_2px_20px_-4px_rgba(0,0,0,0.2)] transition-shadow duration-500" />

                {/* Card content */}
                <div className="relative flex flex-1 flex-col p-7 sm:p-8">

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-[family-name:var(--font-space-grotesk)] text-[22px] font-bold tracking-[-0.01em] text-white/95 transition-colors duration-300 group-hover:text-white"
                      >
                        {project.name}
                      </h3>
                    </div>
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white/30 transition-all duration-400 group-hover:scale-110 group-hover:border-white/[0.12] group-hover:bg-white/[0.08]"
                      style={{
                        color: `${project.accent}80`,
                      }}
                    >
                      <Cpu className="h-[18px] w-[18px]" style={{ color: `var(--tw-shadow-color, ${project.accent}90)` }} />
                    </div>
                  </div>

                  {/* Metric tagline */}
                  <p
                    className="mt-3 text-[13px] font-medium tracking-wide"
                    style={{ color: `${project.accent}cc` }}
                  >
                    {project.metric}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-[13px] leading-[1.7] text-white/38">
                    {project.description}
                  </p>

                  {/* Tech chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t.name}
                        className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium text-white/50 transition-all duration-300 hover:scale-105 hover:text-white/75"
                        style={{
                          borderColor: `${t.color}25`,
                          backgroundColor: `${t.color}08`,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: t.color }}
                        />
                        {t.name}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="relative mt-auto flex gap-3 pt-7">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-button inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white/50 transition-all duration-400 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white/85 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.25)]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </a>
                    <a
                      href="#"
                      className="glass-button inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white/50 transition-all duration-400 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white/85 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.25)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
