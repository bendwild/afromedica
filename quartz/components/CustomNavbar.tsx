// quartz/components/CustomNavbar.tsx
import { useEffect, useState } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Translations
const navTranslations = {
  en: {
    "About Us": "About Us",
    "Afromedica Academy": "Afromedica Academy",
    "Afromedica Talks": "Afromedica Talks",
    "Afromedica Connects": "Afromedica Connects",
    "Policy": "Policy",
    "Team": "Team",
    "Contact": "Contact",
  },
  nl: {
    "About Us": "Over Ons",
    "Afromedica Academy": "Afromedica Academie",
    "Afromedica Talks": "Afromedica Gesprekken",
    "Afromedica Connects": "Afromedica Verbindt",
    "Policy": "Beleid",
    "Team": "Team",
    "Contact": "Contact",
  },
} as const

type SupportedLang = keyof typeof navTranslations
const SUPPORTED: SupportedLang[] = ["en", "nl"]

// --- helpers (SSR-safe) ---
const stripTrailingSlash = (p: string) => (p !== "/" ? p.replace(/\/+$/, "") : "/")

const parsePath = (path: string) => {
  const parts = (path || "").split("/").filter(Boolean)
  const lang = SUPPORTED.includes(parts[0] as SupportedLang) ? (parts[0] as SupportedLang) : "en"
  const rest = SUPPORTED.includes(parts[0] as SupportedLang) ? parts.slice(1) : parts
  return { lang, rest }
}

// Get a reasonable initial path from SSR props; fall back to "/"
const initialFromProps = (props: QuartzComponentProps) => {
  const anyProps = props as any
  const slugArr: string[] = Array.isArray(anyProps?.fileData?.slug) ? anyProps.fileData.slug : []
  const inferred = "/" + slugArr.filter(Boolean).join("/")
  const path = stripTrailingSlash(inferred || "/")
  const { lang } = parsePath(path)
  return { path, lang }
}

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  const init = initialFromProps(props)

  // Single source of truth for where we are
  const [currentPath, setCurrentPath] = useState<string>(init.path)
  const { lang: derivedLang, rest: restSegments } = parsePath(currentPath)
  const currentLang: SupportedLang = derivedLang
  const t = navTranslations[currentLang]

  // Keep currentPath in sync with SPA navigations
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateFromLocation = () => {
      const path = stripTrailingSlash(window.location.pathname || "/")
      setCurrentPath(path)
    }

    // Run now
    updateFromLocation()

    // Patch history to detect SPA route changes
    const origPush = history.pushState
    const origReplace = history.replaceState
    ;(history.pushState as any) = function (...args: any[]) {
      const ret = origPush.apply(this, args as any)
      window.dispatchEvent(new Event("locationchange"))
      return ret
    }
    ;(history.replaceState as any) = function (...args: any[]) {
      const ret = origReplace.apply(this, args as any)
      window.dispatchEvent(new Event("locationchange"))
      return ret
    }

    // Listen to all ways URL can change
    const onLoc = () => updateFromLocation()
    window.addEventListener("locationchange", onLoc)
    window.addEventListener("popstate", onLoc)
    window.addEventListener("hashchange", onLoc)

    return () => {
      window.removeEventListener("locationchange", onLoc)
      window.removeEventListener("popstate", onLoc)
      window.removeEventListener("hashchange", onLoc)
      history.pushState = origPush
      history.replaceState = origReplace
    }
  }, [])

  const langPrefix = `/${currentLang}`

  // Build navbar links for the current language
  const links = [
    { href: `${langPrefix}/About-us/about`, label: t["About Us"] },
    { href: `${langPrefix}/Afromedica-Academy/Afromedica-Academy`, label: t["Afromedica Academy"] },
    { href: `${langPrefix}/Afromedica-Talks/Afromedica-Talks`, label: t["Afromedica Talks"] },
    { href: `${langPrefix}/Afromedica-Connects/Afromedica-Connects`, label: t["Afromedica Connects"] },
    { href: `${langPrefix}/Policy/policy`, label: t["Policy"] },
    { href: `${langPrefix}/Team/team`, label: t["Team"] },
    { href: `${langPrefix}/Contact/contact`, label: t["Contact"] },
  ] as const

  // Compute a target language URL for the *current* subpage
  const makeLangHref = (target: SupportedLang) =>
    restSegments.length ? `/${target}/${restSegments.join("/")}` : `/${target}/`

  // Force a full navigation on language switch so the UI updates immediately
  const handleLangClick = (target: SupportedLang) => (e: Event) => {
    e.preventDefault()
    if (typeof window === "undefined") return
    const { rest } = parsePath(window.location.pathname || "/")
    const dest = rest.length ? `/${target}/${rest.join("/")}` : `/${target}/`
    window.location.assign(dest) // full reload; Quartz can't intercept this
  }

  const isActive = (href: string) => {
    const a = stripTrailingSlash(href)
    const b = stripTrailingSlash(currentPath)
    return b === a || b.startsWith(a + "/")
  }

  const currentLangLabel = currentLang === "nl" ? "Nederlands" : "English"
  const currentLangFlag = currentLang === "nl" ? "🇳🇱" : "🇺🇸"

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href={makeLangHref(currentLang)}>
            <img
              src="https://raw.githubusercontent.com/bendwild/afromedica/v4/content/Extra/Images/afromedica%20(6).png"
              alt="AfroMedica Logo"
            />
          </a>
        </div>

        <ul className="nav-menu">
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} className={`nav-link${isActive(link.href) ? " active" : ""}`}>
                {link.label}
              </a>
            </li>
          ))}

          <li className="language-switcher">
            <div className="dropdown">
              <button className="dropdown-toggle" type="button" aria-haspopup="true" aria-expanded="false">
                {currentLangFlag} {currentLangLabel} ▼
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    href={makeLangHref("en")}
                    onClick={handleLangClick("en") as any}
                    className={currentLang === "en" ? "current-lang" : ""}
                  >
                    🇺🇸 English
                  </a>
                </li>
                <li>
                  <a
                    href={makeLangHref("nl")}
                    onClick={handleLangClick("nl") as any}
                    className={currentLang === "nl" ? "current-lang" : ""}
                  >
                    🇳🇱 Nederlands
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
