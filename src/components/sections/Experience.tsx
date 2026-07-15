"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";

const experience = [
  {
    role: "Web Development Intern",
    company: "GreenWill Techs",
    period: "Internship",
    badge: "Web Development Intern",
    points: [
      "Built responsive web interfaces with a production mindset and strong attention to user experience.",
      "Collaborated on feature development, UI polish, and bug fixes across the product surface.",
      "Worked with modern frontend tooling and learned to ship reliable user-facing improvements quickly.",
    ],
  },
];

const isCurrentRole = (period: string) => {
  const lower = period.toLowerCase();
  return lower.includes("present") || lower.includes("current") || lower.includes("ongoing");
};

const cubicEase = [0.23, 1, 0.32, 1] as const;

export function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: cubicEase }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Experience
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Practical exposure building
          <br />
          <span className="text-gradient-static">web experiences professionally.</span>
        </h2>
      </motion.div>

      {/* Timeline container */}
      <div className="relative mt-16 sm:mt-20">
        {/* Gradient timeline line (violet to cyan) that draws on scroll */}
        <motion.div
          className="absolute left-[23px] sm:left-[27px] top-0 h-full w-[2px] origin-top"
          style={{
            background: "linear-gradient(to bottom, #8b5cf6, #6d28d9, #0891b2, #22d3ee)",
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: cubicEase }}
        />

        {/* Glow overlay on the timeline line */}
        <motion.div
          className="absolute left-[20px] sm:left-[24px] top-0 h-full w-[8px] origin-top opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, #8b5cf6, #6d28d9, #0891b2, #22d3ee)",
            filter: "blur(6px)",
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: cubicEase }}
        />

        {/* Timeline entries */}
        <div className="space-y-16 sm:space-y-20">
          {experience.map((item, i) => {
            const currentRole = isCurrentRole(item.period);

            return (
              <motion.div
                key={item.company}
                className="relative pl-14 sm:pl-16"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.2,
                  ease: cubicEase,
                }}
              >
                {/* Timeline dot with pulse + glow */}
                <div className="absolute left-2.5 sm:left-3 top-1 z-10">
                  {/* Outer pulsing glow ring */}
                  <motion.div
                    className="absolute -inset-3 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
                    }}
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.6, 0.2, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Secondary outer ring */}
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-violet-400/20"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.1, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />

                  {/* Solid dot core */}
                  <div className="relative h-[14px] w-[14px] rounded-full border-2 border-violet-400/80 bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.5),0_0_24px_rgba(139,92,246,0.25)]">
                    <div className="absolute inset-[3px] rounded-full bg-white/90" />
                  </div>
                </div>

                {/* Glass card entry */}
                <motion.div
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl p-7 sm:p-9 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.15)]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                  whileHover={{
                    borderColor: "rgba(139,92,246,0.15)",
                  }}
                >
                  {/* Gradient border overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(34,211,238,0.05), rgba(139,92,246,0.03))",
                    }}
                  />

                  {/* Shimmer effect on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                    }}
                  />

                  {/* Card content */}
                  <div className="relative">
                    {/* Header: role, company, period, and badge */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.1)]">
                            <Briefcase className="h-3.5 w-3.5 text-violet-400/80" />
                          </div>
                          <p className="text-[11px] uppercase tracking-[0.3em] text-violet-300/50 font-medium">
                            {item.period}
                          </p>
                          {currentRole && (
                            <motion.span
                              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                              animate={{
                                boxShadow: [
                                  "0 0 8px rgba(34,211,238,0.15)",
                                  "0 0 16px rgba(34,211,238,0.25)",
                                  "0 0 8px rgba(34,211,238,0.15)",
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/70" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                              </span>
                              Present
                            </motion.span>
                          )}
                        </div>
                        <h3 className="font-[family-name:var(--font-space-grotesk)] text-[20px] sm:text-[22px] font-semibold text-white/90">
                          {item.role}
                        </h3>
                        <p className="mt-1.5 text-[14px] text-white/40">{item.company}</p>
                      </div>

                      {/* Badge with glow */}
                      <motion.span
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/25 bg-gradient-to-r from-emerald-500/12 to-emerald-500/5 px-4 py-1.5 text-[11px] font-semibold text-emerald-300/80 shadow-[0_0_20px_rgba(52,211,153,0.12)]"
                        whileHover={{
                          boxShadow: "0 0 28px rgba(52,211,153,0.25)",
                          borderColor: "rgba(52,211,153,0.35)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                        {item.badge}
                      </motion.span>
                    </div>

                    {/* Bullet points with staggered reveal */}
                    <div className="relative mt-7 space-y-3">
                      {item.points.map((point, j) => (
                        <motion.div
                          key={j}
                          className="flex items-start gap-4 rounded-xl sm:rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03]"
                          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                          animate={
                            isInView
                              ? { opacity: 1, y: 0, filter: "blur(0px)" }
                              : {}
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.7 + i * 0.2 + j * 0.1,
                            ease: cubicEase,
                          }}
                        >
                          <div className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                          <p className="text-[13px] leading-relaxed text-white/50">
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
