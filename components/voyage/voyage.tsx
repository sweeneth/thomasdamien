"use client";

import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";
import { BoatArt, Dog, Man } from "@/components/voyage/boat-art";
import { planVoyage, type Point, type VoyagePlan } from "@/lib/voyage/route";

const BEACHED = 162;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function smoothstep(amount: number) {
  const t = clamp(amount, 0, 1);
  return t * t * (3 - 2 * t);
}

function lerpAngle(from: number, to: number, amount: number) {
  const delta = ((to - from + 540) % 360) - 180;
  return from + delta * amount;
}

function rotateLocal(x: number, y: number, degrees: number) {
  const rad = (degrees * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return { x: x * cos - y * sin, y: x * sin + y * cos };
}

function viewPoint(point: Point, scrollY: number) {
  return { x: point.x, y: point.y - scrollY };
}

type Placed = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
};

function placeFigures(
  plan: VoyagePlan,
  scrollProgress: number,
  scrollY: number,
  boat: { x: number; y: number; rotation: number; scale: number },
): { man: Placed; dog: Placed; wake: number } {
  const span = Math.max(0.0001, 1 - plan.landStart);
  const u = clamp((scrollProgress - plan.landStart) / span, 0, 1);
  const settle = smoothstep(u / 0.42);
  const appear = smoothstep((u - 0.28) / 0.24);
  const manWalk = smoothstep((u - 0.42) / 0.58);
  const dogWalk = smoothstep((u - 0.55) / 0.45);
  const manDeck = rotateLocal(11 * boat.scale, 8 * boat.scale, boat.rotation);
  const dogDeck = rotateLocal(-12 * boat.scale, 14 * boat.scale, boat.rotation);
  const manTarget = viewPoint(plan.man, scrollY);
  const dogTarget = viewPoint(plan.dog, scrollY);

  return {
    wake: scrollProgress < plan.landStart ? 1 : 1 - settle * 0.85,
    man: {
      x: lerp(boat.x + manDeck.x, manTarget.x, manWalk),
      y: lerp(boat.y + manDeck.y, manTarget.y, manWalk),
      rotation: lerpAngle(boat.rotation, BEACHED + 8, manWalk),
      scale: lerp(0.72, 1, manWalk),
      opacity: appear,
    },
    dog: {
      x: lerp(boat.x + dogDeck.x, dogTarget.x, dogWalk),
      y: lerp(boat.y + dogDeck.y, dogTarget.y, dogWalk),
      rotation: lerpAngle(boat.rotation, BEACHED - 14, dogWalk),
      scale: lerp(0.72, 1, dogWalk),
      opacity: appear,
    },
  };
}

