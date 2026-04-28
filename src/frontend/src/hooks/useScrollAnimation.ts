import { useEffect, useRef } from "react";

/**
 * useScrollAnimation — attaches a single IntersectionObserver to all
 * .animate-section elements. Section-level reveal only (not per-card).
 * Supports data-delay attribute for staggered effects.
 *
 * @param threshold - Intersection threshold (default 0.1)
 */
export function useScrollAnimation(threshold = 0.1) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Instantly reveal all sections for reduced-motion preference
      const elements =
        document.querySelectorAll<HTMLElement>(".animate-section");
      for (const el of elements) el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay
              ? Math.min(Number(el.dataset.delay) * 110, 770)
              : 0;
            if (delay > 0) {
              setTimeout(() => el.classList.add("visible"), delay);
            } else {
              el.classList.add("visible");
            }
            observer.unobserve(el); // stop watching after reveal
          }
        }
      },
      { threshold },
    );

    const elements = document.querySelectorAll<HTMLElement>(".animate-section");
    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);
}

/**
 * useElementReveal — returns a ref to attach to a single element.
 * Adds .visible class when element enters viewport.
 */
export function useElementReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * useLuxuryReveal — attaches a single IntersectionObserver to ALL
 * .luxury-reveal elements on the page.
 *
 * Initial state: opacity 0, translateY(40px) scale(0.97) — set via CSS.
 * Visible state: adds class "is-visible" — CSS handles the transition.
 * Stagger: elements with data-delay="X" (ms) get that delay before reveal.
 *
 * PERFORMANCE: single shared observer, unobserves after animate, no scroll listeners.
 */
export function useLuxuryReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      const elements = document.querySelectorAll<HTMLElement>(".luxury-reveal");
      for (const el of elements) {
        el.classList.add("is-visible");
        el.style.transitionDelay = "0ms";
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
            if (delay > 0) {
              setTimeout(() => {
                el.classList.add("is-visible");
              }, delay);
            } else {
              el.classList.add("is-visible");
            }
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    // Observe all .luxury-reveal elements currently in the DOM
    const elements = document.querySelectorAll<HTMLElement>(".luxury-reveal");
    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, []);
}
