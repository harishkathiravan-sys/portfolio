"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export type IntroPhase = "black" | "reveal" | "glass" | "orbit" | "assemble" | "text" | "dissolve" | "done";

interface UseIntroTimelineReturn {
  progress: { current: number };
  phase: IntroPhase;
  skipIntro: () => void;
}

export function useIntroTimeline(onComplete: () => void): UseIntroTimelineReturn {
  const progress = useRef(0);
  const phase = useRef<IntroPhase>("black");
  const rafRef = useRef<number>(0);
  const startTime = useRef(0);
  const skipped = useRef(false);

  const setPhase = useCallback((p: IntroPhase) => {
    phase.current = p;
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      progress.current = 1;
      setPhase("done");
      onComplete();
      return;
    }

    startTime.current = performance.now();
    const duration = 9500; // ~9.5 seconds

    const tick = () => {
      if (skipped.current) return;
      const elapsed = performance.now() - startTime.current;
      const p = Math.min(elapsed / duration, 1);
      progress.current = p;

      // Update phase
      if (p < 0.05) setPhase("black");
      else if (p < 0.25) setPhase("reveal");
      else if (p < 0.45) setPhase("glass");
      else if (p < 0.65) setPhase("orbit");
      else if (p < 0.75) setPhase("assemble");
      else if (p < 0.88) setPhase("text");
      else if (p < 1.0) setPhase("dissolve");
      else {
        setPhase("done");
        onComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete, setPhase]);

  const skipIntro = useCallback(() => {
    skipped.current = true;
    cancelAnimationFrame(rafRef.current);
    progress.current = 1;
    setPhase("done");
    onComplete();
  }, [onComplete, setPhase]);

  return { progress, phase: phase.current, skipIntro };
}
