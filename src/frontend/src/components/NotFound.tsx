// NotFound.tsx — Branded 404 page with subtle animated background

import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes notfound404Float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes nfOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes nfOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes nfParticle {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          40% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-80px) scale(1.2); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#050505",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "2rem",
        }}
        data-ocid="notfound.page"
      >
        {/* Grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Animated ambient orbs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "15%",
            left: "10%",
            width: "400px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(245,197,66,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "nfOrb1 14s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "350px",
            height: "250px",
            background:
              "radial-gradient(ellipse, rgba(255,122,24,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "nfOrb2 18s ease-in-out infinite",
          }}
        />

        {/* Floating particles */}
        {(["p0", "p1", "p2", "p3", "p4", "p5"] as const).map((pid, i) => (
          <div
            key={pid}
            aria-hidden
            style={{
              position: "absolute",
              width: i % 2 === 0 ? "5px" : "3px",
              height: i % 2 === 0 ? "5px" : "3px",
              borderRadius: "50%",
              background:
                i % 3 === 0
                  ? "#f5c542"
                  : i % 3 === 1
                    ? "#ff7a18"
                    : "rgba(245,197,66,0.5)",
              left: `${15 + i * 13}%`,
              bottom: "20%",
              opacity: 0,
              animation: `nfParticle ${4 + i * 1.5}s ease-out ${i * 0.8}s infinite`,
              boxShadow: `0 0 6px ${i % 3 === 0 ? "rgba(245,197,66,0.6)" : "rgba(255,122,24,0.5)"}`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "540px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition:
              "opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Decorative line */}
          <div
            style={{
              width: "60px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #f5c542, transparent)",
              margin: "0 auto 2rem",
              borderRadius: "2px",
            }}
          />

          {/* 404 — floating */}
          <h1
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(5rem, 18vw, 9rem)",
              lineHeight: 1,
              background:
                "linear-gradient(135deg, #c49a28 0%, #d4a843 20%, #f5c542 50%, #ffd700 65%, #e8b84b 85%, #c49a28 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
              display: "block",
              animation: "notfound404Float 5s ease-in-out infinite",
            }}
            data-ocid="notfound.heading"
          >
            404
          </h1>

          {/* Main message */}
          <p
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 3vw, 1.45rem)",
              color: "rgba(245,240,232,0.85)",
              lineHeight: 1.4,
              marginBottom: "0.85rem",
            }}
          >
            Looks like this page ran away like hot jalebis 😄
          </p>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
              color: "rgba(245,240,232,0.42)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            The page you're looking for doesn't exist.
            <br />
            Head back home — the food is still hot.
          </p>

          {/* Gold divider dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "2.5rem",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "40px",
                background:
                  "linear-gradient(90deg, transparent, rgba(245,197,66,0.5))",
              }}
            />
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#f5c542",
                boxShadow: "0 0 8px rgba(245,197,66,0.7)",
              }}
            />
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#ff7a18",
                boxShadow: "0 0 8px rgba(255,122,24,0.7)",
              }}
            />
            <div
              style={{
                height: "1px",
                width: "40px",
                background:
                  "linear-gradient(90deg, rgba(255,122,24,0.5), transparent)",
              }}
            />
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={goHome}
              data-ocid="notfound.home.button"
              className="btn-press"
              style={{
                background:
                  "linear-gradient(135deg, #f5c542 0%, #e6a817 50%, #f5c542 100%)",
                backgroundSize: "200% 100%",
                color: "#0a0800",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                letterSpacing: "0.04em",
                padding: "13px 28px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 0 24px rgba(212,175,55,0.35), 0 4px 16px rgba(0,0,0,0.4)",
                transition:
                  "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
                minHeight: "50px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.04) translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(245,197,66,0.5), 0 8px 24px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(212,175,55,0.35), 0 4px 16px rgba(0,0,0,0.4)";
              }}
            >
              🏠 Back to Home
            </button>

            <a
              href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="notfound.order.button"
              className="btn-press"
              style={{
                background: "rgba(245,197,66,0.07)",
                color: "#f5c542",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                letterSpacing: "0.04em",
                padding: "13px 28px",
                borderRadius: "12px",
                border: "1px solid rgba(245,197,66,0.4)",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                transition:
                  "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
                minHeight: "50px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.04) translateY(-2px)";
                e.currentTarget.style.background = "rgba(245,197,66,0.14)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(245,197,66,0.2), 0 8px 24px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = "rgba(245,197,66,0.07)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)";
              }}
            >
              🍽️ Order Food
            </a>
          </div>

          {/* Brand tag */}
          <p
            style={{
              marginTop: "3rem",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.68rem",
              color: "rgba(245,197,66,0.28)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Raje Di Hatti · Since 1990
          </p>
        </div>
      </div>
    </>
  );
}
