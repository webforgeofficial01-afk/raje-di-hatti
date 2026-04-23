import { Clock, Heart, Shield, Zap } from "lucide-react";
import type { LucideProps } from "lucide-react";

const features = [
  {
    Icon: Clock,
    title: "Made Fresh Daily",
    description: "Every dish prepared fresh, morning to evening",
    detail: "7 AM – 7 PM, seven days a week — no pre-made batches, ever.",
    accent: "#f5c542",
  },
  {
    Icon: Heart,
    title: "Authentic Recipes",
    description: "Family recipes passed down since 1990",
    detail:
      "Three generations of cooking tradition, unchanged and uncompromised.",
    accent: "#ff7a18",
  },
  {
    Icon: Zap,
    title: "Lightning Fast",
    description: "20–30 min delivery to your doorstep",
    detail: "Order on Zomato, Swiggy, or Porter for the fastest delivery.",
    hint: "High demand during evenings — order early for fastest service",
    accent: "#f5c542",
  },
  {
    Icon: Shield,
    title: "Trusted Quality",
    description: "50,000+ happy customers trust us",
    detail: "Consistently rated 4.7+ on Google. Hygienic kitchen, always.",
    accent: "#ff7a18",
  },
] satisfies ReadonlyArray<{
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  detail: string;
  accent: string;
  hint?: string;
}>;

