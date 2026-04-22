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

export default function About() {
  return (
    <section
      id="story"
      style={{
        backgroundColor: "#0a0602",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm gold ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "20%",
          width: "600px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(245,197,66,0.06) 0%, rgba(255,122,24,0.03) 40%, transparent 70%)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "350px",
          background:
            "radial-gradient(ellipse, rgba(245,197,66,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative">
            <div
              style={{
                borderRadius: "1.5rem",
                overflow: "hidden",
                border: "2px solid rgba(212,168,67,0.3)",
                boxShadow:
                  "0 0 50px rgba(245,197,66,0.2), 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,197,66,0.08)",
              }}
            >
              <img
                src="/assets/fb_img_1775390230721-019d5d82-4c79-7448-a14f-ffde28964756.jpg"
                alt="Raje Di Hatti restaurant"
                className="w-full"
                style={{
                  objectFit: "cover",
                  maxHeight: "500px",
                  display: "block",
                  filter: "brightness(0.95) saturate(1.1)",
                }}
                loading="lazy"
              />
            </div>

            {/* Floating years badge */}
            <div
              style={{
                position: "absolute",
                bottom: "28px",
                right: "-16px",
                background:
                  "linear-gradient(135deg, rgba(212,168,67,0.18) 0%, rgba(10,6,2,0.98) 40%)",
                border: "1px solid rgba(212,168,67,0.45)",
                borderRadius: "1.25rem",
                padding: "1.25rem 1.75rem",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.7), 0 0 20px rgba(212,168,67,0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              className="hidden lg:flex flex-col items-center"
            >
              <span
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  color: "#f5c542",
                  filter: "drop-shadow(0 0 10px rgba(245,197,66,0.5))",
                }}
                className="text-4xl font-bold leading-none"
              >
                35+
              </span>
              <span
                style={{
                  color: "rgba(245,197,66,0.7)",
                  fontFamily: "Poppins, sans-serif",
                }}
                className="text-xs uppercase tracking-widest mt-1"
              >
                Years of Service
              </span>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="section-kicker">Our Story</span>
            <h2
              className="section-title"
              style={{
                textAlign: "left",
                fontFamily: "Playfair Display, Georgia, serif",
                fontWeight: 900,
              }}
            >
              Our Story
            </h2>
            <div className="section-divider section-divider-left" />

            {/* Legacy trust line */}
            <div
              style={{
                marginTop: "24px",
                padding: "14px 20px",
                background: "rgba(245,197,66,0.05)",
                border: "1px solid rgba(245,197,66,0.18)",
                borderLeft: "3px solid #f5c542",
                borderRadius: "10px",
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
                }}
              >
                Family Business Since 1990 — Made with love, served with pride
              </p>
              <p
                style={{
                  color: "rgba(245,197,66,0.55)",
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
                color: "rgba(245,240,232,0.72)",
                fontFamily: "Poppins, sans-serif",
                lineHeight: 1.9,
              }}
              className="space-y-5 text-base mt-8"
            >
              <p>
                Raje Di Hatti began as a small family kitchen in the lanes of
                Sant Nagar Burari in 1990. What started as a passion for
                authentic Punjabi cooking has grown into Burari's most loved
                food destination. Three generations of family recipes, made
                fresh every single day.
              </p>
              <p>
                Today, we serve thousands of families across Delhi — from humble
                breakfasts to grand catering events — always with the same love
                and quality that started it all.
              </p>
            </div>

            {/* Stats glassmorphism card */}
            <div
              style={{
                marginTop: "32px",
                padding: "24px",
                background:
                  "linear-gradient(135deg, rgba(245,197,66,0.06) 0%, rgba(255,122,24,0.03) 100%)",
                border: "1px solid rgba(245,197,66,0.18)",
                borderRadius: "18px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <div className="flex gap-8">
                {aboutStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex flex-col"
                    style={
                      i > 0
                        ? {
                            borderLeft: "1px solid rgba(212,168,67,0.18)",
                            paddingLeft: "28px",
                          }
                        : {}
                    }
                  >
                    <span
                      style={{
                        fontFamily: "Playfair Display, Georgia, serif",
                        color: "#f5c542",
                        filter: "drop-shadow(0 0 8px rgba(245,197,66,0.4))",
                        fontSize: "1.8rem",
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      {stat.val}
                    </span>
                    <span
                      style={{
                        color: "rgba(212,168,67,0.6)",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: "4px",
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
              className="flex flex-wrap gap-3 mt-6"
              data-ocid="about.trust_indicators"
            >
              {trustIndicators.map((t) => (
                <div
                  key={t.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    background: "rgba(245,197,66,0.07)",
                    border: "1px solid rgba(245,197,66,0.22)",
                    borderRadius: "9999px",
                    padding: "6px 14px",
                  }}
                >
                  <span style={{ fontSize: "0.875rem" }}>{t.icon}</span>
                  <span
                    style={{
                      color: "rgba(245,197,66,0.88)",
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
      </div>
    </section>
  );
}
