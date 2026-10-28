# weiqianwang123.github.io

Personal academic website of Qianwei (Robin) Wang — <https://weiqianwang123.github.io/>

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The whole site — one page, no build step |
| `stylesheet.css` | Minimal white layout after Andy Zeng's and Jon Barron's templates (via qiayuanl.github.io) |
| `site.js` | Research / Publications / Beyond research tabs; thumbnail videos load after the page and respect reduced motion |
| `images/unipred/` | UniPred thumbnail video and source notes |
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

The UniPred thumbnail is a 10-second silent loop (960 × 540) cut from the
UniPred film on the project page: the real robot wiping a table and moving
a bottle, a point cloud, the agent separating a concept, and derived
concepts tagged in simulation. See `images/unipred/README.md`.

## Publications

The page opens on **Research** (the research interests and UniPred). **Publications** lists all of them: UniPred, Coding Agents for Generalized TAMP, pySpatial, Point2Graph, and CoNav Chair. Each paper has a visual preview: UniPred keeps its custom video, Coding Agents for Generalized TAMP uses the video from Bowen Li’s homepage, and the others use the original thumbnails from the coauthors’ homepages (sources in `images/publications/README.md`). Thumbnail videos show their poster until visible and never play when reduced motion is requested. Without JavaScript every item is shown. To feature another paper under Research, add `research` to its `data-category` in `index.html`.

Titles, authors, contribution marks, venues, and links were checked against [Zhanpeng Luo’s homepage](https://zhanpeng1202.github.io/), [Yifan Xu’s homepage](https://yifan-cloud.github.io/), the linked project pages, and arXiv on September 21, 2026. CoNav Chair is marked under review as listed on Yifan’s homepage. Coding Agents for Generalized TAMP was checked against [Bowen Li’s homepage](https://jaraxxus-me.github.io/), its project page, and arXiv on October 3, 2026. Jordan Lillie has no verified personal homepage linked here.
