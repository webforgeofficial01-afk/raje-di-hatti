import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "Menu", href: "menu" },
  { label: "Story", href: "about" },
  { label: "Gallery", href: "gallery" },
  { label: "Reviews", href: "reviews" },
  { label: "Contact", href: "contact" },
];

const ORDER_PLATFORMS = [
  {
    label: "Order on Zomato",
    href: "https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order",
    color: "#ff7a18",
    bg: "rgba(255,122,24,0.08)",
    border: "rgba(255,122,24,0.25)",
    dot: "#ff7a18",
  },
  {
    label: "Order on Swiggy",
    href: "https://www.swiggy.com/search?query=raje+di+hatti+burari",
    color: "#fc8019",
    bg: "rgba(252,128,25,0.08)",
    border: "rgba(252,128,25,0.25)",
    dot: "#fc8019",
  },
  {
    label: "Order on Porter",
    href: "https://porter.in",
    color: "#d4a843",
    bg: "rgba(212,168,67,0.08)",
    border: "rgba(212,168,67,0.25)",
    dot: "#d4a843",
  },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  // Use offsetTop traversal instead of getBoundingClientRect to avoid reading
  // stale layout data when CSS transitions (.animate-section → .visible) are
  // still in flight. getBoundingClientRect can return an incorrect value when
  // a section's transform/opacity is mid-transition, causing a scroll jump.
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  window.scrollTo({ top: top - 72, behavior: "smooth" });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [platformOpen, setPlatformOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Passive scroll listener — only tracks scrolled state for navbar bg.
    // NO getBoundingClientRect here — zero layout reads per scroll frame.
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver — zero scroll cost.
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href);
    const visibleMap = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleMap.set(entry.target.id, entry.isIntersecting);
        }
        // Pick the last section that's visible (topmost in reading order)
        for (const id of sectionIds) {
          if (visibleMap.get(id)) {
            setActiveSection(id);
            break;
          }
        }
      },
      { threshold: 0, rootMargin: "-60px 0px -20% 0px" },
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    for (const el of els) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setPlatformOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = rippleRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      top:${y}px;left:${x}px;border-radius:50%;
      background:rgba(255,255,255,0.22);transform:scale(0);
      animation:navRipple 0.52s ease-out forwards;pointer-events:none;z-index:10;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <>
      <style>{`
        @keyframes navRipple {
          to { transform: scale(2.8); opacity: 0; }
        }
        .nav-link-item {
          position: relative;
        }
        /* GPU-safe underline: scaleX 0→1 — no layout reflow */
        .nav-link-item::before {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #f5c542, #ff7a18);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link-item:hover::before {
          transform: scaleX(1);
        }
        .nav-link-item-active::before {
          transform: scaleX(1) !important;
        }
        .mobile-link-item {
          position: relative;
          border-left: 3px solid transparent;
          transition: border-color 0.3s cubic-bezier(0.16,1,0.3,1),
                      color 0.3s ease,
                      background 0.3s ease;
        }
        .mobile-link-item:hover {
          border-left-color: rgba(245,197,66,0.6);
          background: rgba(245,197,66,0.05);
        }
        .mobile-link-active {
          border-left-color: #f5c542 !important;
          background: rgba(245,197,66,0.08) !important;
        }
        .platform-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 210px;
          background: rgba(4,2,1,0.99);
          border: 1px solid rgba(245,197,66,0.22);
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.65),
                      0 0 0 1px rgba(245,197,66,0.06),
                      0 0 24px rgba(245,197,66,0.06);
          z-index: 100;
          animation: dropdownIn 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .platform-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          font-family: Poppins, sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: filter 0.2s ease, transform 0.2s ease;
          letter-spacing: 0.02em;
          margin-bottom: 3px;
        }
        .platform-item:last-child { margin-bottom: 0; }
        .platform-item:hover {
          filter: brightness(1.12);
          transform: translateX(2px);
        }
        .platform-item:active { transform: scale(0.97); }
        .platform-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>

      <header
        style={{
          /* NO backdrop-filter blur on the fixed header — biggest source of scroll jank on mobile.
             Solid semi-transparent dark background is visually identical at zero recomposite cost. */
          backgroundColor: scrolled ? "rgba(3, 2, 1, 0.97)" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(245,197,66,0.16)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,0.6)" : "none",
          transition:
            "background-color 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)",
          /* Own compositor layer — prevents scroll repaint */
          transform: "translateZ(0)",
          willChange: "auto",
        }}
        className="fixed top-0 left-0 right-0 z-50"
        data-ocid="navbar.section"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="flex flex-col leading-none text-left group"
              data-ocid="navbar.logo.link"
            >
              <span
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  background:
                    "linear-gradient(135deg, #b8943f 0%, #f5c542 45%, #ffe07a 70%, #d4a843 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 900,
                  filter: "drop-shadow(0 0 8px rgba(245,197,66,0.3))",
                  transition: "filter 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
                className="text-xl tracking-tight group-hover:drop-shadow-[0_0_14px_rgba(245,197,66,0.65)]"
              >
                Raje Di Hatti
              </span>
              <span
                style={{
                  color: "rgba(245,197,66,0.48)",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "0.22em",
                }}
                className="text-[9px] font-bold uppercase"
              >
                Since 1990
              </span>
            </button>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-7"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    style={{
                      color: isActive ? "#f5c542" : "rgba(245,240,232,0.6)",
                      fontFamily: "Poppins, sans-serif",
                      transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)",
                      textShadow: isActive
                        ? "0 0 12px rgba(245,197,66,0.55)"
                        : "none",
                    }}
                    className={`text-sm font-bold tracking-wide nav-link-item${isActive ? " nav-link-item-active" : ""}`}
                    data-ocid={`navbar.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Desktop: Order Now dropdown */}
              <div ref={dropdownRef} className="hidden md:block relative">
                <button
                  ref={rippleRef}
                  type="button"
                  onClick={(e) => {
                    handleRipple(e);
                    setPlatformOpen((v) => !v);
                  }}
                  className="btn-primary text-xs px-5 py-2.5 relative overflow-hidden"
                  aria-expanded={platformOpen}
                  aria-haspopup="true"
                  data-ocid="navbar.order_now.button"
                >
                  ORDER NOW ↓
                </button>

                {platformOpen && (
                  <div
                    className="platform-dropdown"
                    role="menu"
                    aria-label="Order platforms"
                  >
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(245,197,66,0.45)",
                        padding: "4px 14px 8px",
                      }}
                    >
                      Choose platform
                    </p>
                    {ORDER_PLATFORMS.map((p) => (
                      <a
                        key={p.label}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-item"
                        role="menuitem"
                        style={{
                          color: p.color,
                          background: p.bg,
                          border: `1px solid ${p.border}`,
                        }}
                        onClick={() => setPlatformOpen(false)}
                        data-ocid={`navbar.platform.${p.label.replace(/\s+/g, "_").toLowerCase()}`}
                      >
                        <span
                          className="platform-dot"
                          style={{ background: p.dot }}
                        />
                        {p.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden p-2 rounded-lg"
                style={{
                  color: "#f5f0e8",
                  transition: "opacity 0.2s ease",
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                data-ocid="navbar.menu.toggle"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu
            backdrop-filter here is acceptable: only renders when open, not during scroll */}
        {mobileOpen && (
          <div
            style={{
              backgroundColor: "rgba(4, 2, 1, 0.97)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderTop: "1px solid rgba(245,197,66,0.14)",
              borderLeft: "3px solid rgba(245,197,66,0.4)",
            }}
            className="md:hidden"
            data-ocid="navbar.mobile.panel"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    style={{
                      color: isActive ? "#f5c542" : "rgba(245,240,232,0.72)",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    className={`py-3.5 px-4 text-sm font-bold rounded-lg mobile-link-item${isActive ? " mobile-link-active" : ""}`}
                    data-ocid={`navbar.mobile.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Mobile platform buttons */}
              <div className="mt-4 flex flex-col gap-2">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(245,197,66,0.4)",
                    padding: "0 4px 4px",
                  }}
                >
                  Order online
                </p>
                {ORDER_PLATFORMS.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: p.color,
                      background: p.bg,
                      border: `1px solid ${p.border}`,
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      padding: "11px 16px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      letterSpacing: "0.03em",
                    }}
                    data-ocid={`navbar.mobile.platform.${p.label.replace(/\s+/g, "_").toLowerCase()}`}
                  >
                    <span
                      className="platform-dot"
                      style={{ background: p.dot }}
                    />
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
