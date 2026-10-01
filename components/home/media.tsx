import { media, sections } from "@/lib/content";
import { SectionLabel } from "./section-label";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

export function Media() {
  const section = sections.find((item) => item.id === "media");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="media-heading">
      <div className={styles.wrap}>
        <SectionLabel
          index={section.n}
          title={section.title}
          aside={media.aside}
          heading
          headingId="media-heading"
        />
        <ul className={styles.archive}>
          {media.posts.map((post) => (
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
        <div className={styles.mediaLinks}>
          {media.links.map((link) => (
            <SiteLink key={link.href} href={link.href}>
              {link.label} <span aria-hidden="true">→</span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
