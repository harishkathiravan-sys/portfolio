"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface GlassTextProps {
  progress: { current: number };
}

export function GlassText({ progress }: GlassTextProps) {
  const hkRef = useRef<THREE.Mesh>(null!);
  const nameRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    const p = progress.current;

    // HK: appear 0.60-0.72, fade 0.78-0.85
    const hkOpacity = p < 0.60 ? 0
      : p < 0.72 ? (p - 0.60) / 0.12
      : p < 0.78 ? 1
      : p < 0.85 ? 1 - (p - 0.78) / 0.07
      : 0;

    // Name: appear 0.70-0.80, fade 0.86-0.92
    const nameOpacity = p < 0.70 ? 0
      : p < 0.80 ? (p - 0.70) / 0.10
      : p < 0.86 ? 1
      : p < 0.92 ? 1 - (p - 0.86) / 0.06
      : 0;

    if (hkRef.current) {
      const mat = hkRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = hkOpacity;
        mat.transparent = true;
      }
    }
    if (nameRef.current) {
      const mat = nameRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = nameOpacity;
        mat.transparent = true;
      }
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      <Text
        ref={hkRef}
        font="/fonts/SpaceGrotesk-Bold.ttf"
        fontSize={2.8}
        letterSpacing={-0.04}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.3, 0]}
      >
        HK
        <meshPhysicalMaterial
          color="#f8f8ff"
          transmission={0.8}
          roughness={0.05}
          thickness={0.6}
          ior={1.4}
          clearcoat={1}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </Text>

      <Text
        ref={nameRef}
        font="/fonts/SpaceGrotesk-Bold.ttf"
        fontSize={0.55}
        letterSpacing={0.08}
        anchorX="center"
        anchorY="middle"
        position={[0, -0.8, 0]}
      >
        HARISH KATHIRAVAN
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.75}
          roughness={0.05}
          thickness={0.5}
          ior={1.4}
          clearcoat={1}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </Text>
    </group>
  );
}
