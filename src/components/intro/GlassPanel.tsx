"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { PanelGlassMaterial } from "./GlassMaterial";

interface GlassPanelProps {
  index: number;
  total: number;
  progress: { current: number };
}

export function GlassPanel({ index, total, progress }: GlassPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const { initialPos, initialRot, size, initialScale } = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 3 + Math.random() * 5;
    return {
      initialPos: new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8 - 2
      ),
      initialRot: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      size: [0.6 + Math.random() * 1.2, 0.4 + Math.random() * 1.0, 0.06] as [number, number, number],
      initialScale: 0.4 + Math.random() * 0.8,
    };
  }, [index, total]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const mesh = meshRef.current;
    const mat = mesh.material as THREE.MeshPhysicalMaterial;

    if (p < 0.55) {
      // Free float
      mesh.position.x = initialPos.x + Math.sin(t * 0.3 + index * 0.7) * 0.4;
      mesh.position.y = initialPos.y + Math.cos(t * 0.2 + index * 1.1) * 0.5;
      mesh.position.z = initialPos.z + Math.sin(t * 0.15 + index * 1.7) * 0.3;
      mesh.rotation.x = initialRot.x + t * 0.06;
      mesh.rotation.y = initialRot.y + t * 0.04;
      mesh.rotation.z = initialRot.z + t * 0.02;
      mesh.scale.setScalar(initialScale * (0.85 + Math.sin(t * 0.4 + index) * 0.15));
    } else if (p < 0.75) {
      // Magnetic assembly toward center
      const assembleT = (p - 0.55) / 0.2;
      const ease = 1 - Math.pow(1 - assembleT, 3);
      const targetX = (Math.random() - 0.5) * 0.6;
      const targetY = (Math.random() - 0.5) * 0.3;
      mesh.position.x += (targetX - mesh.position.x) * ease * 0.06;
      mesh.position.y += (targetY - mesh.position.y) * ease * 0.06;
      mesh.position.z += (0 - mesh.position.z) * ease * 0.06;
      mesh.rotation.x += (0 - mesh.rotation.x) * ease * 0.04;
      mesh.rotation.y += (0 - mesh.rotation.y) * ease * 0.04;
      mesh.rotation.z += (0 - mesh.rotation.z) * ease * 0.04;
      mesh.scale.lerp(new THREE.Vector3(0.15, 0.15, 0.15), ease * 0.04);
    } else {
      // Dissolve outward
      const dissolveT = (p - 0.75) / 0.25;
      const dir = new THREE.Vector3(
        initialPos.x * 0.4,
        initialPos.y * 0.4 + 1.5,
        initialPos.z * 0.3 - 0.5
      ).normalize();
      mesh.position.add(dir.multiplyScalar(dissolveT * 0.06));
      mesh.rotation.x += 0.015;
      mesh.rotation.y += 0.01;
      if (mat && mat.opacity !== undefined) {
        mat.opacity = Math.max(0, 0.35 * (1 - dissolveT));
      }
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={size}
      radius={0.02}
      smoothness={4}
      position={initialPos.toArray()}
      rotation={initialRot.toArray()}
    >
      <PanelGlassMaterial />
    </RoundedBox>
  );
}
