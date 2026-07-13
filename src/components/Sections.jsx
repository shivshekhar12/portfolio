import { useRef } from "react";
import { EXPERIENCE, PROJECTS, SKILLS, STATS, CS_COURSES, MATH_COURSES, HOBBIES } from "../data";
import { MuqarnasHeader, RotatingGeometric, JaliBackground } from "./Ornaments";
import { Reveal, TiltCard, Magnetic, CountUp, Drift } from "./Motion";
import { useReducedMotion, useScrollRaf, clamp } from "../hooks";

const ABOUT_TEXT =
  "I'm a Computer Science and Mathematics student at Rutgers University with a focus on building software that solves real problems. " +
  "With experience spanning Y-Combinator startups to Paramount, I bring a blend of scrappy startup energy and large-scale engineering rigor. " +
  "I'm drawn to the intersection of machine learning, systems design, and product thinking -- and I'm always looking for the next challenge to grow into.";

/* About: each word lights up in sequence as the paragraph scrolls through the viewport. */
export const About = ({ c }) => {
  const boxRef = useRef(null);
  const wordRefs = useRef([]);
  const reduced = useReducedMotion();
  const words = ABOUT_TEXT.split(" ");

  useScrollRaf(() => {
    const box = boxRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const p = reduced ? 1 : clamp((vh * 0.82 - r.top) / (r.height + vh * 0.3));
    const litCount = p * words.length;
    wordRefs.current.forEach((w, i) => {
      if (!w) return;
      const lit = i < litCount;
      w.style.opacity = lit ? "1" : "0.16";
      w.style.filter = lit ? "blur(0)" : "blur(1px)";
    });
  });

  return (
    <>
      <section style={{ maxWidth: 880, margin: "0 auto", padding: "96px 24px 72px" }}>
        <p
          ref={boxRef}
          style={{
            fontSize: "clamp(24px, 3.2vw, 38px)", lineHeight: 1.65, color: c.text,
            fontWeight: 400, textAlign: "center", fontFamily: "var(--serif)",
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              style={{ opacity: 0.16, transition: "opacity 0.45s ease, filter 0.45s ease" }}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 88px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="card" style={{ textAlign: "center", padding: "32px 20px", height: "100%" }}>
                <div className="stat-num">
                  {s.prefix}
                  <CountUp from={s.from} to={s.to} format={s.format} />
                  {s.suffix}
                </div>
                <div style={{ marginTop: 12, fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: c.textMuted, lineHeight: 1.6 }}>
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

/* Experience: timeline whose gold line draws downward with scroll, dots ignite as it passes. */
export const Experience = ({ c }) => {
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const dotRefs = useRef([]);

  useScrollRaf(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;
    const r = track.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const p = clamp((vh * 0.72 - r.top) / r.height);
    fill.style.height = `${p * 100}%`;
    dotRefs.current.forEach((d) => {
      if (!d) return;
      d.classList.toggle("lit", d.getBoundingClientRect().top < vh * 0.72);
    });
  });

  return (
    <section id="experience" style={{ maxWidth: 920, margin: "0 auto", padding: "88px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "-12%", pointerEvents: "none" }}>
        <Drift factor={-0.06}><RotatingGeometric c={c} size={320} speed={100} opacity={0.035} /></Drift>
      </div>
      <MuqarnasHeader c={c} title="Experience" />
      <div style={{ position: "relative" }}>
        <div ref={trackRef} className="tl-track">
          <div ref={fillRef} className="tl-fill" />
        </div>
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.12} style={{ marginBottom: 48, paddingLeft: 52, position: "relative" }}>
            <div className="xp-entry">
              <div ref={(el) => { dotRefs.current[i] = el; }} className="tl-dot" />
              <span className="date-chip">{exp.date}</span>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 27, fontWeight: 500 }}>{exp.company}</h3>
                {exp.badge && <span className="badge">{exp.badge}</span>}
              </div>
              <div style={{ fontSize: 14, color: c.textMuted, marginBottom: 4, fontWeight: 500 }}>{exp.role}</div>
              {exp.location && <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 10, fontWeight: 300 }}>{exp.location}</div>}
              <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: 14, lineHeight: 1.7, color: c.textMuted, marginBottom: 7, paddingLeft: 16, position: "relative", fontWeight: 300 }}>
                    <span style={{ position: "absolute", left: 0, top: 10, width: 5, height: 5, borderRadius: "50%", border: `1px solid ${c.cobalt}`, opacity: 0.4 }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

/* Projects: 3D-tilting cards with a cursor spotlight and ghost index numerals. */
export const Projects = ({ c }) => (
  <section id="projects" style={{ maxWidth: 1000, margin: "0 auto", padding: "88px 24px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", bottom: "5%", left: "-10%", pointerEvents: "none" }}>
      <Drift factor={-0.04}><RotatingGeometric c={c} size={350} speed={130} reverse opacity={0.03} /></Drift>
    </div>
    <MuqarnasHeader c={c} title="Projects" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24 }}>
      {PROJECTS.map((proj, i) => (
        <Reveal key={proj.name} delay={i * 0.1} style={{ height: "100%" }}>
          <TiltCard>
            <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <span className="proj-num">0{i + 1}</span>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 21, fontWeight: 500, marginBottom: 8, marginTop: 8, paddingRight: 40 }}>{proj.name}</h3>
              <div style={{ fontSize: 11, letterSpacing: 1.2, color: c.cobalt, marginBottom: 12, textTransform: "uppercase" }}>{proj.tech}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: c.textMuted, fontWeight: 300, flex: 1 }}>{proj.desc}</p>
              {proj.link ? (
                <a
                  className="proj-link"
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 16, fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase" }}
                >
                  View on GitHub <span className="arrow">&rarr;</span>
                </a>
              ) : (
                <span style={{ marginTop: 16, fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: c.textMuted, opacity: 0.4 }}>Link coming soon</span>
              )}
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  </section>
);

