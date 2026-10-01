import Image from "next/image";
import { about, sections } from "@/lib/content";
import { linkedFact } from "./format";
import { RichText } from "./rich-text";
import { SectionLabel } from "./section-label";
import styles from "./home.module.css";

export function About() {
  const section = sections.find((item) => item.id === "about");
  if (!section) return null;

  return (
    <section id={section.id} className={styles.section} aria-labelledby="about-heading">
      <div className={styles.wrap}>
        <SectionLabel index={section.n} title={section.title} aside={about.aside} />
        <h2 id="about-heading" className={styles.headline}>
          {about.headline}
        </h2>
        <div className={styles.aboutGrid}>
          <div className={styles.prose}>
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <RichText parts={paragraph} />
              </p>
            ))}
          </div>
          <aside className={styles.facts}>
            <Image
              className={styles.seal}
              src="/brand/seal.svg"
              alt="Logbook seal"
              width={112}
              height={112}
            />
            <dl>
              {about.facts.map((fact) => {
                const linked = linkedFact(fact.value, fact.href);
                return (
                  <div key={fact.label} className={styles.fact}>
                    <dt className={styles.factLabel}>{fact.label}</dt>
                    <dd className={styles.factValue}>
                      {linked.link ? (
                        <>
                          {linked.before}
                          <a href={fact.href} className={styles.textLink} rel="noreferrer">
                            {linked.link}
                          </a>
                        </>
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </aside>
        </div>
        <div className={styles.logged}>
          <p className={styles.loggedLabel}>Logged at</p>
          <ul className={styles.logoGrid}>
            {about.loggedAt.map((mark) => (
              <li key={mark.name} className={styles.logoCell}>
                {mark.href ? (
                  <a href={mark.href} className={styles.logo} rel="noreferrer">
                    <Image
                      src={mark.logo}
                      alt={mark.name}
                      width={mark.height * 4}
                      height={mark.height}
                      style={{ height: mark.height, width: "auto" }}
                    />
                  </a>
                ) : (
                  <span className={styles.logo}>
                    <Image
                      src={mark.logo}
                      alt={mark.name}
                      width={mark.height * 4}
                      height={mark.height}
                      style={{ height: mark.height, width: "auto" }}
                    />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
