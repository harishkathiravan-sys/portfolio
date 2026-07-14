"use client";

import { ArrowUp } from "lucide-react";

const githubProfile = "https://github.com/harishkathiravan-sys";
const linkedinProfile = "https://www.linkedin.com/in/harish-kathiravan-05b229304";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04]">
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-[13px] text-white/35">
              &copy; {new Date().getFullYear()} Harish Kathiravan
            </p>
            <p className="mt-1 text-[11px] text-white/20">
              Designed &amp; engineered with precision
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="group flex items-center gap-2 text-[13px] text-white/35 transition-colors duration-300 hover:text-white/70"
            >
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Back to top
            </a>
            <a
              href={githubProfile}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-white/35 transition-colors duration-300 hover:text-white/70"
            >
              GitHub
            </a>
            <a
              href={linkedinProfile}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-white/35 transition-colors duration-300 hover:text-white/70"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
