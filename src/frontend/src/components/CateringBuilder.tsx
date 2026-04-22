// CateringBuilder.tsx — Premium catering section with WhatsApp order builder

const EVENT_TYPES = [
  { emoji: "💒", title: "Weddings", desc: "Grand feasts for your special day" },
  { emoji: "🎂", title: "Birthdays", desc: "Make celebrations unforgettable" },
  {
    emoji: "🏢",
    title: "Corporate",
    desc: "Professional catering for office events",
  },
  {
    emoji: "🏠",
    title: "Housewarming",
    desc: "Welcome your new home with great food",
  },
  {
    emoji: "🪔",
    title: "Pooja",
    desc: "Traditional food for auspicious occasions",
  },
  {
    emoji: "🎉",
    title: "Kitty Parties",
    desc: "Delight your guests with authentic flavors",
  },
];

const CATERING_ITEMS = [
  { id: "cb_aloo", name: "Aloo Chole Bhature (1 Pc)", price: 70 },
  { id: "cb_paneer", name: "Paneer Chole Bhature", price: 150 },
  { id: "kulcha_aloo", name: "Aloo Onion Kulcha", price: 90 },
  { id: "kulcha_paneer", name: "Paneer Kulcha", price: 120 },
  { id: "kulcha_mix", name: "Mix Kulcha", price: 110 },
  { id: "dal_makhni", name: "Dal Makhni (per portion)", price: 120 },
  { id: "rajma_rice", name: "Rajma Rice", price: 100 },
  { id: "lassi_sweet", name: "Sweet Lassi", price: 60 },
  { id: "lassi_namkeen", name: "Namkeen Lassi", price: 60 },
  { id: "naan_butter", name: "Butter Naan", price: 40 },
  { id: "thali", name: "Full Thali", price: 150 },
];

import { useState } from "react";

