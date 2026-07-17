"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Panel glass — lightweight transmission material for floating panels.
 */
export function PanelGlassMaterial() {
  return (
    <MeshTransmissionMaterial
      transmission={0.9}
      roughness={0.08}
      thickness={1.0}
      ior={1.5}
      chromaticAberration={0.03}
      clearcoat={1}
      clearcoatRoughness={0.1}
      color="#f0f0f8"
      samples={2}
      resolution={64}
      side={THREE.DoubleSide}
    />
  );
}
