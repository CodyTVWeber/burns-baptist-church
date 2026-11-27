# Burns Baptist Church

Static site for **Burns Baptist Church**, 2308 Hwy 96, Burns, TN 37029. Pastor Aaron “A.T.” Terlecki.

HTML / CSS / JS only. GitHub Pages. No npm, no bundler.

## Run locally

```bash
python3 -m http.server 8080
```

Open http://127.0.0.1:8080

## Check JS

```bash
node --check js/site.js
```

## Watch and Follow feeds

The home page has compact YouTube and Facebook sections. Two free keys still need to be pasted on the `#watch` section in `index.html`:

| Attribute | What to paste |
|---|---|
| `data-youtube-api-key` | YouTube Data API v3 key. Create a free key at [Google Cloud Console](https://console.cloud.google.com/), enable **YouTube Data API v3**, and restrict it to this GitHub Pages URL. |
| `data-facebook-app-id` | Meta App ID. Create a free app at [Meta for Developers](https://developers.facebook.com/), then add this site’s domain under the app’s site URL / app domains. |

Already filled for Burns Baptist Church:

| Attribute | Value |
|---|---|
| `data-youtube-channel-id` | `UCYEED3mai1PJ6yWgzKr-k9g` (`@burnsbaptistchurch-burnstn1436`) |
| `data-youtube-uploads-playlist` | `UUYEED3mai1PJ6yWgzKr-k9g` |
| `data-facebook-page-url` | `https://www.facebook.com/p/Burns-Baptist-Church-61585569585817/` |

Without the YouTube key, the section still shows a small uploads playlist embed. If the Facebook timeline plugin does not load (missing App ID, localhost, or a blocked embed), the section shows an **Open Facebook** card that links to the church page.

## Pages

| File | Role |
|---|---|
| `index.html` | Home — welcome, times, church family, what we believe |
| `visit.html` | Visit — directions, what to expect, children’s ministry, YOKE |
| `about.html` | About — church leadership and the 2015 story |
| `mission.html` | On Mission — photos and ministries we support |
| `404.html` | Simple not-found |

Live (after Pages enable): https://codytvweber.github.io/burns-baptist-church/
