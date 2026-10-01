import Image from "next/image";
import { contact, email, site, socials } from "@/lib/content";
import { SectionLabel } from "./section-label";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={`${styles.wrap} ${styles.contactInner}`}>
        <SectionLabel index="07" title="Contact" aside={contact.aside} tone="dark" />
        <div className={styles.contactGrid}>
          <div className={styles.contactLead}>
            <h2 id="contact-heading" className={styles.contactHeadline}>
              {contact.headline}
            </h2>
            <p className={styles.contactBody}>{contact.body}</p>
            <SiteLink href={`mailto:${email}`} className={styles.email}>
              {email}
            </SiteLink>
          </div>
          <ul className={styles.socialList}>
            {socials.map((item) => (
              <li key={item.label}>
                <SiteLink href={item.href} className={styles.socialRow}>
                  <span className={styles.socialName}>{item.label}</span>
                  <span className={styles.socialHandle}>
                    {item.handle} <span aria-hidden="true">→</span>
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerMark}>
            <Image
              className={styles.footerSeal}
              src="/brand/seal-reverse.svg"
              alt="Logbook seal"
              width={56}
              height={56}
            />
            <span className={styles.footerMeta}>
              {contact.colophon} · {site.coordinates}
            </span>
          </div>
          <span className={styles.copyright}>{contact.copyright}</span>
        </footer>
      </div>
    </section>
  );
}
