import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCartStore } from "../store/cartStore";

const WA_CATERING =
  "https://wa.me/919599233307?text=Hi%20I%20want%20to%20place%20a%20big%20catering%20order%20for%20Raje%20Di%20Hatti";

// ── Sticky bottom bar (shows when cart has items) ──────────────────────────────
function StickyBottomBar() {
  const { totalItems, totalPrice, setOpen } = useCartStore();
  const count = totalItems();
  const total = totalPrice();

  return (
    <div
      data-ocid="cart.sticky_bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "rgba(8,5,2,.98)",
        borderTop: "1px solid rgba(245,197,66,.16)",
        boxShadow: "0 -4px 24px rgba(0,0,0,.5)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        transform: count > 0 ? "translateY(0)" : "translateY(100%)",
        transition: "transform .35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "rgba(245,240,232,.85)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "clamp(12px,3.5vw,14px)",
          fontWeight: 500,
        }}
      >
        <ShoppingBag size={15} color="#f5c542" />
        <span>
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        data-ocid="cart.sticky_bar.view_order"
        className="sticky-bar-btn"
        style={{
          background: "linear-gradient(135deg,#f5c542 0%,#e8a020 100%)",
          color: "#0a0602",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(11px,3vw,13px)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          padding: "8px 18px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 14px rgba(245,197,66,.4)",
          whiteSpace: "nowrap",
          transition: "transform .2s ease, box-shadow .2s ease",
        }}
      >
        View Order
      </button>

      <span
        style={{
          color: "#f5c542",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(13px,4vw,16px)",
          whiteSpace: "nowrap",
        }}
      >
        ₹{total}
      </span>

      <style>{`
        .sticky-bar-btn:hover { transform: translateY(-1px); box-shadow: 0 0 24px rgba(245,197,66,.6) !important; }
        .sticky-bar-btn:active { transform: scale(.96); transition-duration: .08s; }
      `}</style>
    </div>
  );
}

// ── Platform order card ────────────────────────────────────────────────────────
function PlatformCard({
  href,
  logo,
  label,
  color,
  ocid,
  gradientFrom,
  gradientTo,
  glowColor,
}: {
  href: string;
  logo: string;
  label: string;
  color: string;
  ocid: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid={ocid}
      onClick={() => {
        ref.current?.classList.add("pc-click");
        setTimeout(() => ref.current?.classList.remove("pc-click"), 280);
      }}
      className="platform-card-link"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: `linear-gradient(135deg,${gradientFrom},${gradientTo})`,
        color,
        fontFamily: "Poppins, sans-serif",
        fontWeight: 700,
        fontSize: "clamp(11px,3vw,13px)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        padding: "clamp(10px,2.5vw,13px) clamp(12px,3vw,16px)",
        borderRadius: "14px",
        textDecoration: "none",
        border: `1px solid ${color}30`,
        transition:
          "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s cubic-bezier(.16,1,.3,1), border-color .3s cubic-bezier(.16,1,.3,1)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,.06), 0 2px 8px rgba(0,0,0,.25)",
      }}
    >
      <span
        style={{
          fontSize: "22px",
          lineHeight: 1,
          fontFamily:
            "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif",
        }}
      >
        {logo}
      </span>
      <span style={{ flex: 1 }}>{label}</span>

      <style>{`
        .platform-card-link:hover {
          transform: translateY(-2px) scale(1.015);
          border-color: ${color}55 !important;
          box-shadow: 0 0 20px ${glowColor}28, 0 6px 22px rgba(0,0,0,.35),
                      inset 0 1px 0 rgba(255,255,255,.06) !important;
        }
        .platform-card-link:active, .pc-click {
          transform: scale(.96);
          transition-duration: .07s;
        }
      `}</style>
    </a>
  );
}

