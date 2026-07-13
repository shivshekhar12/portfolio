/* ───────── palette ───────── */
export const PALETTES = {
  light: {
    bg: "#F8F4EC",
    bgAlt: "#F0EBE0",
    bgCard: "#FFFFFF",
    text: "#1A1A2E",
    textMuted: "#5C5470",
    gold: "#C8962E",
    goldDeep: "#A67A1E",
    goldLight: "#E8C973",
    cobalt: "#1B4B8A",
    cobaltLight: "#2D6DC2",
    turquoise: "#1A8F8F",
    turquoiseLight: "#2BB5B5",
    tileBlue: "#1E3F6F",
    tileCyan: "#2A9D9D",
    cream: "#F5EDE0",
    border: "rgba(27,75,138,0.12)",
    shadow: "rgba(26,26,46,0.08)",
    patternFill: "rgba(27,75,138,0.04)",
    patternStroke: "rgba(27,75,138,0.10)",
    tileBand: "rgba(27,75,138,0.06)",
    glass: "rgba(248,244,236,0.68)",
    glassStrong: "rgba(248,244,236,0.92)",
  },
  dark: {
    bg: "#0C1425",
    bgAlt: "#101B33",
    bgCard: "#14203A",
    text: "#E4DED2",
    textMuted: "#9A8F80",
    gold: "#D4A843",
    goldDeep: "#E8C065",
    goldLight: "#B8922E",
    cobalt: "#4A8FDD",
    cobaltLight: "#6AAFEE",
    turquoise: "#3CC5C5",
    turquoiseLight: "#5CE0E0",
    tileBlue: "#3A7ACC",
    tileCyan: "#3CC5C5",
    cream: "#1A2744",
    border: "rgba(212,168,67,0.15)",
    shadow: "rgba(0,0,0,0.35)",
    patternFill: "rgba(74,143,221,0.04)",
    patternStroke: "rgba(74,143,221,0.08)",
    tileBand: "rgba(74,143,221,0.05)",
    glass: "rgba(12,20,37,0.62)",
    glassStrong: "rgba(12,20,37,0.92)",
  },
};

/* ───────── data ───────── */
export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "courses", label: "Courses" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

export const EXPERIENCE = [
  {
    company: "Arka",
    badge: "Y-Combinator",
    role: "Software Engineering Intern",
    date: "July 2025 -- Dec 2025",
    bullets: [
      "Led a team of 4 engineers delivering customer-facing, internal, and business-facing systems, serving as technical lead and product owner",
      "Implemented a Python ML layer (scikit-learn, Prophet, LangChain) for RFM-based customer segmentation, churn-risk scoring (~88% accuracy), and revenue forecasting within 10% of actuals",
      "Built a warehouse management system and co-developed a box assortment optimization algorithm generating $1M+ in annual revenue gains",
      "Built an AI-driven packaging design tool with 2D/3D visualization, integrating Google Vertex AI with RAG over internal templates",
    ],
  },
  {
    company: "Paramount",
    role: "Software Engineering Intern",
    date: "June 2024 -- Jan 2025",
    location: "New York City, NY",
    bullets: [
      "Collaborated on data collection systems tracking 1M+ monthly user interactions across web, mobile, and connected TV platforms",
      "Optimized event-driven tracking by validating and debugging in-house user journey systems, improving data accuracy by 25%",
      "Developed and maintained API integrations to synchronize tracking data across analytics platforms, reducing manual processing by 30%",
      "Prototyped user interaction flows in Figma to improve UX clarity and communicate design intent to engineering teams",
    ],
  },
  {
    company: "Gigs Live",
    badge: "Y-Combinator",
    role: "Software Engineering Intern",
    date: "Jan 2024 -- May 2024",
    bullets: [
      "Built a real-time video pipeline using OpenCV to dynamically overlay targeted advertisements onto live stream frames",
      "Developed a rule-based personalization engine matching ad content to viewers via watch history, demographics, and location",
      "Improved frontend rendering performance by optimizing page elements, video previews, and carousel interactions",
      "Automated frame-level product insertion to eliminate manual ad placement for sponsorship deliverables",
    ],
  },
];

export const PROJECTS = [
  { name: "HF Cross-Exchange Arbitrage Engine", tech: "C++, libcurl, Multithreading, JSON", desc: "Multi-threaded arbitrage engine detecting real-time price discrepancies across Binance, Coinbase, and Kraken with sub-50ms decision latency for high-frequency trading.", link: null },
  { name: "Financial News Sentiment Tracker", tech: "Python, PyTorch, Hugging Face, Scikit-learn", desc: "Fine-tuned RoBERTa-based NLP model on 250K+ headlines achieving 95% accuracy, outperforming VADER by 12%. Built real-time inference with sub-200ms latency.", link: "https://github.com/shivshekhar12/News-Sentiment-Analysis" },
  { name: "RUHealthy", tech: "Python, Selenium, BeautifulSoup, Flask, Swift", desc: "Automated nutrition tracking pipeline scraping Rutgers dining hall data via GitHub Actions. Built a Flask web interface and Swift iOS prototype adopted by students on campus.", link: "https://github.com/shivshekhar12/RUHealthy" },
];

export const SKILLS = {
  Languages: ["Java", "Python", "C", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Swift"],
  Frameworks: ["React", "Next.js", "Angular", "Node.js", "Flask", "Django", "FastAPI", "PyTorch", "Hugging Face"],
  Tools: ["Git", "Docker", "Kubernetes", "AWS", "Google Cloud", "Linux", "CI/CD", "Jira"],
  Libraries: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "OpenCV", "Matplotlib", "PostgreSQL", "Selenium"],
};

export const STATS = [
  {
    from: 0, to: 1000000, suffix: "+",
    format: (v) => { const m = v / 1000000; return `$${m >= 1 ? "1" : m.toFixed(1)}M`; },
    label: "Annual revenue unlocked at Arka",
  },
  {
    from: 0, to: 1000000, suffix: "+",
    format: (v) => (v >= 999500 ? "1M" : `${Math.round(v / 1000)}K`),
    label: "Monthly interactions tracked at Paramount",
  },
  {
    from: 0, to: 88, suffix: "%",
    format: (v) => `${Math.round(v)}`,
    label: "Churn-risk model accuracy",
  },
  {
    from: 200, to: 50, prefix: "<", suffix: "ms",
    format: (v) => `${Math.round(v)}`,
    label: "Arbitrage decision latency",
  },
];

export const CS_COURSES = [
  "Intro to Computer Science", "Data Structures", "Discrete Structures I",
  "Computer Architecture", "Systems Programming", "Software Methodology",
  "Principles of Information & Data Management", "Design & Analysis of Computer Algorithms",
];

export const MATH_COURSES = [
  "Calculus I for Math/Physics", "Calculus II for Math", "Intro to Linear Algebra",
  "Intro to Mathematical Reasoning", "Multivariable Calculus", "Elementary Differential Equations",
  "Linear Optimization", "Mathematical Theory of Probability", "Linear Algebra",
  "Intro to Mathematical Finance", "History of Mathematics",
];

export const HOBBIES = ["Gym / Powerlifting", "Soccer", "Cricket", "Cooking", "Travel"];