export default function CateringBuilder() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: next };
    });
  };

  const selectedItems = CATERING_ITEMS.filter(
    (item) => (quantities[item.id] ?? 0) > 0,
  );
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0,
  );
  const hasItems = selectedItems.length > 0;

  const handlePlanEvent = () => {
    window.open(
      "https://wa.me/919599233307?text=Hi%2C%20I%20want%20to%20enquire%20about%20catering%20for%20my%20event",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const buildWhatsAppMessage = () => {
    const lines = selectedItems
      .map(
        (item) =>
          `• ${item.name} × ${quantities[item.id]} = ₹${item.price * (quantities[item.id] ?? 0)}`,
      )
      .join("\n");
    return encodeURIComponent(
      `Hi! I'd like to place a catering order with Raje Di Hatti 🙏\n\n*Name:* ${name || "Not provided"}\n*Occasion:* ${occasion || "Not specified"}\n\n*My Order:*\n${lines}\n\n*Total: ₹${total}*\n\nPlease confirm availability and details. Thank you! 🙏`,
    );
  };

  const handleSendOrder = () => {
    if (!hasItems) return;
    window.open(
      `https://wa.me/919599233307?text=${buildWhatsAppMessage()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      id="catering"
      style={{
        padding: "100px 0",
        backgroundColor: "#060401",
        position: "relative",
        overflow: "hidden",
      }}
      data-ocid="catering.section"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(255,122,24,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* ── HEADER ── */}
        <div className="animate-section text-center mb-14">
          <span className="section-kicker">🎊 Catering Services</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "0.85rem",
            }}
            className="title-gold-shimmer"
          >
            Big Events? We've Got You
          </h2>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.52)",
              maxWidth: "560px",
              margin: "0 auto 2rem",
              lineHeight: 1.75,
            }}
          >
            From intimate family gatherings to grand celebrations — we cater for
            all occasions
          </p>

          {/* Event type grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(158px, 1fr))",
              gap: "12px",
              maxWidth: "740px",
              margin: "0 auto 2rem",
            }}
          >
            {EVENT_TYPES.map((ev, i) => (
              <div
                key={ev.title}
                className="animate-section dark-glass-card"
                style={{
                  padding: "18px 16px",
                  transitionDelay: `${i * 60}ms`,
                  cursor: "default",
                  textAlign: "left",
                }}
                data-ocid={`catering.event.${i + 1}`}
              >
                <div
                  style={{
                    fontSize: "1.6rem",
                    marginBottom: "10px",
                    lineHeight: 1,
                  }}
                >
                  {ev.emoji}
                </div>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#f5f0e8",
                    marginBottom: "4px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {ev.title}
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.5,
                  }}
                >
                  {ev.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Minimum order info */}
          <div
            style={{
              background: "rgba(245,197,66,0.06)",
              border: "1px solid rgba(245,197,66,0.22)",
              borderRadius: "12px",
              padding: "12px 20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1.5rem",
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(245,197,66,0.8)",
              letterSpacing: "0.02em",
            }}
          >
            📋 Minimum order: ₹2,000 for catering&nbsp;·&nbsp;Advance booking
            required
          </div>

          {/* Big gold WhatsApp CTA */}
          <div style={{ marginBottom: "0.75rem" }}>
            <button
              type="button"
              onClick={handlePlanEvent}
              data-ocid="catering.plan-event.button"
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
                padding: "14px 36px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 0 32px rgba(245,197,66,0.3), 0 4px 20px rgba(0,0,0,0.4)",
                transition:
                  "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "52px",
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
              💬 Plan Your Event on WhatsApp
            </button>
          </div>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.02em",
            }}
          >
            WhatsApp us and we'll plan the perfect menu for your event
          </p>
          <div
            className="section-divider"
            style={{ margin: "1.75rem auto 0" }}
          />
        </div>

        {/* ── ORDER BUILDER HEADING ── */}
        <div className="animate-section text-center mb-8">
          <span className="section-kicker">📦 Build Your Order</span>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "480px",
              margin: "0.5rem auto 0",
              lineHeight: 1.7,
            }}
          >
            Build your order and send it directly to our catering team via
            WhatsApp
          </p>
        </div>

        {/* Name + Occasion */}
        <div
          className="animate-section"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {[
            {
              val: name,
              setter: setName,
              label: "Your Name (optional)",
              id: "cater-name",
              ocid: "catering.name-input",
            },
            {
              val: occasion,
              setter: setOccasion,
              label: "Occasion (e.g. Wedding, Birthday)",
              id: "cater-occasion",
              ocid: "catering.occasion-input",
            },
          ].map(({ val, setter, label, id, ocid }) => (
            <div key={id} style={{ position: "relative" }}>
              <label
                htmlFor={id}
                style={{
                  position: "absolute",
                  top: val ? "6px" : "50%",
                  transform: val ? "none" : "translateY(-50%)",
                  left: "16px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: val ? "10px" : "13px",
                  fontWeight: 600,
                  color: val
                    ? "rgba(245,197,66,0.7)"
                    : "rgba(255,255,255,0.32)",
                  pointerEvents: "none",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.02em",
                  zIndex: 1,
                }}
              >
                {label}
              </label>
              <input
                id={id}
                type="text"
                value={val}
                onChange={(e) => setter(e.target.value)}
                data-ocid={ocid}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: val ? "20px 16px 8px" : "14px 16px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#fff",
                  outline: "none",
                  transition: "border-color 0.25s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245,197,66,0.5)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </div>
          ))}
        </div>

        {/* Items grid */}
        <div
          className="animate-section"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          {CATERING_ITEMS.map((item) => {
            const qty = quantities[item.id] ?? 0;
            const selected = qty > 0;
            return (
              <div
                key={item.id}
                style={{
                  background: selected
                    ? "rgba(245,197,66,0.07)"
                    : "rgba(255,255,255,0.025)",
                  border: selected
                    ? "1px solid rgba(245,197,66,0.45)"
                    : "1px dashed rgba(255,255,255,0.09)",
                  borderRadius: "14px",
                  padding: "16px",
                  transition:
                    "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selected
                    ? "0 0 18px rgba(245,197,66,0.12)"
                    : "none",
                }}
                data-ocid={`catering.item.${item.id}`}
              >
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#fff",
                    marginBottom: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#f5c542",
                    marginBottom: "12px",
                  }}
                >
                  ₹{item.price} / portion
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name}`}
                    disabled={qty === 0}
                    onClick={() => updateQty(item.id, -1)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1px solid rgba(245,197,66,0.3)",
                      background:
                        qty > 0
                          ? "rgba(245,197,66,0.12)"
                          : "rgba(255,255,255,0.03)",
                      color: qty > 0 ? "#f5c542" : "rgba(255,255,255,0.2)",
                      fontSize: "18px",
                      fontWeight: 700,
                      cursor: qty > 0 ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                    data-ocid={`catering.qty-minus.${item.id}`}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: qty > 0 ? "#f5c542" : "rgba(255,255,255,0.35)",
                      minWidth: "24px",
                      textAlign: "center",
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.name}`}
                    onClick={() => updateQty(item.id, 1)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1px solid rgba(245,197,66,0.4)",
                      background: "rgba(245,197,66,0.12)",
                      color: "#f5c542",
                      fontSize: "18px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                    data-ocid={`catering.qty-plus.${item.id}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        {hasItems && (
          <div
            className="animate-section"
            style={{
              background: "rgba(245,197,66,0.05)",
              border: "1px solid rgba(245,197,66,0.28)",
              borderRadius: "16px",
              padding: "20px 24px",
              marginBottom: "20px",
            }}
            data-ocid="catering.order-summary"
          >
            <h4
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(245,197,66,0.65)",
                marginBottom: "12px",
              }}
            >
              📋 Order Summary
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.name} × {quantities[item.id]}
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#f5c542",
                    }}
                  >
                    ₹{item.price * (quantities[item.id] ?? 0)}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                paddingTop: "12px",
                borderTop: "1px solid rgba(245,197,66,0.15)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#fff",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontWeight: 900,
                  fontSize: "1.4rem",
                  background: "linear-gradient(135deg, #f5c542, #ff7a18)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ₹{total}
              </span>
            </div>
          </div>
        )}

        {/* Send Order CTA */}
        <div className="animate-section" style={{ textAlign: "center" }}>
          <button
            type="button"
            disabled={!hasItems}
            onClick={handleSendOrder}
            aria-label="Send catering order on WhatsApp"
            data-ocid="catering.send-whatsapp"
            className="btn-press"
            style={{
              width: "100%",
              maxWidth: "440px",
              padding: "16px 28px",
              borderRadius: "14px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "15px",
              letterSpacing: "0.04em",
              cursor: hasItems ? "pointer" : "not-allowed",
              border: "none",
              background: hasItems
                ? "linear-gradient(135deg, #ff7a18 0%, #f5c542 100%)"
                : "rgba(255,255,255,0.06)",
              color: hasItems ? "#050505" : "rgba(255,255,255,0.22)",
              boxShadow: hasItems
                ? "0 0 30px rgba(255,122,24,0.32), 0 4px 20px rgba(0,0,0,0.4)"
                : "none",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              margin: "0 auto",
              minHeight: "54px",
            }}
            onMouseEnter={(e) => {
              if (!hasItems) return;
              e.currentTarget.style.transform = "scale(1.02) translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 44px rgba(255,122,24,0.5), 0 8px 28px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = hasItems
                ? "0 0 30px rgba(255,122,24,0.32), 0 4px 20px rgba(0,0,0,0.4)"
                : "none";
            }}
          >
            📲 Send Catering Order on WhatsApp
          </button>
          {!hasItems && (
            <p
              style={{
                marginTop: "10px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.28)",
                letterSpacing: "0.02em",
              }}
            >
              Add items above to enable ordering
            </p>
          )}
          <p
            style={{
              marginTop: "14px",
              fontFamily: "Poppins, sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.02em",
            }}
          >
            📞 +91 95992 33307 · Catering enquiries only
          </p>
        </div>
      </div>
    </section>
  );
}
