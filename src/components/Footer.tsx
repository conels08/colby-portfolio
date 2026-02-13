"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { isHud } = useTheme();

  const socialLinks = [
    { href: "mailto:colby@example.com", label: "Email" },
    { href: "https://github.com/conels08", label: "GitHub" },
    { href: "https://linkedin.com/in/colby-nelsen", label: "LinkedIn" },
    { href: "https://calendly.com/colby-nelsen", label: "Calendly" },
    { href: "https://fiverr.com/colby-nelsen", label: "Fiverr" },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors ${
                  isHud ? "hud-glow" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className={`text-sm text-[var(--muted)] ${isHud ? "hud-glow" : ""}`}>
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}