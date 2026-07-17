"use client";

import { useState, useCallback, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useIntroComplete } from "./IntroContext";
import { useIntroTimeline } from "./useIntroTimeline";
import { CinematicCamera } from "./CinematicCamera";
import { SceneLighting } from "./SceneLighting";
import { DustParticles } from "./DustParticles";
import { GlassPanel } from "./GlassPanel";
import { GlassText } from "./GlassText";
import { DomOverlay } from "./DomOverlay";

export function IntroScene() {
  const { setComplete } = useIntroComplete();
  const [visible, setVisible] = useState(true);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }, []);

  const PANEL_COUNT = isMobile ? 10 : 14;

  const handleComplete = useCallback(() => {
    setComplete(true);
    // Fade out canvas
    setCanvasOpacity(0);
    // Fade out DOM overlay (subtitles, HK)
    setOverlayOpacity(0);
    // Fully unmount after fade
    setTimeout(() => setVisible(false), 1000);
  }, [setComplete]);

  const { progress, phase, skipIntro } = useIntroTimeline(handleComplete);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{ pointerEvents: phase === "done" ? "none" : "auto" }}
    >
      {/* Three.js Canvas */}
      {canvasOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{ opacity: canvasOpacity, transition: "opacity 0.9s ease-out" }}
        >
          <Canvas
            camera={{ position: [0, 0.3, 20], fov: 50, near: 0.1, far: 60 }}
            dpr={[1, isMobile ? 1 : 1.5]}
            gl={{
              antialias: !isMobile,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0,
            }}
            style={{ background: "#0f0f10" }}
          >
            <Suspense fallback={null}>
              <CinematicCamera progress={progress} />
              <SceneLighting progress={progress} />
              <DustParticles count={isMobile ? 80 : 150} opacity={progress} />
              {Array.from({ length: PANEL_COUNT }, (_, i) => (
                <GlassPanel key={i} index={i} total={PANEL_COUNT} progress={progress} />
              ))}
              <GlassText progress={progress} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Black overlay for initial fade */}
      {phase === "black" && (
        <div className="absolute inset-0 bg-[#0f0f10] pointer-events-none" />
      )}

      {/* DOM text overlay — name persists, HK and subtitles fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: overlayOpacity, transition: "opacity 0.7s ease-out" }}
      >
        <DomOverlay progress={progress} />
      </div>

      {/* Skip button */}
      {phase !== "done" && phase !== "black" && (
        <button
          onClick={skipIntro}
          className="absolute bottom-6 right-6 z-[110] pointer-events-auto
            text-[10px] font-medium tracking-[0.15em] uppercase text-white/20
            hover:text-white/40 transition-colors duration-300"
        >
          Skip
        </button>
      )}
    </div>
  );
}
