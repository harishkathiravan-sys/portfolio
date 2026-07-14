"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Rocket,
  ShieldCheck,
  ChartSpline,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { cn } from "@/lib/utils";

const githubProfile = "https://github.com/harishkathiravan-sys";
const linkedinProfile = "https://www.linkedin.com/in/harish-kathiravan-05b229304";
const resumePath = "/Harish_Kathiravan_AI_Engineer_Resume.pdf";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 2.0,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center pt-24 pb-16"
    >
      <motion.div
        className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Left: Text */}
          <div className="relative z-10">
            <div className="hero-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-[12px] font-medium text-violet-300/90">
                Aspiring AI Engineer
              </span>
            </div>

            <h1 className="hero-reveal font-[family-name:var(--font-space-grotesk)] text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.03em]">
              <span className="text-gradient-static">Harish</span>
              <br />
              <span className="text-white/90">Kathiravan</span>
            </h1>

            <p className="hero-reveal mt-6 max-w-lg text-[15px] leading-relaxed text-white/45 sm:text-[17px]">
              Building intelligent software at the intersection of{" "}
              <span className="text-violet-300/80">AI</span>,{" "}
              <span className="text-cyan-300/80">Machine Learning</span>, and{" "}
              <span className="text-fuchsia-300/80">Full Stack Engineering</span>.
            </p>

            <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton>
                <Link
                  href="#projects"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-[14px] font-semibold text-[#030014] shadow-[0_0_40px_rgba(139,92,246,0.25)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(34,211,238,0.3)]"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={resumePath}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[14px] font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={githubProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[14px] font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={linkedinProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[14px] font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </MagneticButton>
            </div>

            <div className="hero-reveal mt-10 flex flex-wrap items-center gap-3">
              {[
                { icon: Rocket, text: "Production-first", color: "text-cyan-300/70" },
                { icon: ShieldCheck, text: "Accessibility", color: "text-violet-300/70" },
                { icon: ChartSpline, text: "Data-driven", color: "text-emerald-300/70" },
              ].map(({ icon: Icon, text, color }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-[12px] text-white/35"
                >
                  <Icon className={cn("h-3 w-3", color)} />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right: AI Visual */}
          <div className="hero-reveal relative hidden lg:block">
            <div className="relative">
              {/* Hologram card */}
              <div className="glass-elevated rounded-3xl p-8">
                {/* Top bar */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-violet-400 glow-pulse" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/30">
                      AI System Active
                    </span>
                  </div>
                  <Sparkles className="h-4 w-4 text-violet-400/50" />
                </div>

                {/* Main metric */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-violet-300/50">
                    Current Focus
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-[22px] font-semibold leading-snug text-white/90">
                    Building intelligent products
                    <br />
                    that feel premium &amp; fast.
                  </p>
                </div>

                {/* Stats grid */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { label: "Models Built", value: "10+" },
                    { label: "Tech Stacks", value: "6+" },
                    { label: "Products", value: "Real-world" },
                    { label: "Mission", value: "Impact" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3"
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                        {s.label}
                      </p>
                      <p className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-[17px] font-semibold text-white/80">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Status bar */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                      Build Mode
                    </p>
                    <p className="mt-0.5 text-[12px] text-white/50">
                      Modern, minimal, futuristic
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="float-animation h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]" style={{ animationDelay: "0s" }} />
                    <span className="float-animation h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" style={{ animationDelay: "0.5s" }} />
                    <span className="float-animation h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" style={{ animationDelay: "1s" }} />
                  </div>
                </div>
              </div>

              {/* Decorative glow behind card */}
              <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/5 blur-3xl" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
