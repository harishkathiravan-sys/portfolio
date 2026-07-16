"use client";

import { useRef, useEffect, useState, useCallback, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────
   LIQUID GLASS MATERIAL
   ───────────────────────────────────────────────────── */
function LiquidGlassMaterial({ roughness = 0.05, opacity = 0.35 }: { roughness?: number; opacity?: number }) {
  return (
    <meshPhysicalMaterial
      color="#ffffff"
      metalness={0.1}
      roughness={roughness}
      transmission={0.85}
      thickness={1.5}
      transparent
      opacity={opacity}
      envMapIntensity={1.2}
      clearcoat={1}
      clearcoatRoughness={0.1}
      ior={1.5}
      side={THREE.DoubleSide}
    />
  );
}

/* ─────────────────────────────────────────────────────
   GLASS PANEL — a single floating rectangle
   ───────────────────────────────────────────────────── */
interface GlassPanelProps {
  index: number;
  total: number;
  progress: { current: number };
  assembled: { current: boolean };
}

function GlassPanel({ index, total, progress, assembled }: GlassPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialPos = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 3 + Math.random() * 4;
    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 8 - 2;
    return new THREE.Vector3(x, y, z);
  }, [index, total]);

  const initialRot = useMemo(
    () => new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
    []
  );

  const initialScale = useMemo(() => 0.3 + Math.random() * 0.7, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const p = progress.current;

    if (p < 0.55) {
      // Float freely
      meshRef.current.position.x = initialPos.x + Math.sin(t * 0.3 + index) * 0.3;
      meshRef.current.position.y = initialPos.y + Math.cos(t * 0.2 + index * 0.7) * 0.4;
      meshRef.current.position.z = initialPos.z + Math.sin(t * 0.15 + index * 1.3) * 0.3;
      meshRef.current.rotation.x = initialRot.x + t * 0.08;
      meshRef.current.rotation.y = initialRot.y + t * 0.05;
      meshRef.current.rotation.z = initialRot.z + t * 0.03;
      meshRef.current.scale.setScalar(initialScale * (0.8 + Math.sin(t * 0.5 + index) * 0.2));
    } else if (p < 0.75) {
      // Assemble toward center
      const assembleT = (p - 0.55) / 0.2;
      const ease = 1 - Math.pow(1 - assembleT, 3);
      const targetX = (Math.random() - 0.5) * 0.8;
      const targetY = (Math.random() - 0.5) * 0.4;
      meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, 0), ease * 0.05);
      meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * ease * 0.03;
      meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * ease * 0.03;
      meshRef.current.scale.lerp(new THREE.Vector3(0.15, 0.15, 0.15), ease * 0.03);
    } else {
      // Dissolve outward
      const dissolveT = (p - 0.75) / 0.25;
      const ease = dissolveT * dissolveT;
      const dir = new THREE.Vector3(
        initialPos.x * 0.5,
        initialPos.y * 0.5 + 2,
        initialPos.z * 0.3 - 1
      ).normalize();
      meshRef.current.position.add(dir.multiplyScalar(ease * 0.08));
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.015;

      const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = Math.max(0, 0.35 * (1 - dissolveT));
        mat.transmission = Math.min(1, 0.85 + dissolveT * 0.15);
      }
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[0.8 + Math.random() * 1.2, 0.6 + Math.random() * 1, 0.06]}
      radius={0.02}
      smoothness={4}
      position={initialPos.toArray()}
      rotation={initialRot.toArray()}
    >
      <LiquidGlassMaterial />
    </RoundedBox>
  );
}

/* ─────────────────────────────────────────────────────
   DUST PARTICLES — atmospheric
   ───────────────────────────────────────────────────── */
function DustParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const progressRef = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.01;
    pointsRef.current.rotation.x = Math.sin(t * 0.005) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────
   CAMERA CONTROLLER — cinematic movement
   ───────────────────────────────────────────────────── */
