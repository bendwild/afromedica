import { QuartzComponent } from "../types"
import React from "react"

const languages = ["en", "fr", "nl"]

// Safely get the current path
function getCurrentPath() {
  if (typeof window !== "undefined") {
    return window.location.pathname
  }
  return "/" // default for build time
}

// Create a new URL for switching languages
function getLanguageUrl(lang: string) {
  const currentPath = getCurrentPath()
  const pathParts = currentPath.split("/").filter(Boolean)

  // Replace first segment if it's a language code
  if (["en", "fr", "nl"].includes(pathParts[0])) {
    pathParts[0] = lang
  } else {
    pathParts.unshift(lang)
  }

  return "/" + pathParts.join("/")
}

const CustomNavbar: QuartzComponent = () => {
  const currentPath = getCurrentPath()
  const pathParts = currentPath.split("/").filter(Boolean)
  const currentLang = ["en", "fr", "nl"].includes(pathParts[0]) ? pathParts[0] : "en"

  const links = [
    { href: `/${currentLang}/about`, label: currentLang === "fr" ? "À propos" : currentLang === "nl" ? "Over ons" : "About Us" },
    { href: `/${currentLang}/academy`, label: currentLang === "fr" ? "Académie" : currentLang === "nl" ? "Academie" : "Academy" },
    { href: `/${currentLang}/resources`, label: currentLang === "fr" ? "Ressources" : currentLang === "nl" ? "Middelen" : "Resources" },
  ]

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
      {/* Left: Site Links */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {links.map((link) => {
          const isActive = currentPath === link.href || currentPath.startsWith(link.href + "/")
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                color: isActive ? "var(--accent)" : "inherit",
                borderBottom: isActive ? "2px solid var(--accent)" : "none",
                paddingBottom: "2px",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive ? "var(--accent)" : "inherit"
              }}
            >
              {link.label}
            </a>
          )
        })}
      </div>

      {/* Right: Language Switcher */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {languages.map((lang) => (
          <a
            key={lang}
            href={getLanguageUrl(lang)}
            style={{
              textDecoration: "none",
              fontWeight: lang === currentLang ? "bold" : "normal",
              color: lang === currentLang ? "var(--accent)" : "inherit",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = lang === currentLang ? "var(--accent)" : "inherit"
            }}
          >
            {lang.toUpperCase()}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default CustomNavbar
