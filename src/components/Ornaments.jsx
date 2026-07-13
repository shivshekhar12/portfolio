import { useId } from "react";
import { useInView } from "../hooks";

/* useId, stripped to characters that are safe inside SVG url(#…) references */
const useSvgId = (prefix) => `${prefix}_${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

/* Section header crowned with a muqarnas arch that draws itself on scroll. */
export const MuqarnasHeader = ({ c, title }) => {
  const [ref, vis] = useInView(0.35);
  return (
    <div ref={ref} className={`mh ${vis ? "vis" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
      <svg width="320" height="110" viewBox="0 0 320 110" style={{ display: "block", margin: "0 auto" }}>
        <path className="draw" pathLength="1" d="M30 110 L30 45 Q30 5 160 5 Q290 5 290 45 L290 110" fill="none" stroke={c.cobalt} strokeWidth="1.2" opacity="0.35" />
        <path className="draw" pathLength="1" d="M50 110 L50 50 Q50 20 160 20 Q270 20 270 50 L270 110" fill="none" stroke={c.turquoise} strokeWidth="0.8" opacity="0.25" style={{ transitionDelay: "0.15s" }} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const x = 80 + i * 27;
          return <path key={i} className="draw" pathLength="1" d={`M${x} 55 Q${x + 6} 38 ${x + 13.5} 38 Q${x + 21} 38 ${x + 27} 55`} fill="none" stroke={c.cobalt} strokeWidth="0.7" opacity="0.3" style={{ transitionDelay: `${0.2 + i * 0.06}s` }} />;
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 93 + i * 27;
          return <path key={`b${i}`} className="draw" pathLength="1" d={`M${x} 55 Q${x + 5} 44 ${x + 11} 44 Q${x + 17} 44 ${x + 22} 55`} fill="none" stroke={c.turquoise} strokeWidth="0.5" opacity="0.2" style={{ transitionDelay: `${0.3 + i * 0.06}s` }} />;
        })}
        <circle cx="160" cy="35" r="6" fill="none" stroke={c.gold} strokeWidth="0.8" opacity={vis ? 0.4 : 0} style={{ transition: "opacity 0.8s ease 0.7s" }} />
        <circle cx="160" cy="35" r="2.5" fill={c.gold} opacity={vis ? 0.25 : 0} style={{ transition: "opacity 0.8s ease 0.8s" }} />
        {[65, 255].map((x) => (
          <g key={x} transform={`translate(${x},52)`} opacity={vis ? 0.25 : 0} style={{ transition: "opacity 0.8s ease 0.9s" }}>
            {[0, 60, 120].map((a) => <line key={a} x1="-4" y1="0" x2="4" y2="0" stroke={c.gold} strokeWidth="0.6" transform={`rotate(${a})`} />)}
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: -16 }}>
        <svg width="80" height="20" viewBox="0 0 80 20" style={{ opacity: 0.35 }}>
          <path className="draw" pathLength="1" d="M80 10 Q65 2 50 10 Q35 18 20 10 Q10 5 0 10" fill="none" stroke={c.gold} strokeWidth="0.8" style={{ transitionDelay: "0.4s" }} />
          <circle cx="0" cy="10" r="2" fill={c.gold} opacity="0.5" />
        </svg>
        <h2 className="mh-title" style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 42, letterSpacing: 3, color: c.text, margin: 0, lineHeight: 1 }}>
          {title}
        </h2>
        <svg width="80" height="20" viewBox="0 0 80 20" style={{ opacity: 0.35, transform: "scaleX(-1)" }}>
          <path className="draw" pathLength="1" d="M80 10 Q65 2 50 10 Q35 18 20 10 Q10 5 0 10" fill="none" stroke={c.gold} strokeWidth="0.8" style={{ transitionDelay: "0.4s" }} />
          <circle cx="0" cy="10" r="2" fill={c.gold} opacity="0.5" />
        </svg>
      </div>
      <div style={{ width: vis ? 50 : 0, height: 1, background: c.gold, margin: "10px auto 0", opacity: 0.35, transition: "width 1s var(--ease-out) 0.5s" }} />
    </div>
  );
};

