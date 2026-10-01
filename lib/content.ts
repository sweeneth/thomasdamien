/**
 * All public copy lives here. Edit this file to change the site.
 *
 * GitHub: https://github.com/sweeneth is a public account with no bio.
 * Confirm it is yours, or replace `profiles.github`.
 *
 * Favorite tools are a starter set (Cursor, plus Claude and Midjourney,
 * which you have mentioned before). Revise names and notes freely.
 *
 * Trash entries are placeholders, not a real history.
 */

export const email = "hi@thomasdamien.com";

export const profiles = {
  github: "https://github.com/sweeneth",
  x: "https://x.com/tsweens",
  linkedin: "https://www.linkedin.com/in/thomasdamien",
  substack: "https://tsweens.substack.com",
} as const;

export const hero = {
  name: "Thomas Sweeney",
  location: "Los Angeles",
  line: "I take useful software to the people who need it, and I still like building it.",
  currentLabel: "Current",
  current: "Head of Growth at Watt",
  currentHref: "https://wattdata.ai",
  image: {
    src: "/canyon.jpg",
    alt: "A wide canyon in warm daylight, layered rock under a pale blue sky.",
    credit: "Photograph via Unsplash",
    creditHref: "https://unsplash.com/photos/qQC8tyG_JVA",
  },
} as const;

export const socials = [
  { label: "GitHub", href: profiles.github, icon: "github" },
  { label: "X", href: profiles.x, icon: "x" },
  { label: "Email", href: `mailto:${email}`, icon: "mail" },
  { label: "LinkedIn", href: profiles.linkedin, icon: "linkedin" },
] as const;

/** Los Angeles, matching the coordinates drawn in the Logbook lockup. */
export const coordinates = "34.05° N · 118.24° W";

export const sectionNav = [
  { href: "#top", index: "01", label: "Currently" },
  { href: "#projects", index: "02", label: "Projects" },
  { href: "#writing", index: "03", label: "Writing" },
  { href: "#about", index: "04", label: "About" },
  { href: "#tools", index: "05", label: "Tools" },
  { href: "#contact", index: "06", label: "Contact" },
] as const;

export const projects = [
  {
    name: "THE PROGRAM",
    href: "https://theprogram.news",
    status: "Live",
    summary:
      "A US cable-news airtime index. It measures how often networks said a thing, using closed captions from the GDELT Television API and the Internet Archive TV News Archive.",
  },
  {
    name: "Watt",
    href: "https://wattdata.ai",
    status: "Now",
    summary:
      "Head of Growth. I lead brand, marketing, and go-to-market. Watt builds signal infrastructure for AI agents.",
  },
  {
    name: "Twin Kind",
    href: null,
    status: "Side",
    summary: "A music project with Kam. Half of it is mine.",
  },
] as const;

/** Placeholder failures. Replace or delete. Not a real history. */
export const trash = [
  {
    kicker: "Placeholder",
    title: "The app with one user",
    line: "That user was me. I still filed a bug.",
  },
  {
    kicker: "Placeholder",
    title: "Season two of a newsletter",
    line: "Season one was a Google Doc and a feeling of momentum.",
  },
  {
    kicker: "Placeholder",
    title: "A name I liked more than the product",
    line: "The domain was the whole business.",
  },
] as const;

export const writing = [
  {
    title: "Circular logic, exponential progress",
    dek: "Navigating complexity with an ancient philosophy — the Hermeneutic Circle.",
    href: "https://tsweens.substack.com/p/circular-logic-exponential-progress",
    date: "2024-08-13",
    label: "Aug 13, 2024",
  },
  {
    title: "‘Be Real’ is the new ‘Don’t Be Boring’",
    dek: "Why authenticity trumps gimmicks in the age of AI and short attention spans.",
    href: "https://tsweens.substack.com/p/be-real-is-the-new-dont-be-boring",
    date: "2024-08-08",
    label: "Aug 8, 2024",
  },
] as const;

type Span = { text: string; href?: string };

export const about: Span[][] = [
  [
    { text: "I'm Head of Growth at " },
    { text: "Watt", href: "https://wattdata.ai" },
    {
      text: ". I lead brand, marketing, and go-to-market. Watt builds signal infrastructure for AI agents. I also made ",
    },
    { text: "THE PROGRAM", href: "https://theprogram.news" },
    {
      text: ", an index of US cable-news airtime from GDELT Television captions and the Internet Archive.",
    },
  ],
  [
    { text: "Before Watt I was Head of Growth at CoinTracker. Before that, Meta. I started there as a Programs Lead on media products — Music, Stories, Live, Premium Video, Creator Tools, Rights Manager, and Cloud Gaming — and later became a Corporate Development Lead, focused on AR/VR and AI. I mentored leaders, and teams as large as about 30." },
  ],
  [
    {
      text: "The years before Meta were media, between New York and Los Angeles. About a decade of it: CBS, a stint at CAA, and a digital marketing agency I ran in New York.",
    },
  ],
  [
    {
      text: "I live in Los Angeles. MBA from NYU Stern, BA from Boston College. I advise a little and write tiny checks, and I've mentored through First Round's Fast Track.",
    },
  ],
];

/** Typographic names, not official logos. */
export const marks = [
  { name: "Watt", href: "https://wattdata.ai" },
  { name: "Meta", href: "https://about.meta.com" },
  { name: "CoinTracker", href: "https://www.cointracker.com" },
  { name: "CBS", href: null },
  { name: "CAA", href: null },
  { name: "THE PROGRAM", href: "https://theprogram.news" },
] as const;

/** Starter set. Replace notes and links as you like. */
export const tools = [
  {
    name: "Cursor",
    href: "https://cursor.com",
    note: "Where the building happens.",
  },
  {
    name: "Claude",
    href: "https://claude.ai",
    note: "Writing, critique, and the longer version.",
  },
  {
    name: "Midjourney",
    href: "https://www.midjourney.com",
    note: "When the work needs a picture.",
  },
  {
    name: "Figma",
    href: "https://www.figma.com",
    note: "Layouts before they are real.",
  },
  {
    name: "Notion",
    href: "https://www.notion.so",
    note: "The pile of notes that becomes a plan.",
  },
] as const;
