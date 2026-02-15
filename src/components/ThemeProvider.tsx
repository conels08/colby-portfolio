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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedMode = localStorage.getItem("mode");

    setTimeout(() => {
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }

      if (storedMode === "default" || storedMode === "hud") {
        setMode(storedMode);
      }
    }, 0);
  }, []);

  useEffect(() => {
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
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
  }, [theme, mode]);

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