export default function WhyChooseUs() {
  return (
    <>
      {/* ── WHY CHOOSE US ── */}
      <section
        style={{
          backgroundColor: "#0d0905",
          padding: "clamp(56px, 8vw, 120px) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(245,197,66,0.05) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 animate-section">
            <span className="section-kicker">Why Us</span>
            <h2
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                background: "linear-gradient(135deg, #f5c542 0%, #ff7a18 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 900,
                filter: "drop-shadow(0 0 18px rgba(245,197,66,0.2))",
              }}
              className="section-title"
            >
              Why Burari Loves Us
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {features.map((feat, i) => {
              const { Icon } = feat;
              return (
                <div
                  key={feat.title}
                  className="why-card animate-section"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(245,197,66,0.04) 0%, rgba(255,122,24,0.02) 100%)",
                    border: "1px solid rgba(245,197,66,0.12)",
                    borderRadius: "20px",
                    padding: "clamp(20px, 4vw, 32px) clamp(18px, 3.5vw, 28px)",
                    position: "relative",
                    overflow: "hidden",
                    transitionDelay: `${i * 80}ms`,
                    transition:
                      "border-color 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    willChange: "transform",
                  }}
                  data-ocid={`why.item.${i + 1}`}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="card-hover-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(245,197,66,0.07) 0%, rgba(255,122,24,0.04) 100%)",
                      opacity: 0,
                      transition: "opacity 0.35s ease",
                      pointerEvents: "none",
                      borderRadius: "20px",
                    }}
                  />

                  {/* Icon box */}
                  <div
                    className="icon-box"
                    style={{
                      width: "62px",
                      height: "62px",
                      borderRadius: "16px",
                      background:
                        "linear-gradient(135deg, rgba(245,197,66,0.18) 0%, rgba(255,122,24,0.1) 100%)",
                      border: "1px solid rgba(245,197,66,0.28)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                      boxShadow: "0 0 16px rgba(245,197,66,0.1)",
                      transition:
                        "box-shadow 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                      position: "relative",
                    }}
                  >
                    <Icon
                      size={26}
                      style={{
                        color: feat.accent,
                        filter: `drop-shadow(0 0 6px ${feat.accent}80)`,
                      }}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#f5f0e8",
                      fontWeight: 800,
                      fontSize: "1rem",
                      marginBottom: "8px",
                      letterSpacing: "0.01em",
                      position: "relative",
                    }}
                  >
                    {feat.title}
                  </h3>

                  <p
                    style={{
                      color: feat.accent,
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      marginBottom: "12px",
                      position: "relative",
                    }}
                  >
                    {feat.description}
                  </p>

                  <p
                    style={{
                      color: "rgba(245,240,232,0.52)",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: 1.85,
                      fontSize: "0.82rem",
                      position: "relative",
                    }}
                  >
                    {feat.detail}
                  </p>

                  {/* Scarcity hint */}
                  {feat.hint && (
                    <div
                      style={{
                        marginTop: "14px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#ff7a18",
                          flexShrink: 0,
                        }}
                      >
                        ⚠
                      </span>
                      <p
                        style={{
                          color: "rgba(255,122,24,0.7)",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          fontStyle: "italic",
                          lineHeight: 1.4,
                        }}
                      >
                        {feat.hint}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom trust line */}
          <div
            className="animate-section mt-16 text-center"
            data-ocid="why.conversion_line"
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(245,197,66,0.35))",
                }}
              />
              <p
                style={{
                  color: "rgba(245,197,66,0.55)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Serving Burari with pride since 1990
              </p>
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background:
                    "linear-gradient(90deg, rgba(245,197,66,0.35), transparent)",
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          .why-card:hover {
            border-color: rgba(245,197,66,0.45) !important;
            transform: translateY(-4px);
            box-shadow: 0 16px 40px rgba(245,197,66,0.1), 0 0 0 1px rgba(245,197,66,0.18);
          }
          .why-card:hover .card-hover-overlay {
            opacity: 1;
          }
          .why-card:hover .icon-box {
            box-shadow: 0 0 28px rgba(245,197,66,0.35), 0 0 0 1px rgba(245,197,66,0.2) !important;
            transform: scale(1.08) !important;
          }
        `}</style>
      </section>

      {/* ── FINAL CTA SECTION ── */}
      <section
        style={{
          backgroundColor: "#060401",
          padding: "clamp(56px, 8vw, 100px) 0",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
        data-ocid="final-cta.section"
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(245,197,66,0.07) 0%, transparent 65%)",
          }}
        />
        {/* Gold border top */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(212,168,67,0.5) 30%, rgba(245,197,66,0.7) 50%, rgba(212,168,67,0.5) 70%, transparent)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="animate-section">
            <span className="section-kicker">Ready to Order?</span>
            <h2
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Ready to Order the Best Punjabi Food in Burari?
            </h2>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "480px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.75,
              }}
            >
              Join 50,000+ happy customers. Fresh food, fast delivery.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                justifyContent: "center",
              }}
            >
              <a
                href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="final-cta.order-zomato.button"
                className="btn-press"
                style={{
                  background:
                    "linear-gradient(135deg, #f5c542 0%, #e6a817 50%, #f5c542 100%)",
                  backgroundSize: "200% 100%",
                  color: "#0a0800",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "clamp(12px, 3vw, 14px) clamp(24px, 5vw, 36px)",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow:
                    "0 0 32px rgba(245,197,66,0.3), 0 4px 20px rgba(0,0,0,0.4)",
                  transition:
                    "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1.04) translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 50px rgba(245,197,66,0.5), 0 8px 28px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "0 0 32px rgba(245,197,66,0.3), 0 4px 20px rgba(0,0,0,0.4)";
                }}
              >
                🍽️ Order Now on Zomato
              </a>
              <a
                href="https://wa.me/919599233307?text=Hi%2C%20I%20want%20to%20enquire%20about%20catering%20for%20my%20event"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="final-cta.whatsapp-catering.button"
                className="btn-press"
                style={{
                  background: "rgba(37,211,102,0.1)",
                  color: "#25d366",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "clamp(12px, 3vw, 14px) clamp(24px, 5vw, 36px)",
                  borderRadius: "14px",
                  border: "1px solid rgba(37,211,102,0.4)",
                  cursor: "pointer",
                  transition:
                    "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1.04) translateY(-2px)";
                  e.currentTarget.style.background = "rgba(37,211,102,0.18)";
                  e.currentTarget.style.boxShadow =
                    "0 0 32px rgba(37,211,102,0.25), 0 8px 24px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.background = "rgba(37,211,102,0.1)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                💬 WhatsApp for Catering
              </a>
            </div>
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.04em",
              }}
            >
              No extra charges · Fast delivery · Serving Burari since 1990
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
