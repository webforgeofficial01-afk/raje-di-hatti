// Footer.tsx — Clean minimal premium footer

import {
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const QUICK_LINKS = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu" },
  { label: "Story", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/apni_raje_di_hatti/",
    icon: <Instagram size={15} color="#d4a843" />,
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/rajedihatti/",
    icon: <Facebook size={15} color="#d4a843" />,
    label: "Facebook",
  },
];

const ORDER_PLATFORMS = [
  {
    label: "Order on Zomato",
    href: "https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order",
    color: "#e23744",
    borderColor: "rgba(226,55,68,0.35)",
    bg: "rgba(226,55,68,0.07)",
    ocid: "footer.order_zomato.button",
  },
  {
    label: "Order on Swiggy",
    href: "https://www.swiggy.com/search?query=raje+di+hatti+burari",
    color: "#fc8019",
    borderColor: "rgba(252,128,25,0.35)",
    bg: "rgba(252,128,25,0.07)",
    ocid: "footer.order_swiggy.button",
  },
  {
    label: "Order on Porter",
    href: "https://porter.in",
    color: "#d4a843",
    borderColor: "rgba(212,168,67,0.35)",
    bg: "rgba(212,168,67,0.07)",
    ocid: "footer.order_porter.button",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#060401", position: "relative" }}>
      {/* Top gold divider */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(212,168,67,0.45) 20%, rgba(245,197,66,0.6) 50%, rgba(212,168,67,0.45) 80%, transparent)",
        }}
      />

      {/* CTA Bar */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(18,12,4,0.98) 0%, rgba(10,7,2,0.99) 100%)",
          borderBottom: "1px solid rgba(245,197,66,0.08)",
        }}
        data-ocid="footer.cta_bar"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#f5f0e8",
                  lineHeight: 1.4,
                }}
              >
                Ready to Order?{" "}
                <span style={{ color: "#f5c542" }}>
                  Available on Zomato, Swiggy &amp; Porter
                </span>
              </p>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(245,240,232,0.38)",
                  marginTop: "4px",
                }}
              >
                7:00 AM – 7:00 PM · Fresh food, fast delivery
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                href="https://wa.me/919599233307?text=Hi%2C%20I%20want%20to%20enquire%20about%20catering%20for%20my%20event"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.whatsapp_cta.button"
                className="btn-press"
                style={{
                  background: "linear-gradient(135deg, #ff7a18, #e06010)",
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.73rem",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 22px rgba(255,122,24,0.4)",
                  transition:
                    "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  minHeight: "42px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 0 34px rgba(255,122,24,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "0 0 22px rgba(255,122,24,0.4)";
                }}
              >
                💬 Catering on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => scrollTo("menu")}
                data-ocid="footer.view_menu.button"
                className="btn-press"
                style={{
                  background: "rgba(245,197,66,0.07)",
                  color: "#f5c542",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.73rem",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid rgba(245,197,66,0.42)",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  whiteSpace: "nowrap",
                  minHeight: "42px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(245,197,66,0.14)";
                  e.currentTarget.style.borderColor = "rgba(245,197,66,0.75)";
                  e.currentTarget.style.boxShadow =
                    "0 0 18px rgba(245,197,66,0.18)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(245,197,66,0.07)";
                  e.currentTarget.style.borderColor = "rgba(245,197,66,0.42)";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.transform = "";
                }}
              >
                📋 View Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mid gold divider */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(212,168,67,0.25) 20%, rgba(212,168,67,0.5) 50%, rgba(212,168,67,0.25) 80%, transparent)",
        }}
      />

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <h3
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                background:
                  "linear-gradient(135deg, #b8943f 0%, #f5c542 50%, #ffe07a 75%, #d4a843 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 900,
                fontSize: "1.3rem",
                letterSpacing: "-0.02em",
                marginBottom: "3px",
              }}
            >
              Raje Di Hatti
            </h3>
            <p
              style={{
                color: "rgba(212,168,67,0.7)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontWeight: 600,
                marginBottom: "14px",
              }}
            >
              Authentic Punjabi Flavors Since 1990
            </p>
            <p
              style={{
                color: "rgba(245,240,232,0.38)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                lineHeight: 1.8,
                marginBottom: "18px",
              }}
            >
              A family business serving authentic Punjabi food in Sant Nagar
              Burari since 1990.
            </p>

            {/* Google Rating */}
            <div
              style={{
                background: "rgba(245,197,66,0.07)",
                border: "1px solid rgba(245,197,66,0.2)",
                borderRadius: "10px",
                padding: "10px 14px",
                display: "inline-flex",
                flexDirection: "column",
                gap: "4px",
                marginBottom: "16px",
              }}
              data-ocid="footer.google_rating"
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={12}
                    fill="#f5c542"
                    color="#f5c542"
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(245,197,66,0.5))",
                    }}
                  />
                ))}
                <Star size={12} fill="rgba(245,197,66,0.5)" color="#f5c542" />
                <span
                  style={{
                    color: "#f5c542",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    marginLeft: "2px",
                  }}
                >
                  4.7
                </span>
              </div>
              <p
                style={{
                  color: "rgba(245,240,232,0.45)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                Google Rating · 50K+ Orders Served
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-ocid={`footer.${social.label.toLowerCase()}.link`}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(212,168,67,0.06)",
                    border: "1px solid rgba(212,168,67,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)";
                    e.currentTarget.style.background = "rgba(212,168,67,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)";
                    e.currentTarget.style.background = "rgba(212,168,67,0.06)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "#f5f0e8",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    data-ocid={`footer.${link.id}.link`}
                    style={{
                      color: "rgba(245,240,232,0.38)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 0.25s ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#d4a843";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(245,240,232,0.38)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: "#f5f0e8",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginBottom: "20px",
              }}
            >
              Contact
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <li
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <Phone
                  size={13}
                  color="#d4a843"
                  style={{ marginTop: "2px", flexShrink: 0 }}
                />
                <span
                  style={{
                    color: "rgba(245,240,232,0.42)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                  }}
                >
                  +91 95992 33307
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <MapPin
                  size={13}
                  color="#d4a843"
                  style={{ marginTop: "2px", flexShrink: 0 }}
                />
                <span
                  style={{
                    color: "rgba(245,240,232,0.42)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.65,
                  }}
                >
                  Main 100 Futa Road, Near Labour Chowk, Sant Nagar Burari,
                  Delhi – 110084
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <Clock
                  size={13}
                  color="#d4a843"
                  style={{ marginTop: "2px", flexShrink: 0 }}
                />
                <div>
                  <p
                    style={{
                      color: "rgba(245,240,232,0.42)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    Mon – Sun
                  </p>
                  <p
                    style={{
                      color: "#d4a843",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    7:00 AM – 7:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Order Platforms */}
          <div>
            <h4
              style={{
                color: "#f5f0e8",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginBottom: "20px",
              }}
            >
              Order Online
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {ORDER_PLATFORMS.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={platform.ocid}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: platform.color,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                    padding: "9px 14px",
                    borderRadius: "10px",
                    border: `1px solid ${platform.borderColor}`,
                    background: platform.bg,
                    textDecoration: "none",
                    transition:
                      "background 0.25s ease, border-color 0.25s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = platform.bg.replace(
                      "0.07",
                      "0.14",
                    );
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = platform.bg;
                    e.currentTarget.style.transform = "";
                  }}
                >
                  {platform.label}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(212,168,67,0.1)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: "8px",
              }}
            >
              <p
                style={{
                  color: "rgba(245,240,232,0.25)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                }}
              >
                © {year} Raje Di Hatti. All rights reserved.
              </p>
              <p
                style={{
                  color: "rgba(245,240,232,0.25)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                }}
              >
                Website designed &amp; developed by{" "}
                <a
                  href="https://webforge.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#d4a843",
                    textDecoration: "none",
                    transition: "color 0.25s ease, text-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f5c542";
                    e.currentTarget.style.textShadow =
                      "0 0 10px rgba(245,197,66,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#d4a843";
                    e.currentTarget.style.textShadow = "";
                  }}
                  data-ocid="footer.webforge.link"
                >
                  WebForge
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
