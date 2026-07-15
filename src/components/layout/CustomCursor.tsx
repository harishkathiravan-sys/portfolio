"use client";

import { useEffect, useState, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface TrailPoint {
  x: number;
  y: number;
}

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;
    setVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".magnetic-wrap")
      ) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  // Update trail
  useEffect(() => {
    if (Math.abs(x - prevPos.current.x) > 1 || Math.abs(y - prevPos.current.y) > 1) {
      prevPos.current = { x, y };
      setTrail((prev) => {
        const next = [...prev, { x, y }];
        return next.slice(-5);
      });
    }
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, i) => (
        <div
          key={i}
          className="cursor-trail hidden md:block"
          style={{
            left: point.x,
            top: point.y,
            opacity: (i + 1) / trail.length * 0.3,
            background: "rgba(139, 92, 246, 0.6)",
          }}
        />
      ))}
      {/* Ring cursor */}
      <div
        className="custom-cursor hidden md:block"
        style={{ left: x, top: y, opacity: hovering ? 1 : 0.5 }}
      />
      {/* Dot cursor */}
      <div
        className="cursor-dot hidden md:block"
        style={{ left: x, top: y }}
      />
    </>
  );
}
