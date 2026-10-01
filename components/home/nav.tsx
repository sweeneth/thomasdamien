import Image from "next/image";
import { sections, site, socials } from "@/lib/content";
import { isSocialIcon, MailIcon, SocialIcon } from "./icons";
import styles from "./home.module.css";

export function Nav() {
  const iconLinks = socials.flatMap((item) =>
    item.icon && isSocialIcon(item.label) ? [{ ...item, label: item.label }] : [],
  );

  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.headerInner}`}>
        <div className={styles.brandCluster}>
          <a href="#top" className={styles.mark} aria-label={`${site.name}, back to top`}>
            <Image src="/brand/signal-mark.svg" alt="" width={38} height={38} />
          </a>
          <nav aria-label="Sections">
            <ul className={styles.sectionNav}>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ul className={styles.iconNav}>
          {iconLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.iconLink} aria-label={item.label} rel="noreferrer">
                <SocialIcon name={item.label} />
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={styles.iconLink} aria-label="Email">
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
