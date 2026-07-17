"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface IntroContextValue {
  isComplete: boolean;
  setComplete: (v: boolean) => void;
}

const IntroContext = createContext<IntroContextValue>({
  isComplete: false,
  setComplete: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [isComplete, setComplete] = useState(false);
  return (
    <IntroContext.Provider value={{ isComplete, setComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntroComplete() {
  return useContext(IntroContext);
}
