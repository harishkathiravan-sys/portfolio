"use client";

import { useEffect, useState, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface TrailPoint {
  x: number;
  y: number;
}

type HoverType = "link" | "button" | "input" | "none";

const LABEL_MAP: Record<Exclude<HoverType, "none">, string> = {
  link: "View",
  button: "Click",
  input: "Type",
};

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [hoverType, setHoverType] = useState<HoverType>("none");
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;
    setVisible(true);

    const resolveType = (target: HTMLElement): HoverType => {
      if (target.closest("input") || target.closest("textarea") || target.closest("[contenteditable]")) {
        return "input";
      }
      if (target.closest("button") || target.closest("[role='button']") || target.closest(".cta-premium")) {
        return "button";
      }
      if (target.closest("a") || target.closest(".magnetic-wrap")) {
        return "link";
      }
      return "none";
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHoverType(resolveType(target));
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (related) {
        setHoverType(resolveType(related));
      } else {
        setHoverType("none");
      }
    };

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

  const isHovering = hoverType !== "none";
  const cursorClass = isHovering
    ? hoverType === "input"
      ? "hovering-input"
      : `hovering-${hoverType}`
    : "";

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
            opacity: ((i + 1) / trail.length) * 0.3,
            background: "rgba(139, 92, 246, 0.6)",
          }}
        />
      ))}
      {/* Ring cursor */}
      <div
        className={`custom-cursor hidden md:block ${cursorClass}`}
        style={{ left: x, top: y, opacity: isHovering ? 1 : 0.5 }}
      />
      {/* Dot cursor */}
      <div
        className="cursor-dot hidden md:block"
        style={{ left: x, top: y }}
      />
      {/* Context label */}
      {isHovering && (
        <div
          className={`cursor-label hidden md:block ${isHovering ? "visible" : ""}`}
          style={{ left: x, top: y }}
        >
          {LABEL_MAP[hoverType]}
        </div>
      )}
    </>
  );
}