function CameraController({ progress }: { progress: { current: number } }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = progress.current;
    const t = p * 6;

    if (p < 0.3) {
      // Approach from far
      camera.position.z = 12 - t * 3;
      camera.position.x = Math.sin(t * 0.3) * 1.5;
      camera.position.y = Math.cos(t * 0.2) * 0.8;
    } else if (p < 0.55) {
      // Orbit slowly
      const orbitT = (p - 0.3) / 0.25;
      camera.position.z = 6 - orbitT * 2;
      camera.position.x = Math.sin(orbitT * Math.PI * 0.5) * 2;
      camera.position.y = Math.cos(orbitT * Math.PI * 0.3) * 1;
    } else if (p < 0.75) {
      // Move to center for assembly
      const assembleT = (p - 0.55) / 0.2;
      camera.position.z = 4 - assembleT * 2;
      camera.position.x *= 0.97;
      camera.position.y *= 0.97;
    } else {
      // Push forward through the dissolving glass
      const pushT = (p - 0.75) / 0.25;
      camera.position.z = 2 - pushT * 8;
      camera.position.x *= 0.95;
      camera.position.y *= 0.95;
    }

    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─────────────────────────────────────────────────────
   ENVIRONMENT LIGHTING
   ───────────────────────────────────────────────────── */
function SceneLighting({ progress }: { progress: { current: number } }) {
  const ambientRef = useRef<THREE.AmbientLight>(null!);
  const pointRef = useRef<THREE.PointLight>(null!);

  useFrame(() => {
    const p = progress.current;
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.1 + p * 0.4;
    }
    if (pointRef.current) {
      pointRef.current.intensity = 0.3 + p * 0.8;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.1} color="#e8e8f0" />
      <pointLight ref={pointRef} position={[0, 3, 5]} intensity={0.3} color="#f0f0ff" distance={20} />
      <pointLight position={[-5, 2, -3]} intensity={0.15} color="#e0e0f0" distance={15} />
      <directionalLight position={[2, 4, 6]} intensity={0.2} color="#ffffff" />
    </>
  );
}

/* ─────────────────────────────────────────────────────
   THREE.JS SCENE
   ───────────────────────────────────────────────────── */
function GlassScene({ progress }: { progress: { current: number } }) {
  const assembled = useRef(false);
  const panelCount = 18;

  return (
    <>
      <CameraController progress={progress} />
      <SceneLighting progress={progress} />
      <DustParticles count={150} />
      {Array.from({ length: panelCount }, (_, i) => (
        <GlassPanel
          key={i}
          index={i}
          total={panelCount}
          progress={progress}
          assembled={assembled}
        />
      ))}
      {/* Subtle environment */}
      <fog attach="fog" args={["#0f0f10", 8, 25]} />
    </>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN INTRO COMPONENT
   ───────────────────────────────────────────────────── */
export function LiquidGlassIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [phase, setPhase] = useState<"black" | "scene" | "done">("black");
  const [textVisible, setTextVisible] = useState(false);
  const [hkVisible, setHkVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end start"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 0.8, 0]);
  const overlayScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // GSAP timeline for text reveals
  useEffect(() => {
    if (phase !== "scene") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDismissed(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // HK initials emerge from glass
      tl.call(() => setHkVisible(true), [], 2.2);
      tl.fromTo(
        ".intro-hk",
        { opacity: 0, scale: 0.8, filter: "blur(12px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        2.2
      );

      // Full name
      tl.call(() => setNameVisible(true), [], 3.4);
      tl.fromTo(
        ".intro-fullname",
        { opacity: 0, y: 20, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "power2.inOut" },
        3.4
      );

      // Subtitle stagger
      tl.call(() => setSubtitleVisible(true), [], 4.2);
      tl.fromTo(
        ".intro-subtitle-item",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
        4.2
      );

      // Dismiss
      tl.call(
        () => {
          setDismissed(true);
        },
        [],
        5.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  // Start scene after black screen
  useEffect(() => {
    const timer = setTimeout(() => setPhase("scene"), 400);
    return () => clearTimeout(timer);
  }, []);

  // Update Three.js progress
  useEffect(() => {
    if (phase !== "scene") return;
    let raf: number;
    const start = performance.now();
    const duration = 5800; // ~5.8 seconds

    const tick = () => {
      const elapsed = performance.now() - start;
      progress.current = Math.min(elapsed / duration, 1);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const scrollToContent = useCallback(() => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (dismissed) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100]">
      <motion.div
        ref={timelineRef}
        className="relative h-[300vh]"
        style={{ opacity: overlayOpacity, scale: overlayScale }}
      >
        {/* Black → fade to scene */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0f0f10]">
          {/* Three.js Canvas */}
          {phase === "scene" && (
            <div className="absolute inset-0">
              <Canvas
                camera={{ position: [0, 0, 12], fov: 50, near: 0.1, far: 50 }}
                gl={{
                  antialias: true,
                  alpha: false,
                  powerPreference: "high-performance",
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.1,
                }}
                dpr={[1, 2]}
                style={{ background: "#0f0f10" }}
              >
                <Suspense fallback={null}>
                  <GlassScene progress={progress} />
                </Suspense>
              </Canvas>
            </div>
          )}

          {/* Ambient gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)",
            }}
          />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            {/* HK initials */}
            <div
              className="intro-hk font-[family-name:var(--font-space-grotesk)] text-[clamp(4rem,12vw,10rem)] font-bold tracking-[-0.04em] leading-none"
              style={{
                opacity: hkVisible ? undefined : 0,
                color: "rgba(255,255,255,0.92)",
                textShadow: "0 0 40px rgba(255,255,255,0.05)",
              }}
            >
              HK
            </div>

            {/* Full name */}
            <div
              className="intro-fullname mt-4 overflow-hidden"
              style={{ opacity: nameVisible ? undefined : 0 }}
            >
              <p className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1rem,3vw,2rem)] font-semibold tracking-[0.08em] text-white/80">
                HARISH KATHIRAVAN
              </p>
            </div>

            {/* Subtitle items */}
            <div
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              style={{ opacity: subtitleVisible ? undefined : 0 }}
            >
              {["AI Engineer", "Machine Learning", "Computer Vision", "Full Stack Developer"].map(
                (item) => (
                  <span
                    key={item}
                    className="intro-subtitle-item text-[11px] font-medium tracking-[0.12em] uppercase text-white/30"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <button
                onClick={scrollToContent}
                className="pointer-events-auto text-[9px] font-medium tracking-[0.2em] uppercase text-white/20 transition-colors duration-500 hover:text-white/40"
              >
                Scroll to explore
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
