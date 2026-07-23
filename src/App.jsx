import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const RESUME_URL = `${import.meta.env.BASE_URL}ShivShekhar_Resume.pdf`
const EMAIL = 'shivshekhar12@gmail.com'
const PHONE = '201-893-2919'
const GITHUB = 'https://github.com/shivshekhar12'
const LINKEDIN = 'https://linkedin.com/in/shivshekhar'

/* ────────────────────────── data ────────────────────────── */

const EXPERIENCE = [
  {
    company: 'GEICO',
    role: 'AI/ML Intern · New York City',
    dates: 'JUN 2026 – AUG 2026',
    len: '03:00',
    bullets: [
      "Rotating across AI/ML engineering teams in GEICO's Technology Development Program, contributing to production ML systems — model deployment, MLOps pipelines, and applied NLP.",
      'Working with staff and senior ML engineers on end-to-end model lifecycle management, from training and evaluation to cloud-based deployment and monitoring.',
      'Building scalable data pipelines supporting feature engineering, model training, and downstream analytics across cross-functional AI initiatives.',
      'Optimizing data pipelines and inference infrastructure to improve model reliability and scalability across insurance AI products.',
    ],
  },
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

const PRINT_SKILLS = [
  { label: 'Languages', items: 'Java, Python, C, C++, JavaScript, TypeScript, SQL, HTML, CSS, Swift' },
  {
    label: 'Developer Tools',
    items: 'VS Code, Jupyter Notebook, Git, GitHub, Jira, Kubernetes, Docker, Linux, CI/CD, AWS, Google Cloud',
  },
  {
    label: 'Frameworks',
    items: 'PyTorch, Flask, Django, React, Node.js, Next.js, Angular, FastAPI, Hugging Face Transformers',
  },
  {
    label: 'Libraries',
    items: 'NumPy, Pandas, Scikit-learn, Matplotlib, OpenCV, TensorFlow, BeautifulSoup, Selenium, SQLite3, PostgreSQL',
  },
]

const TABS = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'CONTACT']

/* ────────────────────────── pixel S logo ────────────────────────── */

const S_PIXELS = [
  [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
  [0, 1],
  [0, 2],
  [1, 3], [2, 3], [3, 3], [4, 3],
  [5, 4],
  [5, 5],
  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6],
]

function PixelS({ size = 16 }) {
  return (
    <svg
      className="pixel-s"
      width={size}
      height={size}
      viewBox="-0.5 -0.5 7 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {S_PIXELS.map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill="#45ff7a" />
      ))}
    </svg>
  )
}

/* SVG transport icons — Unicode ⏮/⏭/▶ render as emoji on mobile */
function IconPrev() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor" aria-hidden="true">
      <rect x="0" y="1" width="2.4" height="12" />
      <path d="M9.6 7 16 1v12L9.6 7Z" />
      <path d="M3.2 7 9.6 1v12L3.2 7Z" />
    </svg>
  )
}

function IconNext() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor" aria-hidden="true">
      <rect x="13.6" y="1" width="2.4" height="12" />
      <path d="M6.4 7 0 1v12l6.4-6Z" />
      <path d="M12.8 7 6.4 1v12l6.4-6Z" />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M2 1l11 6-11 6V1Z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1" width="3.6" height="12" />
      <rect x="8.4" y="1" width="3.6" height="12" />
    </svg>
  )
}

function PowerIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 3v8" />
      <path d="M6.2 6.8a8 8 0 1 0 11.6 0" />
    </svg>
  )
}

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
            <div key={i}>{line?.text ?? ' '}</div>
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
  "SHIV SHEKHAR ✦ I HELP MACHINES LEARN ✦ AI/ML INTERN @ GEICO ✦ CS + MATH @ RUTGERS '27 ✦ STANFORD ML SPECIALIZATION ✦ ML · FULL-STACK · SYSTEMS ✦ "

