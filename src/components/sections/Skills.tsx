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
    color: "#8b5cf6",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "SHAP", "LIME", "LangChain"],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    color: "#06b6d4",
    items: ["OpenCV", "MediaPipe", "Image Processing", "Gesture Recognition", "Object Detection"],
  },
  {
    icon: TerminalSquare,
    title: "NLP",
    color: "#d946ef",
    items: ["Text Classification", "Email Threat Detection", "LLMs", "Prompting", "Document Processing"],
  },
  {
    icon: Layers3,
    title: "Frontend",
    color: "#34d399",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Code2,
    title: "Backend",
    color: "#fbbf24",
    items: ["Node.js", "Express", "REST APIs", "Authentication", "System Design"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    color: "#fb7185",
    items: ["Flutter", "Dart", "Cross-platform UX", "State Management"],
  },
  {
    icon: Database,
    title: "Databases",
    color: "#38bdf8",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Prisma", "SQL"],
  },
  {
    icon: Wrench,
    title: "Tools",
    color: "#a78bfa",
    items: ["GitHub", "Docker", "Vercel", "Postman", "Figma", "Linux"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section id="skills" ref={ref} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Skills
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Technical depth across
          <br />
          <span className="text-gradient-static">AI, systems, and product UI.</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar: Category tabs */}
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
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal",
                  isActive
                    ? "bg-white/[0.06] border border-white/[0.08]"
                    : "border border-transparent hover:bg-white/[0.03]",
                )}
              >
                {/* Active glow border */}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full"
                    style={{
                      background: `linear-gradient(180deg, ${group.color}, transparent)`,
                      boxShadow: `0 0 12px ${group.color}40`,
                    }}
                  />
                )}
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                    isActive ? "bg-white/[0.08]" : "bg-white/[0.03]",
                  )}
                  style={isActive ? { boxShadow: `0 0 20px ${group.color}20` } : {}}
                >
                  <Icon
                    className="h-4 w-4 transition-colors duration-300"
                    style={{ color: isActive ? group.color : "rgba(255,255,255,0.3)" }}
                  />
                </div>
                <span
                  className={cn(
                    "font-[family-name:var(--font-space-grotesk)] text-[13px] font-medium transition-colors duration-300",
                    isActive ? "text-white/90" : "text-white/40",
                  )}
                >
                  {group.title}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Content area */}
        <motion.div
          className="glass-card rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="mb-6 flex items-center gap-3">
                {(() => {
                  const Icon = skillGroups[activeGroup].icon;
                  return (
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        background: `${skillGroups[activeGroup].color}12`,
                        boxShadow: `0 0 24px ${skillGroups[activeGroup].color}15`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: skillGroups[activeGroup].color }}
                      />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-[18px] font-semibold text-white/90">
                    {skillGroups[activeGroup].title}
                  </h3>
                  <p className="text-[12px] text-white/30">
                    {skillGroups[activeGroup].items.length} technologies
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {skillGroups[activeGroup].items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: j * 0.04 }}
                    className="tech-chip cursor-default"
                    style={{
                      borderColor: `${skillGroups[activeGroup].color}20`,
                    }}
                  >
                    <span
                      className="tech-chip-dot"
                      style={{ background: skillGroups[activeGroup].color }}
                    />
                    {item}
                  </motion.span>
                ))}
              </div>

              {/* Decorative bar with shimmer */}
              <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                <motion.div
                  className="shimmer relative h-full rounded-full"
                  style={{ background: skillGroups[activeGroup].color }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
