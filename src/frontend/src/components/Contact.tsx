// Contact.tsx — Two-column contact section with form + info + Google Maps

import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Live Open Status ─────────────────────────────────────────────────────────

type OpenStatus = "open" | "closes-soon" | "closed";
interface HoursStatus {
  status: OpenStatus;
  label: string;
  color: string;
  pulse: boolean;
}

function getISTStatus(): HoursStatus {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const istMs = utcMs + 5.5 * 60 * 60 * 1_000;
  const ist = new Date(istMs);
  const total = ist.getHours() * 60 + ist.getMinutes();
  const OPEN = 7 * 60;
  const WARN = 18 * 60 + 30;
  const CLOSE = 19 * 60;
  if (total >= OPEN && total < WARN)
    return {
      status: "open",
      label: "Open Now",
      color: "#22c55e",
      pulse: false,
    };
  if (total >= WARN && total < CLOSE)
    return {
      status: "closes-soon",
      label: "Closing Soon",
      color: "#f59e0b",
      pulse: true,
    };
  return {
    status: "closed",
    label: "Opens at 7 AM",
    color: "#ef4444",
    pulse: false,
  };
}

function OpenBadge() {
  const [s, setS] = useState<HoursStatus>(() => getISTStatus());
  useEffect(() => {
    const iv = setInterval(() => setS(getISTStatus()), 60_000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <style>{`
        @keyframes cDotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(1.4)} }
        .c-dot-pulse{animation:cDotPulse 1.4s ease-in-out infinite}
      `}</style>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          background: `${s.color}14`,
          border: `1px solid ${s.color}40`,
          borderRadius: "999px",
          padding: "3px 10px",
          fontFamily: "Poppins, sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          color: s.color,
          marginTop: "5px",
          letterSpacing: "0.02em",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: s.color,
            boxShadow: `0 0 5px ${s.color}`,
            flexShrink: 0,
          }}
          className={s.pulse ? "c-dot-pulse" : ""}
        />
        {s.label}
      </span>
    </>
  );
}

