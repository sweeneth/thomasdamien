import Image from "next/image";
import { contact, email, sections, site, socials } from "@/lib/content";
import { SectionLabel } from "./section-label";
import styles from "./home.module.css";

export function Contact() {
  const section = sections.find((item) => item.id === "contact");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.contact} aria-labelledby="contact-heading">
      <div className={`${styles.wrap} ${styles.contactInner}`}>
        <SectionLabel
          index={section.n}
          title={section.title}
          aside={contact.aside}
          tone="dark"
        />
        <div className={styles.contactGrid}>
          <div className={styles.contactLead}>
            <h2 id="contact-heading" className={styles.contactHeadline}>
              {contact.headline}
            </h2>
            <p className={styles.contactBody}>{contact.body}</p>
            <a href={`mailto:${email}`} className={styles.email}>
              {email}
            </a>
          </div>
          <ul className={styles.socialList}>
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.socialRow} rel="noreferrer">
                  <span className={styles.socialName}>{item.label}</span>
                  <span className={styles.socialHandle}>
                    {item.handle} <span aria-hidden="true">→</span>
                  </span>
                </a>
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
