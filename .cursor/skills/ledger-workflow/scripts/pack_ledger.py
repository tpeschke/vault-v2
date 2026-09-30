#!/usr/bin/env python3
"""Zip the rewrite ledger so it can be attached to a design chat.

Usage:
    python pack_ledger.py [LEDGER_DIR] [-o OUT] [--include PATH ...]

LEDGER_DIR   Ledger directory. Default: rewrite-ledger/, found in the current
             directory or the nearest parent that has one.
-o OUT       Output .zip path, or an existing directory to put it in.
             Default: ~/Downloads if it exists, else the current directory,
             named <ledger>-<YYYYMMDD-HHMM>.zip.
--include    Extra file or directory to add (repeatable), e.g. the repo-level
             00-START-HERE.md or CODE-LAYOUT-STANDARD.md.

Only reads the ledger and the --include paths; writes only the zip.
"""
from __future__ import annotations

import argparse
import os
import sys
import zipfile
from datetime import datetime
from pathlib import Path
from typing import Iterator, NoReturn

LEDGER_NAME = "rewrite-ledger"
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", "venv"}
SKIP_FILES = {".DS_Store", "Thumbs.db"}
SKIP_SUFFIXES = {".pyc", ".pyo"}
WARN_BYTES = 20 * 1024 * 1024


def die(msg: str) -> NoReturn:
    print(f"Error: {msg}", file=sys.stderr)
    sys.exit(2)


def find_ledger(start: Path) -> Path:
    for base in (start, *start.parents):
        candidate = base / LEDGER_NAME
        if candidate.is_dir():
            return candidate
    die(f"no {LEDGER_NAME}/ found here or in any parent directory. Pass LEDGER_DIR explicitly.")


def iter_files(root: Path) -> Iterator[Path]:
    """Yield files under root (or root itself if it is a file), skipping noise and symlinks."""
    if root.is_file():
        yield root
        return
    for dirpath, dirnames, filenames in os.walk(root, followlinks=False):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS)
        for name in sorted(filenames):
            p = Path(dirpath) / name
            if p.is_symlink() or name in SKIP_FILES or p.suffix in SKIP_SUFFIXES:
                continue
            yield p


def arcname(p: Path, anchor: Path) -> str:
    """Name inside the zip: path relative to the ledger's parent, so the ledger folder is the zip root."""
    try:
        return p.resolve().relative_to(anchor).as_posix()
    except ValueError:
        return p.name


def resolve_output(out: str | None, ledger: Path) -> Path:
    default_name = f"{ledger.name}-{datetime.now():%Y%m%d-%H%M}.zip"
    if out:
        p = Path(out).expanduser()
        if p.is_dir():
            return p / default_name
        return p if p.suffix.lower() == ".zip" else p.with_name(p.name + ".zip")
    downloads = Path.home() / "Downloads"
    return (downloads if downloads.is_dir() else Path.cwd()) / default_name


def main() -> int:
    ap = argparse.ArgumentParser(description="Zip the rewrite ledger for a design chat.")
    ap.add_argument("ledger", nargs="?", help=f"ledger directory (default: nearest {LEDGER_NAME}/)")
    ap.add_argument("-o", "--out", help="output .zip path, or a directory to put it in")
    ap.add_argument("--include", action="append", default=[], metavar="PATH",
                    help="extra file or directory to add (repeatable)")
    args = ap.parse_args()

    ledger = Path(args.ledger).expanduser() if args.ledger else find_ledger(Path.cwd())
    if not ledger.is_dir():
        die(f"{ledger} is not a directory.")
    ledger = ledger.resolve()
    anchor = ledger.parent

    sources = [ledger]
    for extra in args.include:
        p = Path(extra).expanduser()
        if not p.exists():
            die(f"--include path not found: {extra}")
        sources.append(p)

    out = resolve_output(args.out, ledger).resolve()

    # Collect first, write second: nothing is created or overwritten if there is nothing to pack.
    entries: list[tuple[Path, str]] = []
    seen: set[str] = set()
    for src in sources:
        for f in iter_files(src):
            if f.resolve() == out:
                continue
            name = arcname(f, anchor)
            if name in seen:
                print(f"Warning: skipping duplicate entry {name}", file=sys.stderr)
                continue
            seen.add(name)
            entries.append((f, name))

    if not entries:
        die("no files to pack.")

    out.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
        for f, name in entries:
            zf.write(f, name)

    total = sum(f.stat().st_size for f, _ in entries)
    size = out.stat().st_size
    print(f"Packed {len(entries)} files ({total / 1024:.0f} KB) -> {out} ({size / 1024:.0f} KB zipped)")
    if size > WARN_BYTES:
        print("Warning: archive is over 20 MB; a chat upload may reject it.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
