# Tom Sweeney

Personal site for [thomasdamien.com](https://thomasdamien.com). One static page: a short intro, live projects, a trash shelf, writing, experience, and contact.

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

All of the words live in `lib/content.ts`.

The Trash section is three empty slots with `TODO` lines for Thom. Replace them, or delete the ones you don't want, before treating the page as finished.

## What changed from the old site

Kept, and shortened: Watt as the current role, Meta corporate development and media programs, NYU Stern and Boston College, Los Angeles, First Round Fast Track and tiny checks, Twin Kind with Kam, and the 2024 Substack pieces on Beyond the Buzzwords.

Added: THE PROGRAM (theprogram.news).

Dropped: the long reading list, the canyon photo, the orange footer, the Webflow essay sections, and Instagram (the exact profile URL was never recovered). CoinTracker stays as one previous line, not the current role.
