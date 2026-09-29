import { useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const handleToggle = (e) => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");

    const applyTheme = () => {
      root.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      flushSync(() => setIsDark(next));
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Fallback: simple fade
    if (!document.startViewTransition || reduceMotion) {
      root.classList.add("theme-fade");
      applyTheme();
      setTimeout(() => root.classList.remove("theme-fade"), 400);
      return;
    }

    // Circular reveal from the button
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.classList.add("theme-switching");
    const transition = document.startViewTransition(applyTheme);

    transition.ready.then(() => {
      root.animate(
  {
    clipPath: [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ],
  },
  {
    duration: 1300,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    pseudoElement: "::view-transition-new(root)",
  }
);
    });

    transition.finished.finally(() => {
      root.classList.remove("theme-switching");
    });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}