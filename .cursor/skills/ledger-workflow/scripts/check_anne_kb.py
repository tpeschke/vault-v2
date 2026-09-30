#!/usr/bin/env python3
"""Check an Anne-style knowledge base for index drift.

Usage:
    python check_anne_kb.py KB_ROOT [--l1 START-HERE.md]
                                    [--registry Interfaces/INDEX.md]
                                    [--marker "## KB interface"]

Paths for --l1 and --registry are relative to KB_ROOT.

Checks, all mechanical:
  1. L1 routes: every arrow line in the L1 file resolves. The file exists, and any
     "-> ## Heading" or "#anchor" address exists in it.
  2. Registry: every row points at an existing file that has a footer, whose
     "Retrieval class" equals the registry class and whose length (marker line to end
     of file) fits inside tail_lines.
  3. Every file with a footer has a registry row.
  4. Footers: every backticked .md path resolves, with any heading address; every
     entry under "Core entry points" or "Sections" is a heading in the same file;
     every same-file heading address under "Zoom-out entry points" exists.

Exit code: 0 clean, 1 problems found, 2 usage error.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import NoReturn

ARROW = "\u2192"
FENCE = "```"
ROW_RE = re.compile(r"^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*(\d+)\s*\|")
CLASS_RE = re.compile(r"^Retrieval class:\s*\*\*([\w-]+)\*\*", re.M)
LABEL_RE = re.compile(r"^([A-Z][A-Za-z /-]*?):\s*$")
PATH_REF_RE = re.compile(
    r"`((?:\.\./)*[\w\-./ ]+\.md)(#[\w-]+)?`(?:\s*" + ARROW + r"\s*`(#{1,6} [^`]+)`)?"
)
HEADING_REF_RE = re.compile(r"`(#{1,6} [^`]+)`")

_heading_cache: dict[Path, list[str]] = {}


def die(msg: str) -> NoReturn:
    print(f"Error: {msg}", file=sys.stderr)
    sys.exit(2)


def read_lines(path: Path) -> list[str]:
    lines = path.read_text(encoding="utf-8").split("\n")
    if lines and lines[-1] == "":
        lines.pop()  # the empty element after the final newline is not a line
    return lines


def headings(path: Path) -> list[str]:
    """Heading lines (with their # marks), ignoring fenced code."""
    if path not in _heading_cache:
        found, fenced = [], False
        for line in read_lines(path):
            if line.lstrip().startswith(FENCE):
                fenced = not fenced
            elif not fenced and re.match(r"^#{1,6} ", line):
                found.append(line.rstrip())
        _heading_cache[path] = found
    return _heading_cache[path]


def slug(heading: str) -> str:
    text = re.sub(r"^#+\s*", "", heading).strip().lower()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"\s+", "-", text)


def find_footer(path: Path, marker: str) -> tuple[list[str], int] | None:
    """Return (footer lines, count) from the last marker line outside code fences, or None."""
    lines = read_lines(path)
    fenced, starts = False, []
    for i, line in enumerate(lines):
        if line.lstrip().startswith(FENCE):
            fenced = not fenced
        elif not fenced and line.strip() == marker:
            starts.append(i)
    if not starts:
        return None
    footer = lines[starts[-1]:]
    return footer, len(footer)


def check_address(target: Path, address: str | None, anchor: str | None) -> str | None:
    """Return a problem string if the heading address or anchor is missing in target."""
    if address and address not in headings(target):
        return f"heading `{address}` not found in {target.name}"
    if anchor and anchor.lstrip("#") not in [slug(h) for h in headings(target)]:
        return f"anchor {anchor} not found in {target.name}"
    return None


def check_l1(root: Path, l1: Path, problems: list[str]) -> int:
    count = 0
    for lineno, line in enumerate(read_lines(l1), 1):
        s = line.strip()
        if not s.startswith(ARROW):
            continue
        body = s[1:].strip()
        if body.startswith("then "):  # prose continuation, not an address
            continue
        count += 1
        parts = [p.strip() for p in body.split(ARROW)]
        path_part = parts[0]
        address = parts[1] if len(parts) > 1 and parts[1].startswith("#") else None
        anchor = None
        if "#" in path_part:
            path_part, anchor = path_part.split("#", 1)
            anchor = "#" + anchor
        target = root / path_part.replace(" / ", "/").strip()
        where = f"{l1.name}:{lineno}"
        if not target.is_file():
            problems.append(f"{where}: route target not found: {path_part.strip()}")
            continue
        issue = check_address(target, address, anchor)
        if issue:
            problems.append(f"{where}: {issue}")
    return count


