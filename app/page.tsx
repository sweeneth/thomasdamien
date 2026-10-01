import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Hero } from "@/components/home/hero";
import { Nav } from "@/components/home/nav";
import { Projects } from "@/components/home/projects";
import { Reading } from "@/components/home/reading";
import { Workbench } from "@/components/home/workbench";
import { Writing } from "@/components/home/writing";
import { email, site, socials } from "@/lib/content";

export default function Home() {
  const description = site.oneLiner;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    email,
    url: `https://${site.domain}`,
    jobTitle: site.current.label,
    homeLocation: { "@type": "Place", name: site.location },
    description,
    sameAs: socials.map((item) => item.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="content">
        <Hero />
        <About />
        <Projects />
        <Reading />
        <Writing />
        <Workbench />
        <Contact />
      </main>
    </>
  );
}
