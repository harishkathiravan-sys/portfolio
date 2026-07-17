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
  const hkOpacity = useRef(0);
  const nameOpacity = useRef(0);

  useFrame(() => {
    const p = progress.current;

    // HK fades in at 0.70-0.78, fades out at 0.78-0.85
    if (p < 0.70) hkOpacity.current = 0;
    else if (p < 0.78) hkOpacity.current = (p - 0.70) / 0.08;
    else if (p < 0.85) hkOpacity.current = 1 - (p - 0.78) / 0.07;
    else hkOpacity.current = 0;

    // Name fades in at 0.80-0.86, fades out at 0.86-0.92
    if (p < 0.80) nameOpacity.current = 0;
    else if (p < 0.86) nameOpacity.current = (p - 0.80) / 0.06;
    else if (p < 0.92) nameOpacity.current = 1 - (p - 0.86) / 0.06;
    else nameOpacity.current = 0;

    // Update material opacity
    if (hkRef.current) {
      const mat = hkRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = hkOpacity.current;
        mat.transparent = true;
      }
    }
    if (nameRef.current) {
      const mat = nameRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = nameOpacity.current;
        mat.transparent = true;
      }
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      {/* HK initials — large, centered */}
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
          transmission={0.85}
          roughness={0.02}
          thickness={0.8}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </Text>

      {/* HARISH KATHIRAVAN — smaller, below HK */}
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
          transmission={0.8}
          roughness={0.03}
          thickness={0.6}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </Text>
    </group>
  );
}
