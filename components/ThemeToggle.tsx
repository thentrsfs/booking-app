"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // 🧠 Load theme from localStorage or default to light
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const current = saved || "light"
    document.documentElement.setAttribute("data-theme", current)
    setTheme(current)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded transition-colors"
    >
      {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
    </button>
  )
}
