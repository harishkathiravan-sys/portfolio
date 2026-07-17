"use client";

import { useRef, useEffect, useCallback } from "react";

export type IntroPhase = "black" | "reveal" | "drift" | "converge" | "emerge" | "push" | "arrive" | "done";

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

    const isMobile = window.innerWidth < 768;
    const duration = isMobile ? 8000 : 10500; // 8s mobile, 10.5s desktop
    startTime.current = performance.now();

    const tick = () => {
      if (skipped.current) return;
      const elapsed = performance.now() - startTime.current;
      const p = Math.min(elapsed / duration, 1);
      progress.current = p;

      // Phase boundaries (7 phases)
      if (p < 0.14) setPhase("black");       // 0-1.5s: darkness
      else if (p < 0.33) setPhase("reveal"); // 1.5-3.5s: panels appear
      else if (p < 0.52) setPhase("drift");  // 3.5-5.5s: peak glass beauty
      else if (p < 0.67) setPhase("converge"); // 5.5-7.0s: magnetic assembly
      else if (p < 0.81) setPhase("emerge"); // 7.0-8.5s: HK + name reveal
      else if (p < 0.90) setPhase("push");   // 8.5-9.5s: camera pushes through
      else if (p < 1.0) setPhase("arrive");  // 9.5-10.5s: merge into hero
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
