import { Toaster } from "@/components/ui/sonner";
import { Component, useEffect, useRef, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import About from "./components/About";
import AmbientBackground from "./components/AmbientBackground";
import AmbientParticles from "./components/AmbientParticles";
import CartDrawer from "./components/CartDrawer";
import CateringBuilder from "./components/CateringBuilder";
import CinematicBanner from "./components/CinematicBanner";
import Contact from "./components/Contact";
import FloatingButtons from "./components/FloatingButtons";
import FloatingCart from "./components/FloatingCart";
import FloatingConversionBar from "./components/FloatingConversionBar";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import LandingPage from "./components/LandingPage";
import Location from "./components/Location";
import LoyaltyCard from "./components/LoyaltyCard";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Reviews from "./components/Reviews";
import SEOMeta from "./components/SEOMeta";
import Stats from "./components/Stats";
import TodaysSpecial from "./components/TodaysSpecial";
import WhyChooseUs from "./components/WhyChooseUs";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

// ─── Error Boundary ───────────────────────────────────────────────────────────

interface EBState {
  hasError: boolean;
}
interface EBProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }
  componentDidCatch(_err: Error, _info: ErrorInfo) {
    // Could log to analytics here
  }
  render() {
    if (this.state.hasError) {
      return <NotFound />;
    }
    return this.props.children;
  }
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function AppInner() {
  useScrollAnimation();
  const [loading, setLoading] = useState(true);

  const slowCursorRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  // SINGLE RAF loop — cursor parallax (--cx, --cy, --cx-slow, --cy-slow)
  // --scroll-bg removed: orbs are gone, nothing else uses it
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      document.body.style.setProperty("--cx", `${mouseX}px`);
      document.body.style.setProperty("--cy", `${mouseY}px`);

      slowCursorRef.current.x += (mouseX - slowCursorRef.current.x) * 0.05;
      slowCursorRef.current.y += (mouseY - slowCursorRef.current.y) * 0.05;
      document.body.style.setProperty(
        "--cx-slow",
        `${slowCursorRef.current.x}px`,
      );
      document.body.style.setProperty(
        "--cy-slow",
        `${slowCursorRef.current.y}px`,
      );

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Loading screen fades out after 800ms
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: "#050505" }}
    >
      {/* SEO meta tags + JSON-LD schema */}
      <SEOMeta />

      {/* Ambient glow orbs — deepest layer (z-index 0) */}
      <AmbientBackground />

      {/* Ambient particles (z-index 1) */}
      <AmbientParticles />

      <Toaster richColors position="top-right" />

      {/* Branded loading screen */}
      {loading && (
        <div className="page-loader" aria-hidden="true">
          <div className="page-loader-ring" />
          <span
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              background:
                "linear-gradient(135deg, #f5c542 0%, #fff9b0 50%, #e8aa1b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 900,
              fontSize: "1.1rem",
              letterSpacing: "0.04em",
            }}
          >
            Raje Di Hatti
          </span>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,197,66,0.45)",
            }}
          >
            Since 1990
          </span>
        </div>
      )}

      {/* Main page content — fades in after loader */}
      <div className={loading ? "opacity-0" : "page-fade-in"}>
        {/* 1. Navbar — always visible, sticky */}
        <Navbar />

        <main>
          {/* 2. Hero — full-screen cinematic section with CTAs */}
          <LandingPage />

          {/* 3. Trust Strip / Stats */}
          <div className="animate-section">
            <Stats />
          </div>

          {/* 4. Today's Special — rotating daily highlight */}
          <div className="animate-section">
            <TodaysSpecial />
          </div>

          {/* 5. Signature Dishes / Why Choose Us */}
          <div className="animate-section">
            <WhyChooseUs />
          </div>

          {/* 6. Cinematic WOW Banner — 3D animated food scene */}
          <div className="animate-section">
            <CinematicBanner />
          </div>

          {/* 7. Menu — app-like ordering system */}
          <Menu />

          {/* 8. About / Story — heritage and brand */}
          <div className="animate-section section-offscreen">
            <About />
          </div>

          {/* 9. Gallery — 4 real photos */}
          <div className="animate-section section-offscreen">
            <Gallery />
          </div>

          {/* 10. Reviews — live customer testimonials */}
          <div className="animate-section section-offscreen">
            <Reviews />
          </div>

          {/* 11. Loyalty Card — badge-based repeat visitor rewards */}
          <div className="animate-section section-offscreen">
            <LoyaltyCard />
          </div>

          {/* 12. Catering Section — WhatsApp order builder for big orders */}
          <div className="animate-section section-offscreen">
            <CateringBuilder />
          </div>

          {/* 13. Delivery Zones — where we deliver */}
          <div className="animate-section section-offscreen">
            <Location />
          </div>

          {/* 14. Contact — map, phone, inquiry form */}
          <div className="animate-section section-offscreen">
            <Contact />
          </div>
        </main>

        {/* 15. Footer */}
        <Footer />

        {/* ── Floating overlays ── */}
        <FloatingButtons />
        <FloatingCart />
        <CartDrawer />
        <FloatingConversionBar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
