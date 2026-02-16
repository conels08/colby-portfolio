"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { isHud } = useTheme();
  const [imageFailed, setImageFailed] = useState(false);
  const thumbnailSrc = project.thumbnailSrc ?? project.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={`group cursor-pointer ${
        isHud ? "hud-bracket" : ""
      }`}
    >
      <div className={`relative aspect-video rounded-lg overflow-hidden mb-4 transition-all duration-300 ${
        isHud
          ? "border border-[var(--border)] group-hover:border-[var(--foreground)]"
          : "bg-[var(--card)] border border-[var(--border)] group-hover:border-[var(--accent)]"
      }`}>
        {thumbnailSrc && !imageFailed ? (
          <Image
            src={thumbnailSrc}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            onError={() => {
              if (process.env.NODE_ENV !== "production") {
                console.warn("Project thumbnail failed to load:", thumbnailSrc);
              }
              setImageFailed(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--sand)] to-[var(--card)] flex items-center justify-center">
            <div className="text-4xl">🖼️</div>
          </div>
        )}
        
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100`}>
          <span className={`px-4 py-2 rounded-lg font-medium ${
            isHud
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "bg-white text-gray-900"
          }`}>
            View Details
          </span>
        </div>

        {project.status === "shipped" && (
          <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full ${
            isHud
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "bg-green-100 text-green-700"
          }`}>
            Shipped
          </span>
        )}

        {project.status === "in-progress" && (
          <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full ${
            isHud
              ? "bg-yellow-900 text-yellow-300"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            In Progress
          </span>
        )}
      </div>

      <h3 className={`text-lg font-semibold mb-1 ${
        isHud ? "hud-glow group-hover:text-[var(--foreground)]" : ""
      }`}>
        {project.title}
      </h3>
      <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className={`px-2 py-1 text-xs rounded ${
              isHud
                ? "text-[var(--muted)]"
                : "bg-[var(--sand)] text-[var(--muted)]"
            }`}
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="px-2 py-1 text-xs text-[var(--muted)]">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}
