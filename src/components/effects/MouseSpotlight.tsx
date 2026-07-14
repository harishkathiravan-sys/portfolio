"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

export function MouseSpotlight() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="spotlight"
      aria-hidden="true"
      style={{ left: x, top: y }}
    />
  );
}
