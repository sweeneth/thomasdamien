import Image from "next/image";
import { site, socials } from "@/lib/content";
import { isSocialIcon, SocialIcon } from "./icons";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

export function Nav() {
  const iconLinks = socials.flatMap((item) =>
    item.icon && isSocialIcon(item.label) ? [{ ...item, label: item.label }] : [],
  );

  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.headerInner}`}>
        <div className={styles.brandCluster}>
          <a href="#top" className={styles.mark} aria-label="Back to top">
            <Image src="/brand/signal-mark.svg" alt="" width={38} height={38} />
          </a>
          {/* Intro link may be added here later. Section links stay out of the header. */}
          <h1 className={styles.headerName}>{site.name}</h1>
        </div>
        <ul className={styles.iconNav}>
          {iconLinks.map((item) => (
            <li key={item.label}>
              <SiteLink href={item.href} className={styles.iconLink} aria-label={item.label}>
                <SocialIcon name={item.label} />
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
