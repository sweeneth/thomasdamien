"use client";

// Mounts the birds-and-wolf overlay inside the hero stage and plays it once.
// Place it inside <div className="hero-stage">, after the photo.
import { useEffect, useRef } from "react";

type Life = { stop: () => void; replay: () => void };
declare global {
  interface Window {
    HeroLife?: { start: (hero: HTMLElement, opts?: { wolfWhenStill?: boolean }) => Life };
  }
}

export default function HeroLife({ wolfWhenStill = true }: { wolfWhenStill?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let life: Life | undefined;
    let cancelled = false;
    // Browser-only: the script touches window and the DOM.
    import("@/lib/heroLife.js").then(() => {
      const hero = ref.current?.closest<HTMLElement>(".hero");
      if (!cancelled && hero && window.HeroLife) life = window.HeroLife.start(hero, { wolfWhenStill });
    });
    return () => {
      cancelled = true;
      life?.stop();
    };
  }, [wolfWhenStill]);

  return <svg ref={ref} className="hero-life" viewBox="0 0 2070 760" aria-hidden="true" />;
}
