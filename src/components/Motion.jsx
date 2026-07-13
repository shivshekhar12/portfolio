import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, useScrollRaf, clamp } from "../hooks";

/* Scroll-triggered reveal: rise + blur-in with Apple's expo-out easing. */
export const Reveal = ({ children, delay = 0, y = 42, style = {}, threshold = 0.08 }) => {
  const [ref, vis] = useInView(threshold);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        filter: vis ? "blur(0)" : "blur(8px)",
        transition: `opacity 1s var(--ease-out) ${delay}s, transform 1s var(--ease-out) ${delay}s, filter 1s var(--ease-out) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* 3D tilt-on-hover wrapper with a cursor-tracking spotlight. */
export const TiltCard = ({ children, max = 6, className = "", style = {} }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} className={`tilt ${className}`} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
      <div className="spotlight" />
    </div>
  );
};

/* Magnetic hover: the element leans toward the cursor, springs back on leave. */
export const Magnetic = ({ children, strength = 0.28, style = {} }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transition = "transform 0.2s var(--ease-out)";
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s var(--ease-spring)";
    el.style.transform = "translate(0, 0)";
  };
  return (
    <div ref={ref} style={{ display: "inline-block", ...style }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
};

/* Animated counter: eases from → to once scrolled into view. */
export const CountUp = ({ from = 0, to, duration = 1800, format = (v) => `${Math.round(v)}`, className, style }) => {
  const [ref, vis] = useInView(0.4);
  const [val, setVal] = useState(from);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!vis) return;
    if (reduced) { setVal(to); return; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = clamp((t - t0) / duration);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // ease-out expo
      setVal(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [vis, from, to, duration, reduced]);
  return <span ref={ref} className={className} style={style}>{format(val)}</span>;
};

/* Parallax drift: translates children by scrollY * factor, outside React renders. */
export const Drift = ({ factor = -0.08, style = {}, children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useScrollRaf((y) => {
    if (ref.current && !reduced) ref.current.style.transform = `translate3d(0, ${y * factor}px, 0)`;
  });
  return <div ref={ref} style={{ willChange: "transform", ...style }}>{children}</div>;
};

/* Thin gold progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
  const ref = useRef(null);
  useScrollRaf((y) => {
    const el = ref.current;
    if (!el) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    el.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;
  });
  return <div ref={ref} className="scroll-progress" />;
};
