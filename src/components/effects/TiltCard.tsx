"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
}

export function TiltCard({ children, className = "", glareColor = "rgba(139, 92, 246, 0.1)" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 25 });
  const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 200, damping: 25 });
  const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 200, damping: 25 });
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 300, damping: 25 });

  // Reactive glare gradient using useMotionTemplate
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor}, transparent 60%)`;

  // Edge light gradient
  const edgeBackground = useMotionTemplate`linear-gradient(${glareX}deg, rgba(139, 92, 246, 0.15), rgba(34, 211, 238, 0.1), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("tilt-card", className)}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
    >
      <div className="tilt-card-inner h-full">
        {children}
        {/* Glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background: glareBackground,
            opacity: isHovered ? 0.6 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
        {/* Edge light */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-3xl"
          style={{
            background: edgeBackground,
            opacity: isHovered ? 0.8 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>
    </motion.div>
  );
}
