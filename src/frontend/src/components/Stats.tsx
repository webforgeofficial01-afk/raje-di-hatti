import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  {
    value: "35+",
    numericValue: 35,
    suffix: "+",
    label: "Years of Service",
    icon: "🏆",
  },
  {
    value: "50K+",
    numericValue: 50,
    suffix: "K+",
    label: "Happy Customers",
    icon: "🫶",
  },
  {
    value: "100K+",
    numericValue: 100,
    suffix: "K+",
    label: "Orders Delivered",
    icon: "🛵",
  },
  {
    value: "100%",
    numericValue: 100,
    suffix: "%",
    label: "Pure Veg",
    icon: "🥗",
  },
  {
    value: "Fast",
    numericValue: 0,
    suffix: "",
    label: "Delivery Available",
    icon: "⚡",
  },
];

const trustBadges = [
  { icon: "⭐", label: "4.8 Google Rating", highlight: true },
  { icon: "📦", label: "5,000+ Orders Served" },
  { icon: "🧼", label: "Hygienic Kitchen" },
  { icon: "🌿", label: "Fresh Ingredients Daily" },
  { icon: "🚀", label: "Fast Delivery" },
];

/**
 * Count-up hook — 0.8s fast rollover with aggressive ease-out.
 * Dramatic first impression: rushes to target quickly then pops.
 */