/* Slow-drifting band of eight-pointed star tiles between sections. */
export const TileBandDivider = ({ c }) => {
  const uid = useSvgId("tb");
  const buid = `${uid}_bd`;
  return (
    <div style={{ overflow: "hidden" }}>
      <svg className="tileband-anim" width="calc(100% + 36px)" height="36" style={{ display: "block", width: "calc(100% + 36px)" }} preserveAspectRatio="none">
        <defs>
          <pattern id={uid} x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <polygon points="18,4 21,11 28,8 24,15 31,18 24,21 28,28 21,25 18,32 15,25 8,28 12,21 5,18 12,15 8,8 15,11" fill="none" stroke={c.cobalt} strokeWidth="0.6" opacity="0.3" />
            <polygon points="18,10 20,14 24,12 22,16 26,18 22,20 24,24 20,22 18,26 16,22 12,24 14,20 10,18 14,16 12,12 16,14" fill="none" stroke={c.turquoise} strokeWidth="0.4" opacity="0.25" />
            <circle cx="18" cy="18" r="1.5" fill={c.gold} opacity="0.2" />
            <line x1="0" y1="0" x2="8" y2="8" stroke={c.cobalt} strokeWidth="0.3" opacity="0.15" />
            <line x1="36" y1="0" x2="28" y2="8" stroke={c.cobalt} strokeWidth="0.3" opacity="0.15" />
            <line x1="0" y1="36" x2="8" y2="28" stroke={c.cobalt} strokeWidth="0.3" opacity="0.15" />
            <line x1="36" y1="36" x2="28" y2="28" stroke={c.cobalt} strokeWidth="0.3" opacity="0.15" />
          </pattern>
          <pattern id={buid} x="0" y="0" width="12" height="4" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="2" r="1" fill={c.gold} opacity="0.2" />
          </pattern>
        </defs>
        <rect y="0" width="100%" height="3" fill={`url(#${buid})`} />
        <rect y="3" width="100%" height="30" fill={`url(#${uid})`} />
        <rect y="33" width="100%" height="3" fill={`url(#${buid})`} />
      </svg>
    </div>
  );
};

/* Rotating girih-style geometry used as ambient section decoration. */
export const RotatingGeometric = ({ c, size = 400, speed = 60, reverse = false, opacity: op = 0.06 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ opacity: op, animation: `spin${reverse ? "R" : ""} ${speed}s linear infinite` }}>
    {[0, 30, 60, 90, 120, 150].map((a) => (
      <rect key={a} x="80" y="20" width="40" height="160" rx="2" fill="none" stroke={c.cobalt} strokeWidth="0.5" transform={`rotate(${a} 100 100)`} />
    ))}
    <circle cx="100" cy="100" r="50" fill="none" stroke={c.turquoise} strokeWidth="0.4" />
    <circle cx="100" cy="100" r="30" fill="none" stroke={c.gold} strokeWidth="0.5" />
    <circle cx="100" cy="100" r="70" fill="none" stroke={c.cobalt} strokeWidth="0.3" />
    {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((a) => (
      <line key={a} x1="100" y1="30" x2="100" y2="10" stroke={c.gold} strokeWidth="0.3" transform={`rotate(${a} 100 100)`} />
    ))}
  </svg>
);

/* Full-bleed jali lattice backdrop. */
export const JaliBackground = ({ c }) => {
  const uid = useSvgId("jl");
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <pattern id={uid} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="12" fill="none" stroke={c.patternStroke} strokeWidth="0.4" />
          <circle cx="0" cy="0" r="12" fill="none" stroke={c.patternStroke} strokeWidth="0.4" />
          <circle cx="50" cy="0" r="12" fill="none" stroke={c.patternStroke} strokeWidth="0.4" />
          <circle cx="0" cy="50" r="12" fill="none" stroke={c.patternStroke} strokeWidth="0.4" />
          <circle cx="50" cy="50" r="12" fill="none" stroke={c.patternStroke} strokeWidth="0.4" />
          <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="none" stroke={c.patternStroke} strokeWidth="0.3" />
          <circle cx="25" cy="25" r="1.5" fill={c.gold} opacity="0.08" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${uid})`} />
    </svg>
  );
};
