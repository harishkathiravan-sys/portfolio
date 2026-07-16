"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain,
  Eye,
  TerminalSquare,
  Layers3,
  Code2,
  Smartphone,
  Database,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const skillGroups = [
  {
    icon: Brain,
    title: "AI & ML",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "SHAP", "LIME", "LangChain"],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    items: ["OpenCV", "MediaPipe", "Image Processing", "Gesture Recognition", "Object Detection"],
  },
  {
    icon: TerminalSquare,
    title: "NLP",
    items: ["Text Classification", "Email Threat Detection", "LLMs", "Prompting", "Document Processing"],
  },
  {
    icon: Layers3,
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Code2,
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Authentication", "System Design"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    items: ["Flutter", "Dart", "Cross-platform UX", "State Management"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Prisma", "SQL"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["GitHub", "Docker", "Vercel", "Postman", "Figma", "Linux"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeGroup, setActiveGroup] = useState(0);
  const current = skillGroups[activeGroup];

  return (
    <section id="skills" ref={ref} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/25">
          Skills
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Technical depth across
          <br />
          AI, systems, and product UI.
        </h2>
      </motion.div>

      {/* Explorer layout */}
      <div className="mt-20 grid gap-8 lg:grid-cols-[300px_1fr]">

        {/* Sidebar tabs */}
        <motion.div
          className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            const isActive = activeGroup === i;
            return (
              <button
                key={group.title}
                onClick={() => setActiveGroup(i)}
                className={cn(
                  "group relative flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal",
                  isActive
                    ? "border border-white/[0.08] bg-white/[0.06]"
                    : "border border-transparent hover:bg-white/[0.03]",
                )}
              >
                {/* Icon container */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                    isActive ? "bg-white/[0.08]" : "bg-white/[0.03]",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] transition-colors duration-300",
                      isActive ? "text-white/70" : "text-white/25",
                    )}
                  />
                </div>

                {/* Label + count badge */}
                <div className="flex flex-1 items-center gap-2">
                  <span
                    className={cn(
                      "font-[family-name:var(--font-space-grotesk)] text-[13px] font-medium transition-colors duration-300",
                      isActive ? "text-white/90" : "text-white/40",
                    )}
                  >
                    {group.title}
                  </span>
                  <span
                    className={cn(
                      "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/[0.06] px-1.5 text-[10px] font-semibold text-white/20 transition-all duration-300",
                      isActive && "bg-white/[0.10] text-white/50",
                    )}
                  >
                    {group.items.length}
                  </span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Content panel */}
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="glass-card rounded-3xl p-8 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Category header */}
                <div className="mb-10 flex items-center gap-4">
                  {(() => {
                    const Icon = current.icon;
                    return (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05]">
                        <Icon className="h-7 w-7 text-white/40" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-[22px] font-semibold text-white/90">
                      {current.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] text-white/30">
                      {current.items.length} technologies
                    </p>
                  </div>
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-3">
                  {current.items.map((item, j) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: j * 0.05,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="tech-chip cursor-default rounded-xl px-4 py-2.5 text-[13px] font-medium text-white/70"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
                        {item}
                      </span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
