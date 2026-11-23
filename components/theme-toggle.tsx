"use client";

import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            type="button"
            aria-label="Toggle light and dark mode"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
            <BiMoon size={20} aria-hidden="true" className="dark:hidden" />

            <BiSun size={20} aria-hidden="true" className="hidden dark:block" />
        </button>
    );
}
