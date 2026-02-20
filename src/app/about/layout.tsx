import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Colby Nelsen",
  description: "Learn about Colby Nelsen's approach to building performant, polished web applications and websites.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Colby Nelsen",
    description: "Developer background, values, and technical approach for building modern web experiences.",
    url: "https://colbynelsen.com/about",
  },
  twitter: {
    title: "About | Colby Nelsen",
    description: "Developer background, values, and technical approach for building modern web experiences.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