// ── Cart drawer ────────────────────────────────────────────────────────────────
export default function CartDrawer() {
  const { isOpen, items, setOpen, updateQuantity, clearCart, totalPrice } =
    useCartStore();
  const total = totalPrice();

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        data-ocid="cart.drawer_overlay"
        onClick={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(false)}
        role="button"
        tabIndex={-1}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 59,
          background: "rgba(0,0,0,.78)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity .25s ease",
          cursor: "default",
        }}
        aria-label="Close cart"
      />

      {/* Slide-up drawer */}
      <dialog
        aria-label="Your Order"
        data-ocid="cart.drawer"
        open={isOpen}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          maxHeight: "82dvh",
          borderRadius: "22px 22px 0 0",
          background: "rgba(8,5,2,.98)",
          border: "1px solid rgba(245,197,66,.13)",
          borderBottom: "none",
          boxShadow:
            "0 -8px 52px rgba(0,0,0,.8), 0 0 0 1px rgba(245,197,66,.06)",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform .35s cubic-bezier(.22,1,.36,1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0 4px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(245,197,66,.2)",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px clamp(12px, 4vw, 20px) 12px",
            borderBottom: "1px solid rgba(245,197,66,.08)",
          }}
        >
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(17px,4.5vw,22px)",
              fontWeight: 700,
              color: "#f5c542",
            }}
          >
            Order Now
          </h2>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                data-ocid="cart.clear_btn"
                aria-label="Clear cart"
                style={{
                  background: "rgba(255,122,24,.07)",
                  border: "1px solid rgba(255,122,24,.2)",
                  color: "rgba(255,122,24,.7)",
                  borderRadius: "8px",
                  padding: "5px 9px",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(10px,2.8vw,12px)",
                  transition: "all .18s ease",
                }}
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              data-ocid="cart.close_btn"
              aria-label="Close cart"
              style={{
                background: "rgba(245,197,66,.06)",
                border: "1px solid rgba(245,197,66,.14)",
                color: "#f5f0e8",
                borderRadius: "10px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all .18s ease",
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "36px 20px",
                gap: "14px",
                textAlign: "center",
              }}
              data-ocid="cart.empty_state"
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(245,197,66,.06)",
                  border: "1px solid rgba(245,197,66,.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingBag size={26} color="rgba(245,197,66,.45)" />
              </div>
              <p
                style={{
                  color: "rgba(245,240,232,.5)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(12px,3.5vw,15px)",
                }}
              >
                Add items to start your order
              </p>

              {/* Platform buttons even when empty */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                <PlatformCard
                  href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
                  logo="🍽️"
                  label="Order on Zomato"
                  color="#ff7a18"
                  ocid="cart.order_zomato.btn"
                  gradientFrom="rgba(255,122,24,.1)"
                  gradientTo="#0f0f0f"
                  glowColor="rgba(255,122,24,.7)"
                />
                <PlatformCard
                  href="https://www.swiggy.com/search?query=raje+di+hatti+burari"
                  logo="🛵"
                  label="Order on Swiggy"
                  color="#fc8019"
                  ocid="cart.order_swiggy.btn"
                  gradientFrom="rgba(252,128,25,.1)"
                  gradientTo="#0f0f0f"
                  glowColor="rgba(252,128,25,.7)"
                />
                <PlatformCard
                  href="https://porter.in/"
                  logo="📦"
                  label="Order on Porter"
                  color="#d4a843"
                  ocid="cart.order_porter.btn"
                  gradientFrom="rgba(212,168,67,.1)"
                  gradientTo="#0f0f0f"
                  glowColor="rgba(212,168,67,.7)"
                />
              </div>
            </div>
          ) : (
            <ul style={{ margin: 0, padding: "0 4px", listStyle: "none" }}>
              {items.map((item, idx) => (
                <li
                  key={item.id}
                  data-ocid={`cart.item.${idx + 1}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "11px clamp(12px, 3vw, 16px)",
                    borderBottom: "1px solid rgba(255,255,255,.05)",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg,rgba(245,197,66,.1),rgba(232,160,32,.05))",
                      border: "1px solid rgba(245,197,66,.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "17px",
                      flexShrink: 0,
                    }}
                  >
                    🍽️
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(12px,3.2vw,14px)",
                        color: "#f5f0e8",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "clamp(9px,2.5vw,11px)",
                        color: "rgba(245,240,232,.45)",
                        marginTop: "2px",
                      }}
                    >
                      {item.category} · ₹{item.price} each
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexShrink: 0,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Remove one ${item.name}`}
                      data-ocid={`cart.item.${idx + 1}.decrement`}
                      className="qty-btn"
                    >
                      {item.quantity === 1 ? (
                        <Trash2 size={13} />
                      ) : (
                        <Minus size={13} />
                      )}
                    </button>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(13px,3.5vw,15px)",
                        color: "#f5c542",
                        minWidth: "18px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Add one ${item.name}`}
                      data-ocid={`cart.item.${idx + 1}.increment`}
                      className="qty-btn"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(12px,3.2vw,14px)",
                      color: "#f5c542",
                      minWidth: "46px",
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — platform + catering (always when items present) */}
        {items.length > 0 && (
          <div
            style={{
              padding:
                "clamp(12px, 3vw, 16px) clamp(12px, 4vw, 16px) max(28px, env(safe-area-inset-bottom, 28px))",
              borderTop: "1px solid rgba(245,197,66,.08)",
              background: "rgba(5,3,1,.6)",
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(12px,3.5vw,14px)",
                  color: "rgba(245,240,232,.6)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(16px,4.5vw,20px)",
                  color: "#f5c542",
                  textShadow: "0 0 10px rgba(245,197,66,.3)",
                }}
              >
                ₹{total}
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <PlatformCard
                href="https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"
                logo="🍽️"
                label="Order on Zomato"
                color="#ff7a18"
                ocid="cart.order_zomato.btn"
                gradientFrom="rgba(255,122,24,.1)"
                gradientTo="#0f0f0f"
                glowColor="rgba(255,122,24,.7)"
              />
              <PlatformCard
                href="https://www.swiggy.com/search?query=raje+di+hatti+burari"
                logo="🛵"
                label="Order on Swiggy"
                color="#fc8019"
                ocid="cart.order_swiggy.btn"
                gradientFrom="rgba(252,128,25,.1)"
                gradientTo="#0f0f0f"
                glowColor="rgba(252,128,25,.7)"
              />
              <PlatformCard
                href="https://porter.in/"
                logo="📦"
                label="Order on Porter"
                color="#d4a843"
                ocid="cart.order_porter.btn"
                gradientFrom="rgba(212,168,67,.1)"
                gradientTo="#0f0f0f"
                glowColor="rgba(212,168,67,.7)"
              />

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "11px",
                  color: "rgba(245,240,232,.4)",
                  textAlign: "center",
                  margin: "2px 0 4px",
                  letterSpacing: "0.02em",
                }}
              >
                Delivered fast across Burari & nearby areas 🚀
              </p>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "4px 0",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(245,197,66,.12)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(245,197,66,.4)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  OR FOR BIG EVENTS
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(245,197,66,.12)",
                  }}
                />
              </div>

              {/* WhatsApp catering */}
              <a
                href={WA_CATERING}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="cart.catering_whatsapp.btn"
                className="wa-catering-cta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "rgba(37,211,102,.09)",
                  color: "#25d366",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(11px,3vw,13px)",
                  letterSpacing: "0.04em",
                  padding: "clamp(10px,2.8vw,13px)",
                  borderRadius: "14px",
                  textDecoration: "none",
                  border: "1px solid rgba(37,211,102,.28)",
                  transition:
                    "background .25s ease, box-shadow .25s ease, transform .2s ease",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#25d366"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp for Catering
              </a>
            </div>

            <style>{`
              .wa-catering-cta:hover { background: rgba(37,211,102,.16) !important; box-shadow: 0 0 20px rgba(37,211,102,.22); transform: translateY(-1px); }
              .wa-catering-cta:active { transform: scale(.97); }
              .qty-btn {
                width: 26px; height: 26px; border-radius: 7px;
                background: rgba(245,197,66,.06); border: 1px solid rgba(245,197,66,.15);
                color: #f5c542; cursor: pointer; display: flex; align-items: center; justify-content: center;
                transition: background .18s ease, transform .15s ease;
              }
              .qty-btn:hover { background: rgba(245,197,66,.14); transform: scale(1.1); }
              .qty-btn:active { transform: scale(.9); }
            `}</style>
          </div>
        )}
      </dialog>

      <StickyBottomBar />
    </>
  );
}
