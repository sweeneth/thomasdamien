import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page isn't on thomasdamien.com.",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-full max-w-3xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-[13px] tracking-[0.12em] text-signal uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl font-medium tracking-[-0.015em]">
        This page isn&apos;t here.
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-body">The site is a single page.</p>
      <Link
        href="/"
        className="mt-8 w-fit text-ink underline decoration-harbor underline-offset-4 hover:text-harbor"
      >
        Back home
      </Link>
    </main>
  );
}
