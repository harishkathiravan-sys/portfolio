"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicCameraProps {
  progress: { current: number };
}

// Waypoints: [progress, x, y, z]
const WAYPOINTS: [number, number, number, number][] = [
  [0.00, 0,    0.3,  20],   // The Void — far away
  [0.14, 0,    0.3,  18],   // Begin dolly
  [0.33, 1.5,  0.4,  14],   // Drift right
  [0.52, -0.8, 0.1,  10],   // Orbit left
  [0.67, 0,    0,    7],    // Center on assembly
  [0.81, 0,    0,    6.5],  // Hold for text
  [0.90, 0,    0,    2],    // Push through
  [1.00, 0,    0,   -2],    // Through into website
];

function catmullRom(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

function interpolateWaypoints(progress: number, axis: number): number {
  const n = WAYPOINTS.length;
  if (progress <= WAYPOINTS[0][0]) return WAYPOINTS[0][axis + 1];
  if (progress >= WAYPOINTS[n - 1][0]) return WAYPOINTS[n - 1][axis + 1];

  let seg = 0;
  for (let i = 0; i < n - 1; i++) {
    if (progress >= WAYPOINTS[i][0] && progress < WAYPOINTS[i + 1][0]) {
      seg = i;
      break;
    }
  }

  const t0 = WAYPOINTS[seg][0];
  const t1 = WAYPOINTS[seg + 1][0];
  const localT = (progress - t0) / (t1 - t0);

  const i0 = Math.max(0, seg - 1);
  const i1 = seg;
  const i2 = seg + 1;
  const i3 = Math.min(n - 1, seg + 2);

  return catmullRom(
    localT,
    WAYPOINTS[i0][axis + 1],
    WAYPOINTS[i1][axis + 1],
    WAYPOINTS[i2][axis + 1],
    WAYPOINTS[i3][axis + 1]
  );
}

export function CinematicCamera({ progress }: CinematicCameraProps) {
  const { camera } = useThree();

  useFrame(() => {
    const p = progress.current;
    const x = interpolateWaypoints(p, 0);
    const y = interpolateWaypoints(p, 1);
    const z = interpolateWaypoints(p, 2);

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);

    // Subtle FOV shift
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = 50 - p * 4;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
