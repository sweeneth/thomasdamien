import type { SpineTone } from "@/lib/content";

export function goodreadsHref(title: string, author: string) {
  const query = encodeURIComponent(`${title} ${author}`).replace(/%20/g, "+");
  return `https://www.goodreads.com/search?q=${query}`;
}

export function displayHost(href: string) {
  return new URL(href).host.replace(/^www\./, "");
}

const spineFontSteps = [17, 15, 13, 12] as const;

export function spineFontSize(title: string, height: number) {
  const maxHeight = height - 52;
  for (const size of spineFontSteps) {
    if (title.length * size * 0.52 <= maxHeight) return size;
  }
  return 12;
}

export const spinePaint: Record<SpineTone, { background: string; color: string; border?: string }> = {
  ink: { background: "var(--ts-ink)", color: "var(--ts-sailcloth)" },
  harbor: { background: "var(--ts-harbor-green)", color: "var(--ts-sailcloth)" },
  signal: { background: "var(--ts-signal)", color: "var(--ts-surface)" },
  sailcloth: {
    background: "var(--ts-sailcloth)",
    color: "var(--ts-ink)",
    border: "1px solid var(--ts-ink)",
  },
  slate: { background: "var(--ts-slate)", color: "var(--ts-sailcloth)" },
  rule: {
    background: "var(--ts-rule)",
    color: "var(--ts-ink)",
    border: "1px solid var(--ts-ink)",
  },
};

export function linkedFact(value: string, href?: string) {
  if (!href) return { before: value, link: null as string | null };
  const splitAt = value.lastIndexOf(", ");
  if (splitAt === -1) return { before: "", link: value };
  return { before: value.slice(0, splitAt + 2), link: value.slice(splitAt + 2) };
}
