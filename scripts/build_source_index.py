from __future__ import annotations

from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path("notes dump")
OUTPUT = Path("private/source-index.md")
MAX_SIZE_BYTES = 25 * 1024 * 1024
SKIP_DIR_NAMES = {"videos", ".obsidian", "__pycache__"}
TEXT_EXTENSIONS = {".md", ".txt", ".docx", ".pptx", ".pdf"}
HIGHLIGHT_WEIGHTS = {
    "transcript": 7,
    "playbook": 6,
    "takeaway": 6,
    "outline": 5,
    "summary": 4,
    "challenge": 4,
    "proposition": 4,
    "experiment": 4,
    "portfolio": 4,
    "governance": 3,
    "leadership": 3,
    "strategy": 3,
}


def is_skipped(path: Path) -> bool:
    lowered_parts = {part.lower() for part in path.parts}
    if lowered_parts & SKIP_DIR_NAMES:
        return True
    return path.stat().st_size > MAX_SIZE_BYTES


def format_bytes(num_bytes: int) -> str:
    size = float(num_bytes)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024 or unit == "GB":
            if unit == "B":
                return f"{int(size)} {unit}"
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} GB"


def score_path(relative_path: Path) -> int:
    name = relative_path.name.lower()
    score = 0
    if relative_path.suffix.lower() in {".md", ".txt"}:
        score += 4
    if "transcript" in name:
        score += 3
    for keyword, weight in HIGHLIGHT_WEIGHTS.items():
        if keyword in name:
            score += weight
    return score


def main() -> None:
    if not ROOT.exists():
        raise SystemExit(f"Source root not found: {ROOT}")

    records: list[dict[str, object]] = []
    bucket_totals = defaultdict(
        lambda: {"files": 0, "bytes": 0, "text_like": 0, "transcripts": 0, "pdfs": 0}
    )
    extension_counts: Counter[str] = Counter()

    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or is_skipped(path):
            continue

        rel = path.relative_to(ROOT)
        bucket = rel.parts[0] if rel.parts else "root"
        extension = path.suffix.lower() or "[none]"
        size = path.stat().st_size
        score = score_path(rel)

        record = {
            "relative_path": rel.as_posix(),
            "bucket": bucket,
            "extension": extension,
            "size": size,
            "score": score,
        }
        records.append(record)

        bucket_totals[bucket]["files"] += 1
        bucket_totals[bucket]["bytes"] += size
        if extension in TEXT_EXTENSIONS:
            bucket_totals[bucket]["text_like"] += 1
        if "transcript" in rel.name.lower():
            bucket_totals[bucket]["transcripts"] += 1
        if extension == ".pdf":
            bucket_totals[bucket]["pdfs"] += 1
        extension_counts[extension] += 1

    total_bytes = sum(int(record["size"]) for record in records)
    curated_by_bucket: dict[str, list[dict[str, object]]] = defaultdict(list)
    for record in sorted(
        records,
        key=lambda item: (
            -int(item["score"]),
            str(item["bucket"]),
            str(item["relative_path"]),
        ),
    ):
        if int(record["score"]) <= 0:
            continue
        bucket = str(record["bucket"])
        if len(curated_by_bucket[bucket]) < 12:
            curated_by_bucket[bucket].append(record)

    lines: list[str] = []
    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines.append("# Private Source Index")
    lines.append("")
    lines.append(f"Generated: {generated_at}")
    lines.append("")
    lines.append("## Scan Rules")
    lines.append("")
    lines.append(f"- Root: `{ROOT}`")
    lines.append(f"- Skipped directories by name: `{', '.join(sorted(SKIP_DIR_NAMES))}`")
    lines.append(f"- Skipped files larger than: `{format_bytes(MAX_SIZE_BYTES)}`")
    lines.append("")
    lines.append("## Totals")
    lines.append("")
    lines.append(f"- Indexed files: `{len(records)}`")
    lines.append(f"- Indexed size: `{format_bytes(total_bytes)}`")
    lines.append(f"- Extension types: `{len(extension_counts)}`")
    lines.append("")
    lines.append("## Bucket Summary")
    lines.append("")
    lines.append("| Bucket | Files | Text-like | Transcripts | PDFs | Size |")
    lines.append("| --- | ---: | ---: | ---: | ---: | ---: |")
    for bucket, stats in sorted(
        bucket_totals.items(),
        key=lambda item: (-int(item[1]["files"]), item[0].lower()),
    ):
        lines.append(
            "| {bucket} | {files} | {text_like} | {transcripts} | {pdfs} | {size} |".format(
                bucket=bucket,
                files=stats["files"],
                text_like=stats["text_like"],
                transcripts=stats["transcripts"],
                pdfs=stats["pdfs"],
                size=format_bytes(int(stats["bytes"])),
            )
        )
    lines.append("")
    lines.append("## High-Signal Working Set")
    lines.append("")
    for bucket, items in sorted(curated_by_bucket.items()):
        if not items:
            continue
        lines.append(f"### {bucket}")
        lines.append("")
        for item in items:
            lines.append(
                f"- `{item['relative_path']}` "
                f"({item['extension']}, {format_bytes(int(item['size']))})"
            )
        lines.append("")
    lines.append("## Extension Counts")
    lines.append("")
    for extension, count in extension_counts.most_common():
        lines.append(f"- `{extension}`: {count}")
    lines.append("")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
