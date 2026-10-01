"use client";

import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";
import { BoatArt, Dog, Man } from "@/components/voyage/boat-art";
import { planVoyage, samplePose, type Pose, type Point, type VoyagePlan } from "@/lib/voyage/route";

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

type Sampler = {
  at: (scrollProgress: number) => { x: number; y: number; scale: number; angle: number };
};

type PathPlugin = {
  arrayToRawPath: (
    values: { x: number; y: number }[],
    vars?: { curviness?: number },
  ) => object;
  cacheRawPathMeasurements: (rawPath: object, resolution?: number) => object;
  getPositionOnPath: (
    rawPath: object,
    progress: number,
    includeAngle?: boolean,
  ) => { x: number; y: number; angle?: number };
};

function buildSampler(poses: Pose[], landStart: number, plugin: PathPlugin): Sampler {
  const steps = 220;
  const samples: Pose[] = [];
  for (let i = 0; i <= steps; i += 1) {
    samples.push(samplePose(poses, (i / steps) * landStart));
  }

  const kept: { x: number; y: number }[] = [];
  const keptIndex: number[] = [];
  for (let i = 0; i < samples.length; i += 1) {
    const point = samples[i];
    const prev = kept[kept.length - 1];
    if (!prev || Math.hypot(point.x - prev.x, point.y - prev.y) > 1.25) {
      kept.push({ x: point.x, y: point.y });
    }
    keptIndex.push(kept.length - 1);
  }
  if (kept.length < 2) {
    const only = samples[0];
    kept.push({ x: only.x + 0.5, y: only.y + 0.5 });
    keptIndex[keptIndex.length - 1] = kept.length - 1;
  }

  const raw = plugin.arrayToRawPath(kept, { curviness: 0 });
  plugin.cacheRawPathMeasurements(raw);

  const lengths = [0];
  for (let i = 1; i < kept.length; i += 1) {
    lengths.push(lengths[i - 1] + Math.hypot(kept[i].x - kept[i - 1].x, kept[i].y - kept[i - 1].y));
  }
  const total = lengths[lengths.length - 1] || 1;

  return {
    at(scrollProgress: number) {
      const local = clamp(scrollProgress / landStart, 0, 1);
      const scaled = local * steps;
      const index = Math.min(steps - 1, Math.floor(scaled));
      const amount = scaled - index;
      const arcA = lengths[keptIndex[index]] / total;
      const arcB = lengths[keptIndex[index + 1]] / total;
      const arc = arcA + (arcB - arcA) * amount;
      const pose = samplePose(poses, Math.min(scrollProgress, landStart));
      const pos = plugin.getPositionOnPath(raw, arc, true);
      const ahead = samples[Math.min(steps, index + 4)];
      const behind = samples[index];
      const dx = ahead.x - behind.x;
      const dy = ahead.y - behind.y;
      const moved = Math.hypot(dx, dy);
      const angle = moved > 1.5 ? (Math.atan2(dy, dx) * 180) / Math.PI : (pos.angle ?? 0);
      const x = Number.isFinite(pos.x) ? pos.x : pose.x;
      const y = Number.isFinite(pos.y) ? pos.y : pose.y;
      return { x, y, scale: pose.scale, angle };
    },
  };
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
  const appear = smoothstep((u - 0.3) / 0.26);
  const manWalk = smoothstep((u - 0.46) / 0.54);
  const dogWalk = smoothstep((u - 0.58) / 0.42);

  const manDeck = rotateLocal(11 * boat.scale, 8 * boat.scale, boat.rotation);
  const dogDeck = rotateLocal(-12 * boat.scale, 14 * boat.scale, boat.rotation);
  const manTarget = viewPoint(plan.man, scrollY);
  const dogTarget = viewPoint(plan.dog, scrollY);

  return {
    wake: scrollProgress < plan.landStart ? 1 : 1 - settle * 0.8,
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
      rotation: lerpAngle(boat.rotation, BEACHED - 12, dogWalk),
      scale: lerp(0.72, 1, dogWalk),
      opacity: appear,
    },
  };
}

function viewPoint(point: Point, scrollY: number) {
  return { x: point.x, y: point.y - scrollY };
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

      let heading = 110;
      let tween: gsap.core.Tween | null = null;
      let sampler: Sampler | null = null;
      let plan: VoyagePlan | null = null;
      let key = "";

      const apply = (scrollProgress: number, scrollY: number) => {
        if (!plan || !sampler) return;
        const span = Math.max(0.0001, 1 - plan.landStart);
        const u = clamp((scrollProgress - plan.landStart) / span, 0, 1);
        const settle = smoothstep(clamp(u / 0.42, 0, 1));
        const along = sampler.at(Math.min(scrollProgress, plan.landStart));
        const water = viewPoint(plan.waterline, scrollY);

        if (scrollProgress < plan.landStart) {
          heading = lerpAngle(heading, along.angle + 90, 0.35);
        } else {
          heading = lerpAngle(heading, BEACHED, 0.16);
        }

        const x = scrollProgress <= plan.landStart ? along.x : lerp(along.x, water.x, settle);
        const y = scrollProgress <= plan.landStart ? along.y : lerp(along.y, water.y, settle);
        const scale = scrollProgress <= plan.landStart ? along.scale : lerp(along.scale, 1.04, settle);

        gsap.set(boatEl, { x, y, rotation: heading, scale });
        const crew = placeFigures(plan, scrollProgress, scrollY, { x, y, rotation: heading, scale });
        gsap.set(manEl, crew.man);
        gsap.set(dogEl, crew.dog);
        boatEl.style.setProperty("--wake", crew.wake.toFixed(3));
      };

      const rebuild = () => {
        const next = planVoyage();
        if (!next) return;
        const nextKey = `${window.innerWidth}:${Math.round(next.maxScroll / 4)}`;
        if (nextKey === key && tween) {
          tween.scrollTrigger?.refresh();
          apply(tween.scrollTrigger?.progress ?? 0, window.scrollY);
          return;
        }
        key = nextKey;
        plan = next;
        sampler = buildSampler(next.poses, next.landStart, MotionPathPlugin as PathPlugin);
        tween?.scrollTrigger?.kill();
        tween?.kill();

        const progress = { value: 0 };
        tween = gsap.to(progress, {
          value: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            apply(this.progress(), window.scrollY);
          },
        });
        apply(tween.scrollTrigger?.progress ?? 0, window.scrollY);
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
        if (!cancelled) rebuild();
      });

      stop = () => {
        window.clearTimeout(resizeTimer);
        document.removeEventListener("click", onAnchor);
        window.removeEventListener("resize", onResize);
        tween?.scrollTrigger?.kill();
        tween?.kill();
        gsap.ticker.remove(onTick);
        lenis.destroy();
        root.classList.remove("voyage-on");
        root.style.scrollBehavior = previousScrollBehavior;
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
        <Man />
      </div>
      <div ref={dogRef} className="voyage-traveler voyage-dog">
        <div className="voyage-bob voyage-bob-late">
          <Dog />
        </div>
      </div>
    </div>
  );
}
