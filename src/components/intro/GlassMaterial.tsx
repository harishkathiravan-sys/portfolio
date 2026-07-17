"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Panel glass — used for floating glass panels.
 * Physically correct transmission with chromatic aberration.
 */
export function PanelGlassMaterial() {
  return (
    <MeshTransmissionMaterial
      transmission={0.92}
      roughness={0.05}
      thickness={1.5}
      ior={1.5}
      chromaticAberration={0.04}
      anisotropy={0.2}
      distortion={0.1}
      temporalDistortion={0.05}
      clearcoat={1}
      clearcoatRoughness={0.1}
      color="#f8f8ff"
      attenuationColor="#e8e8f0"
      attenuationDistance={2}
      samples={4}
      resolution={0.5}
      side={THREE.DoubleSide}
    />
  );
}

/**
 * Text glass — used for HK and HARISH KATHIRAVAN 3D text.
 * Slightly different tuning for typography readability.
 */
export function TextGlassMaterial({ opacity = 1 }: { opacity?: number }) {
  return (
    <MeshTransmissionMaterial
      transmission={0.85}
      roughness={0.02}
      thickness={0.8}
      ior={1.45}
      chromaticAberration={0.06}
      anisotropy={0.1}
      distortion={0.05}
      clearcoat={1}
      clearcoatRoughness={0.05}
      color="#ffffff"
      attenuationColor="#d0d0ff"
      attenuationDistance={3}
      samples={4}
      resolution={0.5}
      transparent
      opacity={opacity}
    />
  );
}
