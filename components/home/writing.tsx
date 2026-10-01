import { sections, writing } from "@/lib/content";
import { SectionLabel } from "./section-label";
import styles from "./home.module.css";

export function Writing() {
  const section = sections.find((item) => item.id === "writing");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="writing-heading">
      <div className={styles.wrap}>
        <SectionLabel index={section.n} title={section.title} aside={writing.aside} />
        <h2 id="writing-heading" className={styles.headline}>
          {writing.headline}
        </h2>
        <ul className={styles.archive}>
          {writing.posts.map((post) => (
            <li key={post.href}>
              <a href={post.href} className={styles.post} rel="noreferrer">
                <span className={styles.postMeta}>
                  <span>{post.log}</span>
                  <span>{post.date}</span>
                </span>
                <span className={styles.postBody}>
                  <span className={styles.postTitle}>{post.title}</span>
                  <span className={styles.postDek}>{post.dek}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.writingLinks}>
          {writing.links.map((link) => (
            <a key={link.href} href={link.href} rel="noreferrer">
              {link.label} <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
