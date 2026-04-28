import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const POPULAR_ITEMS = [
  {
    name: "Aloo Chole Bhature",
    price: "₹70",
    badge: "🔥 Most Ordered",
    chef: true,
  },
  {
    name: "Amritsari Paneer Kulcha",
    price: "₹120",
    badge: "⭐ Recommended",
    chef: false,
  },
  { name: "Dal Makhani", price: "₹180", badge: "🔥 Most Ordered", chef: false },
  {
    name: "Paneer Butter Masala",
    price: "₹190",
    badge: "⭐ Recommended",
    chef: false,
  },
  {
    name: "Aloo Pyaz Parantha",
    price: "₹90",
    badge: "🔥 Most Ordered",
    chef: false,
  },
  { name: "Veg Biryani", price: "₹150", badge: "⭐ Recommended", chef: false },
] as const;

const FEATURES = [
  {
    icon: "⚡",
    title: "Fast Service",
    desc: "Hot food served fresh — dine in or order via Zomato, Swiggy & Porter.",
  },
  {
    icon: "🥗",
    title: "Fresh Ingredients",
    desc: "Farm-fresh, 100% pure veg — no shortcuts, ever.",
  },
  {
    icon: "⭐",
    title: "Top Rated",
    desc: "Rated 4.8 consistently by thousands of happy customers.",
  },
  {
    icon: "🛵",
    title: "Quick Delivery",
    desc: "Order online via Zomato or Swiggy for fast delivery.",
  },
] as const;

const STATS = [
  { value: "50K+", label: "Happy Customers", emoji: "😊" },
  { value: "100K+", label: "Orders Delivered", emoji: "📦" },
  { value: "4.8 ⭐", label: "Rating Always", emoji: "" },
] as const;

const TRUST = [
  { icon: "✅", text: "Hygienic Kitchen", accent: "gold" },
  { icon: "🌿", text: "Fresh Ingredients", accent: "orange" },
  { icon: "⚡", text: "Fast Delivery", accent: "gold" },
  { icon: "🏆", text: "Best in Burari", accent: "gold" },
  { icon: "📍", text: "Family Business Since 1990", accent: "orange" },
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollToMenu() {
  const el = document.getElementById("menu");
  if (!el) return;
  // Use offsetTop traversal (not scrollIntoView / getBoundingClientRect) so the
  // navbar offset is respected and layout reads don't race with CSS transitions.
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  window.scrollTo({ top: top - 72, behavior: "smooth" });
}

function useIntersection(
  ref: React.RefObject<Element | null>,
  className = "visible",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className);
          obs.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, className]);
}

