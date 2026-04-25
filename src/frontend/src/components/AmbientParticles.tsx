/**
 * AmbientParticles — premium white dot starfield.
 * Desktop: 35 small white dots. Mobile (< 768px): 18 dots for performance.
 * GPU-only (transform + opacity). z-index: 1, pointer-events: none.
 *
 * v7 — reduced to 18 dots on mobile via matchMedia for performance.
 *      Same visual style, same animations — just fewer on small screens.
 */

import { useMemo, useSyncExternalStore } from "react";

interface Dot {
  id: number;
  x: number; // vw %
  y: number; // vh %
  size: number; // px
  opacity: number;
  duration: number; // s
  delay: number; // s (negative = mid-cycle start)
  pattern: 1 | 2 | 3 | 4;
  pulse: boolean;
}

const ALL_DOTS: Dot[] = [
  {
    id: 0,
    x: 5,
    y: 8,
    size: 2,
    opacity: 0.2,
    duration: 28,
    delay: 0,
    pattern: 1,
    pulse: false,
  },
  {
    id: 1,
    x: 14,
    y: 22,
    size: 3,
    opacity: 0.28,
    duration: 35,
    delay: -7,
    pattern: 2,
    pulse: false,
  },
  {
    id: 2,
    x: 27,
    y: 5,
    size: 2,
    opacity: 0.18,
    duration: 22,
    delay: -14,
    pattern: 3,
    pulse: false,
  },
  {
    id: 3,
    x: 38,
    y: 17,
    size: 4,
    opacity: 0.25,
    duration: 40,
    delay: -3,
    pattern: 4,
    pulse: false,
  },
  {
    id: 4,
    x: 52,
    y: 9,
    size: 2.5,
    opacity: 0.3,
    duration: 31,
    delay: -20,
    pattern: 1,
    pulse: true,
  },
  {
    id: 5,
    x: 64,
    y: 24,
    size: 2,
    opacity: 0.17,
    duration: 25,
    delay: -9,
    pattern: 2,
    pulse: false,
  },
  {
    id: 6,
    x: 77,
    y: 6,
    size: 3,
    opacity: 0.22,
    duration: 38,
    delay: -16,
    pattern: 3,
    pulse: false,
  },
  {
    id: 7,
    x: 88,
    y: 19,
    size: 2,
    opacity: 0.26,
    duration: 29,
    delay: -4,
    pattern: 4,
    pulse: false,
  },
  {
    id: 8,
    x: 94,
    y: 32,
    size: 4,
    opacity: 0.2,
    duration: 33,
    delay: -11,
    pattern: 1,
    pulse: false,
  },
  {
    id: 9,
    x: 7,
    y: 38,
    size: 2.5,
    opacity: 0.32,
    duration: 24,
    delay: -18,
    pattern: 2,
    pulse: true,
  },
  {
    id: 10,
    x: 19,
    y: 44,
    size: 2,
    opacity: 0.15,
    duration: 36,
    delay: -6,
    pattern: 3,
    pulse: false,
  },
  {
    id: 11,
    x: 31,
    y: 51,
    size: 3,
    opacity: 0.28,
    duration: 21,
    delay: -22,
    pattern: 4,
    pulse: false,
  },
  {
    id: 12,
    x: 45,
    y: 36,
    size: 2,
    opacity: 0.23,
    duration: 39,
    delay: -13,
    pattern: 1,
    pulse: false,
  },
  {
    id: 13,
    x: 58,
    y: 48,
    size: 4,
    opacity: 0.19,
    duration: 27,
    delay: -1,
    pattern: 2,
    pulse: false,
  },
  {
    id: 14,
    x: 70,
    y: 40,
    size: 2.5,
    opacity: 0.35,
    duration: 32,
    delay: -17,
    pattern: 3,
    pulse: true,
  },
  {
    id: 15,
    x: 82,
    y: 55,
    size: 2,
    opacity: 0.21,
    duration: 23,
    delay: -8,
    pattern: 4,
    pulse: false,
  },
  {
    id: 16,
    x: 91,
    y: 46,
    size: 3,
    opacity: 0.27,
    duration: 37,
    delay: -25,
    pattern: 1,
    pulse: false,
  },
  {
    id: 17,
    x: 3,
    y: 62,
    size: 2,
    opacity: 0.16,
    duration: 26,
    delay: -5,
    pattern: 2,
    pulse: false,
  },
  // Desktop-only dots (indices 18–34)
  {
    id: 18,
    x: 16,
    y: 68,
    size: 4,
    opacity: 0.3,
    duration: 41,
    delay: -19,
    pattern: 3,
    pulse: false,
  },
  {
    id: 19,
    x: 28,
    y: 75,
    size: 2.5,
    opacity: 0.24,
    duration: 20,
    delay: -12,
    pattern: 4,
    pulse: true,
  },
  {
    id: 20,
    x: 42,
    y: 61,
    size: 2,
    opacity: 0.18,
    duration: 34,
    delay: -2,
    pattern: 1,
    pulse: false,
  },
  {
    id: 21,
    x: 55,
    y: 70,
    size: 3,
    opacity: 0.29,
    duration: 28,
    delay: -21,
    pattern: 2,
    pulse: false,
  },
  {
    id: 22,
    x: 67,
    y: 82,
    size: 2,
    opacity: 0.33,
    duration: 30,
    delay: -10,
    pattern: 3,
    pulse: false,
  },
  {
    id: 23,
    x: 79,
    y: 65,
    size: 4,
    opacity: 0.2,
    duration: 43,
    delay: -15,
    pattern: 4,
    pulse: false,
  },
  {
    id: 24,
    x: 89,
    y: 78,
    size: 2.5,
    opacity: 0.25,
    duration: 22,
    delay: -28,
    pattern: 1,
    pulse: true,
  },
  {
    id: 25,
    x: 9,
    y: 85,
    size: 2,
    opacity: 0.17,
    duration: 38,
    delay: -7,
    pattern: 2,
    pulse: false,
  },
  {
    id: 26,
    x: 23,
    y: 91,
    size: 3,
    opacity: 0.31,
    duration: 25,
    delay: -24,
    pattern: 3,
    pulse: false,
  },
  {
    id: 27,
    x: 36,
    y: 87,
    size: 2,
    opacity: 0.22,
    duration: 33,
    delay: -3,
    pattern: 4,
    pulse: false,
  },
  {
    id: 28,
    x: 49,
    y: 93,
    size: 4,
    opacity: 0.19,
    duration: 29,
    delay: -16,
    pattern: 1,
    pulse: false,
  },
  {
    id: 29,
    x: 62,
    y: 88,
    size: 2.5,
    opacity: 0.34,
    duration: 20,
    delay: -9,
    pattern: 2,
    pulse: true,
  },
  {
    id: 30,
    x: 74,
    y: 95,
    size: 2,
    opacity: 0.15,
    duration: 44,
    delay: -30,
    pattern: 3,
    pulse: false,
  },
  {
    id: 31,
    x: 85,
    y: 90,
    size: 3,
    opacity: 0.26,
    duration: 27,
    delay: -13,
    pattern: 4,
    pulse: false,
  },
  {
    id: 32,
    x: 47,
    y: 3,
    size: 2,
    opacity: 0.21,
    duration: 36,
    delay: -6,
    pattern: 1,
    pulse: false,
  },
  {
    id: 33,
    x: 73,
    y: 13,
    size: 3,
    opacity: 0.28,
    duration: 23,
    delay: -20,
    pattern: 2,
    pulse: false,
  },
  {
    id: 34,
    x: 96,
    y: 60,
    size: 2.5,
    opacity: 0.18,
    duration: 31,
    delay: -11,
    pattern: 3,
    pulse: false,
  },
];

