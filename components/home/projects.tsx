import { projects, sections } from "@/lib/content";
import { displayHost } from "./format";
import { SectionLabel } from "./section-label";
import styles from "./home.module.css";

export function Projects() {
  const section = sections.find((item) => item.id === "projects");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.wrap}>
        <SectionLabel
          index={section.n}
          title={section.title}
          aside={projects.aside}
          heading
          headingId="projects-heading"
        />
        <div className={styles.projectList}>
          {projects.items.map((project) => (
            <article key={project.n} className={styles.project}>
              <div className={styles.projectMain}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectIndex}>{project.n}</span>
                  <span
                    className={`${styles.pill} ${project.status === "LIVE" ? styles.pillLive : styles.pillSide}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className={styles.projectName}>{project.name}</h3>
              </div>
              <div className={styles.projectBody}>
                <p className={styles.summary}>{project.summary}</p>
                {project.href ? (
                  <a href={project.href} className={styles.projectLink} rel="noreferrer">
                    {displayHost(project.href)} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <span className={styles.noLink}>No link yet</span>
                )}
              </div>
            </article>
          ))}
        </div>
        <div id="trash" className={styles.trash}>
          <SectionLabel index={projects.trash.n} title="Trash" aside={projects.trash.aside} />
          <h3 className={styles.trashTitle}>{projects.trash.headline}</h3>
          <ul className={styles.trashGrid}>
            {projects.trash.items.map((item) => (
              <li key={item.title} className={styles.trashItem}>
                <p className={styles.trashKicker}>{item.kicker}</p>
                <p className={styles.trashName}>{item.title}</p>
                <p className={styles.trashLine}>{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
