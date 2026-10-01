// lib/content.ts — every word on the homepage lives here.
// Components read from this file; they never hardcode copy.
// Items marked TODO are placeholders waiting on real content.

type RichPart = string | { text: string; href: string };

type Fact = {
  label: string;
  value: string;
  href?: string;
};

type Logo = {
  name: string;
  href?: string;
  logo: string;
  height: number;
};

type Project = {
  n: string;
  name: string;
  status: string;
  href?: string;
  summary: string;
};

export type SpineTone = "ink" | "harbor" | "signal" | "sailcloth" | "slate" | "rule";

type Book = {
  title: string;
  author: string;
  tag?: string;
  spine: SpineTone;
  height: number;
  width: number;
};

export type Social = {
  label: string;
  href: string;
  handle: string;
  icon?: string;
};

export const site = {
  name: "Thomas Sweeney",
  domain: "thomasdamien.com",
  location: "Los Angeles",
  coordinates: "34.05° N · 118.24° W",
  current: { label: "Head of Growth, Watt", href: "https://wattdata.ai" },
  heroImage: { src: "/hero.jpg", alt: "" }, // decorative; TODO: replace with a ≥3000px-wide original
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/sweeneth", handle: "github.com/sweeneth", icon: "/icons/github.svg" },
  { label: "X", href: "https://x.com/tsweens", handle: "@tsweens", icon: "/icons/x.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thomasdamien", handle: "in/thomasdamien", icon: "/icons/linkedin.svg" },
  { label: "Substack", href: "https://tsweens.substack.com", handle: "tsweens.substack.com" }, // contact list only
];

export const email = "hi@thomasdamien.com";

// The numbered index. Order here = order on the page.
export const sections = [
  { n: "01", id: "about", title: "About" },
  { n: "02", id: "projects", title: "Projects" },
  { n: "03", id: "reading", title: "Reading" },
  { n: "04", id: "writing", title: "Writing" },
  { n: "05", id: "workbench", title: "Workbench" },
  { n: "06", id: "beliefs", title: "Beliefs" },
  { n: "07", id: "contact", title: "Contact" },
] as const;

export const about: {
  headline: string;
  paragraphs: RichPart[][];
  facts: Fact[];
  loggedAt: Logo[];
} = {
  headline: "Twenty years between media and technology.",
  // Each paragraph is an array of plain strings and links.
  paragraphs: [
    ["I lead growth at ", { text: "Watt", href: "https://wattdata.ai" }, ", where I run brand, marketing, and go-to-market. Watt builds signal infrastructure for AI agents. On nights and weekends I build ", { text: "THE PROGRAM", href: "https://theprogram.news" }, ", an index of what American cable news talks about."],
    ["Before Watt I ran growth at CoinTracker. Before that I was at Meta, first as a programs lead on media products (Music, Stories, Live, Premium Video, Creator Tools, Rights Manager, and Cloud Gaming), then in corporate development on AR/VR and AI. I've led and mentored teams of up to about 30."],
    ["The decade before Meta was media, split between New York and Los Angeles: CBS, a stint at CAA, and a digital agency I ran in New York."],
    ["I advise a little, write small checks, and mentor through First Round's Fast Track."],
  ],
  facts: [
    { label: "Currently", value: "Head of Growth, Watt", href: "https://wattdata.ai" },
    { label: "Previously", value: "CoinTracker · Meta · CAA · CBS" },
    { label: "Education", value: "MBA, NYU Stern · BA, Boston College" },
    { label: "Mentoring", value: "Always" },
  ],
  // "Logged at" tray. Logos are pre-flattened to one color; height is optical, per logo.
  loggedAt: [
    { name: "Watt", href: "https://wattdata.ai", logo: "/logos/watt.png", height: 26 },
    { name: "CoinTracker", href: "https://www.cointracker.com", logo: "/logos/cointracker.png", height: 19 },
    { name: "Meta", href: "https://about.meta.com", logo: "/logos/meta.png", height: 22 },
    { name: "CAA", logo: "/logos/caa.png", height: 22 },
    { name: "CBS", logo: "/logos/cbs.png", height: 24 },
  ],
};

