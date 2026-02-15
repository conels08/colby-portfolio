import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Colby Nelsen - Full-Stack Developer & Web Designer",
  description: "I build polished websites and full-stack web apps — fast. Modern Next.js builds with clean UX, strong fundamentals, and performance-first execution.",
  keywords: ["Next.js", "Full-Stack", "Web Development", "React", "TypeScript", "Tailwind CSS", "Portfolio"],
  authors: [{ name: "Colby Nelsen" }],
  openGraph: {
    title: "Colby Nelsen - Full-Stack Developer & Web Designer",
    description: "I build polished websites and full-stack web apps — fast.",
    type: "website",
    url: "https://colbynelsen.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colby Nelsen - Full-Stack Developer & Web Designer",
    description: "I build polished websites and full-stack web apps — fast.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
