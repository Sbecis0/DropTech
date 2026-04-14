"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Al montar verificamos el local storage o el sistema
    const stored = localStorage.getItem("app-theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("app-theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("app-theme", "light");
      setTheme("light");
    }
  };

  if (!theme) return <div className="w-8 h-8" />; // Placeholder para evitar saltos

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-500 dark:text-gray-400"
      aria-label="Alternar Modo Oscuro"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