const CATEGORY_COLORS = { Languages: "gold", Frameworks: "cobalt", Tools: "turquoise", Libraries: "cobaltLight" };

const Chip = ({ c, cat, label }) => (
  <span className="skill-chip" style={{ "--chip-c": c[CATEGORY_COLORS[cat]] }}>
    <span className="dot" />
    {label}
  </span>
);

/* Skills: infinite dual-direction marquee ribbons + categorized chips that pop in. */
export const Skills = ({ c }) => {
  const all = Object.entries(SKILLS).flatMap(([cat, items]) => items.map((s) => ({ cat, s })));
  const rowA = all.filter((_, i) => i % 2 === 0);
  const rowB = all.filter((_, i) => i % 2 === 1);
  return (
    <section id="skills" style={{ padding: "88px 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <MuqarnasHeader c={c} title="Skills" />
      </div>

      <Reveal>
        <div style={{ marginBottom: 48 }}>
          <div className="marquee">
            <div className="marquee-track" style={{ "--dur": "46s" }}>
              {[...rowA, ...rowA].map(({ cat, s }, i) => <Chip key={`${s}${i}`} c={c} cat={cat} label={s} />)}
            </div>
          </div>
          <div className="marquee">
            <div className="marquee-track reverse" style={{ "--dur": "52s" }}>
              {[...rowB, ...rowB].map(({ cat, s }, i) => <Chip key={`${s}${i}`} c={c} cat={cat} label={s} />)}
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <Reveal key={cat} delay={i * 0.08} style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 500, marginBottom: 10, color: c[CATEGORY_COLORS[cat]] }}>{cat}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {items.map((s) => <Chip key={s} c={c} cat={cat} label={s} />)}
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.3} style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, color: c.textMuted, letterSpacing: 1 }}>
            Also completed: <span style={{ color: c.gold }}>Stanford Online Machine Learning Specialization</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const Courses = ({ c }) => (
  <section id="courses" style={{ maxWidth: 1000, margin: "0 auto", padding: "88px 24px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "15%", right: "-8%", pointerEvents: "none" }}>
      <Drift factor={-0.07}><RotatingGeometric c={c} size={300} speed={110} opacity={0.03} /></Drift>
    </div>
    <MuqarnasHeader c={c} title="Coursework" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 40 }}>
      <Reveal>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 21, fontWeight: 500, marginBottom: 18, color: c.cobalt }}>Computer Science</h3>
        {CS_COURSES.map((co) => (
          <div key={co} className="course-row">
            <span className="tick" style={{ background: c.cobalt }} />{co}
          </div>
        ))}
      </Reveal>
      <Reveal delay={0.15}>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 21, fontWeight: 500, marginBottom: 18, color: c.turquoise }}>Mathematics</h3>
        {MATH_COURSES.map((co) => (
          <div key={co} className="course-row">
            <span className="tick" style={{ background: c.turquoise }} />{co}
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

export const Hobbies = ({ c }) => (
  <section id="hobbies" style={{ maxWidth: 900, margin: "0 auto", padding: "88px 24px" }}>
    <MuqarnasHeader c={c} title="Beyond Code" />
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
      {HOBBIES.map((h, i) => (
        <Reveal key={h} delay={i * 0.07}>
          <div className="card hobby-card">
            <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 500 }}>{h}</span>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export const Resume = ({ c }) => (
  <section style={{ textAlign: "center", padding: "64px 24px" }}>
    <Reveal>
      <svg width="120" height="60" viewBox="0 0 120 60" style={{ display: "block", margin: "0 auto 12px" }}>
        <path d="M10 60 L10 25 Q10 2 60 2 Q110 2 110 25 L110 60" fill="none" stroke={c.cobalt} strokeWidth="1" opacity="0.25" />
        <circle cx="60" cy="18" r="4" fill="none" stroke={c.gold} strokeWidth="0.7" opacity="0.35" />
      </svg>
      <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 28, letterSpacing: 2, marginBottom: 22 }}>Resume</h2>
      <Magnetic strength={0.18}>
        <a className="btn-gold" href="/ShivShekhar_Resume.pdf" target="_blank" rel="noopener noreferrer">
          Download PDF
        </a>
      </Magnetic>
    </Reveal>
  </section>
);

export const Contact = ({ c }) => (
  <section id="contact" style={{ position: "relative", padding: "88px 24px 56px", textAlign: "center", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
      <Drift factor={-0.08} style={{ position: "absolute", inset: 0 }}><JaliBackground c={c} /></Drift>
    </div>
    <div style={{ position: "relative", zIndex: 1 }}>
      <MuqarnasHeader c={c} title="Get in Touch" />
      <Reveal>
        <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 300, marginBottom: 34, letterSpacing: 1 }}>
          Let&rsquo;s build something worth remembering.
        </p>
        <Magnetic strength={0.18}>
          <a className="btn-gold" href="mailto:shivshekhar12@gmail.com">Say Hello</a>
        </Magnetic>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
          {[
            { label: "shivshekhar12@gmail.com", href: "mailto:shivshekhar12@gmail.com" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/shivshekhar" },
            { label: "GitHub", href: "https://github.com/shivshekhar12" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{ fontSize: 14, letterSpacing: 1.8, color: c.textMuted, textTransform: "uppercase" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>
    <div style={{ marginTop: 56, fontSize: 12, color: c.textMuted, opacity: 0.35, letterSpacing: 1.2, position: "relative", zIndex: 1 }}>
      Shiv Shekhar &middot; 2026
    </div>
  </section>
);
