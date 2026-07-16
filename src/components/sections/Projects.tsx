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
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/25">
          Featured Projects
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Selected work blending
          <br />
          AI engineering with product design.
        </h2>
      </motion.div>

      {/* Project grid */}
      <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
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
            <TiltCard className="h-full" glareColor="rgba(255,255,255,0.03)">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-card transition-all duration-500 hover:-translate-y-1">

                {/* Card content */}
                <div className="relative flex flex-1 flex-col p-7 sm:p-8">

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-[22px] font-bold tracking-[-0.01em] text-white/90">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05] text-white/30 transition-all duration-300 group-hover:bg-white/[0.08]">
                      <Cpu className="h-[18px] w-[18px] text-white/30" />
                    </div>
                  </div>

                  {/* Metric tagline */}
                  <p className="mt-3 text-[13px] font-medium tracking-wide text-white/25">
                    {project.metric}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-[13px] leading-[1.7] text-white/40">
                    {project.description}
                  </p>

                  {/* Tech chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t.name}
                        className="tech-chip inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium text-white/50 transition-all duration-300 hover:text-white/70"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
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
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white/50 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/80"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white/50 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/80"
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
