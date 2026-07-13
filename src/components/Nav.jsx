import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../data";
import { useScrollRaf } from "../hooks";

/* Floating glass pill nav with a sliding active-section indicator. */
export default function Nav({ dark, setDark, active, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [ind, setInd] = useState({ left: 0, width: 0, ready: false });
  const linkRefs = useRef({});

  useScrollRaf((y) => setScrolled(y > 40));

  useEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active];
      if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    };
    measure();
    window.addEventListener("resize", measure);
    // re-measure once webfonts settle so the pill lands on the right glyph widths
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const go = (id) => {
    scrollTo(id);
    setNavOpen(false);
  };

  return (
    <>
      <nav className={`nav-pill ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => go("about")}>SS</div>
        <div className="nav-desk nav-links">
          <div
            className="nav-indicator"
            style={{ left: ind.left, width: ind.width, opacity: ind.ready ? 1 : 0 }}
          />
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              ref={(el) => { linkRefs.current[item.id] = el; }}
              className={`nav-link ${active === item.id ? "active" : ""}`}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className="theme-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <line key={a} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${a} 12 12)`} />
                ))}
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
        <button className="mob-tog" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          {navOpen ? "✕" : "☰"}
        </button>
      </nav>

      {navOpen && (
        <div className="mob-menu">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className={`nav-link ${active === item.id ? "active" : ""}`}
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            className="theme-btn"
            style={{ marginTop: 16, opacity: 0, animation: "fadeUp 0.55s var(--ease-out) 0.45s forwards" }}
            onClick={() => { setDark(!dark); setNavOpen(false); }}
            aria-label="Toggle theme"
          >
            {dark ? "☀" : "☾"}
          </button>
        </div>
      )}
    </>
  );
}
