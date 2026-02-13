"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { Project } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";

export const dynamic = 'force-dynamic';

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFilter, setActiveFilter] = useState("all");
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

  const filters = [
    { id: "all", label: "All" },
    { id: "shipped", label: "Shipped" },
    { id: "in-progress", label: "In Progress" },
    { id: "client", label: "Client" },
    { id: "full-stack", label: "Full-Stack" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "shipped") return project.status === "shipped";
    if (activeFilter === "in-progress") return project.status === "in-progress";
    if (activeFilter === "client") return project.category === "client";
    if (activeFilter === "full-stack") return project.category === "full-stack";
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${
            isHud ? "hud-glow" : ""
          }`}>
            Selected Work
          </h1>
          <p className={`text-lg text-[var(--muted)] ${
            isHud ? "hud-glow" : ""
          }`}>
            A collection of projects showcasing clean design and technical excellence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? isHud
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-[var(--accent)] text-white"
                  : isHud
                    ? "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                    : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                onClick={() => openProjectDrawer(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className={`text-6xl mb-4 ${isHud ? "hud-glow" : ""}`}>🔍</div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isHud ? "hud-glow" : ""
            }`}>
              No projects found
            </h3>
            <p className="text-[var(--muted)]">
              Try selecting a different filter
            </p>
          </motion.div>
        )}

        <ProjectDrawer
          project={selectedProject}
          isOpen={drawerOpen}
          onClose={closeProjectDrawer}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}