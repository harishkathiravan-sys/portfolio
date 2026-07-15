"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { Particles } from "@/components/effects/Particles";
import { MouseSpotlight } from "@/components/effects/MouseSpotlight";
import { CinematicIntro } from "@/components/effects/CinematicIntro";

import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen">
      {/* Cinematic Intro (replaces LoadingScreen + Hero) */}
      <CinematicIntro />

      {/* Loading (returns null, kept for backwards compat) */}
      <LoadingScreen />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[90] h-[3px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #8b5cf6, #22d3ee, #d946ef, #8b5cf6)",
          backgroundSize: "200% 100%",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Global effects */}
      <AuroraBackground />
      <div className="animated-grid" aria-hidden="true" />
      <Particles />
      <MouseSpotlight />
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main className="relative z-10 mx-auto max-w-7xl">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Stats />
        <Resume />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
