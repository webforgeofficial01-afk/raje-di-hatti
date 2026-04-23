// Location.tsx — Delivery zones with live open status indicator

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

// ─── Live Open Status ─────────────────────────────────────────────────────────

type OpenStatus = "open" | "closes-soon" | "closed";

interface HoursStatus {
  status: OpenStatus;
  label: string;
  dotColor: string;
  dotEmoji: string;
  pulse: boolean;
}

function getISTStatus(): HoursStatus {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const istMs = utcMs + 5.5 * 60 * 60 * 1_000;
  const ist = new Date(istMs);
  const total = ist.getHours() * 60 + ist.getMinutes();

  const OPEN = 7 * 60; // 7:00 AM
  const WARN = 18 * 60 + 30; // 6:30 PM — closing soon window
  const CLOSE = 19 * 60; // 7:00 PM

  if (total >= OPEN && total < WARN) {
    return {
      status: "open",
      label: "Open Now",
      dotColor: "#22c55e",
      dotEmoji: "🟢",
      pulse: false,
    };
  }
  if (total >= WARN && total < CLOSE) {
    return {
      status: "closes-soon",
      label: "Closing Soon · Order fast!",
      dotColor: "#f59e0b",
      dotEmoji: "🟡",
      pulse: true,
    };
  }
  return {
    status: "closed",
    label: "Closed · Opens at 7 AM",
    dotColor: "#ef4444",
    dotEmoji: "🔴",
    pulse: false,
  };
}

function useOpenStatus(): HoursStatus {
  const [s, setS] = useState<HoursStatus>(() => getISTStatus());
  useEffect(() => {
    const iv = setInterval(() => setS(getISTStatus()), 60_000);
    return () => clearInterval(iv);
  }, []);
  return s;
}

// ─── Zone data ────────────────────────────────────────────────────────────────

const ZONES = [
  {
    label: "Primary Zones",
    badge: "Fastest",
    time: "20–25 mins",
    areas: ["Burari", "Sant Nagar", "Mukundpur", "Nathupura", "Jharoda Majra"],
    borderColor: "rgba(245,197,66,0.45)",
    bg: "rgba(245,197,66,0.06)",
    badgeColor: "#f5c542",
    badgeBg: "rgba(245,197,66,0.1)",
  },
  {
    label: "Secondary Zones",
    badge: "Standard",
    time: "30–40 mins",
    areas: [
      "Mukherjee Nagar",
      "Timarpur",
      "Wazirabad",
      "Adarsh Nagar",
      "Jahangirpuri",
    ],
    borderColor: "rgba(255,122,24,0.35)",
    bg: "rgba(255,122,24,0.05)",
    badgeColor: "#ff7a18",
    badgeBg: "rgba(255,122,24,0.1)",
  },
  {
    label: "Extended Zones",
    badge: "Extended",
    time: "40–50 mins",
    areas: ["Ashok Vihar", "Shalimar Bagh", "Model Town", "Azadpur"],
    borderColor: "rgba(255,255,255,0.12)",
    bg: "rgba(255,255,255,0.03)",
    badgeColor: "rgba(245,240,232,0.6)",
    badgeBg: "rgba(255,255,255,0.06)",
  },
];

const ZOMATO_URL =
  "https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order";

// ─── Component ────────────────────────────────────────────────────────────────

