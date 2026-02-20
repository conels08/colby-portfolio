import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Colby Nelsen",
  description: "Explore selected client and full-stack projects by Colby Nelsen with a focus on clean UX and technical excellence.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Colby Nelsen",
    description: "Selected projects with clean design and strong engineering fundamentals.",
    url: "https://colbynelsen.com/work",
  },
  twitter: {
    title: "Work | Colby Nelsen",
    description: "Selected projects with clean design and strong engineering fundamentals.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
