"use client";

import { ArrowUp, Github, Linkedin } from "lucide-react";

const githubProfile = "https://github.com/harishkathiravan-sys";
const linkedinProfile = "https://www.linkedin.com/in/harish-kathiravan-05b229304";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] backdrop-blur-sm">
      {/* Aurora gradient border */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] max-w-7xl mx-auto"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.25) 25%, rgba(34, 211, 238, 0.2) 50%, rgba(139, 92, 246, 0.15) 75%, transparent)",
        }}
      />
      <div className="section-divider" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Left: copyright + tagline */}
          <div className="text-center sm:text-left">
            <p className="text-[13px] font-medium tracking-wide text-white/40">
              &copy; {new Date().getFullYear()} Harish Kathiravan
            </p>
            <p className="mt-2 text-[11px] italic tracking-wider text-white/20">
              Designed &amp; engineered with precision
            </p>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-7">
            <a
              href="#hero"
              className="group flex items-center gap-2.5 text-[13px] text-white/35 transition-all duration-300 hover:text-violet-300/80 hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.35)]"
            >
              <ArrowUp className="h-3.5 w-3.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:animate-[bounce_0.6s_ease-in-out]" />
              <span>Back to top</span>
            </a>

            <span className="h-4 w-[1px] bg-white/10" />

            <a
              href={githubProfile}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-[13px] text-white/35 transition-all duration-300 hover:text-white/75 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
            >
              <Github className="h-3.5 w-3.5 transition-all duration-300 group-hover:scale-110" />
              <span>GitHub</span>
            </a>

            <a
              href={linkedinProfile}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-[13px] text-white/35 transition-all duration-300 hover:text-cyan-300/75 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.25)]"
            >
              <Linkedin className="h-3.5 w-3.5 transition-all duration-300 group-hover:scale-110" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
