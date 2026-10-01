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
        <ul className={styles.axioms}>
          {beliefs.lines.map((line, index) => (
            <li key={line.text} className={styles.axiom}>
              <span className={styles.axiomIndex}>
                {section.n}.{index + 1}
              </span>
              <blockquote className={styles.axiomQuote}>
                <p className={styles.axiomText}>{line.text}</p>
                <p className={`${styles.axiomBy} ${line.named ? styles.axiomByNamed : ""}`}>{line.by}</p>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
