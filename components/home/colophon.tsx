import Image from "next/image";
import { colophon, site } from "@/lib/content";
import styles from "./home.module.css";

export function Colophon() {
  return (
    <footer className={styles.colophon}>
      <div className={`${styles.wrap} ${styles.colophonInner}`}>
        <div className={styles.footer}>
          <div className={styles.footerMark}>
            <Image
              className={styles.footerSeal}
              src="/brand/seal-reverse.svg"
              alt="Logbook seal"
              width={56}
              height={56}
            />
            <span className={styles.footerMeta}>
              {colophon.line} · {site.coordinates}
            </span>
          </div>
          <span className={styles.copyright}>{colophon.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
