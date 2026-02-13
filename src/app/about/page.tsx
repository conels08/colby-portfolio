"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const { isHud } = useTheme();

  const skills = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion",
    "Node.js", "Prisma", "PostgreSQL", "Supabase", "Stripe",
    "UX Design", "Performance Optimization", "SEO", "Progressive Web Apps"
  ];

  const values = [
    {
      title: "Performance First",
      description: "Every decision considers speed and user experience"
    },
    {
      title: "Clean Architecture",
      description: "Scalable, maintainable code that stands the test of time"
    },
    {
      title: "User-Centered",
      description: "Great design meets great engineering for exceptional UX"
    },
    {
      title: "Fast Delivery",
      description: "Shipping quality work quickly without cutting corners"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
            isHud ? "hud-glow" : ""
          }`}>
            About Colby
          </h1>
          <p className={`text-lg text-[var(--muted)] leading-relaxed ${
            isHud ? "hud-glow" : ""
          }`}>
            I'm a full-stack developer passionate about building polished, 
            performant web applications that users love. With a focus on modern 
            JavaScript frameworks and clean UX, I help businesses create digital 
            experiences that convert.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className={`text-2xl font-bold mb-6 ${isHud ? "hud-glow" : ""}`}>
            My Approach
          </h2>
          <div className={`p-6 rounded-lg ${
            isHud
              ? "border border-[var(--border)]"
              : "bg-[var(--card)] border border-[var(--border)]"
          }`}>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              I believe the best websites are those that combine beautiful design 
              with rock-solid engineering. Every project starts with understanding 
              your goals and users, then crafting a solution that's both technically 
              excellent and delightfully simple to use.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Whether you need a business website that converts visitors into customers, 
              or a full-stack application that scales with your business, I bring the 
              same attention to detail and commitment to quality.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className={`text-2xl font-bold mb-6 ${isHud ? "hud-glow" : ""}`}>
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-2 rounded-lg text-sm ${
                  isHud
                    ? "border border-[var(--border)] text-[var(--muted)]"
                    : "bg-[var(--sand)] text-[var(--muted)]"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className={`text-2xl font-bold mb-6 ${isHud ? "hud-glow" : ""}`}>
            What I Value
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`p-6 rounded-lg ${
                  isHud
                    ? "border border-[var(--border)]"
                    : "bg-[var(--card)] border border-[var(--border)]"
                }`}
              >
                <h3 className={`font-semibold mb-2 ${isHud ? "hud-glow" : ""}`}>
                  {value.title}
                </h3>
                <p className="text-[var(--muted)] text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className={`p-8 rounded-lg ${
            isHud
              ? "border border-[var(--border)]"
              : "bg-[var(--card)] border border-[var(--border)]"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${isHud ? "hud-glow" : ""}`}>
              Ready to build something great?
            </h2>
            <p className="text-[var(--muted)] mb-6">
              Let's discuss your project and see how I can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isHud
                    ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                }`}
              >
                Get a Quote
              </Link>
              <Link
                href="https://calendly.com/colby-nelsen"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isHud
                    ? "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                    : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                }`}
              >
                Book a Call
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}