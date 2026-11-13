# Plan: Burns Baptist Church static site (GitHub Pages)

**Date:** 2026-08-23
**Branch:** `plan/initial-site`
**Status:** Ready to implement
**Repo:** `~/code/burns-baptist-church` → `CodyTVWeber/burns-baptist-church`
**Pages URL (after enable):** `https://codytvweber.github.io/burns-baptist-church/`

---

## Church lock (do not mix)

This is **Burns Baptist Church**, Southern Baptist, ~200 people, large families, country / not fancy, gospel-plain: **you need Jesus**.

| Field | Value |
|---|---|
| Address | **2308 Hwy 96 (TN-96), Burns, TN 37029** |
| Phone | 615-441-3378 |
| Email | burnsbaptistclerk@gmail.com |
| Pastor | Aaron **“A.T.”** Terlecki (Lori; 7 children). DCHS ’89, Union ’94, Liberty M.A. Youth minister 12 yrs; pastored Hillcrest Baptist; **merged Hillcrest into Burns Baptist 2015**. Dickson County Jail Chaplain 7 yrs. |
| Youth | Mason Cook (Youth Pastor, YOKE) — DCHS ’20, UT Martin ’23; staff Apr 2023 |
| Worship | Grant Allen (Candice; 5 children). “What happens **on the hill** is at the center of their life.” |
| Times | Sun SS **9:00** / worship **10:00**. Wed worship **6:30**. YOKE **6:00–8:00**. Kids Connection **6:30**. |
| Motto (bulletin) | Loving God. Loving People. Making Disciples. |
| Give | Foyer boxes; mail 2308 TN-96; PayPal `paypal.me/burnsbaptistchurch` |
| Official site (source, not to clone) | https://burnsbaptistchurch.com |
| Facebook | https://www.facebook.com/BurnsBaptistChurch/ |
| YouTube (**only this channel**) | https://www.youtube.com/@burnsbaptistchurch-burnstn1436 |
| Association | JST Baptist Association |

**Instagram** `@burnsbaptistchurch` lists 548 Hillview Rd. **Do not use that as the church address.** Meeting place is 2308 Hwy 96. 548 Hillview is unconfirmed (possible home / FLC / leftover tag).

### Not this church (easy mix-ups)

| Nearby | Address | Trap |
|---|---|---|
| **St John Lutheran** | **2300 Highway 96** | **Next door.** Maps / Street View often grab the wrong steeple. |
| Burns Church of Christ | 2718 Church St | YouTube `@burnschurchofchrist` titled **“Burns Church”** |
| Burns Community Church | 2035 Hwy 96 | Same highway |
| Greater Things Baptist | 2612 White Bluff Rd | Also SBC Burns |
| Parkers Creek Baptist | 2327 Abiff Rd | Also SBC Burns |
| Gospel Baptist | 4144 Hwy 96 | Same road |
| First Baptist Dickson | 2501 Highway 70 E | Town over |
| Net Ministries ch28100 | same 2308 address | **Dead listing** — Pastor Ron Melton, old times |

If a photo, video, or sentence cannot be tied to **Terlecki + 2308 Hwy 96 + `@burnsbaptistchurch-burnstn1436`**, do not use it.

---

## Why this approach

| Choice | Why |
|---|---|
| HTML / CSS / JS only, no npm | Matches the church: simple, maintainable, GitHub Pages |
| 3 pages, not a CMS | Times, people, gospel. No event engine (their WP events page is empty) |
| Real photos, no stock | Their current WP site uses concert/field **stock**. That is not them. |
| One sermon download + transcript | Voice for copy. Not a public archive. |
| Beautiful-but-plain | Warm type + real people. Not megachurch dark-and-fog, not clip-art WordPress. |

---

## Voice (from bios + Facebook lives, to be sharpened by transcript)

- Direct: **you need Jesus.** Not “authentic community / next-gen vision.”
- Family: faith family, large families, kids everywhere, YOKE, Kids Connection.
- Place: country brick church on a hill off Hwy 96, parking lot, FLC, not a campus brand.
- Preaching flavor (FB titles): *Days of Punishment*, *Open the Door*, *What will you do in the day of punishment?* — OT-plain, invitational.
- Current site line to keep (tighten, don’t marketing-ize): “We are a faith family that passionately believes in the work of our ministry.”
- AT: love and serve the Lord and people; know and bring glory to Jesus Christ.

**Sermon (necessary, one only):** Download from **this** YouTube channel, then transcribe. Purpose = copy voice + sanctuary stills. **Do not** publish the transcript. **Do not** scrape `@burnschurchofchrist`.

