import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { HeroSea } from "@/components/voyage/hero-sea";
import { Landfall } from "@/components/voyage/landfall";
import { MarginSea } from "@/components/voyage/margin-sea";
import Voyage from "@/components/voyage/voyage";
import {
  about,
  email,
  hero,
  marks,
  profiles,
  projects,
  sectionNav,
  socials,
  tools,
  trash,
  writing,
} from "@/lib/content";

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {socials.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={item.label === "Email" ? email : item.label}
            className="inline-flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors duration-200 hover:bg-wash hover:text-accent"
            {...(item.href.startsWith("http") ? { rel: "noreferrer" } : {})}
          >
            <Icon name={item.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Mark({ children }: { children: string }) {
  const live = children === "Live";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.14em] text-accent uppercase">
      {live ? (
        <span className="live-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-3xl tracking-tight sm:text-4xl">
      {children}
    </h2>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
      {...(href.startsWith("http") ? { rel: "noreferrer" } : {})}
    >
      {children}
    </a>
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
    homeLocation: { "@type": "Place", name: "Los Angeles" },
    worksFor: {
      "@type": "Organization",
      name: "Watt",
      url: "https://wattdata.ai",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "NYU Stern School of Business" },
      { "@type": "CollegeOrUniversity", name: "Boston College" },
    ],
    sameAs: [
      profiles.github,
      profiles.x,
      profiles.linkedin,
      profiles.substack,
      "https://theprogram.news",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-30 border-b border-line/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 sm:px-8">
          <a href="#top" className="text-sm tracking-tight">
            Thomas Sweeney
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <nav aria-label="On this page">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                {sectionNav.map((item) => (
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
            <SocialLinks className="flex items-center gap-0.5" />
          </div>
        </div>
      </header>

      <main id="content">
        <section id="top" className="relative isolate min-h-[100svh] text-white">
          <HeroSea />
          <span data-voyage-open aria-hidden="true" className="voyage-open" />
          <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[42rem] flex-col px-5 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
            <p className="enter self-start rounded-full border border-white/25 bg-black/30 px-3 py-1 text-sm tracking-wide text-white backdrop-blur-sm">
              {hero.location}
            </p>
            <div className="mt-auto max-w-[40rem]">
              <h1 className="enter enter-2 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
                {hero.name}
              </h1>
              <p className="enter enter-3 mt-5 max-w-xl text-xl leading-8 text-white/90 sm:text-2xl sm:leading-9">
                {hero.line}
              </p>
              <div className="enter enter-3 mt-8 inline-flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="rounded-full bg-accent px-3 py-1 text-[11px] tracking-[0.18em] text-background uppercase">
                  {hero.currentLabel}
                </span>
                <a
                  href={hero.currentHref}
                  className="text-lg text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-wash hover:decoration-wash"
                  rel="noreferrer"
                >
                  {hero.current}
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="relative">
          <MarginSea />
          <div
            data-voyage-column
            className="relative z-10 mx-auto w-full max-w-[42rem] px-5 sm:px-6"
          >
          <section
            id="projects"
            aria-labelledby="projects-heading"
            className="rise scroll-mt-24 py-20 sm:py-28"
          >
            <SectionHeading id="projects-heading">Projects</SectionHeading>
            <ul className="mt-10">
              {projects.map((project) => {
                const inner = (
                  <>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-2xl tracking-tight transition-colors duration-200 group-hover:text-accent">
                          {project.name}
                        </h3>
                        <Mark>{project.status}</Mark>
                      </div>
                      <p className="mt-2 max-w-[36rem] text-[15px] leading-6 text-muted">
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
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-start justify-between gap-6 py-6">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div id="trash" className="scroll-mt-24 pt-16 sm:pt-20">
              <h3 className="text-2xl tracking-tight">Trash</h3>
              <p className="mt-4 max-w-[34rem] text-lg leading-8 text-muted">
                Things that failed or got abandoned. These three are placeholders,
                not a confession.
              </p>
              <ul className="mt-6">
                {trash.map((item) => (
                  <li key={item.title} className="border-b border-line">
                    <div className="py-5 transition-colors duration-200 hover:bg-wash/80 sm:-mx-3 sm:px-3">
                      <p className="text-xs tracking-[0.14em] text-accent uppercase">
                        {item.kicker}
                      </p>
                      <p className="mt-1 text-lg tracking-tight text-foreground/75 line-through decoration-foreground/20">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[15px] leading-6 text-muted">{item.line}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            id="writing"
            aria-labelledby="writing-heading"
            className="rise scroll-mt-24 border-t border-line py-20 sm:py-28"
          >
            <SectionHeading id="writing-heading">Writing</SectionHeading>
            <p className="mt-6 max-w-[34rem] text-lg leading-8">
              I want to write more. The notebook is{" "}
              <TextLink href={profiles.substack}>Beyond the Buzzwords</TextLink>.
              What&apos;s there so far is from 2024.
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
                      <span className="text-lg leading-7 transition-colors duration-200 group-hover:text-accent">
                        {piece.title}
                      </span>
                      <time dateTime={piece.date} className="shrink-0 text-sm text-muted">
                        {piece.label}
                      </time>
                    </span>
                    <span className="mt-1 block max-w-[34rem] text-[15px] leading-6 text-muted">
                      {piece.dek}
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-dashed border-line">
                <div className="py-5">
                  <p className="text-lg leading-7 text-muted">Coming soon</p>
                  <p className="mt-1 text-[15px] leading-6 text-muted">
                    A piece that isn&apos;t from 2024. Not written yet.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section
            id="about"
            aria-labelledby="about-heading"
            className="rise scroll-mt-24 border-t border-line py-20 sm:py-28"
          >
            <SectionHeading id="about-heading">About</SectionHeading>
            <div className="mt-6 space-y-5 text-lg leading-8">
              {about.map((paragraph) => (
                <p key={paragraph[0].text.slice(0, 24)}>
                  {paragraph.map((span) =>
                    span.href ? (
                      <TextLink key={span.text} href={span.href}>
                        {span.text}
                      </TextLink>
                    ) : (
                      <span key={span.text}>{span.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>
            <p className="mt-12 text-sm tracking-wide text-muted">Names along the way</p>
            <ul className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              {marks.map((mark) => (
                <li key={mark.name}>
                  {mark.href ? (
                    <a
                      href={mark.href}
                      rel="noreferrer"
                      className="text-lg tracking-tight text-foreground/80 transition-colors duration-200 hover:text-accent"
                    >
                      {mark.name}
                    </a>
                  ) : (
                    <span className="text-lg tracking-tight text-foreground/80">{mark.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="tools"
            aria-labelledby="tools-heading"
            className="rise scroll-mt-24 border-t border-line py-20 sm:py-28"
          >
            <SectionHeading id="tools-heading">Favorite tools</SectionHeading>
            <p className="mt-6 max-w-[34rem] text-lg leading-8">
              A short working list. Easy to change.
            </p>
            <ul className="mt-10">
              {tools.map((tool) => (
                <li key={tool.name} className="border-b border-line">
                  <a
                    href={tool.href}
                    rel="noreferrer"
                    className="group flex items-baseline justify-between gap-6 py-4 transition-colors duration-200 hover:bg-wash/80 sm:-mx-3 sm:px-3"
                  >
                    <span className="text-lg tracking-tight transition-colors duration-200 group-hover:text-accent">
                      {tool.name}
                    </span>
                    <span className="text-right text-[15px] leading-6 text-muted">{tool.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="rise scroll-mt-24 border-t border-line py-20 sm:py-28"
          >
            <SectionHeading id="contact-heading">Contact</SectionHeading>
            <ul className="mt-8 space-y-2 text-lg leading-8">
              <li>
                <TextLink href={`mailto:${email}`}>{email}</TextLink>
              </li>
              <li>
                <TextLink href={profiles.x}>X · @tsweens</TextLink>
              </li>
              <li>
                <TextLink href={profiles.github}>GitHub · sweeneth</TextLink>
              </li>
              <li>
                <TextLink href={profiles.linkedin}>LinkedIn</TextLink>
              </li>
            </ul>
            <SocialLinks className="mt-8 flex items-center gap-1" />
          </section>
          </div>
        </div>
      </main>

      <footer>
        <p className="mx-auto w-full max-w-[42rem] px-5 pt-2 text-sm text-muted sm:px-6">
          Thomas Sweeney · Los Angeles
        </p>
        <Landfall />
      </footer>
      <Voyage />
    </>
  );
}
