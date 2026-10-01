import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-instrument",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex",
});

const description =
  "Thomas Sweeney is Head of Growth at Watt. He builds things, including THE PROGRAM, and lives in Los Angeles.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomasdamien.com"),
  title: {
    default: "Thomas Sweeney",
    template: "%s · Thomas Sweeney",
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
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Thomas Sweeney",
    description,
    url: "https://thomasdamien.com",
    siteName: "Thomas Sweeney",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Sweeney",
    description,
    creator: "@tsweens",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#14243A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrument.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-sailcloth text-body">{children}</body>
    </html>
  );
}
