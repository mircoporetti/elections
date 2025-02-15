import { useEffect, useState } from "react";
import { SunIcon } from "@heroicons/react/16/solid";
import { MoonIcon } from "@heroicons/react/16/solid";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState<boolean | null>(null);

    useEffect(() => {
        const storedPreference = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        setDarkMode(storedPreference ? storedPreference === "dark" : prefersDark);
    }, []);

    useEffect(() => {
        if (darkMode === null) return;

        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    if (darkMode === null) return null;

    return (
        <label className="p-1 flex items-center space-x-2 cursor-pointer">
            {darkMode ? (
                <SunIcon className="w-3 h-3 text-yellow-500" />
            ) : (
                <MoonIcon className="w-3 h-3 text-gray-500 dark:text-gray-300" />
            )}

            <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="hidden"
            />
            <div className="w-8 h-4 flex items-center bg-gray-700 dark:bg-white rounded-full p-1 transition duration-300">
                <div
                    className={`w-3.5 h-2 bg-white dark:bg-black rounded-full shadow-md transform ${
                        darkMode ? "translate-x-3" : "translate-x-0"
                    } transition duration-300`}
                />
            </div>
        </label>
    );
}
