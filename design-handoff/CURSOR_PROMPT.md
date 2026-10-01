# Cursor prompt — thomasdamien.com homepage

Paste everything below the line into Cursor (Agent mode) with this folder added to the repo as `design-handoff/`.

---

Rebuild the homepage of this Next.js (App Router) site to match the approved design in `design-handoff/`. Treat that folder as the source of truth for layout, copy, color, type and assets. Do not invent new colors, fonts, sections or copy.

## What's in `design-handoff/`

- `reference/homepage.html` — the approved design as a static page. Open it in a browser and match it. It's a design file, not production code: inline styles everywhere, no components. Use it for measurements, spacing and structure, then write clean components.
- `content.ts` — every word on the page, already structured. Move it to `lib/content.ts` (replacing the current copy module) and have components read from it. No copy hardcoded in components.
- `public/` — copy into the repo's `public/` as-is: `hero.jpg`, `logos/`, `icons/`, `brand/`, and the favicon set.
- `brand/tokens.css`, `brand/tokens.json`, `brand/BRAND.md` — the brand system. Put the CSS variables in `app/globals.css`.

## Brand rules (non-negotiable)

- **Colors:** only the tokens: Chart Ink `#14243A`, Sailcloth `#F4F1EA`, Harbor Green `#2E5B4B`, Signal `#C8461B`, Slate `#5A6270`, body ink `#3A4556`, rule `#D9D3C5`, white `#FFFFFF`. On the dark hero and contact sections, secondary text is `#A9B1BC` and hairlines are `#3A4A60` (tints of Chart Ink). Flag Gold `#E0A93B` appears only inside the flag mark, never in UI.
- **Type:** load with `next/font/google`:
  - Newsreader 400/500 + italic: headings, names, pull text. Italic is the emphasis voice.
  - Instrument Sans 400/500/600: body and UI.
  - IBM Plex Mono 400/500: index numbers, labels, dates, coordinates. Uppercase, letter-spacing 0.12em.
- **Layout language:** thin 1px rules, no cards except the Trash box, no rounded corners, no shadows, no gradients except the hero photo scrim.

## Structure

Single long-scroll page, anchors only. Build one component per section in `components/home/`:

1. `Nav` — sticky. Left: Signal Mark (`/brand/signal-mark.svg`, 38px) linking to top, then section links (About, Projects, Reading, Writing, Workbench, Contact). Right: GitHub, X, LinkedIn icons (`/icons/*.svg`, rendered inline so they take `currentColor`) and a Lucide `Mail` icon linking to `#contact`. 36px tap targets, Chart Ink, Harbor Green on hover, `aria-label` on each.
2. `Hero` — full-bleed `hero.jpg` (`next/image`, `fill`, `object-cover`, `object-position: 60% 30%`, `priority`) under a vertical scrim from 10% to 100% Chart Ink. Bottom-left: name (Newsreader, `clamp(42px, 6.4vw, 80px)`), a row with coordinates · rule · "CURRENT · HEAD OF GROWTH, WATT →" (Signal square bullet), the one-liner, then the numbered index grid (`sections` from content), 6 columns on desktop, wrapping down.
3. `About` (01) — label row + headline, paragraphs left (max ~700px), facts column right with the seal (`/brand/seal.svg`) on top, then the "Logged at" tray: one row of five logo cells, each logo at its own height from content, 72% opacity, 100% on hover.
4. `Projects` (02) — label row only, no headline. Project rows with status pills (LIVE in Signal, SIDE in Slate). Then the Trash box (white, 1px rule border) with struck-through titles (Signal line-through, 2px).
5. `Reading` (03) — bookshelf: spines are links to `https://www.goodreads.com/search?q=<title+author>`, vertical title text, sizes and colors from content, an 8px Chart Ink shelf under them, tags (NOW / NEXT / NIGHT) above. Hover lifts a spine 8px. Shelf scrolls horizontally inside its own container on small screens. Callouts list to the right.
6. `Writing` (04) — archive rows (log number + date left, title + dek right), then two text links.
7. `Workbench` (05) — numbered tool rows with an arrow.
8. `Contact` (06) — Chart Ink section: headline, line of body copy, email as a large Newsreader italic link with a Signal underline, socials list, footer row with the reversed seal (`/brand/seal-reverse.svg`), "END OF LOG · coordinates" and copyright.

Section label rows everywhere: `NN — Name` in Signal mono on the left, the `aside` in Slate mono on the right, 1px Chart Ink rule underneath.

## Behaviour and quality

- Smooth-scroll to anchors with a scroll-margin for the sticky nav; respect `prefers-reduced-motion`.
- Responsive down to 360px with no horizontal scroll (only the bookshelf scrolls, inside its container).
- Semantic HTML: one `h1` (the name), `h2` per section, real `<a>`/`<button>`, visible focus ring in Signal.
- Favicons: wire up `public/` per `public/head-snippet.html` via the `metadata` export in `app/layout.tsx`.
- Lighthouse: performance and accessibility ≥ 95. Text contrast must pass WCAG AA.

## Done when

- The page matches `reference/homepage.html` side by side at 1440px and 390px.
- All copy comes from `lib/content.ts`.
- No color or font outside the brand rules above appears in the build.

Leave the `TODO` items in `content.ts` as they are; they're waiting on real content.
