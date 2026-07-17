"use client";

import { useState, useCallback, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useIntroComplete } from "./IntroContext";
import { useIntroTimeline } from "./useIntroTimeline";
import { CinematicCamera } from "./CinematicCamera";
import { SceneLighting } from "./SceneLighting";
import { DustParticles } from "./DustParticles";
import { GlassPanel } from "./GlassPanel";
import { GlassText } from "./GlassText";
import { PostProcessing } from "./PostProcessing";
import { DomOverlay } from "./DomOverlay";

const PANEL_COUNT = 18;

export function IntroScene() {
  const { setComplete } = useIntroComplete();
  const [showCanvas, setShowCanvas] = useState(true);
  const [canvasOpacity, setCanvasOpacity] = useState(1);

  const handleComplete = useCallback(() => {
    setComplete(true);
    // Fade out canvas
    setCanvasOpacity(0);
    setTimeout(() => setShowCanvas(false), 800);
  }, [setComplete]);

  const { progress, phase, skipIntro } = useIntroTimeline(handleComplete);

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Three.js Canvas */}
      {showCanvas && (
        <div
          className="absolute inset-0"
          style={{ opacity: canvasOpacity, transition: "opacity 0.8s ease" }}
        >
          <Canvas
            camera={{ position: [0, 0.5, 18], fov: 50, near: 0.1, far: 60 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
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
              <DustParticles opacity={progress} />
              {Array.from({ length: PANEL_COUNT }, (_, i) => (
                <GlassPanel key={i} index={i} total={PANEL_COUNT} progress={progress} />
              ))}
              <GlassText progress={progress} />
              <PostProcessing progress={progress} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Black overlay for initial fade */}
      {phase === "black" && (
        <div className="absolute inset-0 bg-[#0f0f10] pointer-events-none" />
      )}

      {/* DOM text overlay */}
      <DomOverlay progress={progress} />

      {/* Skip button */}
      {!skipIntro && phase !== "done" && (
        <button
          onClick={skipIntro}
          className="absolute bottom-6 right-6 z-[110] pointer-events-auto
            text-[10px] font-medium tracking-[0.15em] uppercase text-white/20
            hover:text-white/40 transition-colors duration-300"
          style={{ opacity: phase === "black" ? 0 : 1 }}
        >
          Skip
        </button>
      )}
    </div>
  );
}
