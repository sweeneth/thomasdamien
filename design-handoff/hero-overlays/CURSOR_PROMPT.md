# Cursor prompt — hero birds and wolf

Paste everything below the line into Cursor (Agent mode). This folder should be in the repo at `design-handoff/hero-overlays/`.

---

Add the approved hero motion (a few birds drift across the sky, then a small wolf appears on the right ridge) to the homepage hero. Everything you need is in `design-handoff/hero-overlays/`. Do not redraw, recolor or retime anything; use the files as delivered. `MOTION.md` is the spec and `preview.html` (open it in a browser) is the reference for how it should look and move.

## 1. Files

- `public/hero.jpg` → replace `public/hero.jpg`. This is the new, larger photo (2070 × 760). All overlay positions are measured against it, so the old photo will not line up. Do not crop, filter or re-export it.
- `lib/heroLife.js` → `lib/heroLife.js` as-is (plain JS, no dependencies).
- `components/HeroLife.tsx` → `components/home/HeroLife.tsx`.
- `styles/hero-stage.css` → import it in `app/globals.css` (or the hero's CSS module).
- `assets/` and `comps/` are reference only; do not ship them.

## 2. Restructure the hero

The photo and the overlay must sit inside one "stage" that behaves like `object-fit: cover`. That keeps the wolf pinned to the same rock at every screen size. Replace the current full-bleed image with:

```tsx
<section className="hero" id="top">
  <div className="hero-stage">
    <Image src="/hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
    <HeroLife />
  </div>
  {/* existing scrim gradient, lockup, one-liner and index go here, above the stage */}
</section>
```

- Remove the old `object-position: 60% 30%` on the hero image. The crop is now set by `--ox` / `--oy` in `hero-stage.css` (0.65 on desktop, 0.82 on phones so the wolf stays in frame).
- `.hero` needs a real height, because the stage uses `container-type: size`. Give it an explicit `min-height` that matches the current design (for example `min-height: clamp(560px, 70vh, 820px)`) instead of letting content alone set it.
- Keep the existing scrim and all hero text above the stage (`position: relative; z-index: 1` on the text wrapper). The stage has `pointer-events: none`, so links in the hero still work.

## 3. Behaviour to check

- Plays once, when about 40% of the hero is visible. Birds take about 14 seconds to cross; the wolf fades in at about 6.5 seconds, lifts its head around 9.5 seconds, then stays.
- `prefers-reduced-motion: reduce`: no birds, and the wolf is shown already in place, not moving.
- No layout shift, no console errors, and nothing changes in Lighthouse performance (the script is about 7 KB and only animates SVG transforms).
- At 1440 × 900 and at 390 × 844, compare against `comps/comps-ABC.png` and `comps/comps-mobile.png`: the wolf stands on the right cliff-top ridge, not floating and not buried, and the birds stay in the sky.

## Done when

- The hero matches `preview.html` at desktop and phone widths.
- Reduced motion shows the still state.
- The files in `lib/` and `components/` are used unchanged, apart from import paths.
