"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Mode = "default" | "hud";

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  toggleTheme: () => void;
  toggleMode: () => void;
  isHud: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mode, setMode] = useState<Mode>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const storedMode = localStorage.getItem("mode") as Mode | null;

    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (mode === "hud") {
      root.classList.add("hud-mode", "hud-scanlines", "hud-vignette");
      document.body.classList.add("hud-body");
    } else {
      root.classList.remove("hud-mode", "hud-scanlines", "hud-vignette");
      document.body.classList.remove("hud-body");
    }

    if (theme === "dark" && mode !== "hud") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
  }, [theme, mode, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "default" ? "hud" : "default"));
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, toggleMode, isHud: mode === "hud" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}