def parse_registry(registry: Path) -> dict[str, tuple[str, int]]:
    rows: dict[str, tuple[str, int]] = {}
    for line in read_lines(registry):
        m = ROW_RE.match(line)
        if m:
            rows[m.group(1)] = (m.group(2), int(m.group(3)))
    return rows


def check_footer_refs(root: Path, path: Path, footer: list[str], problems: list[str]) -> tuple[int, int]:
    rel = path.relative_to(root).as_posix()
    own = [re.sub(r"^#+\s*", "", h) for h in headings(path)]
    own_full = headings(path)
    refs = entries = 0
    label = None
    for line in footer:
        m = LABEL_RE.match(line)
        if m:
            label = m.group(1)
            continue
        if label in ("Core entry points", "Sections"):
            e = re.match(r"^- `([^`]+)`", line)
            if e:
                entries += 1
                if e.group(1) not in own:
                    problems.append(f"{rel}: entry point is not a heading in this file: {e.group(1)}")
        if label == "Zoom-out entry points":
            for h in HEADING_REF_RE.finditer(line):
                entries += 1
                if h.group(1) not in own_full:
                    problems.append(f"{rel}: zoom-out heading not found in this file: {h.group(1)}")
        for r in PATH_REF_RE.finditer(line):
            refs += 1
            target = (path.parent / r.group(1)).resolve()
            if not target.is_file():
                problems.append(f"{rel}: referenced file not found: {r.group(1)}")
                continue
            issue = check_address(target, r.group(3), r.group(2))
            if issue:
                problems.append(f"{rel}: {issue}")
    return refs, entries


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")

    ap = argparse.ArgumentParser(description="Check an Anne-style KB for index drift.")
    ap.add_argument("root", help="knowledge base root directory")
    ap.add_argument("--l1", default="START-HERE.md", help="L1 routing file, relative to root")
    ap.add_argument("--registry", default="Interfaces/INDEX.md", help="L2 registry, relative to root")
    ap.add_argument("--marker", default="## KB interface", help="line that opens an L2 footer")
    args = ap.parse_args()

    root = Path(args.root).expanduser().resolve()
    if not root.is_dir():
        die(f"{root} is not a directory.")
    l1, registry = root / args.l1, root / args.registry
    if not l1.is_file():
        die(f"L1 file not found: {l1}. Pass --l1.")
    if not registry.is_file():
        die(f"registry not found: {registry}. Pass --registry.")

    problems: list[str] = []
    n_routes = check_l1(root, l1, problems)

    reg = parse_registry(registry)
    if not reg:
        problems.append(f"{args.registry}: no registry rows found (expected | `path` | `CLASS` | tail_lines |)")

    footers: dict[str, list[str]] = {}
    skip = {registry.resolve()}
    for md in sorted(root.rglob("*.md")):
        if md.resolve() in skip:
            continue
        found = find_footer(md, args.marker)
        if found:
            footers[md.relative_to(root).as_posix()] = found[0]

    for rel, (cls, tail) in sorted(reg.items()):
        path = root / rel
        if not path.is_file():
            problems.append(f"{args.registry}: registry file not found: {rel}")
            continue
        footer = footers.get(rel)
        if footer is None:
            problems.append(f"{rel}: registered but has no `{args.marker}` footer")
            continue
        if len(footer) > tail:
            problems.append(f"{rel}: footer is {len(footer)} lines but tail_lines is {tail}")
        m = CLASS_RE.search("\n".join(footer))
        if not m:
            problems.append(f"{rel}: footer has no Retrieval class")
        elif m.group(1) != cls:
            problems.append(f"{rel}: footer class {m.group(1)} != registry class {cls}")

    for rel in sorted(set(footers) - set(reg)):
        problems.append(f"{rel}: has a footer but no row in {args.registry}")

    n_refs = n_entries = 0
    for rel, footer in sorted(footers.items()):
        r, e = check_footer_refs(root, root / rel, footer, problems)
        n_refs += r
        n_entries += e

    print(f"Checked {n_routes} L1 routes, {len(reg)} registry rows, {len(footers)} footers, "
          f"{n_refs} footer path refs, {n_entries} footer heading entries.")
    if problems:
        print(f"{len(problems)} problem(s):")
        for p in problems:
            print(f"  - {p}")
        return 1
    print("No problems found.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