// ─── Urgency Banner removed — no personal delivery ────────────────────────────

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);

  return (
    <section
      className="relative min-h-screen flex items-center px-4 pt-24 pb-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Static ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 15% 50%, rgba(245,197,66,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 55% 40% at 85% 70%, rgba(255,122,24,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 45% 45% at 50% 100%, rgba(245,197,66,0.06) 0%, transparent 55%)
          `,
        }}
      />
      <div aria-hidden className="grain-overlay" />

      <div
        ref={ref}
        className="animate-section relative z-10 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Text content */}
          <div className="flex flex-col items-start gap-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: "rgba(245,197,66,0.08)",
                border: "1px solid rgba(245,197,66,0.32)",
                color: "#f5c542",
                letterSpacing: "0.2em",
                boxShadow: "0 0 16px rgba(245,197,66,0.1)",
              }}
            >
              🏠 Family Business Since 1990
            </span>

            <h1
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
                lineHeight: 1.0,
                letterSpacing: "0.04em",
                filter:
                  "drop-shadow(0 0 40px rgba(245,197,66,0.55)) drop-shadow(0 0 80px rgba(245,197,66,0.25))",
              }}
              className="title-gold-shimmer"
            >
              Raje Di Hatti
            </h1>

            {/* Tagline */}
            <p
              className="text-xl md:text-2xl font-bold"
              style={{
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.01em",
                lineHeight: 1.5,
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Authentic Taste of Delhi at Your Doorstep
            </p>

            {/* Trust badges row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="flex items-center gap-1 text-xl"
                style={{ color: "#f5c542" }}
              >
                ⭐⭐⭐⭐⭐
              </span>
              <span
                className="font-black text-base"
                style={{
                  color: "#f5c542",
                  filter: "drop-shadow(0 0 8px rgba(245,197,66,0.5))",
                }}
              >
                4.8
              </span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              <span
                className="text-sm font-semibold"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                50,000+ happy customers
              </span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              <span
                className="text-sm font-semibold"
                style={{ color: "rgba(245,197,66,0.75)" }}
              >
                Serving Since 1990
              </span>
            </div>

            {/* CTAs */}
            <div className="relative flex flex-wrap items-center gap-4 mt-1">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 40% 50%, rgba(245,197,66,0.18) 0%, rgba(255,122,24,0.12) 60%, transparent 80%)",
                  transform: "scale(1.5)",
                }}
              />
              <button
                type="button"
                className="btn-primary relative"
                onClick={scrollToMenu}
                data-ocid="hero-cta-menu"
                aria-label="View Menu"
              >
                📋 View Menu
              </button>
              <a
                href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold relative"
                data-ocid="hero-cta-zomato"
                aria-label="Order on Zomato"
              >
                🍽️ Order on Zomato
              </a>
              <a
                href="https://www.swiggy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold relative"
                data-ocid="hero-cta-swiggy"
                aria-label="Order on Swiggy"
              >
                🛵 Order on Swiggy
              </a>
              <a
                href="https://porter.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold relative"
                data-ocid="hero-cta-porter"
                aria-label="Order on Porter"
              >
                📦 Order on Porter
              </a>
            </div>

            <div className="flex items-center gap-5 mt-1 flex-wrap">
              {["🔒 Secure", "🥗 Pure Veg"].map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Hero photo */}
          <div className="relative flex justify-center lg:justify-end items-center">
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(245,197,66,0.22) 0%, rgba(255,122,24,0.12) 50%, transparent 80%)",
                transform: "scale(1.15)",
              }}
            />
            <div
              className="relative rounded-3xl p-[2px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,197,66,0.75) 0%, rgba(232,184,75,0.3) 30%, rgba(255,122,24,0.45) 60%, rgba(245,197,66,0.65) 100%)",
                boxShadow:
                  "0 0 60px rgba(245,197,66,0.35), 0 24px 64px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  width: "clamp(280px, 40vw, 520px)",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src="/assets/generated/hero-food-chole-bhature.dim_900x700.jpg"
                  alt="Signature Chole Bhature at Raje Di Hatti"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{
                    filter: "brightness(0.92) saturate(1.15) contrast(1.05)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.38) 100%)",
                  }}
                />
                <div
                  className="absolute top-4 left-4"
                  style={{
                    background: "rgba(0,0,0,0.75)",
                    border: "1px solid rgba(245,197,66,0.55)",
                    borderRadius: "12px",
                    padding: "6px 12px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    className="text-xs font-bold tracking-wide"
                    style={{ color: "#f5c542" }}
                  >
                    🏆 Chef's Signature
                  </span>
                </div>
              </div>
            </div>

            {/* Floating stat pill */}
            <div
              className="absolute -bottom-4 -left-4 lg:left-0 hidden sm:flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "rgba(10,8,4,0.95)",
                border: "1px solid rgba(245,197,66,0.35)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(245,197,66,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="font-black text-2xl"
                style={{
                  color: "#f5c542",
                  filter: "drop-shadow(0 0 10px rgba(245,197,66,0.6))",
                }}
              >
                4.8
              </span>
              <div className="flex flex-col">
                <span
                  className="text-xs font-bold"
                  style={{ color: "#ffffff" }}
                >
                  ⭐⭐⭐⭐⭐
                </span>
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  50K+ happy customers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-35"
      >
        <span
          className="text-xs tracking-widest uppercase font-bold"
          style={{ color: "#f5c542", fontSize: "0.6rem" }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 28,
            background: "linear-gradient(to bottom, #f5c542, transparent)",
          }}
        />
      </div>
    </section>
  );
}

function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);

  return (
    <section aria-label="Stats" className="px-4 pb-16">
      <div
        ref={ref}
        className="animate-section max-w-4xl mx-auto dark-glass-card p-8 md:p-10"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x"
          style={{ borderColor: "rgba(245,197,66,0.1)" } as React.CSSProperties}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-1.5 text-center ${i > 0 ? "pt-8 sm:pt-0 sm:pl-4" : ""}`}
            >
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3rem)",
                  color: "#f5c542",
                  filter: "drop-shadow(0 0 16px rgba(245,197,66,0.45))",
                  letterSpacing: "-0.02em",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {s.emoji && <span className="mr-1">{s.emoji}</span>}
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);

  return (
    <section
      aria-label="Features"
      className="px-4 py-20"
      style={{ background: "rgba(245,197,66,0.01)" }}
    >
      <div ref={ref} className="animate-section max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-kicker">Our Promise</span>
          <h2 className="section-title">Why We're Different ✨</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="warm-card p-7 flex flex-col items-center text-center gap-4 animate-section"
              style={{ transitionDelay: `${0.08 + i * 0.1}s` }}
              data-ocid={`feature-card-${f.title}`}
            >
              {/* Gold icon box */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "1rem",
                  background:
                    "linear-gradient(135deg, rgba(245,197,66,0.18) 0%, rgba(255,122,24,0.1) 100%)",
                  border: "1px solid rgba(245,197,66,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 14px rgba(245,197,66,0.1)",
                  transition: "box-shadow 0.25s ease",
                }}
              >
                <span
                  className="text-3xl"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(245,197,66,0.3))",
                  }}
                >
                  {f.icon}
                </span>
              </div>
              <div>
                <h3
                  className="font-bold text-base mb-1.5"
                  style={{
                    color: "#ffffff",
                    letterSpacing: "0.01em",
                    fontWeight: 800,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LIVE_ORDERS: number[] = [8, 11, 14, 9, 13, 12, 16, 10];

function PopularItemsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);
  const [orderCount, setOrderCount] = useState(LIVE_ORDERS[0]);
  const [orderFading, setOrderFading] = useState(false);
  const orderIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderFading(true);
      setTimeout(() => {
        orderIndexRef.current =
          (orderIndexRef.current + 1) % LIVE_ORDERS.length;
        setOrderCount(LIVE_ORDERS[orderIndexRef.current]);
        setOrderFading(false);
      }, 300);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-label="Popular Items" className="px-4 py-20">
      <div ref={ref} className="animate-section max-w-5xl mx-auto">
        {/* Signature Dishes spotlight */}
        <div className="text-center mb-12">
          <span className="section-kicker">Customer Favourites</span>
          <h2 className="section-title">
            <span
              style={{
                color: "#f5c542",
                filter: "drop-shadow(0 0 16px rgba(245,197,66,0.45))",
              }}
            >
              ✨ Signature Dishes
            </span>
          </h2>
          <div className="section-divider" />
          <p
            className="text-sm font-semibold mt-4"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            🔥 Popular Right Now — Loved by thousands
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_ITEMS.map((item, i) => (
            <div
              key={item.name}
              className={`menu-card-premium popular-item-card ${item.chef ? "menu-card-chef-pick" : ""} p-6 flex flex-col gap-3 animate-section`}
              style={{ transitionDelay: `${0.08 + i * 0.1}s` }}
              data-ocid={`popular-item-${i}`}
            >
              <div
                className="w-full h-28 rounded-2xl flex items-center justify-center"
                style={{
                  background: item.chef
                    ? "linear-gradient(135deg, rgba(245,197,66,0.14) 0%, rgba(255,122,24,0.1) 100%)"
                    : "linear-gradient(135deg, rgba(245,197,66,0.07) 0%, rgba(255,122,24,0.04) 100%)",
                  border: item.chef
                    ? "1px solid rgba(245,197,66,0.22)"
                    : "1px solid rgba(245,197,66,0.08)",
                }}
              >
                <span
                  className="text-5xl"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(245,197,66,0.3))",
                  }}
                >
                  {item.chef ? "🏆" : i % 2 === 0 ? "🍽️" : "✨"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <h3
                  className="font-bold text-sm leading-snug"
                  style={{ color: "#ffffff", fontWeight: 800 }}
                >
                  {item.name}
                </h3>
                <span
                  className="font-black text-sm shrink-0"
                  style={{
                    color: "#f5c542",
                    filter: "drop-shadow(0 0 6px rgba(245,197,66,0.4))",
                  }}
                >
                  {item.price}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={
                    item.badge.startsWith("🔥") ? "badge-fire" : "badge-chef"
                  }
                >
                  {item.badge}
                </span>
                <span
                  className="activity-text text-xs font-medium"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    transition: "opacity 0.3s ease",
                    opacity: orderFading ? 0 : 0.6,
                  }}
                >
                  {orderCount} ordered today
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={scrollToMenu}
            data-ocid="popular-view-menu"
            className="inline-flex items-center gap-2 font-bold text-sm transition-all duration-200 hover:gap-3"
            style={{
              color: "#f5c542",
              filter: "drop-shadow(0 0 8px rgba(245,197,66,0.4))",
            }}
          >
            View Full Menu →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Signature Dishes ─────────────────────────────────────────────────────────

