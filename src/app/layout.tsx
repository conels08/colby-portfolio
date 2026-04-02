import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://colbynelsen.com"),
  manifest: "/site.webmanifest",
  title: "Colby Nelsen - Full-Stack Developer & Web Designer",
  description: "I build polished websites and full-stack web apps — fast. Modern Next.js builds with clean UX, strong fundamentals, and performance-first execution.",
  alternates: {
    canonical: "/",
  },
  keywords: ["Next.js", "Full-Stack", "Web Development", "React", "TypeScript", "Tailwind CSS", "Portfolio"],
  authors: [{ name: "Colby Nelsen" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Colby Nelsen - Full-Stack Developer & Web Designer",
    description: "I build polished websites and full-stack web apps — fast.",
    type: "website",
    url: "https://colbynelsen.com",
    siteName: "Colby Nelsen Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Colby Nelsen Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colby Nelsen - Full-Stack Developer & Web Designer",
    description: "I build polished websites and full-stack web apps — fast.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Colby Nelsen",
  url: "https://colbynelsen.com",
  jobTitle: "Full-Stack Developer",
  sameAs: [
    "https://github.com/conels08",
    "https://www.linkedin.com/in/colby-nelsen-4a8108278",
  ],
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://colbynelsen.com",
  name: "Colby Nelsen Portfolio",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://colbynelsen.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
