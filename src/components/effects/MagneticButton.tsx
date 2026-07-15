"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  ripple?: boolean;
}

export function MagneticButton({ children, className = "", strength = 0.3, onClick, ripple = false }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!ripple || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: rx, y: ry }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="cta-ripple"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </motion.div>
  );
}