// Mobile subset: first 18 dots (well-distributed across the viewport)
const MOBILE_DOTS = ALL_DOTS.slice(0, 18);

// matchMedia subscription for useSyncExternalStore — stable singleton
let mobileQuery: MediaQueryList | null = null;
function getMobileQuery() {
  if (typeof window === "undefined") return null;
  if (!mobileQuery) mobileQuery = window.matchMedia("(max-width: 767px)");
  return mobileQuery;
}

function subscribeToMobileQuery(callback: () => void) {
  const mq = getMobileQuery();
  if (!mq) return () => {};
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getIsMobileSnapshot() {
  return getMobileQuery()?.matches ?? false;
}

function getIsMobileServerSnapshot() {
  return false;
}

export default function AmbientParticles() {
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot,
  );

  const dots = useMemo(() => (isMobile ? MOBILE_DOTS : ALL_DOTS), [isMobile]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {dots.map((d) => (
        <div
          key={d.id}
          className="ambient-dot"
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: "50%",
            backgroundColor: `rgba(255,255,255,${d.opacity})`,
            willChange: "transform",
            transform: "translate3d(0,0,0)",
            animation: d.pulse
              ? `dotFloat${d.pattern} ${d.duration}s ease-in-out ${d.delay}s infinite, dotPulse ${d.duration * 0.7}s ease-in-out ${d.delay}s infinite`
              : `dotFloat${d.pattern} ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
