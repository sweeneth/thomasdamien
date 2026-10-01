import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Tom Sweeney is Head of Growth at Watt and builds things, including THE PROGRAM. Based in Los Angeles.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomasdamien.com"),
  title: {
    default: "Tom Sweeney",
    template: "%s · Tom Sweeney",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tom Sweeney",
    description,
    url: "https://thomasdamien.com",
    siteName: "Tom Sweeney",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Sweeney",
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
