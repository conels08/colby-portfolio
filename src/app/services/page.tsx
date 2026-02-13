"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  const { isHud } = useTheme();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${
            isHud ? "hud-glow" : ""
          }`}>
            Services
          </h1>
          <p className={`text-lg text-[var(--muted)] ${
            isHud ? "hud-glow" : ""
          }`}>
            What I can build for you
          </p>
        </motion.div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 rounded-lg ${
                isHud
                  ? "border border-[var(--border)] hud-bracket"
                  : "bg-[var(--card)] border border-[var(--border)]"
              }`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${
                isHud ? "hud-glow" : ""
              }`}>
                {service.title}
              </h2>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      isHud ? "bg-[var(--foreground)] hud-glow" : "bg-[var(--accent)]"
                    }`} />
                    <span className="text-[var(--foreground)]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${
                  isHud
                    ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className={`p-8 rounded-lg ${
            isHud
              ? "border border-[var(--border)]"
              : "bg-[var(--card)] border border-[var(--border)]"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              isHud ? "hud-glow" : ""
            }`}>
              Need something custom?
            </h2>
            <p className="text-[var(--muted)] mb-6">
              Let's discuss your specific requirements
            </p>
            <Link
              href="/contact"
              className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${
                isHud
                  ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  : "border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]"
              }`}
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}