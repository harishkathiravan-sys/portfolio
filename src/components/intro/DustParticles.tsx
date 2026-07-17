"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DustParticlesProps {
  count?: number;
  opacity?: { current: number };
}

export function DustParticles({ count = 300, opacity }: DustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return [pos] as const;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.008;
    pointsRef.current.rotation.x = Math.sin(t * 0.003) * 0.03;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (mat && opacity) mat.opacity = opacity.current * 0.25;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
