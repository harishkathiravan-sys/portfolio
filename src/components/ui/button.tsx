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
        "inline-flex items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014] disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "bg-gradient-to-r from-violet-500 to-cyan-400 text-[#030014] shadow-[0_0_40px_rgba(139,92,246,0.25)] hover:shadow-[0_0_60px_rgba(34,211,238,0.3)] hover:scale-[1.02]",
        variant === "secondary" && "bg-white/[0.06] text-white/80 border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.12]",
        variant === "ghost" && "text-white/70 hover:bg-white/[0.06] hover:text-white/90",
        variant === "outline" && "border border-white/[0.08] bg-white/[0.02] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white/80",
        size === "sm" && "h-9 px-4",
        size === "default" && "h-10 px-5",
        size === "lg" && "h-12 px-6",
        className,
      )}
      {...props}
    />
  );
}
