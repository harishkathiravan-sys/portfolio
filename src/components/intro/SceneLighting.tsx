"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneLightingProps {
  progress: { current: number };
}

export function SceneLighting({ progress }: SceneLightingProps) {
  const keyRef = useRef<THREE.DirectionalLight>(null!);
  const rimRef = useRef<THREE.PointLight>(null!);
  const ambientRef = useRef<THREE.AmbientLight>(null!);

  useFrame(() => {
    const p = progress.current;
    if (keyRef.current) keyRef.current.intensity = Math.min(p * 1.0, 0.5);
    if (rimRef.current) rimRef.current.intensity = Math.min(p * 0.6, 0.3);
    if (ambientRef.current) ambientRef.current.intensity = 0.05 + p * 0.12;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.05} color="#e8e8f0" />
      <directionalLight ref={keyRef} position={[4, 6, 8]} intensity={0} color="#f5f5ff" />
      <directionalLight position={[-3, 2, 4]} intensity={0.12} color="#e0e0f0" />
      <pointLight ref={rimRef} position={[0, 5, -3]} intensity={0} color="#ffffff" distance={20} />
      <fog attach="fog" args={["#0f0f10", 12, 30]} />
    </>
  );
}
