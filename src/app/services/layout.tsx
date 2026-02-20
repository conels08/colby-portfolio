import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Colby Nelsen",
  description: "Web development services including high-conversion websites, full-stack apps, and technical optimizations.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Colby Nelsen",
    description: "Professional web development services focused on speed, UX, and business outcomes.",
    url: "https://colbynelsen.com/services",
  },
  twitter: {
    title: "Services | Colby Nelsen",
    description: "Professional web development services focused on speed, UX, and business outcomes.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
