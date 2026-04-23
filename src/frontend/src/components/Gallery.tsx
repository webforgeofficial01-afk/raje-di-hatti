const GALLERY_SLOTS = [
  {
    label: "Our Food",
    src: "/assets/fb_img_1775394575866-019da83e-7602-7455-a874-0c58c44c327c.jpg",
    glowColor: "rgba(245,197,66,0.18)",
  },
  {
    label: "Our Ambience",
    src: "/assets/img_20260405_184255-019da83e-76c9-766c-9668-8e594011b09d.jpg",
    glowColor: "rgba(255,122,24,0.18)",
  },
  {
    label: "Dine With Us",
    src: "/assets/img_20260405_184306-019da83e-77d7-75b4-b6ea-634291987d80.jpg",
    glowColor: "rgba(180,80,30,0.18)",
  },
  {
    label: "Find Us",
    src: "/assets/img_20260405_184317-019da83e-7804-76a6-a543-37a5c23a2368.jpg",
    glowColor: "rgba(140,90,40,0.18)",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      style={{
        backgroundColor: "#0d0905",
        padding: "clamp(56px, 8vw, 120px) 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 animate-section">
          <span className="section-kicker">Gallery</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              background: "linear-gradient(135deg, #f5c542 0%, #ff7a18 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 900,
            }}
            className="section-title"
          >
            Our Kitchen &amp; Food
          </h2>
          <div className="section-divider" />
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-5"
          data-ocid="gallery.section"
        >
          {GALLERY_SLOTS.map((slot, i) => (
            <div
              key={slot.label}
              className="gallery-slot-card"
              style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                border: "1px solid rgba(212,168,67,0.22)",
                boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 0 20px ${slot.glowColor}`,
                aspectRatio: "1 / 1",
                position: "relative",
                background: "#1a1208",
              }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              {/* Real photo */}
              <img
                src={slot.src}
                alt={slot.label}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Grain texture overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
                  backgroundSize: "200px 200px",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              {/* Bottom label overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "28px 14px 14px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                  zIndex: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    color: "rgba(245,225,180,0.95)",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    fontStyle: "italic",
                    textAlign: "center",
                    textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                    margin: 0,
                  }}
                >
                  {slot.label}
                </p>
              </div>

              {/* Warm tint overlay — hover */}
              <div className="gallery-warm-tint" />
              {/* Gold shine sweep — hover */}
              <div className="gallery-shine-sweep" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-slot-card {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-slot-card:hover {
          transform: scale(1.03) translateY(-4px);
          border-color: rgba(245,197,66,0.65) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.7), 0 0 32px rgba(245,197,66,0.18) !important;
          will-change: transform;
        }
        .gallery-slot-card:not(:hover) {
          will-change: auto;
        }
        .gallery-warm-tint {
          position: absolute;
          inset: 0;
          background: rgba(255,122,24,0.09);
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          z-index: 3;
          border-radius: inherit;
        }
        .gallery-slot-card:hover .gallery-warm-tint {
          opacity: 1;
        }
        .gallery-shine-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(245,197,66,0.18) 50%,
            transparent 75%
          );
          transform: translateX(-100%);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          z-index: 4;
        }
        .gallery-slot-card:hover .gallery-shine-sweep {
          transform: translateX(100%);
        }
      `}</style>
    </section>
  );
}