const SIGNATURE_DISHES = [
  {
    name: "Chole Bhature",
    tagline: "Our most loved breakfast classic",
    price: "₹70",
    bestSeller: true,
    gradient:
      "linear-gradient(135deg, rgba(245,197,66,0.14) 0%, rgba(230,150,30,0.2) 100%)",
    glowColor: "rgba(245,197,66,0.22)",
    emoji: "🏆",
  },
  {
    name: "Amritsari Kulcha",
    tagline: "Golden, buttery, crisp",
    price: "₹95",
    bestSeller: true,
    gradient:
      "linear-gradient(135deg, rgba(255,122,24,0.14) 0%, rgba(220,90,20,0.2) 100%)",
    glowColor: "rgba(255,122,24,0.22)",
    emoji: "🍞",
  },
  {
    name: "Dal Makhani",
    tagline: "Slow cooked for 8 hours",
    price: "₹180",
    bestSeller: false,
    gradient:
      "linear-gradient(135deg, rgba(180,80,30,0.14) 0%, rgba(140,55,15,0.2) 100%)",
    glowColor: "rgba(180,80,30,0.2)",
    emoji: "🫕",
  },
  {
    name: "Paneer Tikka Masala",
    tagline: "Rich, creamy, aromatic",
    price: "₹190",
    bestSeller: false,
    gradient:
      "linear-gradient(135deg, rgba(245,197,66,0.1) 0%, rgba(255,122,24,0.14) 100%)",
    glowColor: "rgba(245,197,66,0.18)",
    emoji: "✨",
  },
] as const;