// ─── Input style ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  fontFamily: "Poppins, sans-serif",
  backgroundColor: "rgba(18,13,6,0.8)",
  border: "1px solid rgba(212,168,67,0.18)",
  color: "#f5f0e8",
  borderRadius: "0.625rem",
  outline: "none",
  width: "100%",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in your name and message.");
      return;
    }
    const text = `Hi, my name is ${name.trim()}. ${message.trim()}`;
    const whatsappUrl = `https://wa.me/919599233307?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#0a0602",
        padding: "clamp(56px, 8vw, 100px) 0",
        position: "relative",
        overflow: "hidden",
      }}
      data-ocid="contact.section"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(255,122,24,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* ── HEADER ── */}
        <div className="animate-section text-center mb-10">
          <span className="section-kicker">Contact</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}
            className="title-gold-shimmer"
          >
            Get In Touch
          </h2>
          <div className="section-divider" />
        </div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* LEFT — Contact Form */}
          <div
            className="animate-section dark-glass-card"
            style={{ padding: "clamp(20px, 4vw, 32px)" }}
            data-ocid="contact.dialog"
          >
            <h3
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontWeight: 900,
                fontSize: "1.5rem",
                color: "#f5f0e8",
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Send Us a Message
            </h3>
            <div className="section-divider section-divider-left mb-7" />

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Name + Phone row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "12px",
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      color: "rgba(245,240,232,0.7)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "6px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={inputStyle}
                    className="px-4 py-3 text-sm placeholder:text-white/20"
                    data-ocid="contact.name.input"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,197,66,0.45)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(245,197,66,0.07)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(212,168,67,0.18)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    style={{
                      color: "rgba(245,240,232,0.7)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "6px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Optional"
                    style={inputStyle}
                    className="px-4 py-3 text-sm placeholder:text-white/20"
                    data-ocid="contact.phone.input"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,197,66,0.45)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(245,197,66,0.07)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(212,168,67,0.18)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    color: "rgba(245,240,232,0.7)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "6px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  className="px-4 py-3 text-sm placeholder:text-white/20"
                  data-ocid="contact.message.textarea"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,197,66,0.45)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(245,197,66,0.07)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,168,67,0.18)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                data-ocid="contact.submit.button"
                style={{ minHeight: "50px" }}
              >
                Send on WhatsApp
              </button>
            </form>
          </div>

          {/* RIGHT — Info card + Map */}
          <div
            className="animate-section"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Info card */}
            <div
              className="dark-glass-card"
              style={{ padding: "clamp(20px, 4vw, 28px)" }}
              data-ocid="contact.info.card"
            >
              <h3
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontWeight: 900,
                  fontSize: "1.3rem",
                  color: "#f5f0e8",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Restaurant Info
              </h3>

              {/* Address */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(212,168,67,0.08)",
                    border: "1px solid rgba(212,168,67,0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  <MapPin size={16} color="#d4a843" />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#d4a843",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                    }}
                  >
                    Address
                  </p>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      color: "rgba(245,240,232,0.68)",
                      lineHeight: 1.65,
                    }}
                  >
                    Main 100 Futa Road, Opp Redwood Public School,
                    <br />
                    Near Labour Chowk, Sant Nagar Burari,
                    <br />
                    Delhi – 110084
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(212,168,67,0.08)",
                    border: "1px solid rgba(212,168,67,0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={16} color="#d4a843" />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#d4a843",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "3px",
                    }}
                  >
                    Phone
                  </p>
                  <a
                    href="tel:+919599233307"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "rgba(245,240,232,0.85)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                    }}
                    data-ocid="contact.call.button"
                  >
                    +91 95992 33307
                  </a>
                </div>
              </div>

              {/* Timings */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(212,168,67,0.08)",
                    border: "1px solid rgba(212,168,67,0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  <Clock size={16} color="#d4a843" />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#d4a843",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                    }}
                  >
                    Opening Hours
                  </p>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      color: "rgba(245,240,232,0.68)",
                      marginBottom: "4px",
                    }}
                  >
                    Monday – Sunday:{" "}
                    <strong style={{ color: "#f5f0e8" }}>
                      7:00 AM – 7:00 PM
                    </strong>
                  </p>
                  <OpenBadge />
                </div>
              </div>

              {/* WhatsApp — catering only */}
              <div
                style={{ display: "flex", gap: "14px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(37,211,102,0.08)",
                    border: "1px solid rgba(37,211,102,0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle size={16} color="#25d366" />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#25d366",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "3px",
                    }}
                  >
                    WhatsApp
                  </p>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "12px",
                      color: "rgba(245,240,232,0.55)",
                      marginBottom: "6px",
                    }}
                  >
                    For catering orders only
                  </p>
                  <a
                    href="https://wa.me/919599233307?text=Hi%2C%20I%20want%20to%20enquire%20about%20catering%20for%20my%20event"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.whatsapp.button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(37,211,102,0.1)",
                      border: "1px solid rgba(37,211,102,0.35)",
                      borderRadius: "8px",
                      padding: "6px 14px",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#25d366",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                      transition:
                        "background 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(37,211,102,0.18)";
                      e.currentTarget.style.boxShadow =
                        "0 0 14px rgba(37,211,102,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(37,211,102,0.1)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    💬 WhatsApp for Catering
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps embed + deep link */}
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(212,168,67,0.18)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
              }}
              data-ocid="contact.map"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.3!2d77.1835!3d28.7211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3b00000001%3A0x0!2sRaje+Di+Hatti%2C+Main+100+Futa+Road%2C+Sant+Nagar+Burari%2C+Delhi+110084!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="260"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raje Di Hatti Location — Sant Nagar Burari, Delhi"
              />
              <a
                href="https://maps.google.com/?q=28.7211,77.1835&z=17"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.open_maps.button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "11px 16px",
                  background: "rgba(212,168,67,0.06)",
                  borderTop: "1px solid rgba(212,168,67,0.18)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#d4a843",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,168,67,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212,168,67,0.06)";
                }}
              >
                📍 Open Exact Location in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
