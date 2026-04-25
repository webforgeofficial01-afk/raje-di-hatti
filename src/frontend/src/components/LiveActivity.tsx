import { memo, useEffect, useRef, useState } from "react";

const MESSAGES = [
  "🔥 12 people ordered in the last hour",
  "⚡ Orders are being placed right now",
  "🍽️ Fresh batches being prepared",
  "🔥 Most popular: Chole Bhature & Amritsari Kulcha",
  "⚡ High demand today — order now!",
  "🌟 Fresh naan coming out of the tandoor right now",
] as const;

const LiveActivity = memo(function LiveActivity() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (prefersReduced.current) return;

    const interval = setInterval(() => {
      setVisible(false);
      const swapTimeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setVisible(true);
      }, 700);
      return () => clearTimeout(swapTimeout);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      data-ocid="live-activity.pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 16px",
        borderRadius: "999px",
        background: "rgba(10,7,2,0.92)",
        border: "1px solid rgba(245,197,66,0.3)",
        boxShadow:
          "0 0 16px rgba(245,197,66,0.1), 0 0 32px rgba(245,197,66,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: visible
          ? "opacity 0.75s cubic-bezier(0,0,0.2,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)"
          : "opacity 0.65s cubic-bezier(0.4,0,1,1), transform 0.65s cubic-bezier(0.4,0,1,1)",
        willChange: "opacity, transform",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Pulsing live dot */}
      <span
        style={{
          position: "relative",
          width: "7px",
          height: "7px",
          flexShrink: 0,
        }}
      >
        <span
          className="live-dot-ring"
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "50%",
            border: "1.5px solid rgba(245,197,66,0.45)",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#f5c542",
            boxShadow: "0 0 6px rgba(245,197,66,0.9)",
          }}
        />
      </span>
      <span
        style={{
          fontFamily: "Poppins, 'Apple Color Emoji', sans-serif",
          fontSize: "11.5px",
          fontWeight: 600,
          color: "#f5c542",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {MESSAGES[index]}
      </span>

      <style>{`
        @keyframes liveRingExpand {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .live-dot-ring {
          animation: liveRingExpand 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
});

export default LiveActivity;
