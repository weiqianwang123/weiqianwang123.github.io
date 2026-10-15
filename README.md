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

## Design

The October 14, 2026 refresh uses a compact white-and-navy academic layout with system fonts. Publications use the full content width: a 260px media column and a wider text column on desktop, with stacked entries on phones. Paper titles are 18px and author/summary text is 14px; section headings stay modest. Research interests are a single paragraph, and the personal gallery is kept small. The Selected / All filter, all publication metadata and links, and existing video assets are retained.

The layout has been checked at 320px, 390px, 768px, and 1440px widths, including video controls, reduced motion, the publication filter, and the no-JavaScript fallback.

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

The UniPred thumbnail is a roughly 58-second, silent MP4: Feedback → Concept → Plan → Action. It uses the shared drawing functions from the current UniPred project website, followed by the complete 46-second table-cleaning demonstration (three toys, towel grasping, and wiping), retaining the recording’s existing 3× speed. The learning and planning animations are illustrative.

An accessible play/pause button sits below the preview, keeping controls clear of the illustration. Native controls remain as a fallback when JavaScript is unavailable. The project link opens the complete explanation. The preview plays only while visible, pauses when the tab is hidden, and does not automatically play when reduced motion is requested. The site itself has no build step. Its first-party interactions use vanilla JavaScript; the optional visitor globe loads the provider’s script and its dependencies.

To regenerate the video, serve the sibling `unipred.github.io` repository on port 8031, then run `node scripts/render-unipred-preview.cjs` with Playwright, Chrome, and ffmpeg available. `SOURCE_ORIGIN`, `UNIPRED_SOURCE`, and `PREVIEW_OUTPUT` can override the defaults.

## Publications

The page defaults to **Selected** (UniPred). **All** adds Coding Agents for Generalized TAMP, pySpatial, Point2Graph, and CoNav Chair. Each paper has a visual preview: UniPred keeps its custom video, Coding Agents for Generalized TAMP uses the video from Bowen Li’s homepage, and the others use the original thumbnails from the coauthors’ homepages (sources in `images/publications/README.md`). Thumbnail videos show their poster until visible and never play when reduced motion is requested. The filter uses accessible toggle buttons and leaves the full list readable when JavaScript is unavailable. To feature another paper, set its `data-selected` attribute to `true` in `index.html`.

Titles, authors, contribution marks, venues, and links were checked against [Zhanpeng Luo’s homepage](https://zhanpeng1202.github.io/), [Yifan Xu’s homepage](https://yifan-cloud.github.io/), the linked project pages, and arXiv on September 21, 2026. CoNav Chair is marked under review as listed on Yifan’s homepage. Coding Agents for Generalized TAMP was checked against [Bowen Li’s homepage](https://jaraxxus-me.github.io/), its project page, and arXiv on October 3, 2026. Jordan Lillie has no verified personal homepage linked here.

## Visitor globe

The footer embeds the owner-provided MapMyVisitors globe over HTTPS, sized to 180px, with a permanent link to [this site's statistics](https://mapmyvisitors.com/web/1c8vl). The widget token is public embed configuration, not an account credential. Both the globe and the text link open that dashboard; the text link remains available without JavaScript or when the provider is blocked. Print styles omit the footer.

Keep the provider script in the footer without `async` or `defer`: its current implementation registers a window-load handler to start the animation. The first-party code only sets its destination and accessible name; visit collection and geography come from MapMyVisitors. No counts or locations are fabricated, scraped, or stored by this site.

Integration check on October 14, 2026: the public dashboard is bound to `https://weiqianwang123.github.io/`, and the globe animation renders. However, the account's `globe_call_home.js` request returns HTML instead of the expected JSONP, so visit collection and visitor markers are not yet verified. This is a provider-side response issue; verify a successful data response and new dashboard entries before treating tracking as operational. The globe itself does not display a numeric total; totals are on the linked dashboard.
