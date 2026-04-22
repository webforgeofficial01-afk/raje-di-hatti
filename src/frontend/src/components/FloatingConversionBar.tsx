import { useEffect, useRef, useState } from "react";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  // Use offsetTop traversal instead of getBoundingClientRect to avoid reading
  // stale layout when CSS transitions (.animate-section → .visible) are in
  // flight — prevents the scroll-to-contact jumping to the last section bug.
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  window.scrollTo({ top: top - 72, behavior: "smooth" });
};

export default function FloatingConversionBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [inFooter, setInFooter] = useState(false);

  // Slide up after 1s
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Hide when footer is in view — use IntersectionObserver to avoid getBoundingClientRect on every scroll frame
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInFooter(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Gold text brighten pulse every 8s
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      const el = barRef.current;
      if (!el) return;
      el.classList.add("fcb-pulse");
      setTimeout(() => el.classList.remove("fcb-pulse"), 900);
    }, 8000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const translateY = !isVisible || inFooter ? "100px" : "0";

  return (
    <>
      <div
        ref={barRef}
        data-ocid="floating.conversion_bar"
        role="complementary"
        aria-label="Quick navigation shortcuts"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 45,
          background: "rgba(5,3,1,.97)",
          borderTop: "1px solid rgba(245,197,66,.2)",
          boxShadow: "0 -4px 28px rgba(0,0,0,.6)",
          paddingTop: "10px",
          paddingBottom: "env(safe-area-inset-bottom, 12px)",
          paddingLeft: "16px",
          paddingRight: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          minHeight: "56px",
          transform: `translateY(${translateY})`,
          transition: "transform .8s cubic-bezier(.16,1,.3,1)",
          willChange: "transform",
        }}
      >
        {/* Our Story */}
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          data-ocid="floating.conversion_bar.our_story"
          className="fcb-btn fcb-btn-story"
          aria-label="Jump to Our Story section"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            background:
              "linear-gradient(135deg, rgba(245,197,66,.16) 0%, rgba(232,160,32,.1) 100%)",
            color: "#f5c542",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.04em",
            padding: "11px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(245,197,66,.32)",
            cursor: "pointer",
            transition:
              "transform .5s cubic-bezier(.16,1,.3,1), background .5s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1)",
            whiteSpace: "nowrap",
          }}
        >
          {/* Book/scroll icon */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0, opacity: 0.9 }}
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Our Story
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "28px",
            background: "rgba(245,197,66,.16)",
            flexShrink: 0,
          }}
        />

        {/* Reviews */}
        <button
          type="button"
          onClick={() => scrollToSection("reviews")}
          data-ocid="floating.conversion_bar.reviews"
          className="fcb-btn fcb-btn-reviews"
          aria-label="Jump to Reviews section"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            background:
              "linear-gradient(135deg, rgba(245,197,66,.16) 0%, rgba(232,160,32,.1) 100%)",
            color: "#f5c542",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.04em",
            padding: "11px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(245,197,66,.32)",
            cursor: "pointer",
            transition:
              "transform .5s cubic-bezier(.16,1,.3,1), background .5s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1)",
            whiteSpace: "nowrap",
          }}
        >
          {/* Star icon */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            aria-hidden="true"
            style={{ flexShrink: 0, opacity: 0.9 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Reviews
        </button>
      </div>

      <style>{`
        [data-ocid="floating.conversion_bar"] { display: flex; }
        @media (min-width: 769px) {
          [data-ocid="floating.conversion_bar"] { display: none !important; }
        }

        @keyframes fcbGoldBrighten {
          0%   { filter: brightness(1); }
          40%  { filter: brightness(1.35); }
          100% { filter: brightness(1); }
        }
        .fcb-pulse .fcb-btn { animation: fcbGoldBrighten .85s cubic-bezier(.16,1,.3,1) both; }

        .fcb-btn:hover {
          background: linear-gradient(135deg, rgba(245,197,66,.28) 0%, rgba(232,160,32,.2) 100%) !important;
          box-shadow: 0 0 18px rgba(245,197,66,.2), 0 3px 12px rgba(0,0,0,.3) !important;
          transform: scale(1.035) !important;
        }
        .fcb-btn:active {
          transform: scale(.96) !important;
          transition-duration: .1s !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .fcb-pulse .fcb-btn { animation: none !important; }
          [data-ocid="floating.conversion_bar"] {
            transition: none !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </>
  );
}
