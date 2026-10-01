# Thomas Sweeney

Personal site for [thomasdamien.com](https://thomasdamien.com). One static page: hero, projects (with a trash subsection), writing, about, favorite tools, and contact.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. No CMS, database, or analytics.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

`npm run build` prerenders the page.

## Deploy

Import the repo on Vercel as a Next.js project. The build command is `npm run build`. No environment variables.

The domain is **thomasdamien.com**. Attach it in the Vercel project, then point DNS at Vercel. DNS is not set in this repo.

## Edit the copy

Everything a visitor reads is in `lib/content.ts`: hero, projects, trash, writing, about, wordmarks, and favorite tools.

The hero photograph is `public/canyon.jpg`, a canyon landscape from [Unsplash](https://unsplash.com/photos/qQC8tyG_JVA). Swap the file when you want your own picture, and update the alt text and credit in `lib/content.ts`.

The favicon is a temporary “T” in `app/icon.svg`.

GitHub in the nav points at [github.com/sweeneth](https://github.com/sweeneth). That profile exists and is nearly empty, so confirm it is yours or change `profiles.github`.

Trash is three stand-in failures, each marked Placeholder. They are not a real history.

Favorite tools are a starter set (Cursor, Claude, Midjourney, Figma, Notion). Claude and Midjourney showed up on the previous site; the others are suggestions. Edit them freely.

## Motion

Sections fade in as they enter the viewport. The hero text fades up on load. Both respect `prefers-reduced-motion`.

A scroll-driven “dump into the trash bin” animation is a possible later version. v1 keeps Trash as a list inside Projects, with a light hover only. Trash is not in the nav.

## What this version keeps

Watt as Head of Growth, CoinTracker before that, Meta corporate development and media programs, about a decade in media (CBS, CAA, and a New York agency), NYU Stern, Boston College, Los Angeles, First Round Fast Track and tiny checks, Twin Kind, THE PROGRAM, and the 2024 Substack pieces.

The long reading list, the orange footer, and the old Webflow essay layout are gone.
