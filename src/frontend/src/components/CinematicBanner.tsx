const scrollToMenu = () => {
  const el = document.getElementById("menu");
  if (el) {
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function CinematicBanner() {
  return (
    <section
      className="cinematic-banner relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "60vh",
        /* contain: layout style — isolates this section's layout cost from the rest of the page.
           The browser won't recalculate layout/style of the rest of the page when
           the 3D animation runs inside here. */
        contain: "layout style",
      }}
      data-ocid="cinematic.banner"
    >
      {/* ── Layer 0: Deep black base ── */}
      <div className="absolute inset-0" style={{ background: "#050505" }} />

      {/* ═══════════════════════════════════════════════
          3D PERSPECTIVE SCENE CONTAINER
          All food layers live inside this for real depth
          ═══════════════════════════════════════════════ */}
      <div
        className="cb-scene-3d absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* ── Layer 1: Ambient tint — furthest back ── */}
        <div
          className="absolute inset-0 cb-layer-tint cb-depth-bg"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 60%, rgba(212,140,30,0.30) 0%, rgba(180,80,10,0.12) 50%, transparent 75%)",
            willChange: "transform, opacity",
          }}
        />

        {/* ── Layer 2: Sizzle glow — warm golden-amber bottom-left ── */}
        <div
          className="absolute inset-0 cb-layer-naan cb-depth-naan"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 12% 88%, rgba(245,197,66,0.70) 0%, rgba(255,122,24,0.45) 30%, rgba(255,90,0,0.20) 55%, transparent 72%)",
            willChange: "transform, opacity",
          }}
        />

        {/* ── Layer 3: Cinematic glow shift ── */}
        <div
          className="absolute inset-0 cinematic-glow-anim cb-depth-mid"
          style={{ willChange: "transform, opacity" }}
        />

        {/* ── Layer 4: Rich swirl — deep maroon-cream rotating ── */}
        <div
          className="absolute cb-layer-dal cb-depth-dal"
          style={{
            top: "15%",
            left: "42%",
            width: "55%",
            height: "65%",
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(120,20,0,0.90) 0%, rgba(180,50,10,0.55) 35%, rgba(220,100,30,0.25) 60%, transparent 80%)",
            willChange: "transform, opacity",
            borderRadius: "50%",
          }}
        />

        {/* ── Layer 5: Spiced glow — orange-gold top-right ── */}
        <div
          className="absolute inset-0 cb-layer-chole cb-depth-chole"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 88% 18%, rgba(255,122,24,0.60) 0%, rgba(245,197,66,0.32) 35%, rgba(255,160,50,0.15) 55%, transparent 72%)",
            willChange: "transform, opacity",
          }}
        />

        {/* ── Layer 6: Steam / heat shimmer particles ── closest plane ── */}
        <div className="absolute inset-0">
          <span className="cb-steam cb-steam-1" />
          <span className="cb-steam cb-steam-2" />
          <span className="cb-steam cb-steam-3" />
          <span className="cb-steam cb-steam-4" />
          <span className="cb-steam cb-steam-5" />
          <span className="cb-steam cb-steam-6" />
        </div>

        {/* ── Layer 7: Sizzle sparkles — gold + orange pulsing dots ── */}
        <div className="absolute inset-0">
          <span className="cb-spark cb-spark-1" />
          <span className="cb-spark cb-spark-2" />
          <span className="cb-spark cb-spark-3" />
          <span className="cb-spark cb-spark-4" />
          <span className="cb-spark cb-spark-5" />
          <span className="cb-spark cb-spark-6" />
          <span className="cb-spark cb-spark-7" />
          <span className="cb-spark cb-spark-8" />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            KULHAD LASSI — floating clay cup, mid-foreground Z=10px
            Bottom-right quadrant, clear of text overlay
            ═══════════════════════════════════════════════════════════ */}
        <div
          className="cb-kulhad-wrapper"
          aria-label="Kulhad Lassi"
          style={{ willChange: "transform, opacity" }}
        >
          {/* ── Floor glow — warm gold ellipse below the kulhad ── */}
          <div
            className="cb-kulhad-glow"
            style={{ willChange: "transform, opacity" }}
          />

          {/* ── Steam wisps rising from kulhad rim ── */}
          <span className="cb-kulhad-steam cb-kulhad-steam-1" />
          <span className="cb-kulhad-steam cb-kulhad-steam-2" />

          {/* ── The Kulhad SVG — clay cup with frothy lassi ── */}
          <div
            className="cb-kulhad-float"
            style={{ willChange: "transform, opacity" }}
          >
            <svg
              className="cb-kulhad-svg"
              viewBox="0 0 90 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                {/* Clay / terracotta body gradient */}
                <linearGradient id="kulhadBody" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c47030" />
                  <stop offset="40%" stopColor="#b5651d" />
                  <stop offset="100%" stopColor="#7a3a10" />
                </linearGradient>
                {/* Inner shadow on left side of body */}
                <linearGradient id="kulhadShade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
                  <stop offset="40%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
                </linearGradient>
                {/* Rim highlight */}
                <linearGradient id="kulhadRimHL" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,220,160,0)" />
                  <stop offset="35%" stopColor="rgba(255,220,160,0.45)" />
                  <stop offset="65%" stopColor="rgba(255,220,160,0.55)" />
                  <stop offset="100%" stopColor="rgba(255,220,160,0)" />
                </linearGradient>
                {/* Lassi cream top */}
                <radialGradient id="lassiTop" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="rgba(255,252,240,0.97)" />
                  <stop offset="60%" stopColor="rgba(245,230,195,0.90)" />
                  <stop offset="100%" stopColor="rgba(230,205,160,0.80)" />
                </radialGradient>
                {/* Saffron accent */}
                <radialGradient id="saffrondot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,160,40,0.9)" />
                  <stop offset="100%" stopColor="rgba(220,100,10,0)" />
                </radialGradient>
                {/* Froth bubbles */}
                <radialGradient id="frothBubble" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                  <stop offset="100%" stopColor="rgba(240,220,180,0.50)" />
                </radialGradient>
              </defs>

              {/* ── Kulhad body — tapered trapezoid, wider at top ── */}
              {/* Main clay body */}
              <path
                d="M14 30 L76 30 L65 108 Q45 112 25 108 Z"
                fill="url(#kulhadBody)"
              />
              {/* Shade overlay for depth */}
              <path
                d="M14 30 L76 30 L65 108 Q45 112 25 108 Z"
                fill="url(#kulhadShade)"
              />
              {/* Subtle terracotta texture lines */}
              <line
                x1="22"
                y1="45"
                x2="68"
                y2="45"
                stroke="rgba(255,180,80,0.12)"
                strokeWidth="0.8"
              />
              <line
                x1="23"
                y1="60"
                x2="67"
                y2="60"
                stroke="rgba(255,180,80,0.10)"
                strokeWidth="0.8"
              />
              <line
                x1="25"
                y1="78"
                x2="65"
                y2="78"
                stroke="rgba(255,180,80,0.08)"
                strokeWidth="0.8"
              />
              {/* Highlight stripe on right side */}
              <path
                d="M62 32 L74 32 L63 105 L60 105 Z"
                fill="rgba(255,200,120,0.10)"
              />

              {/* ── Rim ring — top edge of kulhad ── */}
              <ellipse cx="45" cy="30" rx="31" ry="6" fill="url(#kulhadBody)" />
              {/* Rim top highlight */}
              <ellipse
                cx="45"
                cy="28.5"
                rx="31"
                ry="4.5"
                fill="url(#kulhadRimHL)"
              />
              {/* Inner rim dark */}
              <ellipse
                cx="45"
                cy="30"
                rx="27"
                ry="4.5"
                fill="rgba(60,20,5,0.55)"
              />

              {/* ── Lassi cream surface — sits inside the rim ── */}
              <ellipse
                className="cb-lassi-top"
                cx="45"
                cy="28"
                rx="26"
                ry="7"
                fill="url(#lassiTop)"
                style={{ willChange: "transform" }}
              />
              {/* Subtle cream gradient edge */}
              <ellipse
                cx="45"
                cy="28"
                rx="26"
                ry="7"
                fill="rgba(200,170,100,0.20)"
              />

              {/* ── Froth bubbles on lassi surface ── */}
              <circle
                className="cb-froth-bubble cb-froth-1"
                cx="36"
                cy="26"
                r="4.5"
                fill="url(#frothBubble)"
              />
              <circle
                className="cb-froth-bubble cb-froth-2"
                cx="50"
                cy="25"
                r="3.5"
                fill="url(#frothBubble)"
              />
              <circle
                className="cb-froth-bubble cb-froth-3"
                cx="56"
                cy="27.5"
                r="3"
                fill="url(#frothBubble)"
              />
              {/* Tiny inner highlight on biggest bubble */}
              <circle
                cx="34.5"
                cy="24.5"
                r="1.5"
                fill="rgba(255,255,255,0.65)"
              />
              <circle cx="49" cy="23.5" r="1" fill="rgba(255,255,255,0.55)" />

              {/* ── Saffron / rose accent dot on lassi ── */}
              <ellipse
                cx="44"
                cy="27"
                rx="4"
                ry="2.5"
                fill="url(#saffrondot)"
                opacity="0.75"
              />

              {/* ── Rim outer edge top-line highlight ── */}
              <path
                d="M14 30 Q45 22 76 30"
                stroke="rgba(255,220,150,0.18)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Gold horizontal rule — top ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center px-8 lg:px-24">
        <div className="cinematic-rule" />
      </div>

      {/* ── Gold horizontal rule — bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center px-8 lg:px-24">
        <div className="cinematic-rule" />
      </div>

      {/* ── Center content ── */}
      <div className="relative z-10 text-center px-6 lg:px-20 py-20">
        {/* Decorative thin gold line */}
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "rgba(245,197,66,0.55)",
            margin: "0 auto 1.5rem",
            borderRadius: "1px",
            boxShadow: "0 0 8px rgba(245,197,66,0.4)",
          }}
        />

        {/* Headlines */}
        <h2
          className="cinematic-headline block mb-2 text-editorial"
          style={{
            animationDelay: "0.1s",
            letterSpacing: "-0.03em",
            fontWeight: 900,
          }}
        >
          Crafted for Taste.
        </h2>
        <h2
          className="cinematic-headline block mb-6 text-editorial"
          style={{
            animationDelay: "0.22s",
            letterSpacing: "-0.03em",
            fontWeight: 900,
          }}
        >
          Designed for Experience.
        </h2>

        {/* Memory line */}
        <p
          className="cinematic-memory-line mb-8"
          style={{ animationDelay: "0.36s" }}
        >
          Every plate a story. Every bite a memory.
        </p>

        {/* Est label */}
        <p
          className="label-luxury mb-8"
          style={{
            color: "rgba(245,197,66,0.55)",
            display: "block",
          }}
        >
          Est. 1990
        </p>

        {/* Sub-line */}
        <p
          className="mb-10 font-semibold tracking-wider"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(0.8rem, 1.6vw, 1rem)",
            color: "rgba(255,122,24,0.95)",
            letterSpacing: "0.12em",
            textShadow: "0 0 16px rgba(255,122,24,0.4)",
          }}
        >
          🚀 Order Now – Fast Delivery Available
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={scrollToMenu}
          className="cinematic-cta-btn"
          data-ocid="cinematic.view-menu.button"
        >
          View Full Menu
        </button>
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════════════
           3D CINEMATIC FOOD SCENE — CSS perspective depth system
           All animations: transform + opacity only — GPU safe, 60fps
           ═══════════════════════════════════════════════════════════════════ */

        /* ── 3D Scene Container — perspective origin + slow camera tilt ── */
        .cb-scene-3d {
          perspective: 1000px;
          perspective-origin: 50% 50%;
          transform-style: flat; /* flat on the section itself — preserve-3d inside */
          animation: cbCameraTilt 22s ease-in-out infinite alternate;
          will-change: transform;
        }

        @keyframes cbCameraTilt {
          0%   { transform: rotateX(0deg)   rotateY(0deg); }
          25%  { transform: rotateX(-1.5deg) rotateY(2deg); }
          50%  { transform: rotateX(1.8deg)  rotateY(-2.5deg); }
          75%  { transform: rotateX(-1deg)   rotateY(1.5deg); }
          100% { transform: rotateX(1.5deg)  rotateY(-1.8deg); }
        }

        /* ── Depth plane utility — translateZ creates real layering ── */
        /* Tint: deepest background plane */
        .cb-depth-bg {
          transform: translateZ(-80px) scale(1.08);
          will-change: transform, opacity;
        }
        /* Naan glow: background-mid */
        .cb-depth-naan {
          transform: translateZ(-40px) scale(1.04);
          will-change: transform, opacity;
        }
        /* Cinematic glow: mid plane */
        .cb-depth-mid {
          transform: translateZ(0px);
          will-change: transform, opacity;
        }
        /* Dal swirl: mid plane */
        .cb-depth-dal {
          transform: translateZ(0px);
          will-change: transform, opacity;
        }
        /* Chole pulse: mid-front */
        .cb-depth-chole {
          transform: translateZ(20px) scale(0.98);
          will-change: transform, opacity;
        }

        /* ═══════════════════════════════════════════
           EXISTING KEYFRAMES — preserved, extended with 3D
           ═══════════════════════════════════════════ */

        /* Sizzle: strong amber pulse bottom-left + gentle 3D wobble */
        @keyframes cbNaanSizzle {
          0%   { opacity: 0.70; transform: translateZ(-40px) scale(1.04) rotateX(0deg)    rotateY(0deg); }
          30%  { opacity: 0.90; transform: translateZ(-40px) scale(1.04) rotateX(3deg)    rotateY(-4deg); }
          60%  { opacity: 1;    transform: translateZ(-40px) scale(1.04) rotateX(-2.5deg) rotateY(5deg); }
          100% { opacity: 0.70; transform: translateZ(-40px) scale(1.04) rotateX(4deg)    rotateY(-3deg); }
        }
        .cb-layer-naan {
          animation: cbNaanSizzle 11s ease-in-out infinite alternate;
        }

        /* Rich swirl: slow rotation + 3D wobble */
        @keyframes cbDalSwirl {
          0%   { opacity: 0.80; transform: translateZ(0px) rotate(0deg)   scale(1)    rotateX(0deg)    rotateY(0deg); }
          25%  { opacity: 0.95; transform: translateZ(0px) rotate(90deg)  scale(1.04) rotateX(4deg)    rotateY(-5deg); }
          50%  { opacity: 1;    transform: translateZ(0px) rotate(180deg) scale(1.08) rotateX(-3deg)   rotateY(6deg); }
          75%  { opacity: 0.90; transform: translateZ(0px) rotate(270deg) scale(1.04) rotateX(5deg)    rotateY(-4deg); }
          100% { opacity: 0.80; transform: translateZ(0px) rotate(360deg) scale(1)    rotateX(-2deg)   rotateY(3deg); }
        }
        .cb-layer-dal {
          animation: cbDalSwirl 28s linear infinite;
          transform-origin: 50% 50%;
        }

        /* Spiced cloud pulse top-right + gentle Z push */
        @keyframes cbCholePulse {
          0%   { opacity: 0.65; transform: translateZ(20px) scale(0.98) rotateX(0deg) rotateY(0deg); }
          35%  { opacity: 0.85; transform: translateZ(28px) scale(1.01) rotateX(-3deg) rotateY(4deg); }
          70%  { opacity: 1;    transform: translateZ(24px) scale(1.02) rotateX(4deg) rotateY(-5deg); }
          100% { opacity: 0.65; transform: translateZ(20px) scale(0.98) rotateX(-2deg) rotateY(3deg); }
        }
        .cb-layer-chole {
          animation: cbCholePulse 13s ease-in-out infinite alternate;
        }

        /* Overall warm tint breathe — from deep background */
        @keyframes cbTintBreathe {
          0%   { opacity: 0.65; transform: translateZ(-80px) scale(1.08) rotateX(0deg) rotateY(0deg); }
          50%  { opacity: 0.85; transform: translateZ(-80px) scale(1.08) rotateX(3deg) rotateY(-3deg); }
          100% { opacity: 1;    transform: translateZ(-80px) scale(1.08) rotateX(-2deg) rotateY(2.5deg); }
        }
        .cb-layer-tint {
          animation: cbTintBreathe 15s ease-in-out infinite alternate;
        }

        /* ── Steam drift particles — float through 3D space ── */
        .cb-steam {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,240,220,0.55) 0%, transparent 70%);
          pointer-events: none;
          will-change: transform, opacity;
        }

        @keyframes cbSteamRise {
          0%   { opacity: 0;    transform: translateY(0)    translateZ(40px)  scaleX(1)   rotateZ(0deg); }
          15%  { opacity: 0.75; transform: translateY(-12px) translateZ(45px) scaleX(1.05) rotateZ(1deg); }
          40%  { opacity: 0.65; transform: translateY(-32px) translateZ(38px) scaleX(1.15) rotateZ(-2deg); }
          70%  { opacity: 0.45; transform: translateY(-58px) translateZ(48px) scaleX(1.25) rotateZ(3deg); }
          100% { opacity: 0;    transform: translateY(-80px) translateZ(42px) scaleX(1.4)  rotateZ(-1.5deg); }
        }

        .cb-steam-1 { width: 28px; height: 56px; bottom: 22%; left: 10%;  animation: cbSteamRise 2.8s ease-in-out infinite; animation-delay: 0s; }
        .cb-steam-2 { width: 20px; height: 44px; bottom: 28%; left: 18%;  animation: cbSteamRise 3.4s ease-in-out infinite; animation-delay: 0.6s; }
        .cb-steam-3 { width: 24px; height: 50px; bottom: 20%; left: 24%;  animation: cbSteamRise 2.5s ease-in-out infinite; animation-delay: 1.1s; }
        .cb-steam-4 { width: 22px; height: 48px; bottom: 35%; left: 55%;  animation: cbSteamRise 3.1s ease-in-out infinite; animation-delay: 0.4s; }
        .cb-steam-5 { width: 18px; height: 40px; bottom: 30%; left: 62%;  animation: cbSteamRise 2.7s ease-in-out infinite; animation-delay: 1.5s; }
        .cb-steam-6 { width: 26px; height: 52px; bottom: 15%; left: 80%;  animation: cbSteamRise 3.2s ease-in-out infinite; animation-delay: 0.9s; }

        /* ── Sizzle sparkles — pop toward viewer, recede, repeat ── */
        .cb-spark {
          position: absolute;
          border-radius: 50%;
          background: #f5c542;
          pointer-events: none;
          will-change: transform, opacity;
        }

        @keyframes cbSparkle {
          0%   { opacity: 0;    transform: scale(0.3) translateZ(60px); }
          25%  { opacity: 0.85; transform: scale(1.3) translateZ(75px); }
          55%  { opacity: 1;    transform: scale(1.5) translateZ(80px); }
          80%  { opacity: 0.6;  transform: scale(1.0) translateZ(62px); }
          100% { opacity: 0;    transform: scale(0.3) translateZ(60px); }
        }

        .cb-spark-1 { width: 6px; height: 6px; top: 76%; left: 10%; animation: cbSparkle 2.0s ease-in-out infinite; animation-delay: 0s; }
        .cb-spark-2 { width: 5px; height: 5px; top: 82%; left: 20%; animation: cbSparkle 1.7s ease-in-out infinite; animation-delay: 0.4s; background: #ff7a18; }
        .cb-spark-3 { width: 7px; height: 7px; top: 68%; left: 7%;  animation: cbSparkle 2.3s ease-in-out infinite; animation-delay: 0.8s; }
        .cb-spark-4 { width: 5px; height: 5px; top: 88%; left: 15%; animation: cbSparkle 1.9s ease-in-out infinite; animation-delay: 0.2s; background: #ff7a18; }
        .cb-spark-5 { width: 6px; height: 6px; top: 16%; left: 82%; animation: cbSparkle 2.1s ease-in-out infinite; animation-delay: 0.3s; }
        .cb-spark-6 { width: 8px; height: 8px; top: 10%; left: 90%; animation: cbSparkle 1.6s ease-in-out infinite; animation-delay: 0.7s; background: #ff7a18; }
        .cb-spark-7 { width: 5px; height: 5px; top: 24%; left: 78%; animation: cbSparkle 2.4s ease-in-out infinite; animation-delay: 1.1s; }
        .cb-spark-8 { width: 6px; height: 6px; top: 20%; left: 86%; animation: cbSparkle 1.8s ease-in-out infinite; animation-delay: 0.5s; background: #ff7a18; }

        /* ── Cinematic glow shift — existing, unmodified keyframe ── */
        @keyframes cinematicGlow {
          0%   { opacity: 0.7; }
          50%  { opacity: 1; }
          100% { opacity: 0.7; }
        }
        .cinematic-glow-anim {
          background: radial-gradient(ellipse 60% 70% at 30% 50%, rgba(212,168,67,0.18) 0%, transparent 65%),
                      radial-gradient(ellipse 50% 60% at 75% 55%, rgba(255,122,24,0.12) 0%, transparent 60%);
          animation: cinematicGlow 8s ease-in-out infinite alternate;
        }

        /* ── Gold rules ── */
        .cinematic-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,168,67,0.5) 20%, rgba(245,197,66,0.6) 50%, rgba(212,168,67,0.5) 80%, transparent);
        }

        /* ── Headlines ── */
        .cinematic-headline {
          font-weight: 900;
          font-size: clamp(2.5rem, 7vw, 6rem);
          line-height: 1.05;
          background: linear-gradient(135deg, #f5c542 0%, #fff5a0 40%, #e8aa1b 70%, #f5c542 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(245,197,66,0.45));
          opacity: 0;
          animation: cinematicFadeUp 0.85s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        .cinematic-memory-line {
          font-family: Inter, Poppins, sans-serif;
          font-size: clamp(0.85rem, 1.8vw, 1.05rem);
          font-style: italic;
          color: rgba(245,240,232,0.75);
          letter-spacing: 0.03em;
          opacity: 0;
          animation: cinematicFadeUp 0.85s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes cinematicFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── CTA Button ── */
        .cinematic-cta-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          padding: 14px 40px;
          border-radius: 14px;
          font-family: Poppins, sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #f5c542 0%, #e6a817 50%, #f5c542 100%);
          background-size: 200% 100%;
          color: #0a0800;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 28px rgba(212,168,67,0.50), 0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.35s cubic-bezier(0.16,1,0.3,1),
                      background-position 0.4s ease;
        }
        .cinematic-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 52px rgba(212,168,67,0.65), 0 10px 30px rgba(0,0,0,0.6);
          background-position: 100% 0;
        }
        .cinematic-cta-btn:active {
          transform: scale(0.97);
        }

        /* ═══════════════════════════════════════════════════════════════════
           KULHAD LASSI — 3D floating clay cup element
           Z plane: translateZ(10px) — mid-foreground
           Bottom-right quadrant, clear of text overlay
           All keyframes bake the base translateZ into every frame
           ═══════════════════════════════════════════════════════════════════ */

        /* ── Wrapper: positions the whole kulhad group in the scene ── */
        .cb-kulhad-wrapper {
          position: absolute;
          right: 8%;
          bottom: 15%;
          width: 90px;
          height: 130px;
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .cb-kulhad-wrapper {
            right: 10%;
            bottom: 18%;
            width: 120px;
            height: 170px;
          }
        }

        /* ── Floor glow — soft warm gold ellipse beneath cup ── */
        .cb-kulhad-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 72px;
          height: 18px;
          background: radial-gradient(ellipse at center, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 75%);
          border-radius: 50%;
          transform: translateX(-50%) translateZ(10px) scale(0.85);
          animation: cbKulhadGlow 4s ease-in-out infinite alternate;
        }
        @keyframes cbKulhadGlow {
          0%   { transform: translateX(-50%) translateZ(10px) scale(0.85); opacity: 0.7; }
          50%  { transform: translateX(-50%) translateZ(10px) scale(1.05); opacity: 1; }
          100% { transform: translateX(-50%) translateZ(10px) scale(0.85); opacity: 0.7; }
        }
        @media (min-width: 768px) {
          .cb-kulhad-glow {
            width: 96px;
            height: 22px;
          }
        }

        /* ── Kulhad steam wisps — tiny, rise from rim, low opacity ── */
        .cb-kulhad-steam {
          position: absolute;
          width: 4px;
          border-radius: 2px;
          background: rgba(255,248,235,0.30);
          pointer-events: none;
          will-change: transform, opacity;
        }
        .cb-kulhad-steam-1 {
          height: 16px;
          left: 35%;
          top: 2px;
          animation: cbKulhadSteam 2.6s ease-in-out infinite;
          animation-delay: 0s;
        }
        .cb-kulhad-steam-2 {
          height: 14px;
          left: 58%;
          top: 4px;
          animation: cbKulhadSteam 2.6s ease-in-out infinite;
          animation-delay: 0.9s;
        }
        /* Steam bakes Z=15px (just above kulhad Z=10px) */
        @keyframes cbKulhadSteam {
          0%   { opacity: 0;    transform: translateY(0px)   translateZ(15px) scaleX(1); }
          20%  { opacity: 0.30; transform: translateY(-6px)  translateZ(15px) scaleX(1.1); }
          55%  { opacity: 0.22; transform: translateY(-14px) translateZ(15px) scaleX(1.2); }
          100% { opacity: 0;    transform: translateY(-22px) translateZ(15px) scaleX(1.35); }
        }

        /* ── Float wrapper — the organic bob + tilt of the whole cup ── */
        .cb-kulhad-float {
          position: absolute;
          bottom: 12px;
          left: 0;
          width: 100%;
          height: calc(100% - 12px);
          animation: cbKulhadFloat 4s ease-in-out infinite alternate;
        }
        /* CRITICAL: translateZ(10px) baked into EVERY keyframe frame */
        @keyframes cbKulhadFloat {
          0%   { transform: translateY(-12px) translateZ(10px) rotateZ(-3deg); }
          50%  { transform: translateY(0px)   translateZ(10px) rotateZ(0deg); }
          100% { transform: translateY(-6px)  translateZ(10px) rotateZ(2deg); }
        }

        /* ── SVG responsive sizing ── */
        .cb-kulhad-svg {
          width: 100%;
          height: 100%;
          display: block;
          filter: drop-shadow(0 6px 16px rgba(120,60,10,0.55))
                  drop-shadow(0 0 10px rgba(212,175,55,0.20));
        }

        /* ── Lassi cream top — gentle horizontal slosh ── */
        .cb-lassi-top {
          transform-origin: 50% 50%;
          animation: cbLassiWobble 2.2s ease-in-out infinite;
        }
        /* opacity stays 1 throughout — only scaleX transform */
        @keyframes cbLassiWobble {
          0%   { transform: scaleX(1);    }
          50%  { transform: scaleX(1.04); }
          100% { transform: scaleX(1);    }
        }

        /* ── Froth bubbles — alive, staggered scale + opacity pulse ── */
        .cb-froth-bubble {
          transform-origin: 50% 50%;
        }
        @keyframes cbFrothBubble {
          0%   { transform: scale(0.80); opacity: 0.70; }
          50%  { transform: scale(1.10); opacity: 1;    }
          100% { transform: scale(0.80); opacity: 0.70; }
        }
        .cb-froth-1 { animation: cbFrothBubble 1.8s ease-in-out infinite; animation-delay: 0s; }
        .cb-froth-2 { animation: cbFrothBubble 1.8s ease-in-out infinite; animation-delay: 0.4s; }
        .cb-froth-3 { animation: cbFrothBubble 1.8s ease-in-out infinite; animation-delay: 0.8s; }

        /* ═══════════════════════════════════════════════════════
           ACCESSIBILITY — prefers-reduced-motion kills all 3D
           ═══════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .cb-scene-3d {
            animation: none !important;
          }
          .cb-depth-bg,
          .cb-depth-naan,
          .cb-depth-mid,
          .cb-depth-dal,
          .cb-depth-chole {
            transform: none !important;
          }
          .cinematic-glow-anim,
          .cb-layer-naan,
          .cb-layer-dal,
          .cb-layer-chole,
          .cb-layer-tint,
          .cb-steam,
          .cb-spark { animation: none !important; }
          .cinematic-headline,
          .cinematic-memory-line { animation: none !important; opacity: 1 !important; transform: none !important; }
          /* Kulhad: disable animations, keep visible as static */
          .cb-kulhad-float,
          .cb-kulhad-glow,
          .cb-kulhad-steam,
          .cb-lassi-top,
          .cb-froth-bubble { animation: none !important; }
          .cb-kulhad-float { transform: translateZ(10px); }
          .cb-kulhad-glow  { transform: translateX(-50%) translateZ(10px) scale(0.95); }
        }
      `}</style>
    </section>
  );
}
