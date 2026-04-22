import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Inter", "Poppins", "serif"],
        body: ["Inter", "Poppins", "sans-serif"],
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        brand: {
          brown: "oklch(var(--brand-dark-brown) / <alpha-value>)",
          "brown-2": "oklch(var(--brand-dark-brown-2) / <alpha-value>)",
          orange: "oklch(var(--brand-orange) / <alpha-value>)",
          "orange-hover": "oklch(var(--brand-orange-hover) / <alpha-value>)",
          cream: "oklch(var(--brand-cream) / <alpha-value>)",
          panel: "oklch(var(--brand-panel) / <alpha-value>)",
          body: "oklch(var(--brand-body) / <alpha-value>)",
          muted: "oklch(var(--brand-muted) / <alpha-value>)",
          border: "oklch(var(--brand-border) / <alpha-value>)",
          whatsapp: "oklch(var(--brand-whatsapp) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "#f5c542",
          light: "#ffd700",
          dark: "#e8aa1b",
          muted: "rgba(245,197,66,0.15)",
        },
        neon: {
          gold: "#f5c542",
          orange: "#ff7a18",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        warm: "0 4px 24px oklch(0.22 0.04 42 / 0.08)",
        "warm-lg": "0 8px 40px oklch(0.22 0.04 42 / 0.12)",
        "orange-glow": "0 8px 24px oklch(0.60 0.13 40 / 0.35)",
        "neon-orange-glow": "0 0 20px rgba(255, 122, 24, 0.35)",
        "gold-glow": "0 0 20px rgba(245, 197, 66, 0.3), 0 0 40px rgba(245, 197, 66, 0.1)",
        "gold-glow-lg": "0 0 40px rgba(245, 197, 66, 0.5), 0 0 80px rgba(245, 197, 66, 0.2)",
        "card-luxury": "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,197,66,0.05)",
        "card-luxury-hover": "0 8px 40px rgba(0,0,0,0.55), 0 0 20px rgba(245,197,66,0.08)",
        subtle: "0 2px 12px rgba(0,0,0,0.25)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f5c542 0%, #ffd700 35%, #e8aa1b 65%, #f5c542 100%)",
        "gold-gradient-text": "linear-gradient(135deg, #f5c542 0%, #fff2a0 50%, #e8aa1b 100%)",
        "orange-gradient": "linear-gradient(135deg, #ff7a18 0%, #ff9a4a 50%, #ff6000 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(2,2,2,0.6) 0%, rgba(10,10,10,0.85) 100%)",
        "section-glow": "radial-gradient(ellipse at top, rgba(245,197,66,0.04), transparent 60%)",
        "luxury-dark": "linear-gradient(180deg, #020202 0%, #0a0a0a 50%, #111111 100%)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,197,66,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(245,197,66,0.6), 0 0 80px rgba(245,197,66,0.2)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gold-pulse": "gold-pulse 2.5s ease-in-out infinite",
        "scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        350: "350ms",
        400: "400ms",
        450: "450ms",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
