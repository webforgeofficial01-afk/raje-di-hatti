import { useEffect, useRef } from "react";

const aboutStats = [
  { val: "1990", label: "Est. Year" },
  { val: "50K+", label: "Happy Customers" },
  { val: "50+", label: "Menu Items" },
];

const trustIndicators = [
  { icon: "✅", label: "Hygienic Kitchen" },
  { icon: "🌿", label: "Fresh Ingredients" },
  { icon: "⚡", label: "Fast Delivery" },
];

/* Inline styles injected once to handle sm breakpoint stat dividers */
const statsResponsiveCSS = `
  @media (min-width: 640px) {
    .rdh-stats-grid {
      flex-direction: row !important;
      gap: 0 !important;
    }
    .rdh-stat-item + .rdh-stat-item {
      border-top: none !important;
      padding-top: 0 !important;
      border-left: 1px solid rgba(212,168,67,0.18) !important;
      padding-left: clamp(16px, 4vw, 32px) !important;
      margin-left: clamp(16px, 4vw, 32px) !important;
    }
  }

  /* About background — parallax desktop, scroll mobile */
  .rdh-about-section {
    background-image: url('/assets/fb_img_1775390230721-019d5d82-4c79-7448-a14f-ffde28964756.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  @media (min-width: 768px) {
    .rdh-about-section {
      background-attachment: fixed;
    }
  }

  /* Entrance animation */
  @keyframes aboutContentFadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .rdh-about-content {
    opacity: 0;
  }
  .rdh-about-content.rdh-about-visible {
    animation: aboutContentFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .rdh-about-content { opacity: 1 !important; animation: none !important; }
  }
`;

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("rdh-about-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="story"
      className="rdh-about-section relative overflow-hidden"
      style={{
        padding: "clamp(80px, 10vw, 140px) 0",
        position: "relative",
      }}
    >
      <style>{statsResponsiveCSS}</style>

      {/* Gold top accent line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(212,168,67,0.4) 30%, rgba(245,197,66,0.6) 50%, rgba(212,168,67,0.4) 70%, transparent)",
        }}
      />

      {/* Dark luxury overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.82) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Warm gold glow accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(245,197,66,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Centered content column */}
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
        ref={contentRef}
        data-ocid="about.section"
        style={{ textAlign: "center" }}
      >
        <div className="rdh-about-content">
          {/* Section kicker */}
          <span className="section-kicker">Our Story</span>

          <h2
            className="section-title"
            style={{
              textAlign: "center",
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}
          >
            Our Story
          </h2>
          <div className="section-divider" style={{ margin: "0 auto 2rem" }} />

          {/* Legacy trust line */}
          <div
            style={{
              marginBottom: "24px",
              padding: "14px 20px",
              background: "rgba(245,197,66,0.07)",
              border: "1px solid rgba(245,197,66,0.22)",
              borderLeft: "3px solid #f5c542",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <p
              style={{
                color: "#f5c542",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "0.01em",
                lineHeight: 1.6,
                textShadow: "0 1px 8px rgba(0,0,0,0.6)",
              }}
            >
              Family Business Since 1990 — Made with love, served with pride
            </p>
            <p
              style={{
                color: "rgba(245,197,66,0.6)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.78rem",
                marginTop: "6px",
                fontStyle: "italic",
              }}
            >
              Every dish made fresh on order — no pre-prepared batches
            </p>
          </div>

          <div
            style={{
              color: "rgba(245,240,232,0.82)",
              fontFamily: "Poppins, sans-serif",
              lineHeight: 1.9,
              textShadow: "0 1px 12px rgba(0,0,0,0.7)",
              textAlign: "left",
            }}
            className="space-y-5 text-base mb-8"
          >
            <p>
              Raje Di Hatti began as a small family kitchen in the lanes of Sant
              Nagar Burari in 1990. What started as a passion for authentic
              Punjabi cooking has grown into Delhi's most loved food
              destination. Three generations of family recipes, made fresh every
              single day.
            </p>
            <p>
              Today, we serve thousands of families across Delhi — from humble
              breakfasts to grand catering events — always with the same love
              and quality that started it all.
            </p>
          </div>

          {/* Stats glassmorphism card */}
          <div
            data-ocid="about.stats_card"
            style={{
              marginBottom: "28px",
              padding: "clamp(20px, 5vw, 28px)",
              background:
                "linear-gradient(135deg, rgba(245,197,66,0.09) 0%, rgba(255,122,24,0.05) 100%)",
              border: "1px solid rgba(245,197,66,0.22)",
              borderRadius: "18px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Mobile: vertical stack. sm+: horizontal row */}
            <div className="rdh-stats-grid flex flex-col gap-5">
              {aboutStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`rdh-stat-item flex flex-col${i > 0 ? " border-t border-gold-faint pt-4" : ""}`}
                  style={
                    i > 0
                      ? {
                          borderTop: "1px solid rgba(212,168,67,0.18)",
                          paddingTop: "clamp(14px, 3.5vw, 20px)",
                        }
                      : undefined
                  }
                >
                  <span
                    style={{
                      fontFamily: "Playfair Display, Georgia, serif",
                      color: "#f5c542",
                      filter: "drop-shadow(0 0 8px rgba(245,197,66,0.4))",
                      fontSize: "clamp(2rem, 7vw, 2.5rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      textShadow: "0 0 20px rgba(245,197,66,0.3)",
                    }}
                  >
                    {stat.val}
                  </span>
                  <span
                    style={{
                      color: "rgba(212,168,67,0.8)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(0.78rem, 2.8vw, 0.92rem)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginTop: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust indicators row */}
          <div
            className="flex flex-wrap gap-3 justify-center"
            data-ocid="about.trust_indicators"
          >
            {trustIndicators.map((t) => (
              <div
                key={t.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  background: "rgba(245,197,66,0.09)",
                  border: "1px solid rgba(245,197,66,0.28)",
                  borderRadius: "9999px",
                  padding: "6px 14px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ fontSize: "0.875rem" }}>{t.icon}</span>
                <span
                  style={{
                    color: "rgba(245,197,66,0.92)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
