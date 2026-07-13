import { useRef } from "react";
import { JaliBackground, RotatingGeometric } from "./Ornaments";
import { Magnetic } from "./Motion";
import { useReducedMotion, useScrollRaf, clamp } from "../hooks";

const NAME = "Shiv Shekhar";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shivshekhar" },
  { label: "GitHub", href: "https://github.com/shivshekhar12" },
  { label: "Email", href: "mailto:shivshekhar12@gmail.com" },
  { label: "Resume", href: "/ShivShekhar_Resume.pdf", download: true },
];

/*
 * Hero: letters blur-in one by one on load; the whole block scales, fades and
 * blurs away as you scroll past it (scroll-linked, mutated via rAF).
 */
export default function Hero({ c }) {
  const contentRef = useRef(null);
  const jaliRef = useRef(null);
  const geoARef = useRef(null);
  const geoBRef = useRef(null);
  const hintRef = useRef(null);
  const reduced = useReducedMotion();

  useScrollRaf((y) => {
    if (reduced) return;
    const vh = window.innerHeight || 800;
    const p = clamp(y / (vh * 0.85));
    const el = contentRef.current;
    if (el) {
      el.style.opacity = `${1 - p * 1.05}`;
      el.style.transform = `translateY(${p * 64}px) scale(${1 - p * 0.12})`;
      el.style.filter = `blur(${p * 9}px)`;
    }
    if (jaliRef.current) jaliRef.current.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
    if (geoARef.current) geoARef.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
    if (geoBRef.current) geoBRef.current.style.transform = `translate3d(0, ${y * -0.05}px, 0)`;
    if (hintRef.current) hintRef.current.style.opacity = `${clamp(1 - p * 3)}`;
  });

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", position: "relative", padding: "120px 24px 80px",
        textAlign: "center", overflow: "hidden",
      }}
    >
      <div ref={jaliRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <JaliBackground c={c} />
      </div>
      <div ref={geoARef} style={{ position: "absolute", top: "5%", left: "-5%", pointerEvents: "none", willChange: "transform" }}>
        <RotatingGeometric c={c} size={450} speed={90} opacity={0.05} />
      </div>
      <div ref={geoBRef} style={{ position: "absolute", bottom: "0%", right: "-8%", pointerEvents: "none", willChange: "transform" }}>
        <RotatingGeometric c={c} size={380} speed={120} reverse opacity={0.04} />
      </div>

      <div ref={contentRef} style={{ position: "relative", zIndex: 1, willChange: "transform, opacity, filter" }}>
        <div style={{ animation: "fadeDown 1.2s var(--ease-out)" }}>
          <svg width="340" height="160" viewBox="0 0 340 160" style={{ display: "block", margin: "0 auto" }}>
            <path d="M20 160 L20 55 Q20 5 170 5 Q320 5 320 55 L320 160" fill="none" stroke={c.cobalt} strokeWidth="1.2" opacity="0.3"
              strokeDasharray="800" style={{ animation: "drawStroke 3s ease forwards" }} />
            <path d="M40 160 L40 60 Q40 22 170 22 Q300 22 300 60 L300 160" fill="none" stroke={c.turquoise} strokeWidth="0.7" opacity="0.2" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const x = 65 + i * 26;
              return <path key={i} d={`M${x} 62 Q${x + 5} 42 ${x + 13} 42 Q${x + 21} 42 ${x + 26} 62`} fill="none" stroke={c.cobalt} strokeWidth="0.6" opacity="0.25" />;
            })}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const x = 78 + i * 26;
              return <path key={`b${i}`} d={`M${x} 62 Q${x + 4} 48 ${x + 11} 48 Q${x + 18} 48 ${x + 22} 62`} fill="none" stroke={c.turquoise} strokeWidth="0.4" opacity="0.18" />;
            })}
            <circle cx="170" cy="42" r="7" fill="none" stroke={c.gold} strokeWidth="0.8" opacity="0.4" />
            <circle cx="170" cy="42" r="3" fill={c.gold} opacity="0.2" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line key={a} x1="170" y1="35" x2="170" y2="30" stroke={c.gold} strokeWidth="0.5" opacity="0.3" transform={`rotate(${a} 170 42)`} />
            ))}
          </svg>
        </div>

        <h1
          aria-label={NAME}
          style={{
            fontFamily: "var(--serif)", fontSize: "clamp(44px, 7vw, 82px)", fontWeight: 300,
            letterSpacing: 8, marginTop: -12, lineHeight: 1.1,
          }}
        >
          {NAME.split(" ").map((word, w) => (
            <span key={w} aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: w === 0 ? "0.3em" : 0 }}>
              {word.split("").map((ch, i) => (
                <span key={ch + i} className="hero-letter" style={{ animationDelay: `${0.35 + (w * 4 + i) * 0.055}s` }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div style={{ marginTop: 18, fontSize: 14, letterSpacing: 3.5, textTransform: "uppercase", color: c.textMuted, opacity: 0, animation: "fadeUp 1s var(--ease-out) 1.15s forwards" }}>
          CS & Mathematics @ Rutgers &nbsp;&middot;&nbsp; <span className="hero-shimmer">Software Engineer</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 13, letterSpacing: 1.2, color: c.textMuted, fontWeight: 300, opacity: 0, animation: "fadeUp 1s var(--ease-out) 1.3s forwards" }}>
          Expected Jan 2027
        </div>

        <div style={{ marginTop: 34, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fadeUp 1s var(--ease-out) 1.45s forwards" }}>
          {LINKS.map((l) => (
            <Magnetic key={l.label} strength={0.22}>
              <a
                className="hero-chip"
                href={l.href}
                target={l.download || l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                download={l.download ? "ShivShekhar_Resume.pdf" : undefined}
              >
                {l.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>

      <div ref={hintRef} style={{ position: "absolute", bottom: 36, opacity: 0, animation: "fadeUp 1.5s ease 1.8s both" }}>
        <svg width="18" height="28" viewBox="0 0 18 28" style={{ opacity: 0.3 }}>
          <rect x="1" y="1" width="16" height="26" rx="8" fill="none" stroke={c.textMuted} strokeWidth="1.2" />
          <circle cx="9" cy="9" r="2" fill={c.gold} style={{ animation: "gentlePulse 2s ease-in-out infinite" }} />
        </svg>
      </div>
    </section>
  );
}
