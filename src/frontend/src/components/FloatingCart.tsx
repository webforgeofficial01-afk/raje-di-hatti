import { ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCartStore } from "../store/cartStore";

export default function FloatingCart() {
  const { totalItems, toggleCart } = useCartStore();
  const count = totalItems();
  const prevCount = useRef(count);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Bounce only when count increases
  useEffect(() => {
    if (count > prevCount.current && btnRef.current) {
      const btn = btnRef.current;
      btn.classList.remove("cart-bounce");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          btn.classList.add("cart-bounce");
          setTimeout(() => btn.classList.remove("cart-bounce"), 550);
        });
      });
    }
    prevCount.current = count;
  }, [count]);

  const active = count > 0;

  return (
    <>
      <style>{`
        @keyframes cartBounceKf {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.22); }
          55%  { transform: scale(.9); }
          75%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .cart-bounce { animation: cartBounceKf .55s cubic-bezier(.16,1,.3,1) forwards !important; }

        @keyframes cartDotPulse {
          0%,100% { transform: translateX(-50%) scale(1); opacity: .9; }
          50%      { transform: translateX(-50%) scale(1.6); opacity: .45; }
        }
        .cart-dot-pulse { animation: cartDotPulse 2.8s ease-in-out infinite; }

        .floating-cart-btn {
          transition: transform .35s cubic-bezier(.16,1,.3,1),
                      box-shadow .35s cubic-bezier(.16,1,.3,1),
                      background .35s cubic-bezier(.16,1,.3,1),
                      border-color .35s cubic-bezier(.16,1,.3,1);
        }
        .floating-cart-btn:hover {
          transform: scale(1.1) !important;
        }
        .floating-cart-btn:active {
          transform: scale(.92) !important;
          transition-duration: .1s !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .cart-bounce { animation: none !important; }
          .cart-dot-pulse { animation: none !important; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "160px",
          right: "22px",
          zIndex: 50,
          transform: "translateZ(0)",
        }}
      >
        <button
          ref={btnRef}
          type="button"
          onClick={toggleCart}
          aria-label={`Shopping cart, ${count} items`}
          data-ocid="floating.cart.button"
          className="floating-cart-btn"
          style={{
            position: "relative",
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: active
              ? "linear-gradient(135deg, #f5c542 0%, #e8a020 100%)"
              : "linear-gradient(135deg, rgba(245,197,66,.25) 0%, rgba(232,160,32,.25) 100%)",
            border: active
              ? "1.5px solid rgba(245,197,66,.6)"
              : "1.5px solid rgba(245,197,66,.22)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: active
              ? "0 0 24px rgba(245,197,66,.5), 0 4px 20px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.15)"
              : "0 4px 16px rgba(0,0,0,.4), 0 0 8px rgba(245,197,66,.12)",
          }}
        >
          <ShoppingBag
            size={21}
            color={active ? "#0a0602" : "rgba(245,197,66,.85)"}
          />

          {/* Item count badge */}
          {active && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                backgroundColor: "#ff7a18",
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "10px",
                minWidth: "19px",
                height: "19px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
                boxShadow:
                  "0 0 8px rgba(255,122,24,.5), 0 2px 8px rgba(0,0,0,.4)",
                border: "2px solid #050505",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {count > 99 ? "99+" : count}
            </span>
          )}

          {/* Pulsing gold dot */}
          {active && (
            <span
              className="cart-dot-pulse"
              style={{
                position: "absolute",
                bottom: "2px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "rgba(245,197,66,.9)",
                boxShadow: "0 0 5px rgba(245,197,66,.6)",
              }}
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </>
  );
}
