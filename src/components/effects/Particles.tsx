"use client";

export function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    let colorClass = "";
    if (i % 5 === 0) colorClass = "particle-violet";
    else if (i % 7 === 0) colorClass = "particle-cyan";
    else if (i % 9 === 0) colorClass = "particle-rose";
    return { index: i, colorClass };
  });

  return (
    <div className="particles" aria-hidden="true">
      {particles.map(({ index, colorClass }) => (
        <div key={index} className={`particle ${colorClass}`} />
      ))}
    </div>
  );
}
