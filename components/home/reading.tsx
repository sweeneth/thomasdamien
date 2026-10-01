import { reading, sections } from "@/lib/content";
import { goodreadsHref, spineFontSize, spinePaint } from "./format";
import { SectionLabel } from "./section-label";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

export function Reading() {
  const section = sections.find((item) => item.id === "reading");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="reading-heading">
      <div className={styles.wrap}>
        <SectionLabel index={section.n} title={section.title} aside={reading.aside} />
        <h2 id="reading-heading" className={styles.headline}>
          {reading.headline}
        </h2>
        <div className={styles.readingLayout}>
          <div className={styles.shelfWrap}>
            <ul className={styles.spines}>
              {reading.shelf.map((book) => {
                const paint = spinePaint[book.spine];
                return (
                  <li key={book.title}>
                    <SiteLink
                      className={styles.spine}
                      href={goodreadsHref(book.title, book.author)}
                      style={{
                        background: paint.background,
                        color: paint.color,
                        border: paint.border,
                        width: book.width,
                        height: book.height,
                      }}
                    >
                      {book.tag ? (
                        <span
                          className={styles.spineTag}
                          style={{
                            color: book.tag === "NOW" ? "var(--ts-signal)" : "var(--ts-slate)",
                          }}
                        >
                          {book.tag}
                        </span>
                      ) : null}
                      <span
                        className={styles.spineTitle}
                        style={{
                          fontSize: spineFontSize(book.title, book.height),
                          maxHeight: book.height - 52,
                        }}
                      >
                        {book.title}
                      </span>
                      <span className={styles.srOnly}> by {book.author}</span>
                      <span className={styles.spineRule} style={{ background: paint.color }} />
                    </SiteLink>
                  </li>
                );
              })}
            </ul>
            <div className={styles.shelf} />
            <p className={styles.shelfNote}>TAP A SPINE TO OPEN IT ON GOODREADS</p>
          </div>
          <dl className={styles.callouts}>
            {reading.callouts.map((item) => (
              <div key={item.label} className={styles.fact}>
                <dt className={`${styles.factLabel} ${item.now ? styles.calloutLabelNow : ""}`}>
                  {item.label}
                </dt>
                <dd className={styles.factValue}>
                  <span className={styles.calloutTitle}>{item.title}</span> · {item.author}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