Preferred video: newest **Sunday** upload on `@burnsbaptistchurch-burnstn1436` whose uploader is exactly **Burns Baptist Church - Burns, TN**. Known IDs (verify uploader before use):

| Title | ID |
|---|---|
| Sunday 4/19/26 (~1h35) | `OKMQqv76lwQ` |
| Sunday 3/29/26 | `G6kWogEWUbc` |
| Sunday 03/22/2026 | `NCoC9o8vN7I` |
| Sunday 9/12/21 AM | `3hhxNSMo5lM` |
| Church Camp Skit 2025 (stills, not transcript) | `y1_TKBML7Gs` |
| Callie Terlecki Mission Video | `vDlHW8Mk3JQ` |
| Baptism Sunday 9/6/20 | `yDakTXEfjiE` |

If yt-dlp lists a newer Sunday (e.g. 8/16/26 or 8/23/26), use that **after** uploader check. Transcribe **one** Sunday AM. Extract stills from that service **plus** camp/baptism/mission (people).

---

## Design

Warm country, not ugly, not slick.

| Token | Value |
|---|---|
| Paper | `#F3EDE1` |
| Ink | `#2A2218` |
| Barn red | `#8B2E1F` |
| Forest | `#3D4A32` |
| Walnut | `#5C4636` |
| Display | [Fraunces](https://fonts.google.com/specimen/Fraunces) |
| Body | [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) |
| Fonts | Google Fonts **CDN only** (no npm) |

- Logo: existing stencil church + “BURNS BAPTIST CHURCH” (`burnsbaptist.png`) on paper or red; don’t invent a new brand.
- Hero: **their building** (`bbc-image.jpg`) or a congregation still from *their* YouTube — not a stock concert.
- Type large, space generous, photos of **people** (kids, youth, older, families) as the visual system.
- No glassmorphism, gradients-for-show, hamburger animation theater, or “Watch Live” megachurch chrome.
- Mobile first. Relative URLs only (`css/site.css` not `/css/site.css`) so GitHub **project** Pages works.

---

## Site map

| File | Role |
|---|---|
| `index.html` | Gospel + people photos + times + come Sunday |
| `visit.html` | What to expect, times, map pin 2308 Hwy 96, parking, kids |
| `about.html` | Staff (AT, Mason, Grant) + short 2015 merge story |
| `css/site.css` | All styles |
| `js/site.js` | Mobile nav only |
| `img/` | Real photos + logo. `img/README.md` = source table |

Shared header/footer duplicated in each HTML file (no build). Nav: Home · Visit · About · Give (PayPal, new tab) · Call.

**Home sections (order):**
1. Header
2. Hero: building or people + **You need Jesus.** + Burns Baptist Church, Burns, TN
3. Times strip (Sun / Wed)
4. People strip (4–8 real photos, not stock)
5. Gospel (short: sin, cross, risen, come)
6. Ministries one-liners: Sunday School, YOKE, Kids Connection — no fake programs
7. Staff cards (photos we have: AT+Lori, Grant family; Mason = no staff photo on WP — use name/role, not a placeholder headshot)
8. Visit CTA → visit.html
9. Footer: address, phone, email, FB, YT, PayPal

Copy must be written **after** the transcript. Do not invent event dates unless pulled from their Instagram/site and still current (Back to School Bash 7/29, OCC yard sale 8/28–29, Promotion Sunday 8/2 — **those are past as of 2026-08-23**; do not list as upcoming).

---

## Photos

### Use (confirmed BBC)

| Source | File / note |
|---|---|
| WP | `https://burnsbaptistchurch.com/wp-content/uploads/2023/08/burnsbaptist.png` logo |
| WP | `…/bbc-image.jpg` brick church, white steeple, parking lot |
| WP | `…/terlecki.jpeg` AT + Lori |
| WP | `…/2024/08/IMG-7225-360x540-1.jpg` Grant + Candice + 5 kids (get larger original from WP if exists) |
| YT frames | Sanctuary, congregation, baptism, camp — **this channel only** |
| IG `@burnsbaptistchurch` | Only candid people/church (picnic, camp). Skip flyer-only graphics unless used in an events note. |

### Do not use

- `youthchurch-1024x681.jpg` — stock concert / fog
- `olderchurch-1024x684.jpg` — stock couple in a field
- `photocomingsoon.jpg`
- Any Street View / Maps photo that might be **2300** Hwy 96 (Lutheran)
- AI people, Unsplash “church family,” Church of Christ stills

Download originals into `img/`. Prefer full-size WP files (strip `-1024x681` etc.). Convert to reasonably sized JPEG/WebP with `ffmpeg`/`sips` if huge. Keep `img/README.md`: filename, source URL, who/what.

Kids/baby WP shots (`kidschurch`, `babychurch`) look generic — **prefer YouTube stills** of *their* kids if the frames are clearly this sanctuary/FLC.

---

## Rules (this repo)

Keep `AGENTS.md` and `CLAUDE.md` **≤50 lines**: run, red lines, pointers.

| File | Contents |
|---|---|
| `AGENTS.md` / `CLAUDE.md` | Same: `python3 -m http.server 8080`; HTML/CSS/JS only; GH Pages relative URLs; church lock; no second PR; refs |
| `docs/rules/stack.md` | No npm, no React, no bundler. GitHub Pages from `/`. `.nojekyll`. `node --check` on JS. |
| `docs/rules/content.md` | Church lock table. No invented ministries/times. Transcripts = research only. |
| `docs/rules/images.md` | Real BBC only. Source table required. No stock/AI congregation. |
| `docs/rules/git-workflow.md` | Commit often on this branch. Message: `plan/initial-site: 1. … 2. …`. Push when asked / end milestone. |

---

## GitHub Pages

1. Add `.nojekyll` at repo root.
2. All asset hrefs **relative**.
3. Enable Pages: source = **this branch** `plan/initial-site`, folder `/` (so the PR is previewable). After merge, switch to `main`.
   ```bash
   gh api -X POST repos/CodyTVWeber/burns-baptist-church/pages \
     -F build_type=legacy \
     -F source[branch]=plan/initial-site \
     -F source[path]=/
   ```
   If that exists, `gh api -X PUT …` to update source.
4. Live: `https://codytvweber.github.io/burns-baptist-church/`
5. Do **not** point `burnsbaptistchurch.com` DNS. Out of scope.

---

## Concrete steps

1. **Rules** — `AGENTS.md`, `CLAUDE.md`, `docs/rules/{stack,content,images,git-workflow}.md` as above.
2. **Tools** — `brew`/`uv` install `yt-dlp` if missing. Use `ffmpeg` (present). For STT: `uv` Whisper or `~/code/whisperx-env` — **do not** add an npm stack to this repo.
3. **Sermon** — `yt-dlp` newest verified Sunday from `@burnsbaptistchurch-burnstn1436` → audio under gitignored `tmp/`. Transcribe → `docs/research/sermon-YYYY-MM-DD.md` (title, date, video id, 1-page voice notes + key quotes). Video files stay gitignored.
4. **Stills** — ffmpeg frames from that Sunday + camp skit + baptism + mission. Keep 8–15 **usable** people/sanctuary crops in `img/`. Log in `img/README.md`.
5. **WP photos** — curl logo, building, terlecki, Grant family (largest). Skip stock files listed above.
6. **CSS / JS / HTML** — `css/site.css`, `js/site.js`, `index.html`, `visit.html`, `about.html`. Copy after transcript. Gospel section required on home.
7. **Map** — embed OpenStreetMap or Google Maps **query** `2308 Highway 96, Burns, TN 37029` (not a screenshot of the Lutheran lot).
8. **`.nojekyll`**, README run instructions, relative links, 404.html (simple “back home”).
9. **Local check** — `python3 -m http.server 8080`; `node --check js/site.js`; every `img/` file referenced exists; no mixed-content / absolute-root URLs.
10. **Pages** — enable as above; open the GH Pages URL and walk Home / Visit / About on desktop + narrow viewport.
11. **Commits** — after rules, after media, after pages, after Pages enable. Stay on `plan/initial-site`. **Do not** open a second PR (this plan PR is the one). `gh pr edit` when the PR should describe the site, not only the plan.

---

## Out of scope

- Replacing live WordPress / Color Theory DNS
- Custom domain
- npm, React, Tailwind CLI, bundlers
- CMS, blog, sermon archive, calendar API
- Online giving beyond PayPal link
- Contact form backend
- Transcribing the whole YouTube catalog
- AI-generated people or building
- Mason headshot invention

---

## Test checklist

- [ ] `python3 -m http.server 8080` serves Home, Visit, About
- [ ] GH Pages URL loads (project page, not user page)
- [ ] Relative CSS/JS/img work on Pages (not only localhost root)
- [ ] Address **2308 Hwy 96**; no 548 Hillview; no 2300 Hwy 96
- [ ] Pastor named Aaron / A.T. Terlecki — not Ron Melton, not Church of Christ ministers
- [ ] Times match table above
- [ ] YouTube / Facebook links are the BBC ones
- [ ] Zero stock concert/field photos
- [ ] Mason has no fake headshot
- [ ] Gospel is on the home page in plain language
- [ ] Mobile nav works; 404 doesn’t dump into Jekyll
- [ ] `docs/research/sermon-*.md` exists; video binaries not committed
- [ ] `img/README.md` sources every image
