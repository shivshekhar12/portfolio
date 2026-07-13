import { useEffect, useRef, useState } from "react";

/* Fires once when the element scrolls into view. */
export const useInView = (threshold = 0.12, rootMargin = "0px 0px -6% 0px") => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, vis];
};

export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
};

/*
 * rAF-throttled scroll subscription. The callback mutates DOM nodes directly
 * (via refs) instead of setting React state, so scroll-linked effects never
 * trigger re-renders.
 */
export const useScrollRaf = (callback) => {
  const cbRef = useRef(callback);
  useEffect(() => { cbRef.current = callback; });
  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const run = () => {
      ticking = false;
      cbRef.current(window.scrollY);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(run);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
};

export const clamp = (v, min = 0, max = 1) => Math.min(Math.max(v, min), max);