export default function Location() {
  const openStatus = useOpenStatus();

  return (
    <section
      id="delivery"
      style={{
        backgroundColor: "#0d0905",
        padding: "clamp(56px, 8vw, 100px) 0",
        position: "relative",
        overflow: "hidden",
      }}
      data-ocid="location.section"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(245,197,66,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── HEADER ── */}
        <div className="animate-section text-center mb-10">
          <span className="section-kicker">Delivery</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
            className="title-gold-shimmer"
          >
            Where We Deliver
          </h2>

          {/* Live status + delivery time badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "0.5rem",
            }}
          >
            {/* Live open status badge */}
            <style>{`
              @keyframes statusPulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.55; transform: scale(1.35); }
              }
              .status-dot-anim { animation: statusPulse 1.4s ease-in-out infinite; }
            `}</style>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: `${openStatus.dotColor}16`,
                border: `1px solid ${openStatus.dotColor}42`,
                borderRadius: "999px",
                padding: "6px 14px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: openStatus.dotColor,
                letterSpacing: "0.03em",
              }}
              aria-label={`Restaurant status: ${openStatus.label}`}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: openStatus.dotColor,
                  boxShadow: `0 0 7px ${openStatus.dotColor}`,
                  flexShrink: 0,
                }}
                className={openStatus.pulse ? "status-dot-anim" : ""}
              />
              {openStatus.label}
            </span>

            {/* Delivery time badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(245,197,66,0.08)",
                border: "1px solid rgba(245,197,66,0.28)",
                borderRadius: "999px",
                padding: "6px 14px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "#f5c542",
                letterSpacing: "0.03em",
              }}
            >
              ⚡ 20–30 min delivery
            </span>
          </div>

          <div
            className="section-divider"
            style={{ margin: "1.5rem auto 0" }}
          />
        </div>

        {/* ── ZONE CARDS ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {ZONES.map((zone, i) => (
            <div
              key={zone.label}
              className="animate-section"
              style={{
                background: zone.bg,
                border: `1px solid ${zone.borderColor}`,
                borderRadius: "20px",
                padding: "clamp(18px, 4vw, 26px) clamp(16px, 3vw, 24px)",
                transitionDelay: `${i * 80}ms`,
                transition:
                  "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.45s cubic-bezier(0.16,1,0.3,1)",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.5), 0 0 24px ${zone.borderColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
              data-ocid={`location.zone.${i + 1}`}
            >
              {/* Zone header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: "14px",
                    color: "#f5f0e8",
                    letterSpacing: "0.01em",
                  }}
                >
                  {zone.label}
                </p>
                <span
                  style={{
                    background: zone.badgeBg,
                    border: `1px solid ${zone.borderColor}`,
                    borderRadius: "999px",
                    padding: "2px 10px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: zone.badgeColor,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {zone.badge}
                </span>
              </div>

              {/* Delivery time */}
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: zone.badgeColor,
                  marginBottom: "14px",
                  letterSpacing: "0.02em",
                }}
              >
                🕐 {zone.time}
              </p>

              {/* Area list */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "7px",
                }}
              >
                {zone.areas.map((area) => (
                  <span
                    key={area}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "rgba(245,240,232,0.7)",
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── ORDER CTA ── */}
        <div className="animate-section" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "20px",
              letterSpacing: "0.02em",
            }}
          >
            Delivering across Delhi NCR — order via Zomato for the fastest
            experience
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={ZOMATO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="location.order-zomato.button"
              className="btn-press"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background:
                  "linear-gradient(135deg, #f5c542 0%, #e6a817 50%, #f5c542 100%)",
                backgroundSize: "200% 100%",
                color: "#0a0800",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 900,
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "13px 32px",
                borderRadius: "13px",
                border: "none",
                textDecoration: "none",
                cursor: "pointer",
                boxShadow:
                  "0 0 28px rgba(245,197,66,0.28), 0 4px 18px rgba(0,0,0,0.4)",
                transition:
                  "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
                minHeight: "48px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.04) translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 44px rgba(245,197,66,0.5), 0 8px 24px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(245,197,66,0.28), 0 4px 18px rgba(0,0,0,0.4)";
              }}
            >
              Order on Zomato <ExternalLink size={14} />
            </a>

            <a
              href="https://maps.google.com/?q=28.7211,77.1835&z=17"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="location.open_maps.button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(212,168,67,0.07)",
                color: "#d4a843",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                padding: "13px 24px",
                borderRadius: "13px",
                border: "1px solid rgba(212,168,67,0.3)",
                textDecoration: "none",
                cursor: "pointer",
                minHeight: "48px",
                transition:
                  "background 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,168,67,0.14)";
                e.currentTarget.style.borderColor = "rgba(212,168,67,0.55)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212,168,67,0.07)";
                e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)";
                e.currentTarget.style.transform = "";
              }}
            >
              📍 Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
