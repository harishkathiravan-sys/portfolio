"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicCameraProps {
  progress: { current: number };
}

// Waypoints: [t, x, y, z]
const WAYPOINTS: [number, number, number, number][] = [
  [0.0,  0,   0.5,  18],
  [0.15, 2,   0.6,  15],
  [0.30, 2.5, 0.4,  12],
  [0.45, 0.5, 0.3,  10],
  [0.55, -1.5, 0.1, 9],
  [0.65, 0.8,  0,   7],
  [0.75, 0,    0,   6],
  [0.85, 0,    0,   4],
  [1.0,  0,    0,  -4],
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

  // Find segment
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

    // Subtle FOV shift for cinematic zoom feel
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = 50 - p * 4;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
