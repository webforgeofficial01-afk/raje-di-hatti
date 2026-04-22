import { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const TOTAL_STAMPS = 5;
const STORAGE_KEY = "rdh_visits_v2";

const BADGE_LABELS = [
  "1st Visit",
  "2nd Visit",
  "3rd Visit",
  "4th Visit",
  "Gold Member",
];

export default function LoyaltyCard() {
  useScrollAnimation();
  const [visits, setVisits] = useState(0);
  const [goldStatus, setGoldStatus] = useState(false);
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY) ?? "0");
    const next = Math.min(stored + 1, TOTAL_STAMPS);
    localStorage.setItem(STORAGE_KEY, String(next));
    setVisits(next);
    if (next >= TOTAL_STAMPS) setGoldStatus(true);
    // slight delay so stamp pop animation is visible after mount
    setTimeout(() => setAnimReady(true), 80);
  }, []);

  return (
    <>
      <style>{`
        @keyframes loyaltyStampPop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.18); opacity: 1; }
          80%  { transform: scale(.92); }
          100% { transform: scale(1); }
        }
        @keyframes goldGlow {
          0%,100% { box-shadow: 0 0 40px rgba(245,197,66,.22), 0 8px 40px rgba(0,0,0,.45); }
          50%      { box-shadow: 0 0 60px rgba(245,197,66,.38), 0 8px 40px rgba(0,0,0,.45); }
        }
        .loyalty-card-gold { animation: goldGlow 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .loyalty-card-gold { animation: none !important; }
        }
      `}</style>

      <section
        id="loyalty"
        style={{
          padding: "80px 0",
          background: "#050505",
          position: "relative",
        }}
        data-ocid="loyalty.section"
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 45% 30% at 50% 50%, rgba(255,122,24,.05) 0%, transparent 68%)",
          }}
        />

        <div className="relative z-10 max-w-lg mx-auto px-6">
          {/* Heading */}
          <div
            className="section-heading-block animate-section mb-8"
            style={{ textAlign: "center" }}
          >
            <span className="section-kicker">⭐ Loyal Customer</span>
            <h2
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem,4vw,2.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "0.5rem",
              }}
            >
              Your Loyalty Card ⭐
            </h2>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.9rem",
                color: "rgba(245,197,66,.6)",
                letterSpacing: "0.04em",
                marginTop: "0.5rem",
              }}
            >
              Collect all 5 badges to become a Gold Loyal Customer
            </p>
            <div
              className="section-divider"
              style={{ margin: "1rem auto 0" }}
            />
          </div>

          {/* Card */}
          <div
            className={`animate-section${goldStatus ? " loyalty-card-gold" : ""}`}
            style={{
              background: "rgba(255,255,255,.04)",
              border: goldStatus
                ? "1px solid rgba(245,197,66,.6)"
                : "1px solid rgba(255,255,255,.08)",
              borderRadius: "20px",
              padding: "32px 28px",
              boxShadow: goldStatus
                ? "0 0 40px rgba(245,197,66,.22), 0 8px 40px rgba(0,0,0,.45)"
                : "0 8px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.05)",
              position: "relative",
              overflow: "hidden",
              textAlign: "center",
              transition: "border-color .4s ease",
            }}
            data-ocid="loyalty.card"
          >
            {/* Inner top shimmer */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "40%",
                background:
                  "linear-gradient(180deg,rgba(245,197,66,.04) 0%,transparent 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Stamp slots */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
              aria-label={`${visits} of ${TOTAL_STAMPS} loyalty badges earned`}
            >
              {Array.from({ length: TOTAL_STAMPS }, (_, i) => i).map((i) => {
                const filled = visits > i;
                return (
                  <div
                    key={`stamp-${i}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: filled
                          ? "linear-gradient(135deg,#f5c542 0%,#e6a817 100%)"
                          : "rgba(255,255,255,.04)",
                        border: filled
                          ? "none"
                          : "2px dashed rgba(245,197,66,.28)",
                        boxShadow: filled
                          ? "0 0 14px rgba(245,197,66,.4), 0 0 28px rgba(245,197,66,.14)"
                          : "none",
                        fontSize: filled ? "22px" : "20px",
                        color: filled ? "#050505" : "rgba(245,197,66,.28)",
                        fontWeight: 900,
                        transition: "all .4s cubic-bezier(.16,1,.3,1)",
                        animation:
                          filled && animReady
                            ? `loyaltyStampPop .5s cubic-bezier(.16,1,.3,1) ${i * 0.07}s both`
                            : "none",
                        fontFamily:
                          "'Apple Color Emoji','Segoe UI Emoji',sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      {filled ? "⭐" : "○"}
                    </div>
                    {/* Label only for filled or next to earn */}
                    {(filled || i === visits) && (
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "9px",
                          color: filled
                            ? "rgba(245,197,66,.65)"
                            : "rgba(255,255,255,.2)",
                          letterSpacing: "0.03em",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {filled ? BADGE_LABELS[i] : "Next"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Gold status message */}
            {goldStatus ? (
              <div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                    marginBottom: "10px",
                    background:
                      "linear-gradient(135deg,#f5c542 0%,#fff5a0 50%,#e8aa1b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ⭐ Gold Loyal Customer
                </div>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,.7)",
                    lineHeight: 1.6,
                    marginBottom: "6px",
                  }}
                >
                  You've earned all 5 loyalty badges — thank you for your
                  continued love! 🙏
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(245,197,66,.5)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Visit us at Sant Nagar Burari 📍
                </p>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,.75)",
                    lineHeight: 1.7,
                    marginBottom: "4px",
                  }}
                >
                  {visits <= 1 ? (
                    <>
                      Welcome! Your{" "}
                      <strong style={{ color: "#f5c542" }}>1st badge</strong> is
                      earned 🎉 — {TOTAL_STAMPS - visits} more to Gold status ⭐
                    </>
                  ) : (
                    <>
                      You've earned{" "}
                      <strong style={{ color: "#f5c542" }}>
                        {visits} loyalty badges
                      </strong>
                      ! {TOTAL_STAMPS - visits} more to reach Gold ⭐
                    </>
                  )}
                </p>

                {/* Progress bar */}
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    background: "rgba(255,255,255,.08)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginTop: "14px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(visits / TOTAL_STAMPS) * 100}%`,
                      background: "linear-gradient(90deg,#f5c542,#ff7a18)",
                      borderRadius: "4px",
                      transition: "width .8s cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                </div>

                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "10px",
                    color: "rgba(245,197,66,.4)",
                    marginTop: "8px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {visits} / {TOTAL_STAMPS} Loyal Customer Badges
                </p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p
            style={{
              marginTop: "14px",
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              fontSize: "10px",
              color: "rgba(255,255,255,.22)",
              letterSpacing: "0.02em",
            }}
          >
            Stamp cards — your loyalty recognized! · Badge count saved on this
            device
          </p>
        </div>
      </section>
    </>
  );
}
