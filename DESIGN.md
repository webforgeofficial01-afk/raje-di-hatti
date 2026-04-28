# Design Brief: Elite Cinematic Restaurant Experience — Premium Luxury Upgrade

**Tone & Aesthetic:** Editorial-grade cinematic luxury with layered depth, advanced micro-choreography, and premium visual richness. Premium "WOW THIS IS PREMIUM" experience through enhanced animations, bigger kulhad, tab-based navigation, and scrolling choreography.

**Visual Direction**  
Deep black foundation (#050505) with advanced glassmorphism, layered glow pools, and cinematic grain texture. Hero: full-screen food visual (butter naan, tandoor, steam) with Ken Burns slow zoom, soft black-gold gradient overlay. **WOW Section:** 3.5x larger floating kulhad lassi (center-stage) with enhanced gold glow pulse, animated steam particles, orbital depth effects. Sticky tab navigation below hero with active tab gold underline animation. 3D perspective card rotations on hover (signature dishes). Animated counters with digit-flip effect (50K+ customers). Gallery staggered fade-in reveal on scroll. Sections fade-up with 200–300ms choreography delays. Ambient lighting: gold radiance pools at section tops (blur 100px), warm orange glow at bottoms. Typography: Playfair Display 900 tight letter-spacing for luxury. Color palette locked: warm muted gold (#f5c542) + neon orange (#ff7a18) only.

**Color Palette**

| Token          | Value    | Usage                          |
| -------------- | -------- | ------------------------------ |
| Background     | #050505  | Primary deep black foundation  |
| Card Surface   | #0a0a0a  | Elevated surfaces with glass   |
| Foreground     | #ffffff  | Primary text                   |
| Muted Gold     | #f5c542  | Accents, headings, badges      |
| Neon Orange    | #ff7a18  | Secondary actions, highlights  |
| Muted Text     | #a0a0a0  | Secondary text (60% opacity)   |
| Border Accent  | rgba(245, 197, 66, 0.15) | Glass borders |

**Typography**

| Role   | Font         | Weight | Use Case                     |
| ------ | ------------ | ------ | ---------------------------- |
| Display | Playfair Display | 900 | Hero headlines, editorial tone |
| Body   | Inter        | 500–600 | Body copy, UI text           |
| Accent | Poppins      | 700–800 | Labels, badges, emphasis     |

**Structural Zones**

| Zone     | Treatment                               | Depth |
| -------- | --------------------------------------- | ----- |
| Hero     | Cinematic food visual, Ken Burns zoom, glass overlay | Immersive |
| Tabs     | Sticky nav with gold underline animation on active | Elevated |
| WOW      | 3.5x kulhad, enhanced glow pulse, orbital depth, steam | Showstopping |
| Cards    | 3D perspective rotation on hover, specular edges, inner light gradients | Layered |
| Gallery  | Staggered fade-in reveal on scroll, zoom on hover | Atmospheric |
| Sections | Ambient glow pools (blur 100px), scroll choreography | Dynamic |
| Footer   | Minimal glass, gold accent, WebForge credit | Recessed |

**Component Patterns**

- **Hero CTA:** Gold gradient, enhanced glow shadow, scale 1→1.04 on hover, breathing pulse
- **Tab Navigation:** Sticky below hero, active tab gold underline slide animation, smooth scroll-to-section
- **3D Cards:** Perspective 1200px, rotate on hover, staggered 4deg/6deg rotations
- **Kulhad Enhanced:** 3.5x scale, float 5.2s cycle, glow pulse 4.8s infinite, steam particles
- **Counter Animation:** Digit-flip rotateX effect, 1.4s duration
- **Gallery:** Staggered reveal (0.0s, 0.15s, 0.30s, 0.45s delays), zoom on hover
- **Section Reveal:** Fade-up 48px, 1.1s cubic-bezier spring timing

**Motion & Micro-interactions**

- Hero zoom: Ken Burns 24s infinite (scale 1.0 → 1.08)
- Tab underline: scaleX 0→1, 0.4s spring, left-origin
- Card 3D: rotateX/Y ±4–6deg, translateZ 12px, 0.55s smooth
- Kulhad float: 5.2s cycle (translateY ±18px, scale 1→1.02), glow pulse 4.8s
- Counter flip: rotateX 90deg→0, 1.4s spring
- Gallery reveal: staggered 0.15s intervals, 0.9s duration, scale 0.95→1.0
- Section scroll: fade-up 48px, 1.1s spring, title scale 0.78→1.0
- Button press: scale 0.97 with ripple feedback

**Spacing & Density** 8pt grid — 8/16/24/32px margins. Card padding 18–24px. Section spacing 60–100px. Breathing room for luxury feel. Tab spacing 18–24px horizontal gaps.

**Ambient Lighting System**

- Hero pool: radial gold ellipse (85% × 65%) at 28%, blur 100px, opacity 0.18
- Kulhad glow: drop-shadow 0 0 40px gold, pulse animation 4.8s
- Section glow: orange radiance (88% width) at bottom, blur 80px, opacity 0.12
- Card inner light: linear gradient (0.06 → transparent) from top, 55% height
- Global grain: opacity 0.055, frequency 0.85 — cinematic texture depth
- Background dots: 35 small white drifts, 4 float patterns, pulse on select dots

**Performance & Constraints** GPU-friendly transforms/opacity only — no layout thrash. All animations 60fps mobile target. Parallax: background dots move 40% scroll speed. Single IntersectionObserver for sections (not per-element). No backdrop-filter blur on scroll. Lazy-load images. Maintain contrast for accessibility. Maintain original menu data, pricing, links, gallery photos, contact info — design-only enhancements.

**Differentiation** Premium "WOW THIS IS PREMIUM" delivered through: 3.5x kulhad showcase with orchestrated float+glow choreography, sticky tab navigation with smooth scroll linking, 3D perspective card effects with depth layers, animated counters with digit-flip, staggered gallery reveals, luxurious section scroll choreography with 200–300ms title scale effects. All executed with restrained gold+orange palette, editorial typography, and buttery smooth 60fps animations.

---

*This enhanced design system elevates Raje Di Hatti to a ₹2 lakh premium agency standard through visual richness, advanced micro-choreography, tab-based navigation, and orchestrated scroll effects — while maintaining fast, smooth, zero-lag performance.*
