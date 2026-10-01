import Image from "next/image";
import { sections, site } from "@/lib/content";
import styles from "./home.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <Image
        src={site.heroImage.src}
        alt={site.heroImage.alt}
        fill
        priority
        decoding="sync"
        sizes="100vw"
        className={styles.heroPhoto}
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <div className={styles.heroTitleRow}>
            <div className={styles.heroTitleBlock}>
              <h1 className={styles.heroName}>{site.name}</h1>
              <div className={styles.heroMeta}>
                <span className={styles.coords}>{site.coordinates}</span>
                <span className={styles.metaRule} aria-hidden="true" />
                <a href={site.current.href} className={styles.current} rel="noreferrer">
                  <span className={styles.signalDot} aria-hidden="true" />
                  <span className={styles.currentLabel}>Current · {site.current.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <p className={styles.lede}>{site.oneLiner}</p>
        </div>
        <nav aria-label="Index">
          <ul className={styles.index}>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span className={styles.indexNum}>{section.n}</span>
                  <span className={styles.indexTitle}>{section.title}</span>
                  <span className={styles.indexBlurb}>{section.blurb}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
