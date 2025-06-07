import React from "react";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // Apply or remove the `dark` class on <html> tag
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(prev => !prev)}
            className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
            {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
        </button>
    );
};

export default ThemeToggle;
