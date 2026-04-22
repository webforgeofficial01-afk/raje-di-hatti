import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Day-of-week deterministic specials (0=Sun … 6=Sat)
const DAILY_SPECIALS = [
  {
    day: "Sunday",
    emoji: "🥛",
    name: "Special Lassi",
    desc: "Chilled, thick kulhad lassi — perfectly creamy and refreshing",
    price: "₹60",
    tag: "Sunday Favourite",
  },
  {
    day: "Monday",
    emoji: "🥘",
    name: "Chole Bhature (2 Pc)",
    desc: "Crispy bhature with spicy chole — Burari's most loved combo",
    price: "₹95",
    tag: "Bestseller",
  },
  {
    day: "Tuesday",
    emoji: "🍛",
    name: "Dal Makhani Thali",
    desc: "Slow-cooked overnight dal makhani served with roti & rice",
    price: "₹150",
    tag: "Most Ordered",
  },
  {
    day: "Wednesday",
    emoji: "🫔",
    name: "Amritsari Kulcha",
    desc: "Crisp stuffed kulcha from the tandoor with chutney & pickle",
    price: "₹100",
    tag: "Chef's Pick",
  },
  {
    day: "Thursday",
    emoji: "🍲",
    name: "Paneer Tikka Masala",
    desc: "Smoky paneer in rich masala gravy — restaurant-style at home prices",
    price: "₹130",
    tag: "Premium Pick",
  },
  {
    day: "Friday",
    emoji: "🍚",
    name: "Rajma Chawal",
    desc: "Hearty rajma in thick tomato-onion gravy with basmati rice",
    price: "₹120",
    tag: "Friday Comfort",
  },
  {
    day: "Saturday",
    emoji: "🍽️",
    name: "Full Punjabi Thali",
    desc: "Dal, sabzi, roti, rice, salad, pickle — the complete Punjabi spread",
    price: "₹180",
    tag: "Weekend Special",
  },
];

function getDailySpecial() {
  const dayOfWeek = new Date().getDay(); // 0 (Sun) – 6 (Sat)
  return DAILY_SPECIALS[dayOfWeek];
}

export default function TodaysSpecial() {
  useScrollAnimation();
  const special = getDailySpecial();

  return (
    <section
      id="todays-special"
      className="section-premium"
      style={{ background: "#050505", padding: "80px 0", position: "relative" }}
      data-ocid="todays-special.section"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(245,197,66,.06) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Heading */}
        <div
          className="section-heading-block animate-section mb-10"
          style={{ textAlign: "center" }}
        >
          <span className="section-kicker">✨ Daily Spotlight</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem,4.5vw,2.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            Today's Special ✨
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
            {special.day}'s highlight — a different dish every day
          </p>
          <div className="section-divider" style={{ margin: "1rem auto 0" }} />
        </div>

        {/* Special card */}
        <div
          className="animate-section"
          style={{
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(245,197,66,.24)",
            borderRadius: "20px",
            padding: "clamp(28px,5vw,40px)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,.45), 0 0 28px rgba(245,197,66,.08), inset 0 1px 0 rgba(255,255,255,.06)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
          data-ocid="todays-special.card"
        >
          {/* Inner shimmer */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(180deg, rgba(245,197,66,.05) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Bestseller tag */}
          <div style={{ position: "absolute", top: "16px", right: "16px" }}>
            <span
              style={{
                background:
                  "linear-gradient(135deg,rgba(245,197,66,.18),rgba(255,122,24,.12))",
                border: "1px solid rgba(245,197,66,.45)",
                borderRadius: "999px",
                padding: "4px 12px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                color: "#f5c542",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                whiteSpace: "nowrap" as const,
              }}
            >
              Bestseller Today
            </span>
          </div>

          {/* Day badge top-left */}
          <div style={{ position: "absolute", top: "16px", left: "16px" }}>
            <span
              style={{
                background: "rgba(255,122,24,.1)",
                border: "1px solid rgba(255,122,24,.3)",
                borderRadius: "999px",
                padding: "4px 10px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                color: "#ff7a18",
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
                whiteSpace: "nowrap" as const,
              }}
            >
              {special.tag}
            </span>
          </div>

          {/* Emoji */}
          <div
            style={{
              fontSize: "80px",
              lineHeight: 1,
              marginBottom: "20px",
              marginTop: "8px",
              fontFamily:
                "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif",
            }}
          >
            {special.emoji}
          </div>

          {/* Dish name */}
          <h3
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem,4vw,2rem)",
              letterSpacing: "-0.02em",
              color: "#fff",
              marginBottom: "10px",
              lineHeight: 1.2,
            }}
          >
            {special.name}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,.55)",
              lineHeight: 1.7,
              maxWidth: "360px",
              margin: "0 auto 20px",
              letterSpacing: "0.01em",
            }}
          >
            {special.desc}
          </p>

          {/* Price */}
          <div
            style={{
              fontSize: "2.2rem",
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              background: "linear-gradient(135deg,#f5c542 0%,#ff7a18 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "24px",
              lineHeight: 1,
            }}
          >
            {special.price}
          </div>

          {/* CTA */}
          <a
            href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: "100%", maxWidth: "320px", fontSize: "0.875rem" }}
            data-ocid="todays-special.order-cta"
          >
            🍽️ Order on Zomato
          </a>

          <p
            style={{
              marginTop: "10px",
              fontFamily: "Poppins, sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,.35)",
              letterSpacing: "0.02em",
            }}
          >
            Tap to order — takes 10 seconds
          </p>

          {/* Refreshes hint */}
          <p
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(245,197,66,.1)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "10px",
              color: "rgba(245,197,66,.38)",
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
            }}
          >
            🔄 Spotlight refreshes daily at midnight
          </p>
        </div>
      </div>
    </section>
  );
}
