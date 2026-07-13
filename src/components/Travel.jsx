import { useCallback, useEffect, useRef, useState } from "react";
import { TRAVEL_PHOTOS } from "../photos";
import { MuqarnasHeader, RotatingGeometric } from "./Ornaments";
import { Reveal, Drift } from "./Motion";
import { useReducedMotion } from "../hooks";

const INTERVAL = 5200;

/*
 * Travel gallery: stacked crossfading slides with a slow Ken Burns settle,
 * autoplay progress bar, swipe, arrow keys, and hover-to-pause.
 */
export default function Travel({ c }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const touchX = useRef(null);
  const total = TRAVEL_PHOTOS.length;

  const go = useCallback((dir) => setCurrent((p) => (p + dir + total) % total), [total]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [paused, reduced, go, current]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section id="travel" style={{ maxWidth: 1100, margin: "0 auto", padding: "88px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "-6%", pointerEvents: "none" }}>
        <Drift factor={-0.05}><RotatingGeometric c={c} size={280} speed={140} opacity={0.025} /></Drift>
      </div>
      <MuqarnasHeader c={c} title="Travels" />
      <Reveal delay={0.1}>
        <div
          className={`gal-frame ${paused ? "paused" : ""}`}
          tabIndex={0}
          role="region"
          aria-label="Travel photo gallery"
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {TRAVEL_PHOTOS.map((ph, i) => (
            <img
              key={i}
              className={`gal-img ${i === current ? "active" : ""}`}
              src={ph.src}
              alt={ph.caption}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}

          {/* arch frame overlay */}
          <svg width="100%" height="100%" viewBox="0 0 860 538" preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            <path d="M0 538 L0 40 Q0 0 430 0 Q860 0 860 40 L860 538" fill="none" stroke={c.gold} strokeWidth="1.5" opacity="0.15" />
          </svg>

          <div className="gal-caption">
            <span key={current}>{TRAVEL_PHOTOS[current].caption}</span>
          </div>

          {!reduced && <div key={`p${current}`} className="gal-progress" />}

          <button className="gal-arrow left" onClick={() => go(-1)} aria-label="Previous photo">&#8249;</button>
          <button className="gal-arrow right" onClick={() => go(1)} aria-label="Next photo">&#8250;</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          {TRAVEL_PHOTOS.map((photo, idx) => (
            <button
              key={idx}
              className={`gal-thumb ${idx === current ? "active" : ""}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Show photo: ${photo.caption}`}
            >
              <img src={photo.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14 }}>
          {TRAVEL_PHOTOS.map((photo, idx) => (
            <button
              key={idx}
              className={`gal-dot ${idx === current ? "active" : ""}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
