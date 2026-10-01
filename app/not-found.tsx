import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page isn't on thomasdamien.com.",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-full max-w-[40rem] flex-col justify-center px-6 py-24">
      <p className="index-num">404</p>
      <h1 className="mt-3 text-3xl tracking-tight">This page isn&apos;t here.</h1>
      <p className="mt-4 max-w-md text-[1.05rem] leading-7 text-slate">
        The site is a single page.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit text-ink underline decoration-ink/25 underline-offset-4 hover:text-harbor hover:decoration-harbor"
      >
        Back home
      </Link>
    </main>
  );
}
