# Hero overlays — birds, then a wolf

Overlays for the locked hero photo (2070 × 760). The photo is untouched; every asset is transparent and positioned in the photo's own pixel space, so it stays pinned to the same rocks and sky at every crop.

## Files

| File | What it is |
|---|---|
| `heroLife.js` | Drop-in driver (no dependencies). Builds the birds and wolf inside an SVG and plays the timeline once when the hero is on screen. |
| `hero-stage.css` | Makes the photo and the overlay one "stage" with `object-fit: cover` behaviour and an adjustable crop. |
| `wolf.svg`, `wolf-head-raised.svg` | Wolf silhouette, 100 × 60 box, feet on y = 59, facing left. Groups: `#wolf-body`, `#wolf-head` (rotate around 27, 22). |
| `wolf@1x.png` `@2x` `@4x` | The wolf at true size (30 px wide at 1x), transparent. |
| `birds.svg`, `birds@1x/2x/4x.png` | The five-bird flock at rest (gliding). |
| `birds-sprite.svg` | The three wing poses as `<symbol>`s: `#bird-glide`, `#bird-up`, `#bird-down`. |
| `hero-overlay-reference.svg` | Full-frame 2070 × 760 transparent overlay with birds at t = 5s and the wolf placed. Reference only. |
| `guides.svg` | Bird sky band, wolf anchor box, and the desktop and phone crop frames. |
| `geometry.json` | Anchor, sizes, crop numbers in photo px. |

Comps (`comps-ABC.png`, `comps-detail.png`, `comps-mobile.png`, `comps-guides.png`) are next to this folder.

## Wiring it into Next.js

```tsx
// components/home/Hero.tsx
<section className="hero">
  <div className="hero-stage">
    <img src="/hero.jpg" alt="" />           {/* or next/image with fill; keep it inside the stage */}
    <svg className="hero-life" viewBox="0 0 2070 760" aria-hidden="true" />
  </div>
  {/* …name, one-liner, index… */}
</section>
```

```tsx
useEffect(() => {
  const life = window.HeroLife.start(document.querySelector(".hero")!);
  return () => life.stop();
}, []);
```

Load `heroLife.js` with `next/script` (`strategy="afterInteractive"`) or convert it to a module; it is plain ES5 with no globals besides `HeroLife`. Add `hero-stage.css` to the hero's styles. The hero needs a real height (it uses `container-type: size`).

**Crop.** `--ox` / `--oy` replace `object-position` (as numbers). Desktop `--ox: 0.65` keeps the right ridge in frame at 1440 × 900; phones use `0.82`, which frames the right cliff so the wolf is visible. If you change the crop, keep photo x ≈ 1580–1640 on screen or the wolf will be off-frame. The birds always cross whatever slice is visible.

## Timeline

| Time | What happens | Easing |
|---|---|---|
| 0.5s → 14.5s | Five birds drift across the visible sky right → left, slowly. They start low and far (y ≈ 132, scale 0.80) and finish a little higher and nearer (y ≈ 78, scale 1.20). | x linear; y and scale smoothstep |
| throughout | Each bird bobs ±1.6px on a 4.2s sine, offset per bird. Mostly gliding; every 2.8s a short, lazy burst of wingbeats (up / glide / down / glide, 160ms each), staggered so the flock never flaps in sync. | — |
| 6.5s → 8.0s | Wolf fades in at the anchor with a 2px settle. The birds are still crossing, on the left half of the sky, well away from it. | smoothstep |
| 9.5s → 10.2s | Head lifts 6°, looking out over the valley. | smoothstep |
| 12.0s → 12.7s | Head lowers. Wolf then stays put for the rest of the visit. | smoothstep |

Plays once per page view, starting when 40% of the hero is visible. Every number lives at the top of `heroLife.js` (`T`, `FLAP_EVERY`, `BEAT`, `BOB_PERIOD`, `BOB_AMP`) if you want to tune the pace.

**Placement.** Wolf's feet at photo (1606, 244), on the flat stretch of the right cliff-top ridge. Wolf is about 30 × 17 px in photo px; birds span about 10–14 px. Birds stay in the sky band y 40–152.

**Color.** Wolf `#201D1A`, birds `#26231F` at 86% opacity. Warm charcoal, no outlines, no glow.

## Reduced motion

`prefers-reduced-motion: reduce` → no birds; the wolf is drawn already settled with no head move. To leave it out entirely, call `HeroLife.start(hero, { wolfWhenStill: false })`.

## Not included

No Lottie: the motion is a few transforms driven by one small script, which is lighter and keeps the art crisp at every size. If you want a Lottie later, the timeline above maps one-to-one onto keyframes.
