import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
};

export function Button({ className, variant = "default", size = "default", asChild, ...props }: ButtonProps) {
  const Comp = asChild ? "span" : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f10] disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "bg-[rgba(255,255,255,0.08)] text-white/90 border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.18)]",
        variant === "secondary" && "bg-[rgba(255,255,255,0.05)] text-white/70 border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)]",
        variant === "ghost" && "text-white/50 hover:bg-[rgba(255,255,255,0.05)] hover:text-white/80",
        variant === "outline" && "border border-[rgba(255,255,255,0.1)] text-white/50 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.16)]",
        size === "sm" && "h-8 px-3.5",
        size === "default" && "h-9 px-5",
        size === "lg" && "h-11 px-6",
        className,
      )}
      {...props}
    />
  );
}
