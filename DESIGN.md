# Design Brief: Elite Cinematic Restaurant Experience

**Tone & Aesthetic:** Premium cinematic — editorial-grade food ordering with deep luxury, layered depth, and restrained golden accents.

**Visual Direction**  
Deep black foundation (#050505) with advanced glassmorphism, layered glow pools, and cinematic grain texture. Hero: full-screen food visual (butter naan, tandoor, steam) with Ken Burns slow zoom, soft black-gold gradient overlay. Ambient lighting: gold radiance pools at section tops (enhanced blur), warm orange glow at bottoms. Typography: Playfair Display 900 with tightened letter-spacing for luxury impact. Color palette locked: warm muted gold (#f5c542) + neon orange (#ff7a18) only — no green.

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
| Header   | Dark glass panel, gold accent glow | Elevated |
| Content  | Cards: advanced glass (blur 28px), specular edges, inner light gradients | Layered |
| Sections | Ambient glow pools (enhanced blur 100px), gold/orange radiance | Atmospheric |
| Footer   | Minimal glass, gold accent, WebForge credit | Recessed |

**Component Patterns**

- **Hero CTA:** Gold gradient, enhanced glow shadow, scale 1→1.04 on hover
- **Cards:** Glassmorphic (blur 28px, saturate 190%), specular top edge (55% height), inner gold gradient
- **Buttons:** Premium press feedback, ripple on active, magnetic hover zones
- **Badges:** Gold/orange pillars with soft glow, uppercase labels
- **Overlays:** Soft black gradient, no harsh edges

**Motion & Micro-interactions**

- Hero zoom: Ken Burns 24s infinite (scale 1.0 → 1.08, ease-in-out)
- Card enter: staggered fade + slide-up (0.35s cubic-bezier spring)
- Hover: scale 1→1.02 + glow elevation + shadow depth
- Button press: scale 1→0.97 with ripple feedback
- Section reveals: staggered delays (0.08–0.12s) for choreographed flow

**Spacing & Density** 8pt grid — 8/16/24/32px margins. Card padding 18–24px. Section spacing 60–100px. Breathing room for luxury feel.

**Ambient Lighting System**

- Hero pool: radial gold ellipse (85% × 65%) at 28% vertical, blur 100px, opacity 0.18
- Section glow: orange radiance (88% width) at bottom, blur 80px, opacity 0.12
- Card inner light: linear gradient (0.06 → transparent) from top, 55% height
- Global grain: opacity 0.055, frequency 0.85 — cinematic texture depth

**Differentiation** Deep, editorial-grade luxury achieved through ambient lighting depth (not bright glows), advanced glassmorphism with specular edges, cinematic typography (tighter letter-spacing), and smooth micro-choreography. Warm gold + orange locked palette only — no green. Premium 0.1% finish via precision spacing, perfect alignment, and intentional motion.

**Constraints** GPU-friendly transforms/opacity only. No layout thrash. Maintain contrast for accessibility. Grain texture subtle but visible for cinematic depth. All animations smooth at 60fps mobile.

---

*This cinematic design system delivers a world-class, agency-grade experience through layered atmospheric depth, refined glassmorphism, editorial typography, and smooth micro-choreography — all executed with restrained, intentional color and premium precision.*
