"use client";

import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
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

  if (!visible) return null;

  return (
    <>
      <div
        className="custom-cursor hidden md:block"
        style={{ left: x, top: y, opacity: hovering ? 1 : 0.5 }}
      />
      <div
        className="cursor-dot hidden md:block"
        style={{ left: x, top: y }}
      />
    </>
  );
}
