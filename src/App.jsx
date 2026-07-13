import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { PALETTES, NAV_ITEMS } from "./data";
import { useScrollRaf } from "./hooks";
import { ScrollProgress } from "./components/Motion";
import { TileBandDivider } from "./components/Ornaments";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { About, Experience, Projects, Skills, Courses, Hobbies, Resume, Contact } from "./components/Sections";

/* the gallery carries ~900KB of embedded photos — split it out of the main bundle */
const Travel = lazy(() => import("./components/Travel"));

export default function Portfolio() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const c = dark ? PALETTES.dark : PALETTES.light;

  /* push the active palette into CSS custom properties */
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(c).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
    root.style.colorScheme = dark ? "dark" : "light";
  }, [c, dark]);

  useScrollRaf(() => {
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      const el = document.getElementById(NAV_ITEMS[i].id);
      if (el && el.getBoundingClientRect().top <= 130) {
        setActiveSection(NAV_ITEMS[i].id);
        return;
      }
    }
    setActiveSection(NAV_ITEMS[0].id);
  });

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <ScrollProgress />
      <Nav dark={dark} setDark={setDark} active={activeSection} scrollTo={scrollTo} />

      <Hero c={c} />
      <TileBandDivider c={c} />
      <About c={c} />
      <TileBandDivider c={c} />
      <Experience c={c} />
      <TileBandDivider c={c} />
      <Projects c={c} />
      <TileBandDivider c={c} />
      <Skills c={c} />
      <TileBandDivider c={c} />
      <Courses c={c} />
      <TileBandDivider c={c} />
      <Hobbies c={c} />
      <TileBandDivider c={c} />
      <Suspense fallback={<div style={{ minHeight: 480 }} />}>
        <Travel c={c} />
      </Suspense>
      <Resume c={c} />
      <TileBandDivider c={c} />
      <Contact c={c} />
    </div>
  );
}
