import {
  email,
  experience,
  profiles,
  projects,
  trash,
  writing,
} from "@/lib/content";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#trash", label: "Trash" },
  { href: "#writing", label: "Writing" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

function Mark({ children }: { children: string }) {
  const live = children === "Live";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs tracking-wide text-accent">
      {live ? (
        <span className="live-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thomas Sweeney",
    alternateName: "Tom Sweeney",
    email,
    url: "https://thomasdamien.com",
    jobTitle: "Head of Growth",
    homeLocation: {
      "@type": "Place",
      name: "Los Angeles",
    },
    worksFor: {
      "@type": "Organization",
      name: "Watt",
      url: "https://wattdata.ai",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "NYU Stern School of Business" },
      { "@type": "CollegeOrUniversity", name: "Boston College" },
    ],
    sameAs: [profiles.x, profiles.linkedin, profiles.substack, "https://theprogram.news"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-10 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[40rem] flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-6">
          <a href="#top" className="text-sm tracking-tight">
            Tom Sweeney
          </a>
          <nav aria-label="On this page">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main
        id="content"
        className="mx-auto w-full max-w-[40rem] px-5 sm:px-6"
      >
        <section id="top" className="rise scroll-mt-24 pt-16 pb-20 sm:pt-28 sm:pb-28">
          <p className="text-sm tracking-wide text-accent">Los Angeles</p>
          <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">Tom Sweeney</h1>
          <div className="mt-6 h-px w-12 bg-accent" aria-hidden="true" />
          <p className="mt-6 max-w-[32rem] text-lg leading-8">
            Head of Growth at{" "}
            <a
              href="https://wattdata.ai"
              className="underline decoration-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              rel="noreferrer"
            >
              Watt
            </a>
            . I build things.
          </p>
        </section>

        <section id="projects" aria-labelledby="projects-heading" className="rise scroll-mt-24 border-t border-line py-16 sm:py-24">
          <h2 id="projects-heading" className="text-sm tracking-wide text-muted">
            Projects
          </h2>
          <ul className="mt-8">
            {projects.map((project) => {
              const body = (
                <>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl tracking-tight transition-colors duration-200 group-hover:text-accent">
                        {project.name}
                      </h3>
                      <Mark>{project.status}</Mark>
                    </div>
                    <p className="mt-2 max-w-[34rem] text-[15px] leading-6 text-muted">
                      {project.summary}
                    </p>
                  </div>
                  {project.href ? (
                    <span
                      aria-hidden="true"
                      className="mt-1 hidden text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent sm:inline"
                    >
                      →
                    </span>
                  ) : null}
                </>
              );

              return (
                <li key={project.name} className="border-b border-line">
                  {project.href ? (
                    <a
                      href={project.href}
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-6 py-6 transition-colors duration-200 hover:bg-wash/80 sm:-mx-3 sm:px-3"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-start justify-between gap-6 py-6">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="trash" aria-labelledby="trash-heading" className="rise scroll-mt-24 border-t border-line py-16 sm:py-24">
          <h2 id="trash-heading" className="text-sm tracking-wide text-muted">
            Trash
          </h2>
          <p className="mt-6 max-w-[32rem] text-lg leading-8">
            Things that failed, stalled, or got abandoned. This shelf is empty
            on purpose. The real ones are funnier.
          </p>
          <ul className="mt-10 space-y-8">
            {trash.map((item) => (
              <li key={item.title}>
                <p className="text-xs tracking-wide text-accent">{item.kicker}</p>
                <h3 className="mt-1 text-lg tracking-tight text-foreground/80 line-through decoration-foreground/25">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-6 text-muted">{item.todo}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="writing" aria-labelledby="writing-heading" className="rise scroll-mt-24 border-t border-line py-16 sm:py-24">
          <h2 id="writing-heading" className="text-sm tracking-wide text-muted">
            Writing
          </h2>
          <p className="mt-6 max-w-[32rem] text-lg leading-8">
            I want to write more. The notebook is{" "}
            <a
              href={profiles.substack}
              className="underline decoration-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              rel="noreferrer"
            >
              Beyond the Buzzwords
            </a>
            . What&apos;s there so far is from 2024.
          </p>
          <ul className="mt-10">
            {writing.map((piece) => (
              <li key={piece.href} className="border-b border-line">
                <a
                  href={piece.href}
                  rel="noreferrer"
                  className="group block py-5 transition-colors duration-200 hover:bg-wash/80 sm:-mx-3 sm:px-3"
                >
                  <span className="flex items-baseline justify-between gap-6">
                    <span className="text-[1.05rem] leading-6 transition-colors duration-200 group-hover:text-accent">
                      {piece.title}
                    </span>
                    <time
                      dateTime={piece.date}
                      className="shrink-0 text-sm text-muted"
                    >
                      {piece.label}
                    </time>
                  </span>
                  <span className="mt-1 block max-w-[32rem] text-[15px] leading-6 text-muted">
                    {piece.dek}
                  </span>
                </a>
              </li>
            ))}
            <li className="border-b border-dashed border-line">
              <div className="py-5 sm:px-0">
                <p className="text-[1.05rem] leading-6 text-muted">Coming soon</p>
                <p className="mt-1 text-[15px] leading-6 text-muted">
                  A piece that isn&apos;t from 2024. Not written yet.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section id="about" aria-labelledby="about-heading" className="rise scroll-mt-24 border-t border-line py-16 sm:py-24">
          <h2 id="about-heading" className="text-sm tracking-wide text-muted">
            About
          </h2>
          <p className="mt-6 max-w-[32rem] text-lg leading-8">
            I live in Los Angeles. MBA from NYU Stern, BA from Boston College.
            I advise a little and write tiny checks, and I&apos;ve mentored
            through First Round&apos;s Fast Track.
          </p>
          <dl className="mt-10 space-y-6">
            {experience.map((item) => (
              <div key={item.role} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                <dt className="text-sm text-muted">{item.when}</dt>
                <dd>
                  <p className="leading-6">{item.role}</p>
                  <p className="mt-1 text-[15px] leading-6 text-muted">{item.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="rise scroll-mt-24 border-t border-line py-16 sm:py-24">
          <h2 id="contact-heading" className="text-sm tracking-wide text-muted">
            Contact
          </h2>
          <ul className="mt-8 text-lg leading-8">
            <li>
              <a
                href={`mailto:${email}`}
                className="underline decoration-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                {email}
              </a>
            </li>
            <li>
              <a
                href={profiles.x}
                className="underline decoration-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                rel="noreferrer"
              >
                X · @tsweens
              </a>
            </li>
            <li>
              <a
                href={profiles.linkedin}
                className="underline decoration-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-[40rem] px-5 pt-4 pb-12 text-sm text-muted sm:px-6">
        <p>Thomas Sweeney · Los Angeles</p>
      </footer>
    </>
  );
}
