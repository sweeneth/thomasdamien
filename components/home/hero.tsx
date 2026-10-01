"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Image from "next/image";
import { sections, site } from "@/lib/content";
import HeroLife from "./HeroLife";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

const ORIGIN_LAT = 34.05;
const ORIGIN_WEST = 118.24;
/** ±0.04°, a few hundredths around the Los Angeles origin. */
const SPAN = 0.08;
/** Wolf feet, in the locked photo. */
const WOLF_PHOTO = { x: 1606, y: 244 };

function formatFix(lat: number, west: number) {
  const latHemisphere = lat >= 0 ? "N" : "S";
  const lonHemisphere = west >= 0 ? "W" : "E";
  return `${Math.abs(lat).toFixed(3)}° ${latHemisphere} · ${Math.abs(west).toFixed(3)}° ${lonHemisphere}`;
}

function wolfCoordinates(hero: HTMLElement) {
  const stage = hero.querySelector(".hero-stage");
  if (!stage) return site.coordinates;
  const heroBox = hero.getBoundingClientRect();
  const stageBox = stage.getBoundingClientRect();
  if (!stageBox.width || !heroBox.width || !heroBox.height) return site.coordinates;
  const scale = stageBox.width / 2070;
  const x = stageBox.left - heroBox.left + WOLF_PHOTO.x * scale;
  const y = stageBox.top - heroBox.top + WOLF_PHOTO.y * scale;
  const nx = Math.min(1, Math.max(0, x / heroBox.width));
  const ny = Math.min(1, Math.max(0, y / heroBox.height));
  return formatFix(ORIGIN_LAT + (0.5 - ny) * SPAN, ORIGIN_WEST + (0.5 - nx) * SPAN);
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const interactiveRef = useRef(false);
  const reducedRef = useRef(false);
  const snapUntil = useRef(0);
  const wolfFixRef = useRef(site.coordinates);
  const lastFixRef = useRef(site.coordinates);
  const pointerInside = useRef(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      reducedRef.current = motion.matches;
      interactiveRef.current = !motion.matches && hover.matches;
      if (!interactiveRef.current) {
        if (reticleRef.current) reticleRef.current.hidden = true;
        if (coordsRef.current && performance.now() >= snapUntil.current) {
          coordsRef.current.textContent = site.coordinates;
        }
      }
    };
    sync();
    motion.addEventListener("change", sync);
    hover.addEventListener("change", sync);

    const hero = heroRef.current;
    const onWolf = () => {
      if (!hero || reducedRef.current) return;
      wolfFixRef.current = wolfCoordinates(hero);
      snapUntil.current = performance.now() + 1000;
      if (coordsRef.current) coordsRef.current.textContent = wolfFixRef.current;
      window.setTimeout(() => {
        if (!coordsRef.current || performance.now() < snapUntil.current) return;
        coordsRef.current.textContent =
          pointerInside.current && interactiveRef.current ? lastFixRef.current : site.coordinates;
      }, 1000);
    };
    hero?.addEventListener("herolife-wolf", onWolf);

    return () => {
      motion.removeEventListener("change", sync);
      hover.removeEventListener("change", sync);
      hero?.removeEventListener("herolife-wolf", onWolf);
    };
  }, []);

  function place(event: PointerEvent<HTMLElement>) {
    if (!interactiveRef.current || event.pointerType === "touch") return;
    pointerInside.current = true;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const nx = Math.min(1, Math.max(0, x / bounds.width));
    const ny = Math.min(1, Math.max(0, y / bounds.height));
    lastFixRef.current = formatFix(ORIGIN_LAT + (0.5 - ny) * SPAN, ORIGIN_WEST + (0.5 - nx) * SPAN);
    if (reticleRef.current) {
      reticleRef.current.hidden = false;
      reticleRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    if (coordsRef.current) {
      coordsRef.current.textContent =
        performance.now() < snapUntil.current ? wolfFixRef.current : lastFixRef.current;
    }
  }

  function reset() {
    pointerInside.current = false;
    if (reticleRef.current) reticleRef.current.hidden = true;
    if (coordsRef.current && performance.now() >= snapUntil.current) {
      coordsRef.current.textContent = site.coordinates;
    }
  }

  return (
    <section
      id="top"
      ref={heroRef}
      className={`${styles.hero} hero`}
      aria-label="Introduction"
      onPointerMove={place}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div className="hero-stage">
        <Image
          src={site.heroImage.src}
          alt={site.heroImage.alt}
          fill
          priority
          decoding="sync"
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <HeroLife />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div ref={reticleRef} className={styles.reticle} hidden>
        <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
          <g className={styles.reticleOuter}>
            <circle className={styles.reticleDash} cx="18" cy="18" r="13" />
          </g>
          <g className={styles.reticleInner}>
            <circle className={styles.reticleDashCore} cx="18" cy="18" r="8.2" />
          </g>
        </svg>
      </div>
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <div className={styles.heroFoot}>
          <div className={styles.heroMeta}>
            <span ref={coordsRef} className={styles.coords}>
              {site.coordinates}
            </span>
            <span className={styles.metaRule} aria-hidden="true" />
            <SiteLink href={site.current.href} className={styles.current}>
              <span className={styles.signalDot} aria-hidden="true" />
              <span className={styles.currentLabel}>Current · {site.current.label}</span>
              <span aria-hidden="true">→</span>
            </SiteLink>
          </div>
          <nav aria-label="Index">
            <ul className={styles.index}>
              {sections.map((section) => (
                <li key={section.id}>
                  <SiteLink href={`#${section.id}`}>
                    <span className={styles.indexNum}>{section.n}</span>
                    <span className={styles.indexTitle}>{section.title}</span>
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
