import Image from "next/image";
import { projects, sections } from "@/lib/content";
import { displayHost } from "./format";
import { SectionLabel } from "./section-label";
import { SiteLink } from "./site-link";
import styles from "./home.module.css";

function ProjectThumb({
  image,
  href,
}: {
  image: { src: string; alt: string };
  href?: string;
}) {
  const thumb = (
    <Image
      className={styles.projectThumbImage}
      src={image.src}
      alt={image.alt}
      width={640}
      height={427}
      sizes="(max-width: 720px) 120px, 176px"
    />
  );

  if (!href) return <div className={styles.projectThumb}>{thumb}</div>;

  return (
    <SiteLink href={href} className={styles.projectThumb}>
      {thumb}
    </SiteLink>
  );
}

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
              {project.image?.src ? <ProjectThumb image={project.image} href={project.href} /> : null}
              <div className={styles.projectCopy}>
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
                    <SiteLink href={project.href} className={styles.projectLink}>
                      {displayHost(project.href)} <span aria-hidden="true">→</span>
                    </SiteLink>
                  ) : (
                    <span className={styles.noLink}>No link yet</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
