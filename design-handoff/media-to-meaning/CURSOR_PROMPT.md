# Cursor prompt: add /media-to-meaning

Paste everything below the line into Cursor (Agent mode). Put this folder in the repo at `design-handoff/media-to-meaning/` first.

---

Add the finished editorial page "From Media to Meaning" to the site at `/media-to-meaning`. It is a complete, self-contained HTML page: its own CSS, one inline script and Google Fonts. **Serve it as a static file. Do not port it to React, run it through the site layout, restyle it or edit its content.** Its styles set `html`, `body` and generic class names, so mounting it inside the app layout would clash with the site's own CSS.

## 1. Copy the files

- `design-handoff/media-to-meaning/public/media-to-meaning/index.html` → `public/media-to-meaning/index.html`
- `design-handoff/media-to-meaning/public/media-to-meaning/og.png` → `public/media-to-meaning/og.png` (1200 × 630 share image)

## 2. Route `/media-to-meaning` to the file

Next.js does not serve `index.html` for a folder on its own. Add a rewrite in `next.config.(js|mjs|ts)`, merged with any existing `rewrites`:

```js
async rewrites() {
  return [
    { source: "/media-to-meaning", destination: "/media-to-meaning/index.html" },
  ];
},
```

- Make sure nothing else claims the path (no `app/media-to-meaning/` or `pages/media-to-meaning` route).
- If the site uses `trailingSlash: true`, also check that `/media-to-meaning/` works.
- If middleware matches all paths, exclude this one so the HTML comes back untouched.

## 3. Check the head tags

The page already has a title, description, canonical URL (`https://thomasdamien.com/media-to-meaning`), Open Graph and Twitter tags, and favicon links to `/favicon.ico`, `/favicon.svg` and `/apple-touch-icon.png`.

- If the site serves favicons from other paths (for example `app/icon.svg`), change only those three `<link>` tags to match.
- If the production domain is not `thomasdamien.com`, update the canonical, `og:url` and `og:image` URLs.

## 4. Optional

If there is a `sitemap.ts` or `sitemap.xml`, add `/media-to-meaning`. Do not add it to the main nav unless asked.

## Check

- `/media-to-meaning` loads with no console errors, and every other route is unchanged.
- The top bar shows "← Tom Sweeney" and links to `/`. On phones it shows "← Home".
- "I · The Journey" and "II · Two Voices" switch pages, and the Both / Tom / Roger buttons fade the other voice.
- The two coloured strands draw down the centre track. Reference cards open on click. "Ref." links in the library jump to their cards.
- No horizontal scroll at 390 px wide.
- Sharing the URL (or the opengraph.xyz preview) shows `og.png`.

## Done when

The page at `/media-to-meaning` looks and behaves exactly like opening `public/media-to-meaning/index.html` directly in a browser.
