import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/components/voyage/voyage.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
