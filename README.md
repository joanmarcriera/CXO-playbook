# CTO Playbook

**Live site:** [cxo.riera.co.uk](https://cxo.riera.co.uk)

Interactive static site for executive and technical leadership guidance. Six pressure-point lessons (Strategy, Culture, Delivery, Product, Partnerships, Learning) with embedded traps, moves, and signals. Built from local research, with the source archive kept private.

## Usage

```bash
# Install: no dependencies (vanilla HTML/CSS/JS)
# just clone and serve locally

# Run locally
python3 -m http.server 8000
# Visit http://localhost:8000

# Build the research index (if you have a notes dump folder)
python3 scripts/build_source_index.py
```

## Deploy

Push to `main`; GitHub Pages auto-publishes via CNAME (`cxo.riera.co.uk`).

## Notes

- `notes dump/` is ignored, so the source archive stays local.
- `private/` is ignored, so generated research artifacts (e.g., `source-index.md`) stay local too.
- No build step required; HTML, CSS, and JS are served as-is.
