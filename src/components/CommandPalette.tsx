"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

interface Command {
  id: string;
  label: string;
  action: () => void;
  icon: string;
  group: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { theme, toggleTheme, toggleMode } = useTheme();
  const commandRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setQuery("");
        setSelectedIndex(0);
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange]
  );

  const commands: Command[] = [
    {
      id: "nav-work",
      label: "Work",
      action: () => {
        router.push("/");
        handleOpenChange(false);
      },
      icon: "💼",
      group: "Navigation",
    },
    {
      id: "nav-services",
      label: "Services",
      action: () => {
        router.push("/services");
        handleOpenChange(false);
      },
      icon: "🛠️",
      group: "Navigation",
    },
    {
      id: "nav-about",
      label: "About",
      action: () => {
        router.push("/about");
        handleOpenChange(false);
      },
      icon: "👤",
      group: "Navigation",
    },
    {
      id: "nav-contact",
      label: "Contact",
      action: () => {
        router.push("/contact");
        handleOpenChange(false);
      },
      icon: "📧",
      group: "Navigation",
    },
    {
      id: "project-minute-maids",
      label: "Minute Maids",
      action: () => {
        window.open("https://minutemaidsclean.com", "_blank");
        handleOpenChange(false);
      },
      icon: "🧹",
      group: "Projects",
    },
    {
      id: "project-urlray",
      label: "URLRay.com",
      action: () => {
        window.open("https://urlray.com", "_blank");
        handleOpenChange(false);
      },
      icon: "🔎",
      group: "Projects",
    },
    {
      id: "project-posh",
      label: "Posh",
      action: () => {
        window.open("https://poshnewberg.com", "_blank");
        handleOpenChange(false);
      },
      icon: "💅",
      group: "Projects",
    },
    {
      id: "project-quit-smoking",
      label: "Quit Smoking Tracker",
      action: () => {
        window.open("https://cto-playground.vercel.app/", "_blank");
        handleOpenChange(false);
      },
      icon: "🚭",
      group: "Projects",
    },
    {
      id: "copy-email",
      label: "Copy Email",
      action: () => {
        navigator.clipboard.writeText("colbynelsen@gmail.com");
        handleOpenChange(false);
      },
      icon: "📋",
      group: "Actions",
    },
    {
      id: "open-github",
      label: "Open GitHub",
      action: () => {
        window.open("https://github.com/conels08", "_blank");
        handleOpenChange(false);
      },
      icon: "🐙",
      group: "External",
    },
    {
      id: "open-linkedin",
      label: "Open LinkedIn",
      action: () => {
        window.open("https://www.linkedin.com/in/colbynelsen", "_blank");
        handleOpenChange(false);
      },
      icon: "💼",
      group: "External",
    },
    {
      id: "open-calendly",
      label: "Open Calendly",
      action: () => {
        window.open("https://calendly.com/colbynelsen/30min", "_blank");
        handleOpenChange(false);
      },
      icon: "📅",
      group: "External",
    },
    {
      id: "toggle-theme",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      action: () => {
        toggleTheme();
        handleOpenChange(false);
      },
      icon: theme === "dark" ? "☀️" : "🌙",
      group: "Settings",
    },
    {
      id: "toggle-hud",
      label: "Toggle HUD Mode",
      action: () => {
        toggleMode();
        handleOpenChange(false);
      },
      icon: "☢️",
      group: "Settings",
    },
  ];

  const filteredCommands = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const groupedCommands = filteredCommands.reduce((groups, cmd) => {
    const group = groups[cmd.group] || [];
    group.push(cmd);
    groups[cmd.group] = group;
    return groups;
  }, {} as Record<string, Command[]>);
  const activeCommandIndex =
    filteredCommands.length === 0
      ? 0
      : Math.min(selectedIndex, filteredCommands.length - 1);
  const activeCommandId = filteredCommands[activeCommandIndex]?.id;

  useEffect(() => {
    const activeCommand = filteredCommands[activeCommandIndex];
    if (!activeCommand) return;

    commandRefs.current[activeCommand.id]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeCommandIndex, filteredCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, handleOpenChange]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCommands.length === 0) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((currentIndex) => (currentIndex + 1) % filteredCommands.length);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((currentIndex) =>
        (currentIndex - 1 + filteredCommands.length) % filteredCommands.length
      );
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      filteredCommands[selectedIndex]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => handleOpenChange(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="relative w-full max-w-md bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--muted)]"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Type a command..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                className="flex-1 bg-transparent text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none"
                autoFocus
              />
              <span className="text-xs text-[var(--muted)] font-mono">⌘K</span>
            </div>

            <div className="max-h-96 overflow-y-auto py-2">
              {Object.entries(groupedCommands).map(([group, commands]) => (
                <div key={group}>
                  <div className="px-4 py-2 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                    {group}
                  </div>
                  {commands.map((cmd) => (
                    <button
                      key={cmd.id}
                      ref={(node) => {
                        commandRefs.current[cmd.id] = node;
                      }}
                      onClick={cmd.action}
                      onMouseEnter={() => {
                        const index = filteredCommands.findIndex((candidate) => candidate.id === cmd.id);
                        if (index >= 0) {
                          setSelectedIndex(index);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors text-[var(--foreground)] ${
                        activeCommandId === cmd.id
                          ? "bg-[var(--card)]"
                          : "hover:bg-[var(--card)]"
                      }`}
                    >
                      <span className="text-base">{cmd.icon}</span>
                      <span className="flex-1">{cmd.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {query && filteredCommands.length === 0 && (
              <div className="p-4 text-center text-[var(--muted)]">
                No commands found
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
