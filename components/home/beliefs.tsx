import { beliefs, sections } from "@/lib/content";
import { SectionLabel } from "./section-label";
import styles from "./home.module.css";

export function Beliefs() {
  const section = sections.find((item) => item.id === "beliefs");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="beliefs-heading">
      <div className={styles.wrap}>
        <SectionLabel
          index={section.n}
          title={section.title}
          aside={beliefs.aside}
          heading
          headingId="beliefs-heading"
        />
        <ul className={styles.bento}>
          {beliefs.lines.map((line, index) => (
            <li key={line.text} className={styles.tile}>
              <span className={styles.tileIndex}>
                {section.n}.{index + 1}
              </span>
              <blockquote className={styles.tileQuote}>
                <p className={styles.tileText}>{line.text}</p>
                {line.by ? (
                  <p className={`${styles.tileBy} ${line.named ? styles.tileByNamed : ""}`}>{line.by}</p>
                ) : null}
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
