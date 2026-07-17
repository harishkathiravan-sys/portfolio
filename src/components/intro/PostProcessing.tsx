"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

interface PostProcessingProps {
  progress: { current: number };
}

export function PostProcessing({ progress }: PostProcessingProps) {
  const composerRef = useRef<any>(null);
  const enabled = useRef(true);

  useFrame(() => {
    const p = progress.current;
    // Disable post-processing after intro completes
    if (p > 0.95 && enabled.current) {
      enabled.current = false;
      if (composerRef.current) composerRef.current.enabled = false;
    }
  });

  return (
    <EffectComposer ref={composerRef}>
      <Bloom
        intensity={0.15}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0005, 0.0005) as any}
        radialModulation
        modulationOffset={0.5}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.02}
      />
    </EffectComposer>
  );
}
