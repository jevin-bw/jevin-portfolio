"use client";

import { usePathname } from "next/navigation";

const storageKey = "jw-theme";

export function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(storageKey, theme);
}

export function ThemeToggle() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle color theme">
      <span className="theme-sun" aria-hidden="true">
        ☀️
      </span>
      <span className="theme-moon" aria-hidden="true">
        🌙
      </span>
    </button>
  );
}
