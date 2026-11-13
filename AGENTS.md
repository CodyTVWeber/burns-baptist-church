# Burns Baptist Church site

## Run

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. HTML/CSS/JS only — no npm.

## Red lines

- **This church only:** Burns Baptist Church, **2308 Hwy 96, Burns, TN 37029**, Pastor Aaron “A.T.” Terlecki. YouTube only `@burnsbaptistchurch-burnstn1436`.
- **Not:** St John Lutheran (2300 Hwy 96), Burns Church of Christ, 548 Hillview as meeting address, Ron Melton / Net Ministries.
- Relative URLs only (GitHub project Pages). No custom domain / WP DNS changes here.
- No second PR for the same plan work. Transcripts stay in `docs/research/` — not on the public site.
- Real BBC photos only — no stock/AI congregation.

## Rules

- `docs/rules/stack.md` — no bundler; `.nojekyll`; `node --check js/site.js`
- `docs/rules/content.md` — church lock; no invented ministries/times
- `docs/rules/images.md` — source table in `img/README.md`
- `docs/rules/git-workflow.md` — commit format; push policy
