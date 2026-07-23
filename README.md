# SHIV.EXE — Portfolio

Personal portfolio for Shiv Shekhar, styled as an old-school computer.

Boot flow: black screen → retro BIOS/POST boot sequence (press any key to skip) →
CRT power-on flash → a vintage media-player interface with an LCD marquee, VU
meters, transport controls, and tabs for About / Experience / Projects / Skills /
Contact rendered as a playlist.

## Stack

- React 19 + Vite
- Plain CSS (no UI libraries) — CRT scanlines, LCD glow, and chassis are all CSS
- Fonts: VT323 + Press Start 2P (Google Fonts)

## Develop

```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)

```bash
npm run deploy
```

Builds to `dist/` and publishes via `gh-pages`. The site is served under the
`/portfolio/` base path (see `vite.config.js`).
