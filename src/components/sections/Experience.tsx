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

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-white/30">
          Experience
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Practical exposure building
          <br />
          <span className="text-gradient-static">web experiences professionally.</span>
        </h2>
      </motion.div>

      {/* Timeline container */}
      <div className="relative mt-16 pl-12 sm:pl-14">
        {/* Minimal timeline line */}
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: "top" }}
        />

        {experience.map((item, i) => (
          <motion.div
            key={item.company}
            className="relative mb-12 last:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * 0.15,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {/* Minimal dot */}
            <div className="timeline-dot">
              <div className="timeline-dot-pulse" />
            </div>

            {/* Glass card */}
            <div className="glass-card group rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-1">
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-3.5 w-3.5 text-white/30" />
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/30">
                      {item.period}
                    </p>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-[22px] font-semibold text-white/90">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-[14px] text-white/40">{item.company}</p>
                </div>
                <span className="inline-flex w-fit items-center rounded-full border border-white/[0.1] bg-white/[0.05] px-3.5 py-1 text-[11px] font-medium text-white/50">
                  {item.badge}
                </span>
              </div>

              {/* Bullet points */}
              <div className="relative mt-6 space-y-3">
                {item.points.map((point, j) => (
                  <motion.div
                    key={j}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + i * 0.15 + j * 0.08,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <div className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-white/20" />
                    <p className="text-[13px] leading-relaxed text-white/50">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
