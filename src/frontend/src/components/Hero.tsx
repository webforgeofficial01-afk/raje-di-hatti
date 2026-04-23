import { useEffect, useRef, useState } from "react";
import LiveActivity from "./LiveActivity";

const URGENCY_LINES = [
  "⏰ Kitchen closes at 7 PM — order before it fills up",
  "🔥 Evening rush starts soon — order now, skip the wait",
  "⚡ Fresh batch just prepared — best time to order",
  "🌶️ Butter garlic naan just out of the tandoor",
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

/** Magnetic button — subtle pull toward cursor, desktop only */
function useMagnetic(strength = 5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth <= 768) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let rafId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) * 0.8;
        if (dist < maxDist) {
          const factor = (1 - dist / maxDist) * strength;
          el.style.setProperty("--mx", `${(dx / dist) * factor}px`);
          el.style.setProperty("--my", `${(dy / dist) * factor}px`);
          el.classList.add("magnetic-active");
        }
      });
    };

    const onMouseLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
      el.classList.remove("magnetic-active");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return ref;
}

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const magneticRef = useMagnetic(5);

  const [urgencyIdx, setUrgencyIdx] = useState(0);
  const [urgencyVisible, setUrgencyVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setUrgencyVisible(false);
      setTimeout(() => {
        setUrgencyIdx((prev) => (prev + 1) % URGENCY_LINES.length);
        setUrgencyVisible(true);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const onScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        if (photoRef.current) {
          const clamped = Math.min(window.scrollY * 0.22, 48);
          photoRef.current.style.transform = `translateY(${clamped}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let cycleCount = 0;
    const triggerGlow = () => {
      const btn = primaryBtnRef.current;
      if (!btn) return;
      cycleCount++;
      if (cycleCount % 2 === 0) {
        btn.classList.add("cta-glow-sweep");
        setTimeout(() => btn.classList.remove("cta-glow-sweep"), 1700);
      } else {
        btn.classList.add("cta-glow-pulse");
        setTimeout(() => btn.classList.remove("cta-glow-pulse"), 3100);
      }
    };

    const initialTimer = setTimeout(triggerGlow, 5500);
    const interval = setInterval(triggerGlow, 9000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget as HTMLElement;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
      position:absolute;width:${diameter}px;height:${diameter}px;
      left:${e.clientX - rect.left - radius}px;
      top:${e.clientY - rect.top - radius}px;
      background:rgba(255,255,255,0.22);border-radius:50%;
      transform:scale(0);animation:heroRippleAnim 0.55s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
      pointer-events:none;z-index:0;
    `;
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
  };

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen overflow-hidden"
      style={{ paddingTop: "68px" }}
      data-ocid="hero.section"
    >
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 hero-cinematic-bg"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none hero-grain"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.55) 40%, rgba(5,5,5,0.28) 100%),
              radial-gradient(ellipse 70% 50% at 50% 85%, rgba(245,197,66,0.07) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Authority ribbon */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none hero-fade-in"
        style={{ animationDelay: "1.5s", whiteSpace: "nowrap" }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(5,5,5,0.8)",
            border: "1px solid rgba(245,197,66,0.32)",
            borderRadius: "999px",
            padding: "6px 16px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "rgba(245,197,66,0.82)",
            letterSpacing: "0.03em",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow:
              "0 0 12px rgba(245,197,66,0.08), 0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          ⭐ Rated Delhi's Best Punjabi Breakfast • 1000+ Reviews
        </span>
      </div>

      {/* Ken Burns ambient gold bloom */}
      <div
        className="absolute inset-0 pointer-events-none ken-burns"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 20% 40%, rgba(212,168,67,0.12) 0%, transparent 58%),
            radial-gradient(ellipse 50% 45% at 85% 65%, rgba(232,140,20,0.08) 0%, transparent 52%),
            radial-gradient(ellipse 40% 35% at 60% 10%, rgba(245,197,66,0.05) 0%, transparent 48%)
          `,
          transformOrigin: "center center",
        }}
      />

      {/* Bottom page-to-section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "200px",
          background: "linear-gradient(to top, #050505 0%, transparent 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full hero-content-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* LEFT — Staggered text content */}
          <div>
            {/* Overline kicker */}
            <div
              className="mb-3 hero-fade-in"
              style={{ animationDelay: "0.05s" }}
            >
              <span
                className="label-luxury"
                style={{ color: "rgba(245,197,66,0.6)" }}
              >
                Family Business Since 1990
              </span>
            </div>

            {/* Gold rule */}
            <div
              className="hero-fade-in"
              style={{
                width: "80px",
                height: "1px",
                background: "rgba(245,197,66,0.38)",
                marginBottom: "1rem",
                animationDelay: "0.12s",
                borderRadius: "1px",
              }}
            />

            {/* ── RESTAURANT NAME ── */}
            <h1
              className="mb-2 hero-slide-up title-gold-shimmer text-editorial"
              style={{
                fontSize: "clamp(2.4rem, 7.5vw, 5rem)",
                animationDelay: "0s",
                lineHeight: 1.06,
              }}
            >
              Raje Di Hatti
            </h1>

            {/* Tagline */}
            <p
              className="mb-4 hero-slide-up"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2.8vw, 1.5rem)",
                color: "rgba(245,197,66,0.78)",
                letterSpacing: "0.01em",
                lineHeight: 1.4,
                animationDelay: "0.1s",
              }}
            >
              Burari's Most Loved Taste
            </p>

            {/* Trust badges row */}
            <div
              className="flex flex-wrap gap-2 mb-5 hero-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {[
                { icon: "⭐", text: "4.8 Rating" },
                { icon: "😊", text: "50K+ Customers" },
                { icon: "📦", text: "100K+ Orders" },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  style={{
                    backgroundColor: "rgba(245,197,66,0.06)",
                    border: "1px solid rgba(245,197,66,0.22)",
                    color: "rgba(245,197,66,0.88)",
                    fontFamily: "Poppins, sans-serif",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  {icon} {text}
                </span>
              ))}
            </div>

            {/* Psychological triggers */}
            <p
              className="mb-2 hero-fade-in"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
                color: "rgba(245,240,232,0.72)",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                animationDelay: "0.3s",
              }}
            >
              Authentic Punjabi flavors, made fresh every morning
            </p>

            {/* Sensory copy */}
            <p
              className="mb-2 hero-fade-in"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 1.9vw, 1.05rem)",
                color: "rgba(245,197,66,0.68)",
                letterSpacing: "0.01em",
                lineHeight: 1.55,
                animationDelay: "0.32s",
              }}
            >
              Smell the butter. Taste the tradition. 🧈
            </p>

            {/* Urgency line */}
            <p
              className="mb-4 hero-fade-in"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                color: "rgba(245,197,66,0.55)",
                letterSpacing: "0.04em",
                fontStyle: "italic",
                animationDelay: "0.34s",
              }}
            >
              Made fresh on order • No pre-prepared batches
            </p>

            {/* Live activity pill */}
            <div
              className="mb-3 hero-fade-in"
              style={{ animationDelay: "0.38s" }}
            >
              <LiveActivity />
            </div>

            {/* Urgency rotator */}
            <div
              className="mb-4 hero-fade-in"
              style={{ animationDelay: "0.41s", minHeight: "20px" }}
            >
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,122,24,0.82)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                  opacity: urgencyVisible ? 1 : 0,
                  transform: urgencyVisible
                    ? "translateY(0)"
                    : "translateY(-6px)",
                  transition: urgencyVisible
                    ? "opacity 0.6s cubic-bezier(0,0,0.2,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)"
                    : "opacity 0.5s cubic-bezier(0.4,0,1,1), transform 0.5s cubic-bezier(0.4,0,1,1)",
                }}
              >
                {URGENCY_LINES[urgencyIdx]}
              </p>
            </div>

            {/* Opening hours + delivery */}
            <div
              className="mb-5 hero-fade-in"
              style={{ animationDelay: "0.44s" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,122,24,0.06)",
                  border: "1px solid rgba(255,122,24,0.22)",
                  borderRadius: "999px",
                  padding: "6px 14px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,122,24,0.9)",
                  letterSpacing: "0.02em",
                }}
              >
                🕐 Open 7 AM – 7 PM &nbsp;•&nbsp; Free delivery on ₹300+
              </span>
            </div>

            {/* Gold divider */}
            <div
              className="hero-fade-in"
              style={{
                width: "80px",
                height: "2px",
                background:
                  "linear-gradient(90deg, #d4a843, rgba(212,168,67,0.28), transparent)",
                marginBottom: "1.4rem",
                animationDelay: "0.46s",
                borderRadius: "2px",
              }}
            />

            {/* ── CTAs ── */}
            <div className="flex flex-wrap gap-3 mb-4">
              {/* Primary — Order Now */}
              <button
                ref={(el) => {
                  (
                    primaryBtnRef as React.MutableRefObject<HTMLButtonElement | null>
                  ).current = el;
                  (
                    magneticRef as React.MutableRefObject<HTMLElement | null>
                  ).current = el;
                }}
                type="button"
                onClick={(e) => {
                  handleRipple(e);
                  scrollToSection("menu");
                }}
                className="hero-btn-gold btn-magnetic hero-cta-stagger"
                style={{ "--cta-delay": "0ms" } as React.CSSProperties}
                data-ocid="hero.menu.primary_button"
              >
                📋 Explore Menu
              </button>

              {/* Secondary — Zomato */}
              <a
                href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-orange hero-cta-stagger"
                style={{ "--cta-delay": "130ms" } as React.CSSProperties}
                onClick={handleRipple}
                data-ocid="hero.zomato.button"
              >
                🍽️ Order on Zomato
              </a>

              {/* Tertiary — Swiggy */}
              <a
                href="https://www.swiggy.com/search?query=raje+di+hatti+burari"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-outline hero-cta-stagger"
                style={{ "--cta-delay": "260ms" } as React.CSSProperties}
                onClick={handleRipple}
                data-ocid="hero.swiggy.button"
              >
                🛵 Swiggy
              </a>

              <a
                href="https://porter.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-outline hero-cta-stagger"
                style={{ "--cta-delay": "360ms" } as React.CSSProperties}
                onClick={handleRipple}
                data-ocid="hero.porter.button"
              >
                📦 Porter
              </a>
            </div>

            {/* FOMO micro-copy */}
            <div
              className="hero-fade-in flex flex-col gap-0.5 mb-4"
              style={{ animationDelay: "0.76s" }}
            >
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "rgba(245,197,66,0.6)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.6,
                }}
              >
                No app needed • Takes 30 seconds
              </p>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "11px",
                  color: "rgba(245,197,66,0.42)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                }}
              >
                No extra charges. Just order.
              </p>
            </div>

            {/* Trust badges */}
            <div className="hero-fade-in" style={{ animationDelay: "0.82s" }}>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "🧼", text: "Hygienic Kitchen" },
                  { icon: "🥬", text: "Fresh Ingredients" },
                  { icon: "⚡", text: "Fast Delivery" },
                  { icon: "🥗", text: "100% Pure Veg" },
                ].map(({ icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.035)",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "Poppins, 'Apple Color Emoji', sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {icon} {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Restaurant photo (desktop only) */}
          <div
            className="relative hidden lg:flex justify-end items-center hero-fade-in"
            style={{ animationDelay: "0.28s" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(212,168,67,0.18) 0%, rgba(255,122,24,0.07) 50%, transparent 80%)",
                transform: "scale(1.2)",
                filter: "blur(40px)",
              }}
            />

            <div
              className="relative rounded-3xl p-[2px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,197,66,0.7) 0%, rgba(232,184,75,0.22) 35%, rgba(255,122,24,0.3) 65%, rgba(245,197,66,0.6) 100%)",
                boxShadow:
                  "0 0 50px rgba(212,168,67,0.24), 0 24px 64px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="relative overflow-hidden rounded-3xl shine-sweep"
                style={{
                  width: "clamp(280px, 38vw, 500px)",
                  aspectRatio: "4/3",
                }}
              >
                <div
                  ref={photoRef}
                  style={{
                    position: "absolute",
                    inset: "-30px -4px",
                    willChange: "transform",
                  }}
                >
                  <img
                    src="/assets/generated/hero-food-chole-bhature.dim_900x700.jpg"
                    alt="Signature Chole Bhature — Raje Di Hatti"
                    className="w-full h-full object-cover"
                    style={{
                      filter: "brightness(0.9) saturate(1.15) contrast(1.05)",
                    }}
                    loading="lazy"
                  />
                </div>

                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.38) 100%)",
                    zIndex: 1,
                  }}
                />
                <div
                  className="absolute top-4 left-4"
                  style={{
                    background: "rgba(5,5,5,0.82)",
                    border: "1px solid rgba(245,197,66,0.48)",
                    borderRadius: "12px",
                    padding: "6px 12px",
                    zIndex: 2,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    className="text-xs font-black tracking-wide"
                    style={{ color: "#f5c542" }}
                  >
                    🏆 Chef's Signature
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none hero-fade-in"
        style={{ animationDelay: "1.1s" }}
        data-ocid="hero.scroll_indicator"
      >
        <span
          style={{
            color: "rgba(212,168,67,0.5)",
            fontFamily: "Poppins, sans-serif",
          }}
          className="label-luxury scroll-glow-text"
        >
          Scroll
        </span>
        <div className="scroll-indicator-track">
          <div className="scroll-indicator-dot" />
        </div>
      </div>

      <style>{`
        /* Responsive hero content padding */
        .hero-content-padding {
          padding: clamp(48px, 8vw, 112px) clamp(16px, 4vw, 64px);
        }

        /* ── Cinematic gradient background ── */
        @keyframes cinematicBgShift {
          0%   { background-position: 0% 0%; }
          33%  { background-position: 100% 50%; }
          66%  { background-position: 50% 100%; }
          100% { background-position: 0% 0%; }
        }
        .hero-cinematic-bg {
          background: linear-gradient(
            135deg,
            #0d0400 0%,
            #1a0800 15%,
            #0f0500 30%,
            #1c0c02 50%,
            #050505 70%,
            #0d0400 100%
          );
          background-size: 300% 300%;
          animation: cinematicBgShift 18s ease-in-out infinite;
          will-change: background-position;
        }

        .hero-grain {
          opacity: 0.032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }

        @keyframes ctaStaggerIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-cta-stagger {
          opacity: 0;
          animation: ctaStaggerIn 0.85s cubic-bezier(0.16,1,0.3,1) forwards;
          animation-delay: var(--cta-delay, 0ms);
        }

        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-slide-up {
          opacity: 0;
          animation: heroSlideUp 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in {
          opacity: 0;
          animation: heroFadeIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes heroRippleAnim {
          to { transform: scale(3.5); opacity: 0; }
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.28; }
          50%       { opacity: 0.72; }
        }
        .scroll-glow-text {
          animation: scrollPulse 2.5s cubic-bezier(0.45,0,0.55,1) infinite;
          text-shadow: 0 0 10px rgba(212,168,67,0.45);
        }
        .scroll-indicator-track {
          position: relative;
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(212,168,67,0.32), transparent);
          overflow: hidden;
        }
        @keyframes scrollDotSlide {
          0%   { transform: translateY(-100%); opacity: 0; }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        .scroll-indicator-dot {
          position: absolute;
          top: 0;
          left: -2px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d4a843;
          box-shadow: 0 0 6px rgba(212,168,67,0.7);
          animation: scrollDotSlide 2s cubic-bezier(0.45,0,0.55,1) infinite;
        }

        /* Primary gold CTA */
        .hero-btn-gold {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 12px;
          font-family: Poppins, sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, #f5c542 0%, #e6a817 50%, #f5c542 100%);
          background-size: 200% 100%;
          color: #0a0800;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 28px rgba(212,175,55,0.38), 0 0 52px rgba(212,175,55,0.14), 0 4px 16px rgba(0,0,0,0.4);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.5s cubic-bezier(0.16,1,0.3,1),
                      background-position 0.6s ease;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          min-height: 48px;
          min-width: 120px;
        }
        .hero-btn-gold:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 0 45px rgba(245,197,66,0.55), 0 0 80px rgba(245,197,66,0.2), 0 8px 24px rgba(0,0,0,0.5);
          background-position: 100% 0;
        }
        .hero-btn-gold:active { transform: scale(0.96); transition-duration: 0.12s; }

        /* Orange Zomato CTA */
        .hero-btn-orange {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 20px;
          border-radius: 12px;
          font-family: Poppins, sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, #ff7a18 0%, #e0600d 100%);
          color: #fff;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 22px rgba(255,122,24,0.28), 0 4px 16px rgba(0,0,0,0.4);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.5s cubic-bezier(0.16,1,0.3,1);
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          min-height: 48px;
          min-width: 120px;
        }
        .hero-btn-orange:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 0 38px rgba(255,122,24,0.52), 0 8px 24px rgba(0,0,0,0.5);
        }
        .hero-btn-orange:active { transform: scale(0.96); transition-duration: 0.12s; }

        /* Glass outline button */
        .hero-btn-outline {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 18px;
          border-radius: 12px;
          font-family: Poppins, sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          background: rgba(245,197,66,0.06);
          color: rgba(245,197,66,0.88);
          border: 1px solid rgba(245,197,66,0.3);
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 10px rgba(245,197,66,0.08), 0 4px 14px rgba(0,0,0,0.35),
                      inset 0 1px 0 rgba(255,255,255,0.04);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.5s cubic-bezier(0.16,1,0.3,1),
                      background 0.5s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.5s cubic-bezier(0.16,1,0.3,1);
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          min-height: 48px;
        }
        .hero-btn-outline:hover {
          transform: scale(1.04) translateY(-2px);
          background: rgba(245,197,66,0.14);
          border-color: rgba(245,197,66,0.55);
          box-shadow: 0 0 24px rgba(245,197,66,0.22), 0 8px 24px rgba(0,0,0,0.5);
        }
        .hero-btn-outline:active { transform: scale(0.96); transition-duration: 0.12s; }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide-up,
          .hero-fade-in,
          .hero-cta-stagger {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .scroll-glow-text,
          .scroll-indicator-dot,
          .hero-cinematic-bg {
            animation: none !important;
          }
          .scroll-glow-text { opacity: 0.42 !important; }
        }
      `}</style>
    </section>
  );
}
