/**
 * The route is measured from the live layout: the text column, each section
 * box, and the shore markers. Poses are viewport points at a scroll progress,
 * so a reflow rebuilds the journey instead of replaying a fixed pixel path.
 */

export type Pose = {
  at: number;
  x: number;
  y: number;
  scale: number;
};

export type Point = { x: number; y: number };

export type VoyagePlan = {
  poses: Pose[];
  landStart: number;
  waterline: Point;
  man: Point;
  dog: Point;
  maxScroll: number;
};

export const VOYAGE_BREAK = 960;

export function boatBox(viewportWidth: number) {
  return viewportWidth < VOYAGE_BREAK ? 64 : 108;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

type SectionBox = {
  id: string;
  top: number;
  bottom: number;
};

function docTop(el: HTMLElement, scrollY: number) {
  return el.getBoundingClientRect().top + scrollY;
}

function centerOf(el: HTMLElement, scrollY: number): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + scrollY + rect.height / 2,
  };
}

export function planVoyage(): VoyagePlan | null {
  const column = document.querySelector<HTMLElement>("[data-voyage-column]");
  const open = document.querySelector<HTMLElement>("[data-voyage-open]");
  const waterEl = document.querySelector<HTMLElement>("[data-voyage-waterline]");
  const manEl = document.querySelector<HTMLElement>("[data-voyage-stand='man']");
  const dogEl = document.querySelector<HTMLElement>("[data-voyage-stand='dog']");
  const shore = document.querySelector<HTMLElement>("[data-voyage-shore]");
  if (!column || !open || !waterEl || !manEl || !dogEl || !shore) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scrollY = window.scrollY;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
  const box = boatBox(vw);
  const half = box / 2;
  const col = column.getBoundingClientRect();

  const minX = half + 8;
  const maxX = vw - half - 8;
  const minY = 88;
  const maxY = vh - 36;

  const rightX = col.right + half + 16;
  const leftX = col.left - half - 16;
  const rightFits = rightX >= minX && rightX + half <= vw - 8 && rightX - half > col.right + 8;
  const leftFits = leftX <= maxX && leftX - half >= 8 && leftX + half < col.left - 8;
  const useBoth = leftFits && rightFits;

  const channelX = clamp(vw - 22 - half, minX, maxX);
  const rightLane = rightFits ? rightX : channelX;
  const leftLane = useBoth ? leftX : rightLane;

  const ySail = clamp(vh * 0.56, minY, maxY);
  const toProgress = (scroll: number) => clamp(scroll / maxScroll, 0, 0.97);

  const sectionIds = ["projects", "writing", "about", "tools", "contact"];
  const sections: SectionBox[] = [];
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = docTop(el, scrollY);
    sections.push({ id, top, bottom: top + el.getBoundingClientRect().height });
  }
  if (sections.length === 0) return null;

  const portSide = new Set(["writing", "tools", "contact"]);
  const laneOf = (id: string) => (useBoth && portSide.has(id) ? leftLane : rightLane);

  const openPt = centerOf(open, scrollY);
  const waterline = centerOf(waterEl, scrollY);
  const man = centerOf(manEl, scrollY);
  const dog = centerOf(dogEl, scrollY);
  const markerInSea = openPt.x > col.right + 8 || openPt.x < col.left - 8;

  const poses: Pose[] = [];
  const add = (at: number, x: number, y: number, scale: number) => {
    poses.push({
      at: clamp(at, 0, 0.985),
      x: clamp(x, minX, maxX),
      y: clamp(y, minY, maxY),
      scale,
    });
  };

  const heroX = markerInSea ? clamp(openPt.x, minX, maxX) : rightLane;
  const heroY = clamp(openPt.y, minY, maxY);
  add(0, heroX, heroY, 0.7);

  const hero = document.getElementById("top");
  const heroBottom = hero ? docTop(hero, scrollY) + hero.getBoundingClientRect().height : vh;
  const heroExit = toProgress(Math.max(72, heroBottom - vh * 0.5));
  const firstLane = laneOf(sections[0].id);
  add(heroExit * 0.5, lerp(heroX, firstLane, 0.6), lerp(heroY, ySail, 0.65), 0.84);
  add(heroExit, firstLane, ySail, 0.96);

  sections.forEach((section, index) => {
    const lane = laneOf(section.id);
    const prevLane = index === 0 ? firstLane : laneOf(sections[index - 1].id);
    const boundary = section.top;
    const crossStart = toProgress(boundary - vh * 0.62);
    const crossEnd = toProgress(boundary - vh * 0.46);

    if (Math.abs(prevLane - lane) > 24) {
      const startY = clamp(vh * 0.62, minY, maxY);
      const endY = clamp(vh * 0.46, minY, maxY);
      add(crossStart, prevLane, startY, 0.98);
      add(lerp(crossStart, crossEnd, 0.5), (prevLane + lane) / 2, (startY + endY) / 2, 0.94);
      add(crossEnd, lane, endY, 1);
    }

    const enter = toProgress(section.top - vh * 0.18);
    const exit = toProgress(section.bottom - vh * 0.7);
    add(enter, lane, ySail, 1);
    if (exit > enter + 0.025) {
      add(exit, lane, clamp(ySail - Math.min(48, vh * 0.05), minY, maxY), 1);
    }
  });

  poses.sort((a, b) => a.at - b.at);
  for (let i = 1; i < poses.length; i++) {
    if (poses[i].at <= poses[i - 1].at) {
      poses[i].at = Math.min(0.94, poses[i - 1].at + 0.012);
    }
  }

  const caption = document.querySelector<HTMLElement>("[data-voyage-caption]");
  const captionBottom = caption
    ? docTop(caption, scrollY) + caption.getBoundingClientRect().height
    : docTop(shore, scrollY);
  const contact = sections.find((section) => section.id === "contact");
  const aboveBoat = ySail - half - 28;
  const clearScroll = Math.max(
    captionBottom - aboveBoat,
    contact ? contact.bottom - aboveBoat : 0,
  );
  const afterLayout = poses[poses.length - 1]?.at ?? 0.7;
  const slideAt = clamp(Math.max(clearScroll, 0) / maxScroll, afterLayout + 0.012, 0.972);
  const landStart = clamp(
    Math.max((waterline.y - ySail) / maxScroll, slideAt + 0.018),
    slideAt + 0.012,
    0.99,
  );
  const contactLane = laneOf("contact");
  poses.push({
    at: slideAt,
    x: clamp(contactLane, minX, maxX),
    y: ySail,
    scale: 1,
  });
  poses.push({
    at: landStart,
    x: clamp(waterline.x, minX, maxX),
    y: clamp(waterline.y - landStart * maxScroll, minY, maxY),
    scale: 1.04,
  });

  return { poses, landStart, waterline, man, dog, maxScroll };
}
