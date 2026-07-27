#!/usr/bin/env bash
# Render data/resume.html -> data/qianwei_wang_resume.pdf (one page, US Letter).
#
#   ./build_resume.sh
#
# Uses headless Chrome so the PDF matches what the browser shows. Set CHROME=...
# to point at a specific binary. Equivalent by hand: open data/resume.html in a
# browser, Ctrl+P, "Save as PDF", margins Default, scale 100%, no headers/footers.

set -euo pipefail

cd "$(dirname "$0")"

SRC="data/resume.html"
OUT="data/qianwei_wang_resume.pdf"

# Find a Chromium/Chrome binary: $CHROME, then PATH, then a Playwright cache.
if [[ -z "${CHROME:-}" ]]; then
  for candidate in google-chrome google-chrome-stable chromium chromium-browser; do
    if command -v "$candidate" >/dev/null 2>&1; then
      CHROME=$(command -v "$candidate")
      break
    fi
  done
fi

if [[ -z "${CHROME:-}" ]]; then
  CHROME=$(find "$HOME/.cache/ms-playwright" -maxdepth 3 -name chrome -type f 2>/dev/null | head -1)
fi

if [[ -z "${CHROME:-}" || ! -x "$CHROME" ]]; then
  echo "error: no Chrome/Chromium found. Install one, or set CHROME=/path/to/chrome." >&2
  echo "       Fallback: soffice --headless --convert-to pdf $SRC --outdir data/" >&2
  exit 1
fi

# Chrome needs an absolute file:// URL to resolve the page.
"$CHROME" \
  --headless \
  --disable-gpu \
  --no-sandbox \
  --hide-scrollbars \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "file://$(pwd)/$SRC" 2>/dev/null

if command -v pdfinfo >/dev/null 2>&1; then
  pages=$(pdfinfo "$OUT" | awk '/^Pages:/ {print $2}')
  echo "wrote $OUT (${pages} page(s))"
  [[ "$pages" == "1" ]] || echo "warning: resume spilled onto ${pages} pages — tighten the content." >&2
else
  echo "wrote $OUT"
fi
