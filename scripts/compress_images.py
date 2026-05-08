#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path
from stat import S_IMODE

from PIL import Image, ImageOps


SUPPORTED_EXTS = {".jpg", ".jpeg", ".png"}


@dataclass(frozen=True)
class Result:
    path: Path
    old_bytes: int
    new_bytes: int
    changed: bool
    reason: str


def _format_bytes(n: int) -> str:
    for unit in ["B", "KB", "MB", "GB"]:
        if n < 1024:
            return f"{n:.0f}{unit}" if unit == "B" else f"{n/1:.1f}{unit}"
        n /= 1024
    return f"{n:.1f}TB"


def _atomic_write_if_smaller(src: Path, tmp: Path, *, force: bool) -> tuple[bool, str, int]:
    old_size = src.stat().st_size
    new_size = tmp.stat().st_size

    if not force and new_size >= old_size:
        tmp.unlink(missing_ok=True)
        return False, "kept (not smaller)", old_size

    os.replace(tmp, src)
    return True, "replaced", new_size


def _save_jpeg(img: Image.Image, dst: Path, *, quality: int) -> None:
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    img.save(
        dst,
        format="JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
        subsampling="4:2:0",
    )


def _save_png(img: Image.Image, dst: Path) -> None:
    img.save(dst, format="PNG", optimize=True, compress_level=9)


def _resize_if_needed(img: Image.Image, *, max_edge: int) -> tuple[Image.Image, bool]:
    w, h = img.size
    edge = max(w, h)
    if edge <= max_edge:
        return img, False

    scale = max_edge / edge
    new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
    return img.resize(new_size, Image.Resampling.LANCZOS), True


def compress_one(
    path: Path,
    *,
    max_edge: int,
    jpeg_quality: int,
    force: bool,
) -> Result:
    if path.suffix.lower() not in SUPPORTED_EXTS:
        return Result(path, 0, 0, False, "skipped (unsupported)")

    try:
        st = path.stat()
        old_bytes = st.st_size
        old_mode = S_IMODE(st.st_mode)
    except FileNotFoundError:
        return Result(path, 0, 0, False, "missing")

    try:
        with Image.open(path) as img:
            img = ImageOps.exif_transpose(img)
            img, resized = _resize_if_needed(img, max_edge=max_edge)

            with tempfile.NamedTemporaryFile(
                dir=path.parent,
                delete=False,
                prefix=f".{path.stem}.",
                suffix=path.suffix,
            ) as tmp_file:
                tmp_path = Path(tmp_file.name)

            try:
                if path.suffix.lower() in (".jpg", ".jpeg"):
                    _save_jpeg(img, tmp_path, quality=jpeg_quality)
                else:
                    _save_png(img, tmp_path)

                os.chmod(tmp_path, old_mode)
                changed, why, new_bytes = _atomic_write_if_smaller(path, tmp_path, force=force)
                reason = why
                if resized:
                    reason += ", resized"
                return Result(path, old_bytes, new_bytes, changed, reason)
            finally:
                tmp_path.unlink(missing_ok=True)
    except Exception as e:  # noqa: BLE001 - CLI tool, report & continue
        return Result(path, old_bytes, old_bytes, False, f"error: {e}")


def iter_images(paths: list[Path]) -> list[Path]:
    files: list[Path] = []
    for p in paths:
        if p.is_file():
            files.append(p)
            continue
        if not p.exists():
            continue
        for file in p.rglob("*"):
            if not file.is_file():
                continue
            if file.suffix.lower() in SUPPORTED_EXTS:
                files.append(file)
    return sorted(set(files))


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Lossy/optimized compression for JPG/PNG images.")
    parser.add_argument(
        "paths",
        nargs="*",
        default=["images", "Gallery/IMAGES"],
        help="Files/directories to process (default: images Gallery/IMAGES)",
    )
    parser.add_argument("--max-edge", type=int, default=2000, help="Resize if larger than this edge (default: 2000)")
    parser.add_argument("--jpeg-quality", type=int, default=75, help="JPEG quality 1-95 (default: 75)")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Replace even if output is not smaller",
    )
    args = parser.parse_args(argv)

    targets = [Path(p) for p in args.paths]
    images = iter_images(targets)
    if not images:
        print("No images found.", file=sys.stderr)
        return 1

    results: list[Result] = []
    for img_path in images:
        results.append(
            compress_one(
                img_path,
                max_edge=args.max_edge,
                jpeg_quality=args.jpeg_quality,
                force=args.force,
            )
        )

    changed = [r for r in results if r.changed]
    errors = [r for r in results if r.reason.startswith("error:")]

    old_total = sum(r.old_bytes for r in results if r.old_bytes)
    new_total = sum((r.new_bytes if r.changed else r.old_bytes) for r in results if r.old_bytes)

    print(f"Processed: {len(results)} files")
    print(f"Changed:   {len(changed)} files")
    print(f"Errors:    {len(errors)} files")
    print(f"Size:      {_format_bytes(old_total)} -> {_format_bytes(new_total)}")

    if errors:
        print("\nErrors:", file=sys.stderr)
        for r in errors[:20]:
            print(f"- {r.path}: {r.reason}", file=sys.stderr)
        if len(errors) > 20:
            print(f"- ... and {len(errors) - 20} more", file=sys.stderr)
        return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
