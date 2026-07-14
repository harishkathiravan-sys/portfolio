"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export function GradientBorderCard({ children, className = "", active = false }: GradientBorderCardProps) {
  return (
    <div className={cn("glass-card gradient-border rounded-3xl h-full", className)}>
      {children}
    </div>
  );
}