const VU_BARS = 14

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
          {playing ? '▶︎' : '❚❚'} {mm}:{ss}
        </div>
        <div className="lcd-title">
          <div className="lcd-name">SHIV SHEKHAR</div>
          <div className="lcd-sub">AI/ML · SOFTWARE ENGINEER · CS &amp; MATH @ RUTGERS</div>
        </div>
        <div className={`vu${playing ? '' : ' paused'}`} aria-hidden="true">
          {Array.from({ length: VU_BARS }, (_, i) => (
            /* mirrored delays: the two half-waveforms modulate toward the
               center and converge, instead of repeating in parallel */
            <span key={i} style={{ animationDelay: `${-Math.abs(i - (VU_BARS - 1) / 2) * 0.13}s` }} />
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
                {item.dates && <em className="track-dates-inline">{item.dates}</em>}
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
        <br />I HELP MACHINES LEARN.
      </h1>
      <p className="about-bio">
        Software engineer studying <b>Computer Science &amp; Mathematics at Rutgers</b> (&apos;27).
        Currently an <b>AI/ML intern at GEICO</b> in New York — production ML systems, MLOps
        pipelines, applied NLP. Previously led a team of 4 at Arka (Y&nbsp;Combinator) shipping ML
        that made clients $1M+/yr, and built data systems tracking 1M+ monthly interactions at
        Paramount.
      </p>
      <div className="about-cards">
        <div className="about-card">
          <span className="about-card-label">NOW</span>
          AI/ML Intern @ GEICO — model deployment, MLOps pipelines, and applied NLP in production
        </div>
        <div className="about-card">
          <span className="about-card-label">EDUCATION</span>
          Rutgers University — BS Computer Science &amp; BA Mathematics · 2023–2027
        </div>
        <div className="about-card">
          <span className="about-card-label">CERTIFICATION</span>
          Stanford Online — Machine Learning Specialization
        </div>
      </div>
      <div className="about-actions">
        <a className="btn-retro primary" href={RESUME_URL} target="_blank" rel="noreferrer">
          {'▶︎'} VIEW RESUME
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
          <span className="contact-label">{'▶︎'} {r.label}</span>
          <span className="contact-value">{r.value}</span>
        </a>
      ))}
    </div>
  )
}

/* ────────────────────────── keyboard help ────────────────────────── */

const SHORTCUTS = [
  ['←  /  →', 'PREV / NEXT TRACK'],
  ['SPACE', 'PLAY / PAUSE'],
  ['1 – 5', 'JUMP TO TRACK'],
  ['?', 'TOGGLE THIS HELP'],
  ['ESC', 'CLOSE'],
]

function KbdHelp({ onClose }) {
  return (
    <div className="kbd-help" role="dialog" aria-label="Keyboard shortcuts" onClick={onClose}>
      <div className="kbd-card" onClick={(e) => e.stopPropagation()}>
        <div className="kbd-title">✦ KEYBOARD SHORTCUTS ✦</div>
        {SHORTCUTS.map(([key, action]) => (
          <div className="kbd-row" key={key}>
            <kbd>{key}</kbd>
            <span>{action}</span>
          </div>
        ))}
        <div className="kbd-hint">PRESS ? OR ESC TO CLOSE</div>
      </div>
    </div>
  )
}

/* ────────────────────────── player ────────────────────────── */

function Player({ onPower, dying }) {
  const [tab, setTab] = useState('ABOUT')
  const [playing, setPlaying] = useState(true)
  const [secs, setSecs] = useState(0)
  const [openExp, setOpenExp] = useState(0)
  const [openProj, setOpenProj] = useState(0)
  const [help, setHelp] = useState(false)

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

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = e.target.tagName
      const interactive = tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'TEXTAREA'
      if (e.key === '?') {
        e.preventDefault()
        setHelp((h) => !h)
      } else if (e.key === 'Escape') {
        setHelp(false)
      } else if (e.key === 'ArrowLeft') {
        step(-1)
      } else if (e.key === 'ArrowRight') {
        step(1)
      } else if (e.key === ' ' && !interactive) {
        e.preventDefault()
        setPlaying((p) => !p)
      } else if (/^[1-5]$/.test(e.key)) {
        switchTab(TABS[Number(e.key) - 1])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="stage">
      <div className={`chassis ${dying ? 'crt-off' : 'crt-on'}`}>
        <div className="screw tl" /> <div className="screw tr" />
        <div className="screw bl" /> <div className="screw br" />

        <div className="titlebar">
          <PixelS size={15} />
          <span className="led" />
          <span className="titlebar-text">SHIV SHEKHAR — PORTFOLIO PLAYER v1.0</span>
          <span className="titlebar-btns" aria-hidden="true">
            <i>▁</i>
            <i>▢</i>
          </span>
          <button className="power-btn" onClick={onPower} aria-label="Power off" title="Power off">
            <PowerIcon size={11} />
          </button>
        </div>

        <Lcd playing={playing} secs={secs} tab={tab} />

        <div className="controls">
          <div className="transport">
            <button onClick={() => step(-1)} aria-label="Previous tab">
              <IconPrev />
            </button>
            <button className="play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <IconPause /> : <IconPlay />}
            </button>
            <button onClick={() => step(1)} aria-label="Next tab">
              <IconNext />
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
          <button className="statusbar-help" onClick={() => setHelp((h) => !h)}>
            ? = SHORTCUTS
          </button>
          <span className="statusbar-blink">█</span>
        </div>
      </div>
      {help && <KbdHelp onClose={() => setHelp(false)} />}
    </div>
  )
}

