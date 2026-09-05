# CTO Playbook

**Note:** the repo directory is named `CXO-playbook`, but the site itself (title, og:title) is
branded "CTO Playbook".

**What:** Interactive static site for executive/CTO leadership guidance: six pressure-point lessons (Strategy, Culture, Delivery, Product, Partnerships, Learning) with embedded traps, moves, and signals.

**Where:** [cxo.riera.co.uk](https://cxo.riera.co.uk) (GitHub Pages, CNAME).

## Quick Start

```bash
# Local preview (vanilla HTTP server, no build step)
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Structure

- **index.html** – Single-page app with responsive grid layout, switcher modal (Cmd+K), and footer.
- **app.js** – Data model (`pressurePoints` array) + DOM logic: button handlers, content rendering, IntersectionObserver for lazy reveal on `.reveal` elements.
- **chrome.js** – Shared portfolio chrome across Marc's ecosystem sites (footer grid, keyboard-accessible switcher listing 12 sites + tags).
- **styles.css** – Theme, layout, animations (reveal/fade, grid, modal backdrop, button states).
- **scripts/build_source_index.py** – Internal research tool: scans local `notes dump/` folder, weights files by keyword (transcript, playbook, takeaway, etc.), emits `private/source-index.md` with bucket summaries, file manifests, and stats.

## Conventions

- **No build step.** HTML, CSS, JS are shipped as-is; CSS uses CSS custom properties for theming.
- **Inline data.** Pressure-point content lives in `app.js` as a JS object — low barrier to edit.
- **Accessibility:** Switcher modal is ARIA-labeled; buttons have `data-` attributes for state; focus management for open/close.
- **Local-only research.** `notes dump/` and `private/` are .gitignored; source index is for Marc's own reference, not shipped.

## Running

| Task | Command |
|------|---------|
| Preview | `python3 -m http.server 8000` then `localhost:8000` |
| Build research index | `python3 scripts/build_source_index.py` (writes `private/source-index.md`) |
| Deploy | Push to `main`; GitHub Pages auto-publishes via CNAME |

## Git & Deployment

- Main branch auto-deploys to GitHub Pages.
- Conventional commits: `feat|fix|chore|docs(scope): message`.
- No secrets or keys in repo (all local research in .gitignore).

## Gotchas

- **Switcher dataset is hardcoded.** The 12-site portfolio list in `chrome.js` is static; adding a new site requires manual edits in both `chrome.js` and any linked site.
- **IntersectionObserver target:** Only `.reveal` elements with `is-visible: false` are observed; elements already visible on load are skipped.
- **Python 3 required** for the source-index build script; no other runtime dependencies.
- **Chrome.js loads on DOMContentLoaded.** If chrome elements are injected dynamically post-load, they won't initialize.
