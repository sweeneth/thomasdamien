# Thomas Sweeney

Personal site for [thomasdamien.com](https://thomasdamien.com). One long-scroll page: hero, about, projects, media, reading, workbench, and beliefs.

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

Everything a visitor reads is in `lib/content.ts`. The approved reference, brand tokens, and source assets live in `design-handoff/`.

The hero photograph is `public/hero.jpg`. Logos, the signal mark, seals, icons, and the favicon set are in `public/`.

Items marked TODO in `lib/content.ts` are placeholders waiting on real content.
