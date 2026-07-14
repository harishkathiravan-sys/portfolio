"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { Particles } from "@/components/effects/Particles";
import { MouseSpotlight } from "@/components/effects/MouseSpotlight";

import { Hero } from "@/components/sections/Hero";
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
      {/* Loading */}
      <LoadingScreen />

      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500"
        style={{ scaleX }}
      />

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
        <Hero />
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
