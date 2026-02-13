"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/data/projects";
import { useTheme } from "./ThemeProvider";

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProjectDrawer({
  project,
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}: ProjectDrawerProps) {
  const { isHud } = useTheme();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "preview", label: "Preview" },
    { id: "results", label: "Results" },
    { id: "code", label: "See the Code" },
  ];

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-[var(--background)] border-l border-[var(--border)] z-50 flex flex-col ${
              isHud ? "hud-bracket" : ""
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className={`text-xl font-semibold ${isHud ? "hud-glow" : ""}`}>
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border-b border-[var(--border)]">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">What it is</h3>
                      <p className="text-[var(--muted)] leading-relaxed">
                        {project.overview.whatItIs}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">What I did</h3>
                      <p className="text-[var(--muted)] leading-relaxed">
                        {project.overview.whatIDid}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 text-xs rounded-full border ${
                              isHud
                                ? "border-[var(--foreground)] text-[var(--foreground)]"
                                : "border-[var(--border)] text-[var(--muted)]"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Role</h3>
                      <p className="text-[var(--muted)]">{project.role}</p>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          isHud
                            ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                            : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                        }`}
                      >
                        View Live
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === "preview" && (
                  <div className="space-y-6">
                    <div className="bg-[var(--card)] rounded-lg p-8 text-center">
                      <div className="w-full h-64 bg-[var(--sand)] rounded flex items-center justify-center">
                        <div className="text-[var(--muted)]">
                          <div className="text-4xl mb-2">🖼️</div>
                          <p>Project Preview</p>
                          <p className="text-sm">Image carousel would go here</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-[var(--muted)]">
                      Screenshots and demo images of {project.title}
                    </p>
                  </div>
                )}

                {activeTab === "results" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Key Achievements</h3>
                      <ul className="space-y-3">
                        {project.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              isHud ? "bg-[var(--foreground)] hud-glow" : "bg-[var(--accent)]"
                            }`} />
                            <span className="text-[var(--muted)] leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "code" && (
                  <div className="space-y-6">
                    {project.repoUrl !== "#" ? (
                      <>
                        <div className="space-y-4">
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full px-4 py-3 rounded-lg font-medium transition-colors text-center ${
                              isHud
                                ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                                : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                            }`}
                          >
                            View Repository
                          </a>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full px-4 py-3 rounded-lg border border-[var(--border)] text-center hover:bg-[var(--card)] transition-colors"
                          >
                            Open README
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg border ${
                          isHud
                            ? "border-[var(--foreground)]"
                            : "border-[var(--border)]"
                        }`}>
                          <div className={`text-sm font-medium mb-2 ${
                            isHud ? "hud-glow" : "text-[var(--muted)]"
                          }`}>
                            🔒 Client-owned / Private
                          </div>
                          <p className="text-[var(--muted)] text-sm mb-3">
                            This project's code is private or owned by the client.
                          </p>
                          <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isHud
                                ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                                : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                            }`}
                          >
                            Request Code Walkthrough
                          </button>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Architecture Summary</h3>
                          <p className="text-[var(--muted)] leading-relaxed">
                            {project.overview.whatItIs}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}