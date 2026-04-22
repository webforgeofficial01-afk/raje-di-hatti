import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const WA_HREF =
  "https://wa.me/919599233307?text=Hi%20I%20want%20to%20enquire%20about%20catering";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [ringKey, setRingKey] = useState(0);
  const waBtnRef = useRef<HTMLAnchorElement>(null);

  // Slide-in after 2s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // WhatsApp pulse every 7s
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const triggerPulse = () => {
      const btn = waBtnRef.current;
      if (!btn) return;
      btn.classList.add("wa-pulsing");
      setRingKey((k) => k + 1);
      setTimeout(() => btn.classList.remove("wa-pulsing"), 1400);
    };

    const initial = setTimeout(triggerPulse, 3000);
    const interval = setInterval(triggerPulse, 7000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes waGlowPulse {
          0%   { transform: scale(1);    box-shadow: 0 4px 20px rgba(0,0,0,.5), 0 0 0 2px rgba(37,211,102,.35), 0 0 18px rgba(37,211,102,.12); }
          45%  { transform: scale(1.08); box-shadow: 0 6px 28px rgba(0,0,0,.5), 0 0 0 3px rgba(37,211,102,.7),  0 0 32px rgba(37,211,102,.35); }
          100% { transform: scale(1);    box-shadow: 0 4px 20px rgba(0,0,0,.5), 0 0 0 2px rgba(37,211,102,.35), 0 0 18px rgba(37,211,102,.12); }
        }
        @keyframes waRingExpand {
          0%   { transform: scale(1); opacity: .7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes fbSlideIn {
          from { transform: translateX(90px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        .wa-btn-outer {
          background: linear-gradient(135deg,#1ebe5d 0%,#25d366 55%,#1ebe5d 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,.5), 0 0 0 2px rgba(37,211,102,.35), 0 0 18px rgba(37,211,102,.12);
          transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s cubic-bezier(.16,1,.3,1);
        }
        .wa-btn-outer:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 32px rgba(0,0,0,.55), 0 0 0 3px rgba(37,211,102,.7), 0 0 28px rgba(37,211,102,.4) !important;
        }
        .wa-btn-outer:active { transform: scale(.93) !important; transition-duration: .1s !important; }
        .wa-pulsing { animation: waGlowPulse 1.4s cubic-bezier(.16,1,.3,1) forwards !important; }

        .wa-ring-anim {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(37,211,102,.55);
          animation: waRingExpand 1.2s cubic-bezier(.16,1,.3,1) forwards;
          pointer-events: none;
        }

        .fb-slide-in { animation: fbSlideIn .7s cubic-bezier(.16,1,.3,1) both; }
        .fb-slide-in-delay { animation: fbSlideIn .7s cubic-bezier(.16,1,.3,1) .1s both; }

        .scroll-top-btn {
          transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s ease, box-shadow .3s ease;
        }
        .scroll-top-btn:hover {
          transform: scale(1.12) !important;
          border-color: rgba(212,175,55,.65) !important;
          box-shadow: 0 4px 18px rgba(0,0,0,.5), 0 0 14px rgba(212,175,55,.25) !important;
        }
        .scroll-top-btn:active { transform: scale(.93) !important; transition-duration: .1s !important; }

        @media (prefers-reduced-motion: reduce) {
          .wa-pulsing { animation: none !important; }
          .wa-ring-anim { animation: none !important; display: none !important; }
          .fb-slide-in, .fb-slide-in-delay { animation: none !important; }
        }
      `}</style>

      {/* ── WhatsApp floating button ── */}
      <div
        className={visible ? "fb-slide-in" : ""}
        style={{
          position: "fixed",
          bottom: "84px",
          right: "22px",
          zIndex: 50,
          transform: "translateZ(0)",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Cycling "Catering Orders" badge */}
        <div
          style={{
            position: "absolute",
            top: "-26px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(14,10,3,.94)",
            border: "1px solid rgba(37,211,102,.28)",
            color: "#25d366",
            fontSize: "0.6rem",
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            padding: "3px 9px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
            pointerEvents: "none",
          }}
        >
          🍽️ Catering Only
        </div>

        {/* Tooltip on hover */}
        <div
          style={{
            position: "absolute",
            right: "74px",
            top: "50%",
            transform: `translateY(-50%) translateX(${showTooltip ? "0" : "8px"})`,
            background: "rgba(8,6,2,.96)",
            border: "1px solid rgba(37,211,102,.25)",
            color: "#25d366",
            fontSize: "0.68rem",
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            padding: "6px 12px",
            borderRadius: "9px",
            whiteSpace: "nowrap",
            opacity: showTooltip ? 1 : 0,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,.4)",
            transition:
              "opacity .25s cubic-bezier(.4,0,.2,1) .15s, transform .25s cubic-bezier(.4,0,.2,1) .15s",
          }}
        >
          WhatsApp for Catering
        </div>

        {/* Expanding ring */}
        <span
          key={ringKey}
          className="wa-ring-anim"
          style={{ position: "absolute", inset: 0, borderRadius: "50%" }}
        />

        <a
          ref={waBtnRef}
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn-outer"
          style={{
            position: "relative",
            width: "62px",
            height: "62px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
          aria-label="Catering Enquiry on WhatsApp"
          data-ocid="floating.whatsapp.button"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="#ffffff"
            width="27"
            height="27"
            role="img"
            aria-label="WhatsApp"
          >
            <title>WhatsApp</title>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* ── Call Now (mobile only) ── */}
      <a
        href="tel:+919599233307"
        className={`md:hidden${visible ? " fb-slide-in-delay" : ""}`}
        style={{
          background: "linear-gradient(135deg,#d4a843,#f5c542)",
          boxShadow: "0 4px 20px rgba(212,168,67,.4)",
          bottom: "24px",
          right: "22px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          zIndex: 50,
          transition:
            "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s cubic-bezier(.16,1,.3,1)",
          opacity: visible ? 1 : 0,
        }}
        aria-label="Call Now"
        data-ocid="floating.call.button"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        <Phone size={20} color="#0a0602" />
      </a>

      {/* ── Scroll to top ── */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scroll-top-btn"
          style={{
            backgroundColor: "rgba(14,10,3,.97)",
            border: "1px solid rgba(212,175,55,.28)",
            boxShadow: "0 4px 18px rgba(0,0,0,.5)",
            bottom: "150px",
            right: "22px",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            zIndex: 50,
            cursor: "pointer",
          }}
          aria-label="Scroll to top"
          data-ocid="floating.scroll_top.button"
        >
          <ArrowUp size={17} color="#f5c542" />
        </button>
      )}
    </>
  );
}