/* ────────────────────────── print resume ────────────────────────── */

function PrintResume() {
  return (
    <div className="print-resume">
      <header className="pr-header">
        <h1>Shiv Shekhar</h1>
        <p>
          {PHONE} · {EMAIL} · linkedin.com/in/shivshekhar · github.com/shivshekhar12
        </p>
      </header>
      <section>
        <h2>Education</h2>
        <p className="pr-line">
          <b>Rutgers University New Brunswick</b> — BS Computer Science &amp; BA Mathematics
          <span>Sept. 2023 – Jan. 2027</span>
        </p>
        <p className="pr-line">
          <b>Stanford Online</b> — Machine Learning Specialization
        </p>
      </section>
      <section>
        <h2>Technical Skills</h2>
        {PRINT_SKILLS.map((g) => (
          <p className="pr-skill" key={g.label}>
            <b>{g.label}:</b> {g.items}
          </p>
        ))}
      </section>
      <section>
        <h2>Experience</h2>
        {EXPERIENCE.map((job) => (
          <div className="pr-job" key={job.company}>
            <p className="pr-line">
              <b>{job.company}</b> — {job.role}
              <span>{job.dates}</span>
            </p>
            <ul>
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <h2>Projects</h2>
        {PROJECTS.map((p) => (
          <div className="pr-job" key={p.name}>
            <p className="pr-line">
              <b>{p.name}</b>
              <span>{p.stack}</span>
            </p>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}

/* ────────────────────────── CRT bezel (barrel distortion) ────────────────────────── */

/* Displacement map: red encodes horizontal offset, green vertical, both
   centered on 128 so the middle of the screen stays put. Applied only to
   the bezel overlay, so page content is never distorted. */
const BARREL_MAP =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>" +
      "<defs>" +
      "<linearGradient id='gx' x1='0' y1='0' x2='1' y2='0'>" +
      "<stop offset='0' stop-color='rgb(0,128,0)'/><stop offset='1' stop-color='rgb(255,128,0)'/>" +
      '</linearGradient>' +
      "<linearGradient id='gy' x1='0' y1='0' x2='0' y2='1'>" +
      "<stop offset='0' stop-color='rgb(128,0,0)'/><stop offset='1' stop-color='rgb(128,255,0)'/>" +
      '</linearGradient>' +
      '</defs>' +
      "<rect width='240' height='240' fill='url(#gx)'/>" +
      "<rect width='240' height='240' fill='url(#gy)' opacity='0.5'/>" +
      '</svg>',
  )

function CrtBezel() {
  return (
    <>
      <svg className="svg-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="crt-barrel" x="-5%" y="-5%" width="110%" height="110%">
            <feImage href={BARREL_MAP} preserveAspectRatio="none" x="0" y="0" width="100%" height="100%" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="crt-bezel" aria-hidden="true">
        <div className="crt-bezel-frame" />
      </div>
    </>
  )
}

/* ────────────────────────── app ────────────────────────── */

export default function App() {
  const [phase, setPhase] = useState('boot') // boot → flash → player → dying → off

  const bootDone = useCallback(() => {
    setPhase('flash')
    setTimeout(() => setPhase('player'), 450)
  }, [])

  const powerOff = useCallback(() => {
    setPhase('dying')
    setTimeout(() => setPhase('off'), 620)
  }, [])

  return (
    <>
      <div className="crt">
        {phase === 'boot' && <BootScreen onDone={bootDone} />}
        {phase === 'flash' && <div className="crt-flash" />}
        {(phase === 'player' || phase === 'dying') && <Player onPower={powerOff} dying={phase === 'dying'} />}
        {phase === 'off' && (
          <div className="off-stage">
            <button className="power-on" onClick={() => setPhase('boot')} aria-label="Power on">
              <PowerIcon size={26} />
              <span>POWER</span>
            </button>
          </div>
        )}
        <div className="scanlines" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <CrtBezel />
      </div>
      <PrintResume />
    </>
  )
}
