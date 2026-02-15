"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, services } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { Project } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { isHud } = useTheme();

  const openProjectDrawer = (project: Project) => {
    setSelectedProject(project);
    setDrawerOpen(true);
    setActiveTab("overview");
  };

  const closeProjectDrawer = () => {
    setDrawerOpen(false);
    setSelectedProject(null);
  };

  const featuredProjects = projects.filter(p => p.status === "shipped").slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 tracking-tight ${
              isHud ? "hud-glow" : ""
            }`}>
              I build polished websites and full-stack web apps — fast.
            </h1>
            <p className={`text-lg md:text-xl text-[var(--muted)] mb-8 leading-relaxed ${
              isHud ? "hud-glow" : ""
            }`}>
              Modern Next.js builds with clean UX, strong fundamentals, and performance-first execution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
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
              href="https://calendly.com/colbynelsen/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isHud
                  ? "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                  : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
              }`}
            >
              Book Colby
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`flex flex-wrap justify-center gap-4 text-sm text-[var(--muted)] ${
              isHud ? "hud-glow" : ""
            }`}
          >
            <span>Next.js</span>
            <span>•</span>
            <span>Tailwind</span>
            <span>•</span>
            <span>Supabase</span>
            <span>•</span>
            <span>UX Polish</span>
            <span>•</span>
            <span>Shipping Speed</span>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${isHud ? "hud-glow" : ""}`}>
              Featured Work
            </h2>
            <p className="text-[var(--muted)]">
              Recent projects showcasing clean design and technical excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => openProjectDrawer(project)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/work"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isHud
                  ? "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                  : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
              }`}
            >
              View All Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold mb-4 ${isHud ? "hud-glow" : ""}`}>
              Services
            </h2>
            <p className="text-[var(--muted)]">
              What I can build for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-lg ${
                  isHud
                    ? "border border-[var(--border)]"
                    : "bg-[var(--background)]"
                }`}
              >
                <h3 className={`text-xl font-semibold mb-3 ${
                  isHud ? "hud-glow" : ""
                }`}>
                  {service.title}
                </h3>
                <p className="text-[var(--muted)] mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        isHud ? "bg-[var(--foreground)]" : "bg-[var(--accent)]"
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${isHud ? "hud-glow" : ""}`}>
              Process
            </h2>
            <p className="text-[var(--muted)]">
              From idea to deployment in 4 clear steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discover", description: "Understand your goals and requirements" },
              { step: "02", title: "Design", description: "Create user flows and visual concepts" },
              { step: "03", title: "Build", description: "Develop with clean, scalable code" },
              { step: "04", title: "Launch", description: "Deploy and optimize for performance" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isHud
                    ? "border border-[var(--foreground)] hud-glow"
                    : "bg-[var(--accent)] text-white"
                }`}>
                  <span className="font-bold">{item.step}</span>
                </div>
                <h3 className={`font-semibold mb-2 ${isHud ? "hud-glow" : ""}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${isHud ? "hud-glow" : ""}`}>
              Stay Updated
            </h2>
            <p className="text-[var(--muted)]">
              Get notified about new projects and insights
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing! (This is a demo - integrate with your email service)");
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email"
              required
              className={`flex-1 px-4 py-3 rounded-lg border ${
                isHud
                  ? "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                  : "border-[var(--border)] bg-[var(--background)]"
              } focus:outline-none focus:border-[var(--accent)] transition-colors`}
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isHud
                  ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
              }`}
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>

      <ProjectDrawer
        project={selectedProject}
        isOpen={drawerOpen}
        onClose={closeProjectDrawer}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}