import { sections, workbench } from "@/lib/content";
import { SectionLabel } from "./section-label";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

export function Workbench() {
  const section = sections.find((item) => item.id === "workbench");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="workbench-heading">
      <div className={styles.wrap}>
        <SectionLabel index={section.n} title={section.title} aside={workbench.aside} />
        <h2 id="workbench-heading" className={styles.headline}>
          {workbench.headline}
        </h2>
        <ul className={styles.tools}>
          {workbench.tools.map((tool, index) => (
            <li key={tool.name}>
              <SiteLink href={tool.href} className={styles.tool}>
                <span className={styles.toolIndex}>
                  {section.n}.{index + 1}
                </span>
                <span className={styles.toolBody}>
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.toolNote}>{tool.note}</span>
                </span>
                <span className={styles.toolArrow} aria-hidden="true">
                  →
                </span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
