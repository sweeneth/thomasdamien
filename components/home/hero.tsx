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

function ringDots(radius: number, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: 18 + Math.cos(angle) * radius,
      cy: 18 + Math.sin(angle) * radius,
    };
  });
}

const OUTER_DOTS = ringDots(13, 16);
const INNER_DOTS = ringDots(8.5, 12);

function formatFix(lat: number, west: number) {
  const latHemisphere = lat >= 0 ? "N" : "S";
  const lonHemisphere = west >= 0 ? "W" : "E";
  return `${Math.abs(lat).toFixed(3)}° ${latHemisphere} · ${Math.abs(west).toFixed(3)}° ${lonHemisphere}`;
}

export function Hero() {
  const reticleRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const interactiveRef = useRef(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      interactiveRef.current = !motion.matches && hover.matches;
      if (!interactiveRef.current) {
        if (reticleRef.current) reticleRef.current.hidden = true;
        if (coordsRef.current) coordsRef.current.textContent = site.coordinates;
      }
    };
    sync();
    motion.addEventListener("change", sync);
    hover.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      hover.removeEventListener("change", sync);
    };
  }, []);

  function place(event: PointerEvent<HTMLElement>) {
    if (!interactiveRef.current || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const nx = Math.min(1, Math.max(0, x / bounds.width));
    const ny = Math.min(1, Math.max(0, y / bounds.height));
    const lat = ORIGIN_LAT + (0.5 - ny) * SPAN;
    const west = ORIGIN_WEST + (0.5 - nx) * SPAN;
    if (reticleRef.current) {
      reticleRef.current.hidden = false;
      reticleRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    if (coordsRef.current) coordsRef.current.textContent = formatFix(lat, west);
  }

  function reset() {
    if (reticleRef.current) reticleRef.current.hidden = true;
    if (coordsRef.current) coordsRef.current.textContent = site.coordinates;
  }

  return (
    <section
      id="top"
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
          {OUTER_DOTS.map((dot, index) => (
            <circle key={`outer-${index}`} className={styles.reticleDot} cx={dot.cx} cy={dot.cy} r="1.7" />
          ))}
          {INNER_DOTS.map((dot, index) => (
            <circle key={`inner-${index}`} className={styles.reticleCore} cx={dot.cx} cy={dot.cy} r="1.15" />
          ))}
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
