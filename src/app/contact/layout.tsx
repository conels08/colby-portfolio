import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Colby Nelsen",
  description: "Get in touch with Colby Nelsen to discuss your website or full-stack project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Colby Nelsen",
    description: "Start a project conversation and get a detailed quote and timeline.",
    url: "https://colbynelsen.com/contact",
  },
  twitter: {
    title: "Contact | Colby Nelsen",
    description: "Start a project conversation and get a detailed quote and timeline.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
