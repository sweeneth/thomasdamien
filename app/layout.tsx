import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import { site, socials } from "@/lib/content";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-newsreader",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-plex",
});

const description = `${site.name}, ${site.location}. ${site.current.label}.`;
const xHandle = socials.find((item) => item.label === "X")?.handle;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: site.name,
    description,
    url: `https://${site.domain}`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description,
    creator: xHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#14243A",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrumentSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
