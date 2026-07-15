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

const maxItems = Math.max(...skillGroups.map((g) => g.items.length));

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeGroup, setActiveGroup] = useState(0);
  const current = skillGroups[activeGroup];

  return (
    <section id="skills" ref={ref} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      {/* ── Section heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Skills
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Technical depth across
          <br />
          <span className="text-gradient-static">AI, systems, and product UI.</span>
        </h2>
      </motion.div>

      {/* ── Explorer layout ── */}
      <div className="mt-20 grid gap-8 lg:grid-cols-[300px_1fr]">

        {/* ── Sidebar tabs ── */}
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
                    ? "border border-white/[0.08]"
                    : "border border-transparent hover:bg-white/[0.03]",
                )}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${group.color}08, ${group.color}03)`
                    : undefined,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* ── Active left glow bar ── */}
                {isActive && (
                  <motion.div
                    layoutId="skills-tab-glow"
                    className="absolute left-0 top-1/2 h-10 w-[3px] -translate-y-1/2 rounded-full"
                    style={{
                      background: `linear-gradient(180deg, ${group.color}, ${group.color}40)`,
                      boxShadow: `0 0 16px ${group.color}60, 0 0 32px ${group.color}20`,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* ── Icon container ── */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                    isActive ? "bg-white/[0.08]" : "bg-white/[0.03]",
                  )}
                  style={
                    isActive
                      ? { boxShadow: `0 0 24px ${group.color}25, inset 0 0 20px ${group.color}08` }
                      : {}
                  }
                >
                  <Icon
                    className="h-[18px] w-[18px] transition-colors duration-300"
                    style={{ color: isActive ? group.color : "rgba(255,255,255,0.25)" }}
                  />
                </div>

                {/* ── Label + count badge ── */}
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
                      "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold transition-all duration-300",
                      isActive
                        ? "text-white/90"
                        : "bg-white/[0.04] text-white/20",
                    )}
                    style={
                      isActive
                        ? {
                            background: `${group.color}20`,
                            color: group.color,
                            boxShadow: `0 0 8px ${group.color}15`,
                          }
                        : {}
                    }
                  >
                    {group.items.length}
                  </span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* ── Content panel ── */}
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Gradient border layer */}
          <div
            className="absolute inset-0 rounded-3xl p-px"
            style={{
              background: `linear-gradient(135deg, ${current.color}25, transparent 50%, ${current.color}10)`,
            }}
          >
            <div className="h-full w-full rounded-3xl" />
          </div>

          {/* Glass card body */}
          <div className="relative glass-card rounded-3xl p-8 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* ── Category header ── */}
                <div className="mb-10 flex items-center gap-4">
                  {(() => {
                    const Icon = current.icon;
                    return (
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${current.color}18, ${current.color}06)`,
                          boxShadow: `0 0 32px ${current.color}20, 0 0 64px ${current.color}08`,
                        }}
                      >
                        <Icon
                          className="h-7 w-7"
                          style={{ color: current.color }}
                        />
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

                {/* ── Tech chips ── */}
                <div className="flex flex-wrap gap-3">
                  {current.items.map((item, j) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: j * 0.05,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="group/chip relative cursor-default overflow-hidden rounded-xl px-4 py-2.5 text-[13px] font-medium text-white/80 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${current.color}12, ${current.color}05)`,
                        border: `1px solid ${current.color}18`,
                        boxShadow: `inset 0 1px 0 ${current.color}08`,
                      }}
                    >
                      {/* Hover glow overlay */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100"
                        style={{
                          boxShadow: `inset 0 0 20px ${current.color}12, 0 0 20px ${current.color}10`,
                        }}
                      />
                      <span className="relative flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            background: current.color,
                            boxShadow: `0 0 6px ${current.color}60`,
                          }}
                        />
                        {item}
                      </span>
                    </motion.span>
                  ))}
                </div>

                {/* ── Progress / level indicator ── */}
                <div className="mt-10">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/20">
                      Proficiency
                    </span>
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: `${current.color}90` }}
                    >
                      {Math.round((current.items.length / maxItems) * 100)}%
                    </span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      key={`bar-${activeGroup}`}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${current.color}, ${current.color}90)`,
                        boxShadow: `0 0 12px ${current.color}40`,
                      }}
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${(current.items.length / maxItems) * 100}%`,
                      }}
                      transition={{
                        duration: 1,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    />
                    {/* Shimmer overlay */}
                    <motion.div
                      className="absolute inset-y-0 left-0 w-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${current.color}30, transparent)`,
                      }}
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 2,
                        delay: 0.8,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  {/* Segment markers */}
                  <div className="mt-3 flex gap-1.5">
                    {Array.from({ length: maxItems }).map((_, k) => (
                      <div
                        key={k}
                        className="h-0.5 flex-1 rounded-full transition-colors duration-500"
                        style={{
                          background:
                            k < current.items.length
                              ? `${current.color}${k < current.items.length ? "50" : "15"}`
                              : "rgba(255,255,255,0.04)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
