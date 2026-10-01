import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import {
  about,
  coordinates,
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

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function logDate(iso: string) {
  const [year, month, day] = iso.split("-");
  const name = months[Number(month) - 1] ?? month;
  return `${Number(day)} ${name} ${year}`;
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {socials.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={item.label === "Email" ? email : item.label}
            className="inline-flex size-9 items-center justify-center text-ink/80 transition-colors duration-200 hover:text-harbor"
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
    <span className="meta inline-flex items-center gap-1.5">
      {live ? (
        <span className="live-dot size-1.5 rounded-full bg-harbor" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}

function SectionHeading({
  id,
  index,
  children,
}: {
  id: string;
  index: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-4 border-b border-rule pb-3">
      <span className="index-num">{index}</span>
      <h2 id={id} className="text-3xl tracking-tight sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-ink underline decoration-ink/25 underline-offset-4 transition-colors duration-200 hover:text-harbor hover:decoration-harbor"
      {...(href.startsWith("http") ? { rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function AboutText({ text }: { text: string }) {
  const lead = "I live in Los Angeles.";
  if (!text.startsWith(lead)) return text;
  return (
    <>
      <em className="emphasis">{lead}</em>
      {text.slice(lead.length)}
    </>
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-sailcloth focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-rule bg-sailcloth/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-3 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#top" className="shrink-0">
              <Image
                src="/brand/lockup.svg"
                alt="Tom Sweeney"
                width={594}
                height={146}
                priority
                unoptimized
                className="h-10 w-auto sm:h-12"
              />
            </a>
            <SocialLinks className="hidden items-center md:flex" />
          </div>
          <nav aria-label="On this page">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {sectionNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="meta inline-flex items-baseline gap-2 transition-colors duration-200 hover:text-harbor"
                  >
                    <span className="index-num">{item.index}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="content">
        <section id="top" className="relative isolate min-h-[88vh] text-white">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-ink/80"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-5xl flex-col px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20">
            <p className="meta enter self-start text-white/85">
              {hero.location}
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              {coordinates}
            </p>
            <div className="mt-auto max-w-[40rem]">
              <p className="index-num enter text-white">01</p>
              <h1 className="enter enter-2 mt-3 text-5xl leading-[0.95] text-white sm:text-7xl">
                {hero.name}
              </h1>
              <p className="enter enter-3 mt-5 max-w-xl text-xl leading-8 text-white/90 sm:text-2xl sm:leading-9">
                {hero.line}
              </p>
              <div className="enter enter-3 mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-white/30 pt-4">
                <span className="meta text-white/80">{hero.currentLabel}</span>
                <a
                  href={hero.currentHref}
                  className="font-display text-lg text-white underline decoration-white/35 underline-offset-4 transition-colors duration-200 hover:text-sailcloth"
                  rel="noreferrer"
                >
                  {hero.current}
                </a>
              </div>
            </div>
          </div>
          <a
            href={hero.image.creditHref}
            className="absolute right-4 bottom-4 z-10 text-xs text-white/75 underline decoration-white/30 underline-offset-2 hover:text-white"
            rel="noreferrer"
          >
            {hero.image.credit}
          </a>
        </section>

        <div className="mx-auto w-full max-w-[42rem] px-5 sm:px-6">
          <section
            id="projects"
            aria-labelledby="projects-heading"
            className="rise scroll-mt-32 py-20 sm:py-28"
          >
            <SectionHeading id="projects-heading" index="02">
              Projects
            </SectionHeading>
            <ul className="mt-2">
              {projects.map((project) => {
                const inner = (
                  <>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-2xl tracking-tight transition-colors duration-200 group-hover:text-harbor">
                          {project.name}
                        </h3>
                        <Mark>{project.status}</Mark>
                      </div>
                      <p className="mt-2 max-w-[36rem] text-[15px] leading-6 text-slate">
                        {project.summary}
                      </p>
                    </div>
                    {project.href ? (
                      <span
                        aria-hidden="true"
                        className="mt-1 hidden text-slate transition-transform duration-200 group-hover:translate-x-1 group-hover:text-harbor sm:inline"
                      >
                        →
                      </span>
                    ) : null}
                  </>
                );

                return (
                  <li key={project.name} className="border-b border-rule">
                    {project.href ? (
                      <a
                        href={project.href}
                        rel="noreferrer"
                        className="group flex items-start justify-between gap-6 py-6"
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

            <div id="trash" className="scroll-mt-32 pt-16 sm:pt-20">
              <h3 className="text-2xl tracking-tight">Trash</h3>
              <p className="mt-4 max-w-[34rem] text-lg leading-8 text-slate">
                Things that failed or got abandoned. These three are placeholders, not a
                confession.
              </p>
              <ul className="mt-6">
                {trash.map((item) => (
                  <li key={item.title} className="border-b border-rule">
                    <div className="py-5">
                      <p className="meta">{item.kicker}</p>
                      <p className="mt-1 font-display text-lg tracking-tight text-ink/70 line-through decoration-rule">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[15px] leading-6 text-slate">{item.line}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            id="writing"
            aria-labelledby="writing-heading"
            className="rise scroll-mt-32 py-20 sm:py-28"
          >
            <SectionHeading id="writing-heading" index="03">
              Writing
            </SectionHeading>
            <p className="mt-6 max-w-[34rem] text-lg leading-8">
              I want to write more. The notebook is{" "}
              <TextLink href={profiles.substack}>Beyond the Buzzwords</TextLink>. What&apos;s there
              so far is from 2024.
            </p>
            <ul className="mt-8">
              {writing.map((piece) => (
                <li key={piece.href} className="border-b border-rule">
                  <a href={piece.href} rel="noreferrer" className="group block py-5">
                    <span className="flex items-baseline justify-between gap-6">
                      <span className="text-lg leading-7 text-ink transition-colors duration-200 group-hover:text-harbor">
                        {piece.title}
                      </span>
                      <time dateTime={piece.date} className="meta shrink-0">
                        {logDate(piece.date)}
                      </time>
                    </span>
                    <span className="mt-1 block max-w-[34rem] text-[15px] leading-6 text-slate">
                      {piece.dek}
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-rule">
                <div className="py-5">
                  <p className="text-lg leading-7 text-slate">Coming soon</p>
                  <p className="mt-1 text-[15px] leading-6 text-slate">
                    A piece that isn&apos;t from 2024. Not written yet.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section
            id="about"
            aria-labelledby="about-heading"
            className="rise scroll-mt-32 border-l border-harbor py-20 pl-5 sm:py-28 sm:pl-6"
          >
            <SectionHeading id="about-heading" index="04">
              About
            </SectionHeading>
            <div className="mt-6 space-y-5 text-lg leading-8">
              {about.map((paragraph) => (
                <p key={paragraph[0].text.slice(0, 24)}>
                  {paragraph.map((span) =>
                    span.href ? (
                      <TextLink key={span.text} href={span.href}>
                        {span.text}
                      </TextLink>
                    ) : (
                      <span key={span.text}>
                        <AboutText text={span.text} />
                      </span>
                    ),
                  )}
                </p>
              ))}
            </div>
            <p className="meta mt-12">Names along the way</p>
            <ul className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule pt-4">
              {marks.map((mark) => (
                <li key={mark.name}>
                  {mark.href ? (
                    <a
                      href={mark.href}
                      rel="noreferrer"
                      className="font-display text-lg tracking-tight text-ink transition-colors duration-200 hover:text-harbor"
                    >
                      {mark.name}
                    </a>
                  ) : (
                    <span className="font-display text-lg tracking-tight text-ink">{mark.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="tools"
            aria-labelledby="tools-heading"
            className="rise scroll-mt-32 py-20 sm:py-28"
          >
            <SectionHeading id="tools-heading" index="05">
              Favorite tools
            </SectionHeading>
            <p className="mt-6 max-w-[34rem] text-lg leading-8">
              A short working list. Easy to change.
            </p>
            <ul className="mt-8">
              {tools.map((tool) => (
                <li key={tool.name} className="border-b border-rule">
                  <a
                    href={tool.href}
                    rel="noreferrer"
                    className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-display text-lg tracking-tight text-ink transition-colors duration-200 group-hover:text-harbor">
                      {tool.name}
                    </span>
                    <span className="text-[15px] leading-6 text-slate sm:text-right">{tool.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="rise scroll-mt-32 py-20 sm:py-28"
          >
            <SectionHeading id="contact-heading" index="06">
              Contact
            </SectionHeading>
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
            <SocialLinks className="mt-8 flex items-center gap-1 md:hidden" />
          </section>
        </div>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="flex items-end gap-4">
            <Image
              src="/brand/seal.svg"
              alt=""
              width={100}
              height={100}
              unoptimized
              className="h-16 w-16"
            />
            <div>
              <p className="font-display text-xl text-ink">Thomas Sweeney</p>
              <p className="meta mt-2">
                {hero.location}
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
                {coordinates}
              </p>
            </div>
          </div>
          <p className="meta">Logbook</p>
        </div>
      </footer>
    </>
  );
}