function useCountUp(target: number, duration = 800) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const startedRef = useRef(false);

  const start = () => {
    if (startedRef.current || target === 0) return;
    startedRef.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setCount(target);
      setDone(true);
      return;
    }

    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Fast ease-out: rushes hard then decelerates — odometer feel
      const eased = 1 - (1 - progress) ** 4;
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return { count, done, start };
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { count, done, start } = useCountUp(stat.numericValue);
  const cardRef = useRef<HTMLDivElement>(null);
  const observedRef = useRef(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observedRef.current) {
          observedRef.current = true;
          const delay = index * 120;
          // Start count-up
          setTimeout(() => start(), delay);
          // Shimmer sweep on card top border
          setTimeout(() => {
            el.classList.add("shimmer-in");
            // Glow border
            el.classList.add("glow-in");
          }, delay + 60);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [start, index]);

  const displayValue =
    stat.numericValue === 0 ? stat.value : `${count}${stat.suffix}`;

  return (
    <div
      ref={cardRef}
      className="text-center animate-section stats-card"
      data-delay={String(index + 2)}
      data-ocid={`stats.item.${index + 1}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(245,197,66,0.05) 0%, rgba(255,122,24,0.03) 100%)",
        border: "1px solid rgba(245,197,66,0.14)",
        borderRadius: "16px",
        padding: "28px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Card ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          background:
            "radial-gradient(ellipse, rgba(245,197,66,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Top specular */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "linear-gradient(180deg, rgba(245,197,66,0.025) 0%, transparent 100%)",
          pointerEvents: "none",
          borderRadius: "16px 16px 0 0",
        }}
      />

      <div
        style={{
          fontSize: "1.85rem",
          marginBottom: "10px",
          position: "relative",
        }}
      >
        {stat.icon}
      </div>

      {/* Count value — gold pop on complete */}
      <div
        className={done ? "stat-value-done" : ""}
        style={{
          background: "linear-gradient(135deg, #f5c542 0%, #ff9a1a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "Playfair Display, Georgia, serif",
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: "8px",
          letterSpacing: "-0.02em",
          position: "relative",
        }}
      >
        {displayValue}
      </div>

      {/* Gold underline */}
      <div
        style={{
          width: "32px",
          height: "2px",
          background: "linear-gradient(90deg, #f5c542, rgba(255,122,24,0.6))",
          margin: "6px auto 8px",
          borderRadius: "2px",
        }}
      />

      <div
        className="stat-label"
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "0.68rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          position: "relative",
        }}
      >
        {stat.label}
      </div>

      <style>{`
        @keyframes statValuePop {
          0%   { transform: scale(1); filter: drop-shadow(0 0 0 rgba(245,197,66,0)); }
          40%  { transform: scale(1.1); filter: drop-shadow(0 0 12px rgba(245,197,66,0.6)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(245,197,66,0)); }
        }
        .stat-value-done {
          animation: statValuePop 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      style={{
        backgroundColor: "#09080a",
        padding: "clamp(56px, 8vw, 120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gold divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "6%",
          right: "6%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(245,197,66,0.2) 25%, rgba(245,197,66,0.52) 50%, rgba(245,197,66,0.2) 75%, transparent)",
        }}
      />
      {/* Bottom gold divider */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "6%",
          right: "6%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(245,197,66,0.1) 25%, rgba(245,197,66,0.28) 50%, rgba(245,197,66,0.1) 75%, transparent)",
        }}
      />

      {/* Ambient center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "320px",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(245,197,66,0.045) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-10 animate-section">
          <span className="section-kicker">Trust & Authority</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              background: "linear-gradient(135deg, #f5c542 0%, #ff7a18 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 900,
              lineHeight: 1.15,
              textShadow: "none",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Why Thousands Trust Us
          </h2>
          <div className="section-divider" />
          <p
            style={{
              color: "rgba(245,240,232,0.52)",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0.04em",
              fontSize: "0.9rem",
              fontWeight: 500,
              marginTop: "0.75rem",
            }}
          >
            Serving Delhi since 1990 — trusted by 50,000+ families
          </p>
        </div>

        {/* Featured Google rating hero card */}
        <div
          className="animate-section mb-14"
          data-delay="1"
          data-ocid="stats.google_rating"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,197,66,0.06) 0%, rgba(255,122,24,0.04) 100%)",
            border: "1px solid rgba(245,197,66,0.22)",
            borderRadius: "20px",
            padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 32px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            maxWidth: "480px",
            margin: "0 auto 40px",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(245,197,66,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "40%",
              background:
                "linear-gradient(180deg, rgba(245,197,66,0.03) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Google label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(245,197,66,0.1)",
              border: "1px solid rgba(245,197,66,0.2)",
              borderRadius: "9999px",
              padding: "4px 14px",
              marginBottom: "16px",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#f5c542",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "0.08em",
              }}
            >
              G
            </span>
            <span
              style={{
                color: "rgba(245,240,232,0.58)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Google Rating
            </span>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, #f5c542 0%, #ff9a1a 60%, #f5c542 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(4rem, 10vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textShadow: "none",
              position: "relative",
            }}
          >
            4.8
          </div>

          <div className="flex justify-center gap-2 my-4">
            {[1, 2, 3, 4].map((pos) => (
              <span
                key={pos}
                style={{
                  fontSize: "22px",
                  filter: "drop-shadow(0 0 6px rgba(245,197,66,0.8))",
                }}
              >
                ⭐
              </span>
            ))}
            <span
              style={{
                fontSize: "22px",
                filter: "drop-shadow(0 0 6px rgba(245,197,66,0.5))",
                opacity: 0.52,
              }}
            >
              ⭐
            </span>
          </div>

          <div
            style={{
              width: "48px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(245,197,66,0.38), transparent)",
              margin: "0 auto 12px",
            }}
          />

          <p
            style={{
              color: "rgba(245,240,232,0.48)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Based on 200+ Google Reviews
          </p>
        </div>

        {/* Trust indicator pills */}
        <div
          className="animate-section mb-10"
          data-delay="1"
          data-ocid="stats.trust_badges"
          style={{
            borderTop: "1px solid rgba(245,197,66,0.1)",
            paddingTop: "clamp(20px, 4vw, 40px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {trustBadges.map(({ icon, label, highlight }, i) => (
              <div
                key={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  background: highlight
                    ? "linear-gradient(135deg, rgba(245,197,66,0.12), rgba(255,122,24,0.08))"
                    : "rgba(255,255,255,0.03)",
                  border: highlight
                    ? "1px solid rgba(245,197,66,0.38)"
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: highlight
                    ? "0 0 12px rgba(245,197,66,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                    : "none",
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <span style={{ fontSize: "14px" }}>{icon}</span>
                <span
                  style={{ color: "rgba(245,197,66,0.22)", fontSize: "6px" }}
                >
                  •
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: highlight ? "#f5c542" : "rgba(255,255,255,0.7)",
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards grid — 2-col on mobile so cards 3&4 form a centered pair on row 2 */}
        <div
          className="grid md:grid-cols-5 gap-3 md:gap-6"
          style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
        >
          {stats.slice(0, 4).map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
          {/* 5th card — centered on its own row on mobile */}
          <div className="col-span-2 md:col-span-1 flex justify-center">
            <div className="w-full max-w-[220px] md:max-w-none">
              <StatCard stat={stats[4]} index={4} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stats-card {
          transition: border-color 0.45s cubic-bezier(0.16,1,0.3,1),
                      transform 0.45s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        @media (max-width: 767px) {
          .stats-card {
            padding: 16px 8px !important;
          }
          .stats-card .stat-label {
            letter-spacing: 0.08em !important;
          }
        }
        .stats-card:hover {
          border-color: rgba(245,197,66,0.42) !important;
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 8px 32px rgba(245,197,66,0.1), 0 0 0 1px rgba(245,197,66,0.18);
        }
      `}</style>
    </section>
  );
}
