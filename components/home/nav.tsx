import Image from "next/image";
import { site, socials } from "@/lib/content";
import { isSocialIcon, SocialIcon } from "./icons";
import styles from "./home.module.css";

export function Nav() {
  const iconLinks = socials.flatMap((item) =>
    item.icon && isSocialIcon(item.label) ? [{ ...item, label: item.label }] : [],
  );

  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.headerInner}`}>
        <a href="#top" className={styles.mark} aria-label={`${site.name}, back to top`}>
          <Image src="/brand/signal-mark.svg" alt="" width={38} height={38} />
        </a>
        {/* Intro link may be added here later. Section links stay out of the header. */}
        <ul className={styles.iconNav}>
          {iconLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.iconLink} aria-label={item.label} rel="noreferrer">
                <SocialIcon name={item.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