function SignatureDishesSection() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);

  return (
    <section
      aria-label="Signature Dishes"
      className="px-4 py-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,197,66,0.03) 0%, transparent 70%)",
      }}
    >
      <div ref={ref} className="animate-section max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-kicker">Chef Favourites</span>
          <h2
            className="section-title"
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              background: "linear-gradient(135deg, #f5c542 0%, #ff7a18 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 900,
            }}
          >
            Our Signature Dishes
          </h2>
          <div className="section-divider" />
          <p
            className="text-sm font-semibold mt-4"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Crafted from family recipes since 1990 — loved by generations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIGNATURE_DISHES.map((dish, i) => (
            <div
              key={dish.name}
              className="signature-dish-card animate-section"
              style={{
                background: dish.gradient,
                border: "1px solid rgba(245,197,66,0.14)",
                borderRadius: "20px",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transitionDelay: `${i * 80}ms`,
                transition:
                  "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1), border-color 0.35s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                willChange: "transform",
              }}
              data-ocid={`signature.item.${i + 1}`}
            >
              {/* Bestseller badge */}
              {dish.bestSeller && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background:
                      "linear-gradient(135deg, #f5c542 0%, #e8aa1b 100%)",
                    color: "#0a0602",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "9px",
                    fontWeight: 800,
                    padding: "3px 9px",
                    borderRadius: "9999px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Bestseller
                </div>
              )}

              {/* Food icon */}
              <div
                style={{
                  width: "100%",
                  height: "96px",
                  borderRadius: "14px",
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(245,197,66,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.8rem",
                  boxShadow: `0 0 20px ${dish.glowColor}`,
                }}
              >
                <span
                  style={{
                    filter: "drop-shadow(0 0 12px rgba(245,197,66,0.35))",
                  }}
                >
                  {dish.emoji}
                </span>
              </div>

              {/* Dish info */}
              <div>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#f5f0e8",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    marginBottom: "4px",
                    lineHeight: 1.3,
                  }}
                >
                  {dish.name}
                </h3>
                <p
                  style={{
                    color: "rgba(245,240,232,0.5)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    lineHeight: 1.4,
                  }}
                >
                  {dish.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    color: "#f5c542",
                    fontSize: "1.1rem",
                    fontWeight: 900,
                    filter: "drop-shadow(0 0 6px rgba(245,197,66,0.4))",
                  }}
                >
                  {dish.price}
                </span>
                <span
                  style={{
                    color: "rgba(245,197,66,0.45)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  onwards
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={scrollToMenu}
            data-ocid="signature-see-full-menu"
            className="inline-flex items-center gap-2 font-bold text-sm transition-all duration-200 hover:gap-3"
            style={{
              color: "#f5c542",
              filter: "drop-shadow(0 0 8px rgba(245,197,66,0.4))",
            }}
          >
            See Full Menu →
          </button>
        </div>
      </div>

      <style>{`
        .signature-dish-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 24px rgba(245,197,66,0.14);
          border-color: rgba(245,197,66,0.35) !important;
        }
        .signature-dish-card:active {
          transform: scale(0.98);
          transition-duration: 0.1s;
        }
      `}</style>
    </section>
  );
}

