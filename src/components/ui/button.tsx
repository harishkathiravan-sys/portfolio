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
        "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950 shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(34,211,238,0.35)]",
        variant === "secondary" && "bg-white/8 text-white hover:bg-white/12 border border-white/10",
        variant === "ghost" && "text-white/85 hover:bg-white/8",
        variant === "outline" && "border border-white/12 bg-white/4 text-white hover:bg-white/8",
        size === "sm" && "h-10 px-4",
        size === "default" && "h-11 px-5",
        size === "lg" && "h-12 px-6",
        className,
      )}
      {...props}
    />
  );
}