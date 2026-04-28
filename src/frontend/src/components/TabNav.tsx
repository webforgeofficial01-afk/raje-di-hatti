import { useEffect, useRef, useState } from "react";

const TABS = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu" },
  { label: "Story", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Catering", id: "catering" },
  { label: "Contact", id: "contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Scroll to a section by ID using offsetTop traversal (avoids layout-thrash from getBoundingClientRect during transitions) */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  // 68px navbar + 44px tabnav
  window.scrollTo({ top: top - 112, behavior: "smooth" });
}

export default function TabNav() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [indicatorStyle, setIndicatorStyle] = useState({ x: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<TabId, HTMLButtonElement>>(new Map());
  const indicatorMoved = useRef(false);

  // ── Active section detection via single IntersectionObserver ──────────────
  useEffect(() => {
    const sectionIds = TABS.map((t) => t.id);
    // Track which sections are visible; pick the topmost one
    const visibleSet = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            visibleSet.delete(entry.target.id);
          }
        }
        // Pick first (topmost in DOM order) visible section
        for (const id of sectionIds) {
          if (visibleSet.has(id)) {
            setActiveTab(id as TabId);
            break;
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" },
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    for (const el of els) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // ── Slide indicator to the active tab button ──────────────────────────────
  useEffect(() => {
    const btn = tabRefs.current.get(activeTab);
    const container = containerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const x = btnRect.left - containerRect.left + container.scrollLeft;
    const width = btnRect.width;

    setIndicatorStyle({ x, width });

    // Auto-scroll the tab into view on mobile (no layout triggers)
    if (!indicatorMoved.current) {
      indicatorMoved.current = true;
    } else {
      btn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeTab]);

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);
    scrollToSection(id);
  };

  return (
    <nav
      className="tab-nav-bar"
      aria-label="Section navigation"
      data-ocid="tabnav.section"
      style={{
        position: "sticky",
        top: 68,
        zIndex: 40,
        backgroundColor: "rgba(5,5,5,0.92)",
        borderBottom: "1px solid rgba(245,197,66,0.12)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
        // GPU layer promotion — avoids repaints on sticky repositioning
        transform: "translateZ(0)",
        willChange: "auto",
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 relative">
        {/* Scrollable tab container */}
        <div
          ref={containerRef}
          className="flex items-center overflow-x-auto hide-scrollbar relative"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Sliding gold indicator — translateX driven, NOT left property */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "2px",
              width: indicatorStyle.width,
              background: "linear-gradient(90deg, #f5c542, #ff7a18, #f5c542)",
              borderRadius: "2px 2px 0 0",
              transform: `translateX(${indicatorStyle.x}px)`,
              // Only transition after first render to avoid flash on mount
              transition:
                "transform 0.35s cubic-bezier(0.16,1,0.3,1), width 0.35s cubic-bezier(0.16,1,0.3,1)",
              willChange: "transform",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                ref={(el) => {
                  if (el) tabRefs.current.set(tab.id, el);
                }}
                onClick={() => handleTabClick(tab.id)}
                data-ocid={`tabnav.${tab.id}.tab`}
                style={{
                  flexShrink: 0,
                  padding: "10px 16px",
                  fontFamily: "Inter, Poppins, sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: isActive ? "#f5c542" : "rgba(255,255,255,0.5)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                  minHeight: "44px",
                  whiteSpace: "nowrap",
                  textShadow: isActive
                    ? "0 0 10px rgba(245,197,66,0.45)"
                    : "none",
                }}
                aria-current={isActive ? "true" : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
