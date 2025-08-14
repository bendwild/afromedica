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
  const parts = path.split("/").filter(Boolean)
  const lang = (parts[0] && SUPPORTED.includes(parts[0] as SupportedLang)
    ? (parts[0] as SupportedLang)
    : "en")
  const rest = (parts[0] && SUPPORTED.includes(parts[0] as SupportedLang)) ? parts.slice(1) : parts
  return { lang, rest }
}

const fromPropsOrDefault = (props: QuartzComponentProps) => {
  // Use slug from props at build time (SSR), fallback to '/'.
  const anyProps = props as any
  const slugArr: string[] = anyProps?.fileData?.slug ?? []
  // slug likely includes language as first segment (en/nl/...)
  const lang = (slugArr[0] && SUPPORTED.includes(slugArr[0] as SupportedLang))
    ? (slugArr[0] as SupportedLang)
    : "en"
  const rest = (slugArr[0] && SUPPORTED.includes(slugArr[0] as SupportedLang)) ? slugArr.slice(1) : slugArr
  const path = "/" + [lang, ...rest].filter(Boolean).join("/")
  return { lang, rest, path: stripTrailingSlash(path || "/") }
}

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  // Initial state derived from SSR props (works in `quartz build`)
  const initial = fromPropsOrDefault(props)

  const [currentLang, setCurrentLang] = useState<SupportedLang>(initial.lang)
  const [restSegments, setRestSegments] = useState<string[]>(initial.rest)
  const [currentPath, setCurrentPath] = useState<string>(initial.path)

  // Keep state in sync on the client for SPA navigations
  useEffect(() => {
    const updateFromLocation = () => {
      if (typeof window === "undefined") return
      const path = stripTrailingSlash(window.location.pathname || "/")
      const { lang, rest } = parsePath(path)
      setCurrentLang(lang)
      setRestSegments(rest)
      setCurrentPath(path)
    }

    // initial client sync
    updateFromLocation()

    // Quartz SPA event (some builds dispatch 'nav' after internal routing)
    const onNav = () => setTimeout(updateFromLocation, 0)
    document.addEventListener("nav", onNav as EventListener)

    // Browser history changes
    window.addEventListener("popstate", updateFromLocation)
    window.addEventListener("hashchange", updateFromLocation)

    return () => {
      document.removeEventListener("nav", onNav as EventListener)
      window.removeEventListener("popstate", updateFromLocation)
      window.removeEventListener("hashchange", updateFromLocation)
    }
  }, [])

  const t = navTranslations[currentLang]
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

  // Language switch: keep same subpage, just swap the first segment
  const makeLangHref = (target: SupportedLang) =>
    restSegments.length ? `/${target}/${restSegments.join("/")}` : `/${target}/`

  const isActive = (href: string) => {
    const a = stripTrailingSlash(href)
    const b = stripTrailingSlash(currentPath)
    return b === a || b.startsWith(a + "/")
  }

  // Current language option label
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
              <a
                href={link.href}
                className={`nav-link${isActive(link.href) ? " active" : ""}`}
              >
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
                    className={currentLang === "en" ? "current-lang" : ""}
                  >
                    🇺🇸 English
                  </a>
                </li>
                <li>
                  <a
                    href={makeLangHref("nl")}
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
