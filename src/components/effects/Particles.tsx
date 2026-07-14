"use client";

export function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}
