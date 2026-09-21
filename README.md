# weiqianwang123.github.io

Personal academic website of Qianwei (Robin) Wang — <https://weiqianwang123.github.io/>

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The whole site — one page, no build step |
| `stylesheet.css` | Responsive white and navy layout; design tokens in `:root` |
| `site.js` | Selected / All publication filter and viewport-aware preview playback; respects reduced motion |
| `images/unipred/` | UniPred four-stage preview and source notes |
| `scripts/render-unipred-preview.cjs` | Optional offline preview renderer, using the UniPred project animation |
| `data/resume.html` | Public responsive HTML CV, linked from the homepage; also the PDF print source |
| `data/qianwei_wang_resume.pdf` | One-page PDF, downloadable from the HTML CV |
| `build_resume.sh` | Renders `data/resume.html` → the PDF |
| `images/` | Site images; `images/originals/` holds pre-optimization copies |

## Local preview

```sh
python3 -m http.server 8000     # then open http://localhost:8000
```

## Updating the resume

Edit `data/resume.html`, then:

```sh
./build_resume.sh               # warns if it spills past one page
```

The script drives headless Chrome so the PDF matches what the browser shows.
By hand: open `data/resume.html`, Ctrl+P, "Save as PDF", margins Default,
scale 100%, no headers/footers.

## Deploying

GitHub Pages serves `master` from the repo root — pushing publishes.

## Credits

Originally derived from [Jon Barron's website](https://github.com/jonbarron/jonbarron_website);
the layout and stylesheet have since been rewritten.

## Publication preview

The UniPred thumbnail is a 20-second, silent MP4: Feedback → Concept → Plan → Action. It uses the shared drawing functions from the current UniPred project website, followed by an excerpt of the actual table-cleaning experiment. The learning and planning animations are illustrative.

An accessible play/pause button sits below the preview, keeping controls clear of the illustration. Native controls remain as a fallback when JavaScript is unavailable. The project link opens the complete explanation. The preview plays only while visible, pauses when the tab is hidden, and does not automatically play when reduced motion is requested. The site itself has no build step or JavaScript dependencies.

To regenerate the video, serve the sibling `unipred.github.io` repository on port 8031, then run `node scripts/render-unipred-preview.cjs` with Playwright, Chrome, and ffmpeg available. `SOURCE_ORIGIN`, `UNIPRED_SOURCE`, and `PREVIEW_OUTPUT` can override the defaults.

## Publications

The page defaults to **Selected** (UniPred). **All** adds pySpatial, Point2Graph, and CoNav Chair. The filter uses accessible toggle buttons and leaves the full list readable when JavaScript is unavailable. To feature another paper, set its `data-selected` attribute to `true` in `index.html`.

Titles, authors, contribution marks, venues, and links were checked against [Zhanpeng Luo’s homepage](https://zhanpeng1202.github.io/), [Yifan Xu’s homepage](https://yifan-cloud.github.io/), the linked project pages, and arXiv on September 21, 2026. CoNav Chair is marked under review as listed on Yifan’s homepage. Jordan Lillie has no verified personal homepage linked here.