function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);

  return (
    <section
      aria-label="Trust Badges"
      className="px-4 py-14"
      style={{
        background: "rgba(255,122,24,0.012)",
        borderTop: "1px solid rgba(245,197,66,0.07)",
        borderBottom: "1px solid rgba(245,197,66,0.07)",
      }}
    >
      <div
        ref={ref}
        className="animate-section max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-4"
      >
        {TRUST.map((t, i) => (
          <div
            key={t.text}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background:
                t.accent === "gold"
                  ? "rgba(245,197,66,0.07)"
                  : "rgba(255,122,24,0.07)",
              border:
                t.accent === "gold"
                  ? "1px solid rgba(245,197,66,0.28)"
                  : "1px solid rgba(255,122,24,0.28)",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <span className="text-base">{t.icon}</span>
            <span
              className="text-xs font-semibold whitespace-nowrap"
              style={{
                color:
                  t.accent === "gold"
                    ? "rgba(245,197,66,0.9)"
                    : "rgba(255,122,24,0.9)",
              }}
            >
              {t.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);

  return (
    <section aria-label="Social Proof" className="px-4 py-20">
      <div ref={ref} className="animate-section max-w-4xl mx-auto">
        <div className="glass-panel p-10 md:p-14 text-center flex flex-col items-center gap-7">
          <span className="section-kicker">Trusted by Thousands</span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              fontWeight: 900,
            }}
          >
            Over{" "}
            <span
              style={{
                color: "#f5c542",
                filter: "drop-shadow(0 0 14px rgba(245,197,66,0.5))",
              }}
            >
              100,000+
            </span>{" "}
            orders served 🎉
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-2">
            {[
              { text: "Trusted by 50K+ customers", icon: "👥" },
              { text: "Over 100K+ orders delivered", icon: "📦" },
              { text: "Rated 4.8⭐ consistently", icon: "🏅" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-4 py-3.5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(245,197,66,0.12)",
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className="text-xs font-semibold leading-snug"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  useIntersection(ref);

  return (
    <section aria-label="Final CTA" className="px-4 py-24 text-center">
      <div
        ref={ref}
        className="animate-section max-w-2xl mx-auto flex flex-col items-center gap-6"
      >
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            color: "#ffffff",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            fontWeight: 900,
          }}
        >
          Ready to Order? 🚀
        </h2>
        <p
          className="text-base font-semibold"
          style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}
        >
          Join{" "}
          <span
            style={{
              color: "#f5c542",
              filter: "drop-shadow(0 0 8px rgba(245,197,66,0.4))",
            }}
          >
            50,000+
          </span>{" "}
          happy customers who love our food
        </p>

        {/* Glowing order button */}
        <div className="relative mt-2 flex flex-col items-center gap-2">
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "rgba(255,122,24,0.35)",
              transform: "scale(1.2)",
            }}
          />
          <button
            type="button"
            onClick={scrollToMenu}
            data-ocid="final-cta-order"
            className="final-cta-btn relative font-display text-white uppercase tracking-widest"
            style={{
              background: "linear-gradient(135deg, #ff7a18 0%, #ff9a18 100%)",
              padding: "1.1rem 3.5rem",
              borderRadius: "1rem",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              boxShadow:
                "0 0 32px rgba(255,122,24,0.55), 0 4px 20px rgba(0,0,0,0.4)",
              maxWidth: 380,
              width: "100%",
              minHeight: "44px",
            }}
          >
            Order Now on Zomato, Swiggy & Porter 🍽️
          </button>
          <p
            className="text-xs font-medium relative z-10"
            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em" }}
          >
            Takes 30 seconds · No app required
          </p>
        </div>

        <p
          className="text-xs font-semibold"
          style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}
        >
          Zomato · Swiggy · Porter · Pure Veg always
        </p>
      </div>
      <style>{`
        .final-cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .final-cta-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 0 52px rgba(255,122,24,0.75), 0 8px 28px rgba(0,0,0,0.4) !important; }
        .final-cta-btn:active { transform: scale(0.97); transition-duration: 0.08s; }
      `}</style>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function LandingPage() {
  // NOTE: Global scroll animations are handled by useScrollAnimation() in App.tsx.
  // Do NOT add a second IntersectionObserver here — it creates a race condition
  // where two observers fire on the same elements, causing layout recalculations
  // near the bottom of the page that snap the scroll position unexpectedly.

  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <StatsRow />
      <FeaturesSection />
      <SignatureDishesSection />
      <PopularItemsSection />
      <TrustSection />
      <SocialProofSection />
      <FinalCTASection />
    </div>
  );
}
