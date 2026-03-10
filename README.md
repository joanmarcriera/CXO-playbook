# CTO Playbook

Static site for a CTO/CXO field guide built from local notes, with the raw document archive kept out of git.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Private source index

```bash
python3 scripts/build_source_index.py
```

This writes `private/source-index.md` for local research use.

## Notes

- `notes dump/` is ignored, so the source archive stays local.
- `private/` is ignored, so generated research artifacts stay local too.
