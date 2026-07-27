# weiqianwang123.github.io

Personal academic website of Qianwei (Robin) Wang — <https://weiqianwang123.github.io/>

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The whole site — one page, no build step |
| `stylesheet.css` | All styling; the palette lives in the `:root` block |
| `data/resume.html` | Resume source (edit this, not the PDF) |
| `data/qianwei_wang_resume.pdf` | Generated one-page resume, linked from the site |
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
