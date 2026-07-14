"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setProgress(Math.floor(eased * 100));

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setLoading(false), 200);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030014]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="loading-ring" />
              <div className="loading-ring-inner" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-medium tracking-wider text-white/50 tabular-nums">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-space-grotesk)] text-[11px] font-medium uppercase tracking-[0.4em] text-white/25">
                Loading Portfolio
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
