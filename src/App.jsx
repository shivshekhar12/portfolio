import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const RESUME_URL = `${import.meta.env.BASE_URL}ShivShekhar_Resume.pdf`
const EMAIL = 'shivshekhar12@gmail.com'
const GITHUB = 'https://github.com/shivshekhar12'
const LINKEDIN = 'https://linkedin.com/in/shivshekhar'

/* ────────────────────────── data ────────────────────────── */

const EXPERIENCE = [
  {
    company: 'ARKA (Y COMBINATOR)',
    role: 'Software Engineering Intern',
    dates: 'JUL 2025 – DEC 2025',
    len: '06:00',
    bullets: [
      'Led a team of 4 engineers delivering customer-facing, internal, and business-facing systems as technical lead and product owner.',
      'Built a Python ML layer (scikit-learn, Prophet, LangChain) across 4–5 data sources for RFM segmentation, churn-risk scoring (~88% accuracy), and revenue forecasting within 10% of actuals.',
      'Built a warehouse management system and co-developed a box assortment optimization algorithm generating $1M+ in annual revenue gains for clients.',
      'Built an AI-driven packaging design tool with 2D/3D visualization using Google Vertex AI + RAG, reducing design time by ~20%.',
    ],
  },
  {
    company: 'PARAMOUNT',
    role: 'Software Engineering Intern · New York City',
    dates: 'JUN 2024 – JAN 2025',
    len: '08:00',
    bullets: [
      'Designed and implemented data collection systems tracking 1M+ monthly user interactions across web, mobile, and connected TV.',
      'Optimized event-driven tracking and debugged user journey systems, improving data accuracy by 25% for real-time business intelligence.',
      'Developed API integrations to synchronize tracking data across analytics platforms, reducing manual processing by 30%.',
      'Prototyped user interaction flows in Figma to communicate design intent to engineering teams.',
    ],
  },
  {
    company: 'GIGS LIVE (Y COMBINATOR)',
    role: 'Software Engineering Intern',
    dates: 'JAN 2024 – MAY 2024',
    len: '05:00',
    bullets: [
      'Built a real-time video pipeline using OpenCV to dynamically overlay targeted ads onto live stream frames, validated across 3 production streams.',
      'Developed a rule-based personalization engine matching ad content to viewers via watch history, demographics, and location signals.',
      'Improved frontend rendering performance across page elements, video previews, and carousels, cutting load latency.',
      'Automated frame-level product insertion, accelerating turnaround for sponsorship deliverables.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'HIGH-FREQUENCY ARBITRAGE ENGINE',
    stack: 'C++ · libcurl · Multithreading · JSON',
    len: '00:50',
    bullets: [
      'Multi-threaded arbitrage engine detecting real-time price discrepancies across Binance, Coinbase, and Kraken with sub-50ms decision latency.',
      'Low-latency parallel HTTP pipelines with fee-aware route analysis to compute precise net profitability.',
    ],
  },
  {
    name: 'FINANCIAL NEWS SENTIMENT TRACKER',
    stack: 'Python · PyTorch · Hugging Face · Scikit-learn',
    len: '02:00',
    bullets: [
      'Fine-tuned a RoBERTa-based NLP model on 250K+ news headlines to 95% accuracy, outperforming VADER by 12%.',
      'Built real-time inference infrastructure with sub-200ms latency for investor decision-making.',
    ],
  },
  {
    name: 'RUHEALTHY',
    stack: 'Python · Selenium · Flask · SQLite3 · Swift',
    len: '03:30',
    bullets: [
      'Automated nutrition pipeline scraping Rutgers dining hall data on a schedule via GitHub Actions into SQLite3.',
      'Flask/JS web app (plus Swift iOS prototype) for students to log and analyze daily nutrition — adopted across campus after a hackathon demo.',
    ],
  },
]

const SKILLS = [
  {
    label: 'LANGUAGES',
    items: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS', 'Swift'],
  },
  {
    label: 'FRAMEWORKS',
    items: ['PyTorch', 'React', 'Next.js', 'Node.js', 'Flask', 'Django', 'FastAPI', 'Angular', 'HF Transformers'],
  },
  {
    label: 'TOOLS',
    items: ['Git', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'AWS', 'Google Cloud', 'Jira'],
  },
  {
    label: 'LIBRARIES',
    items: ['NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'TensorFlow', 'Selenium', 'PostgreSQL', 'SQLite3'],
  },
]

const TABS = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'CONTACT']

/* ────────────────────────── boot screen ────────────────────────── */

const MEM_TOTAL = 65536
const BOOT_LINES = [
  { text: 'SHEKHAR SYSTEMS PERSONAL COMPUTER', d: 500 },
  { text: 'ROM BIOS v2.6 — (C) 2026 SHIV SHEKHAR', d: 260 },
  { text: '', d: 140 },
  { text: 'CPU  : RUTGERS CORE CS+MATH @ 3.14 GHZ', d: 320 },
  { mem: true, d: 40 },
  { text: '', d: 140 },
  { text: 'DETECTING DRIVES ...', d: 460 },
  { text: '  HDD0 : EXPERIENCE.SYS .......... OK', d: 340 },
  { text: '  HDD1 : PROJECTS.DAT ........... OK', d: 340 },
  { text: '  HDD2 : SKILLS.CFG ............. OK', d: 340 },
  { text: '', d: 160 },
  { text: 'BOOTING SHIV.EXE', d: 480 },
  { text: 'LOADING PORTFOLIO PLAYER v1.0 ......', d: 700 },
]

function BootScreen({ onDone }) {
  const [count, setCount] = useState(0)
  const [mem, setMem] = useState(0)
  const done = useRef(false)

  const finish = useCallback(() => {
    if (!done.current) {
      done.current = true
      onDone()
    }
  }, [onDone])

  useEffect(() => {
    const line = BOOT_LINES[count]
    if (!line) {
      const t = setTimeout(finish, 650)
      return () => clearTimeout(t)
    }
    if (line.mem && mem < MEM_TOTAL) {
      const t = setTimeout(() => setMem((m) => Math.min(m + 4096, MEM_TOTAL)), 28)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount((c) => c + 1), line.d)
    return () => clearTimeout(t)
  }, [count, mem, finish])

  useEffect(() => {
    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [finish])

  return (
    <div className="boot">
      <div className="boot-text">
        {BOOT_LINES.slice(0, count + 1).map((line, i) =>
          line.mem ? (
            <div key={i}>
              MEMORY TEST : {mem}K{mem === MEM_TOTAL ? ' OK' : ''}
            </div>
          ) : (
            <div key={i}>{line?.text ?? ' '}</div>
          ),
        )}
        <span className="boot-cursor">█</span>
      </div>
      <div className="boot-skip">PRESS ANY KEY TO SKIP</div>
    </div>
  )
}

/* ────────────────────────── LCD ────────────────────────── */

const MARQUEE =
  "SHIV SHEKHAR ✦ SOFTWARE ENGINEER ✦ CS + MATH @ RUTGERS '27 ✦ 3X SWE INTERN · 2X Y COMBINATOR ✦ ML · FULL-STACK · SYSTEMS ✦ "

function Lcd({ playing, secs, tab }) {
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return (
    <div className="lcd">
      <div className="lcd-marquee">
        <div className={`lcd-marquee-inner${playing ? '' : ' paused'}`}>
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>
      <div className="lcd-main">
        <div className="lcd-time">
          {playing ? '▶' : '❚❚'} {mm}:{ss}
        </div>
        <div className="lcd-title">
          <div className="lcd-name">SHIV SHEKHAR</div>
          <div className="lcd-sub">SOFTWARE ENGINEER · CS &amp; MATH @ RUTGERS</div>
        </div>
        <div className={`vu${playing ? '' : ' paused'}`} aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${(i % 7) * -0.13}s` }} />
          ))}
        </div>
      </div>
      <div className="lcd-status">
        <span>
          TRACK {String(TABS.indexOf(tab) + 1).padStart(2, '0')}/0{TABS.length} — {tab}
        </span>
        <span>{playing ? 'PLAYING' : 'PAUSED'}</span>
      </div>
      <div className="lcd-seek">
        <div className="lcd-seek-fill" style={{ width: `${((secs % 180) / 180) * 100}%` }} />
      </div>
    </div>
  )
}

/* ────────────────────────── tab panels ────────────────────────── */

function TrackList({ items, open, setOpen, titleKey, subKey }) {
  return (
    <ol className="tracklist">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item[titleKey]} className={isOpen ? 'open' : ''}>
            <button className="track-row" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              <span className="track-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="track-title">
                <strong>{item[titleKey]}</strong>
                <em>{item[subKey]}</em>
              </span>
              <span className="track-dates">{item.dates ?? ''}</span>
              <span className="track-len">{item.len}</span>
            </button>
            {isOpen && (
              <ul className="track-detail">
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function AboutPanel() {
  return (
    <div className="panel-about">
      <p className="about-kicker">✦ NOW PLAYING ✦</p>
      <h1 className="about-headline">
        HI, I&apos;M <span>SHIV.</span>
        <br />I BUILD SOFTWARE THAT SHIPS.
      </h1>
      <p className="about-bio">
        Software engineer studying <b>Computer Science &amp; Mathematics at Rutgers</b> (&apos;27). Three
        internships deep — two at Y&nbsp;Combinator startups, one at Paramount — building ML pipelines,
        real-time systems, and full-stack products that made real money for real users. Stanford Online
        Machine Learning Specialization on the side.
      </p>
      <div className="about-cards">
        <div className="about-card">
          <span className="about-card-label">EDUCATION</span>
          Rutgers University — BS Computer Science &amp; BA Mathematics · 2023–2027
        </div>
        <div className="about-card">
          <span className="about-card-label">LATEST</span>
          SWE Intern @ Arka (YC) — led a team of 4, shipped ML + warehouse systems worth $1M+/yr to clients
        </div>
      </div>
      <div className="about-actions">
        <a className="btn-retro primary" href={RESUME_URL} target="_blank" rel="noreferrer">
          ▶ VIEW RESUME
        </a>
        <a className="btn-retro" href={GITHUB} target="_blank" rel="noreferrer">
          GITHUB
        </a>
        <a className="btn-retro" href={LINKEDIN} target="_blank" rel="noreferrer">
          LINKEDIN
        </a>
      </div>
    </div>
  )
}

function SkillsPanel() {
  return (
    <div className="panel-skills">
      {SKILLS.map((group, g) => (
        <div className="skill-group" key={group.label}>
          <div className="skill-label">
            <span className="skill-band">EQ·{String(g + 1).padStart(2, '0')}</span> {group.label}
          </div>
          <div className="skill-chips">
            {group.items.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ContactPanel() {
  const rows = [
    { label: 'EMAIL', value: EMAIL, href: `mailto:${EMAIL}` },
    { label: 'GITHUB', value: 'github.com/shivshekhar12', href: GITHUB },
    { label: 'LINKEDIN', value: 'linkedin.com/in/shivshekhar', href: LINKEDIN },
    { label: 'RESUME', value: 'ShivShekhar_Resume.pdf', href: RESUME_URL },
  ]
  return (
    <div className="panel-contact">
      <p className="contact-blurb">
        INSERT COIN TO CONTINUE — or just reach out. Open to internships &amp; new-grad roles.
      </p>
      {rows.map((r) => (
        <a className="contact-row" key={r.label} href={r.href} target="_blank" rel="noreferrer">
          <span className="contact-label">▶ {r.label}</span>
          <span className="contact-value">{r.value}</span>
        </a>
      ))}
    </div>
  )
}

/* ────────────────────────── player ────────────────────────── */

function Player() {
  const [tab, setTab] = useState('ABOUT')
  const [playing, setPlaying] = useState(true)
  const [secs, setSecs] = useState(0)
  const [openExp, setOpenExp] = useState(0)
  const [openProj, setOpenProj] = useState(0)

  useEffect(() => {
    if (!playing) return undefined
    const t = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [playing])

  const switchTab = (next) => {
    setTab(next)
    setSecs(0)
  }
  const step = (dir) => {
    const i = TABS.indexOf(tab)
    switchTab(TABS[(i + dir + TABS.length) % TABS.length])
  }

  return (
    <div className="stage">
      <div className="chassis crt-on">
        <div className="screw tl" /> <div className="screw tr" />
        <div className="screw bl" /> <div className="screw br" />

        <div className="titlebar">
          <span className="led" />
          <span className="titlebar-text">SHIV SHEKHAR — PORTFOLIO PLAYER v1.0</span>
          <span className="titlebar-btns" aria-hidden="true">
            <i>▁</i>
            <i>▢</i>
            <i>✕</i>
          </span>
        </div>

        <Lcd playing={playing} secs={secs} tab={tab} />

        <div className="controls">
          <div className="transport">
            <button onClick={() => step(-1)} aria-label="Previous tab">
              ⏮
            </button>
            <button className="play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? '❚❚' : '▶'}
            </button>
            <button onClick={() => step(1)} aria-label="Next tab">
              ⏭
            </button>
          </div>
          <nav className="tabs" aria-label="Sections">
            {TABS.map((t) => (
              <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => switchTab(t)}>
                {t}
              </button>
            ))}
          </nav>
        </div>

        <main className="window" key={tab}>
          {tab === 'ABOUT' && <AboutPanel />}
          {tab === 'EXPERIENCE' && (
            <TrackList items={EXPERIENCE} open={openExp} setOpen={setOpenExp} titleKey="company" subKey="role" />
          )}
          {tab === 'PROJECTS' && (
            <TrackList items={PROJECTS} open={openProj} setOpen={setOpenProj} titleKey="name" subKey="stack" />
          )}
          {tab === 'SKILLS' && <SkillsPanel />}
          {tab === 'CONTACT' && <ContactPanel />}
        </main>

        <div className="statusbar">
          <span>READY. {TABS.length} TRACKS LOADED.</span>
          <span className="statusbar-blink">█</span>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────── app ────────────────────────── */

export default function App() {
  const [phase, setPhase] = useState('boot') // boot → flash → player

  const bootDone = useCallback(() => {
    setPhase('flash')
    setTimeout(() => setPhase('player'), 450)
  }, [])

  return (
    <div className="crt">
      {phase === 'boot' && <BootScreen onDone={bootDone} />}
      {phase === 'flash' && <div className="crt-flash" />}
      {phase === 'player' && <Player />}
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </div>
  )
}
