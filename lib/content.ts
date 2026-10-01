export const email = "hi@thomasdamien.com";

export const profiles = {
  x: "https://x.com/tsweens",
  linkedin: "https://www.linkedin.com/in/thomasdamien",
  substack: "https://tsweens.substack.com",
} as const;

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

/**
 * Placeholder failures. Clearly labeled so they are not read as real history.
 * Thom: replace the title and line, or delete an entry, in this file.
 */
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

export const experience = [
  {
    when: "Now",
    role: "Head of Growth, Watt",
    detail: "Brand, marketing, and go-to-market.",
  },
  {
    when: "Previously",
    role: "Head of Growth, CoinTracker",
    detail: "Before Watt.",
  },
  {
    when: "Earlier",
    role: "Corporate Development Lead, Meta",
    detail: "New businesses and technologies, mostly AR/VR and AI.",
  },
  {
    when: "Earlier",
    role: "Programs Lead, Meta",
    detail:
      "Media products: Music, Stories, Live, Premium Video, Creator Tools, Rights Manager, Cloud Gaming.",
  },
] as const;