export default function Voyage() {
  const boatRef = useRef<HTMLDivElement>(null);
  const manRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boatEl = boatRef.current;
    const manEl = manRef.current;
    const dogEl = dogRef.current;
    if (!boatEl || !manEl || !dogEl) return;

    let cancelled = false;
    let stop = () => {};
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const boot = async () => {
      const [{ gsap }, scrollMod, pathMod, lenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/MotionPathPlugin"),
        import("lenis"),
      ]);
      if (cancelled || motion.matches) return;

      const ScrollTrigger = scrollMod.default;
      const MotionPathPlugin = pathMod.default;
      const Lenis = lenisMod.default;
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";

      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: false,
        respectReducedMotion: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      gsap.set([boatEl, manEl, dogEl], { xPercent: -50, yPercent: -50, force3D: true });
      gsap.set([manEl, dogEl], { opacity: 0 });

      let timeline: gsap.core.Timeline | null = null;
      let plan: VoyagePlan | null = null;
      let key = "";
      let beached = 110;

      const readBoat = () => ({
        x: Number(gsap.getProperty(boatEl, "x")),
        y: Number(gsap.getProperty(boatEl, "y")),
        rotation: Number(gsap.getProperty(boatEl, "rotation")),
        scale: Number(gsap.getProperty(boatEl, "scale")),
      });

      const syncCrew = (scrollProgress: number, scrollY: number) => {
        if (!plan) return;
        const span = Math.max(0.0001, 1 - plan.landStart);
        const u = clamp((scrollProgress - plan.landStart) / span, 0, 1);
        const settle = smoothstep(u / 0.45);
        let boat = readBoat();

        if (scrollProgress > plan.landStart) {
          const water = viewPoint(plan.waterline, scrollY);
          const x = lerp(boat.x, water.x, settle);
          const y = lerp(boat.y, water.y, settle);
          beached = lerpAngle(beached, BEACHED, 0.2);
          gsap.set(boatEl, { x, y, rotation: beached, scale: lerp(boat.scale, 1.04, settle) });
          boat = { x, y, rotation: beached, scale: lerp(boat.scale, 1.04, settle) };
        } else {
          beached = boat.rotation;
        }

        const crew = placeFigures(plan, scrollProgress, scrollY, boat);
        gsap.set(manEl, crew.man);
        gsap.set(dogEl, crew.dog);
        boatEl.style.setProperty("--wake", crew.wake.toFixed(3));
      };

      const rebuild = () => {
        const next = planVoyage();
        if (!next || next.poses.length < 2) return;
        const nextKey = `${window.innerWidth}:${Math.round(next.maxScroll / 4)}`;
        if (nextKey === key && timeline) {
          timeline.scrollTrigger?.refresh();
          syncCrew(timeline.scrollTrigger?.progress ?? 0, window.scrollY);
          return;
        }
        key = nextKey;
        plan = next;
        timeline?.scrollTrigger?.kill();
        timeline?.kill();

        const first = next.poses[0];
        gsap.set(boatEl, { x: first.x, y: first.y, scale: first.scale, rotation: 110 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate(self) {
              syncCrew(self.progress, self.scroll());
            },
          },
        });

        for (let i = 1; i < next.poses.length; i += 1) {
          const prev = next.poses[i - 1];
          const pose = next.poses[i];
          tl.to(
            boatEl,
            {
              motionPath: {
                path: [
                  { x: prev.x, y: prev.y },
                  { x: pose.x, y: pose.y },
                ],
                curviness: 0,
                fromCurrent: false,
                autoRotate: 90,
              },
              scale: pose.scale,
              duration: Math.max(0.001, pose.at - prev.at),
              ease: "none",
            },
            prev.at,
          );
        }

        if (next.landStart < 0.999) {
          tl.to(boatEl, { duration: Math.max(0.001, 1 - next.landStart) }, next.landStart);
        }

        timeline = tl;
        syncCrew(tl.scrollTrigger?.progress ?? 0, window.scrollY);
        root.classList.add("voyage-on");
      };

      const onAnchor = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        const link = (event.target as Element | null)?.closest?.("a");
        if (!link) return;
        const href = link.getAttribute("href");
        if (!href?.startsWith("#")) return;
        const id = href.slice(1);
        if (id && !document.getElementById(id)) return;
        event.preventDefault();
        lenis.scrollTo(id ? href : 0);
        history.pushState(null, "", href);
      };

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(rebuild, 140);
      };

      document.addEventListener("click", onAnchor);
      window.addEventListener("resize", onResize);
      rebuild();
      document.fonts?.ready.then(() => {
        if (!cancelled) {
          key = "";
          rebuild();
        }
      });

      stop = () => {
        window.clearTimeout(resizeTimer);
        document.removeEventListener("click", onAnchor);
        window.removeEventListener("resize", onResize);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        gsap.ticker.remove(onTick);
        lenis.destroy();
        root.classList.remove("voyage-on");
        root.style.scrollBehavior = previousScrollBehavior;
      };
    };

    const onMotion = () => {
      stop();
      if (!motion.matches) {
        cancelled = false;
        void boot();
      }
    };

    if (!motion.matches) void boot();
    motion.addEventListener("change", onMotion);

    return () => {
      cancelled = true;
      stop();
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div className="voyage-layer" aria-hidden="true">
      <div ref={boatRef} className="voyage-traveler voyage-boat">
        <div className="voyage-bob">
          <BoatArt />
        </div>
      </div>
      <div ref={manRef} className="voyage-traveler voyage-man">
        <div className="voyage-bob voyage-bob-late">
          <Man />
        </div>
      </div>
      <div ref={dogRef} className="voyage-traveler voyage-dog">
        <div className="voyage-bob">
          <Dog />
        </div>
      </div>
    </div>
  );
}