export const projects: {
  aside: string;
  items: Project[];
} = {
  aside: "2 afloat",
  items: [
    {
      n: "02.1", name: "THE PROGRAM", status: "LIVE", href: "https://theprogram.news",
      summary: "Fifteen years of American cable news, searchable by word.",
    },
    {
      n: "02.2", name: "Twin Kind", status: "SIDE", href: "https://twnknd.com",
      summary: "A transcendental music journey.",
    },
  ],
};

// Spines link to a Goodreads search for the title and author.
export const reading: {
  aside: string;
  headline: string;
  shelf: Book[];
  callouts: { label: string; title: string; author: string; now?: boolean }[];
} = {
  aside: "Updated Oct 2026",
  headline: "On the nightstand.",
  shelf: [
    { title: "Net Worth", author: "Quentin Casey", tag: "NOW", spine: "harbor", height: 184, width: 46 },
    { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", tag: "NOW", spine: "ink", height: 222, width: 56 },
    { title: "Gut Feelings", author: "Gerd Gigerenzer", spine: "sailcloth", height: 196, width: 44 },
    { title: "The Dog Stars", author: "Peter Heller", spine: "signal", height: 208, width: 42 },
    { title: "Troubled", author: "Rob Henderson", spine: "slate", height: 172, width: 40 },
    { title: "The Rational Optimist", author: "Matt Ridley", spine: "rule", height: 220, width: 58 },
    { title: "Against the Machine", author: "Paul Kingsnorth", spine: "harbor", height: 206, width: 50 },
    { title: "How Music Works", author: "David Byrne", spine: "ink", height: 190, width: 46 },
  ],
  callouts: [
    { label: "Reading now", title: "Net Worth", author: "Quentin Casey", now: true },
    { label: "Also reading", title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", now: true },
  ],
};

export const writing = {
  aside: "Archive · Substack",
  posts: [
    { log: "LOG 24.08.13", date: "Aug 13, 2024", title: "Circular logic, exponential progress",
      dek: "On the Hermeneutic Circle, an old idea for working through complex problems.",
      href: "https://tsweens.substack.com/p/circular-logic-exponential-progress" },
    { log: "LOG 24.08.08", date: "Aug 8, 2024", title: "“Be Real” is the new “Don’t Be Boring”",
      dek: "Why authenticity beats gimmicks when attention is short and AI makes everything look polished.",
      href: "https://tsweens.substack.com/p/be-real-is-the-new-dont-be-boring" },
  ],
  links: [
    { label: "All essays · Substack", href: "https://tsweens.substack.com" },
    { label: "Shorter, more recent · X", href: "https://x.com/tsweens" },
  ],
};

export const workbench = {
  aside: "Favorites, 2026",
  headline: "What's open on my desk most days.",
  tools: [
    { name: "Cursor", note: "Where the building happens.", href: "https://cursor.com" },
    { name: "Claude", note: "Writing, critique, longer passes.", href: "https://claude.ai" },
    { name: "Grok", note: "Research and peak-label hunting.", href: "https://x.com/i/grok" },
    { name: "Next.js", note: "App Router for theprogram.news.", href: "https://nextjs.org" },
    { name: "Vercel", note: "Ship and preview.", href: "https://vercel.com" },
    { name: "Tailwind + shadcn", note: "UI system.", href: "https://ui.shadcn.com" },
    { name: "Recharts", note: "The airtime charts.", href: "https://recharts.org" },
    { name: "GitHub", note: "Source and PRs.", href: "https://github.com" },
  ],
};

// DRAFT mock. Keep or cut this section. Every line below is a placeholder for the owner to replace.
export const beliefs: {
  aside: string;
  lines: { text: string; by: string; named?: boolean }[];
} = {
  aside: "Working axioms",
  lines: [
    { text: "Ship the useful thing.", by: "Note" },
    { text: "Attention is the product.", by: "Note" },
    { text: "What stands in the way becomes the way.", by: "Marcus Aurelius", named: true },
    { text: "The channel is not the idea.", by: "Note" },
    { text: "The medium is the message.", by: "Marshall McLuhan", named: true },
    { text: "Build in public when the work can teach.", by: "Note" },
  ],
};

export const contact = {
  aside: "Replies within a few days",
  headline: "Send a signal.",
  body: "Building something, hiring for growth, or want to compare notes on a book? Email is best.",
  colophon: "END OF LOG",
  copyright: "© 2026 THOMAS SWEENEY",
};
