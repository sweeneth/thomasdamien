import { sections, writing } from "@/lib/content";
import { SectionLabel } from "./section-label";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

export function Writing() {
  const section = sections.find((item) => item.id === "writing");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="writing-heading">
      <div className={styles.wrap}>
        <SectionLabel
          index={section.n}
          title={section.title}
          aside={writing.aside}
          heading
          headingId="writing-heading"
        />
        <ul className={styles.archive}>
          {writing.posts.map((post) => (
            <li key={post.href}>
              <SiteLink href={post.href} className={styles.post}>
                <span className={styles.postMeta}>
                  <span>{post.log}</span>
                  <span>{post.date}</span>
                </span>
                <span className={styles.postBody}>
                  <span className={styles.postTitle}>{post.title}</span>
                  <span className={styles.postDek}>{post.dek}</span>
                </span>
              </SiteLink>
            </li>
          ))}
        </ul>
        <div className={styles.writingLinks}>
          {writing.links.map((link) => (
            <SiteLink key={link.href} href={link.href}>
              {link.label} <span aria-hidden="true">→</span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
