// quartz/components/CustomNavbar.tsx
import { useEffect, useState } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// --- Translations ---
const navTranslations = {
  en: {
    "About Us": "About Us",
    "Afromedica Academy": "Afromedica Academy",
    "Afromedica Talks": "Afromedica Talks",
    "Afromedica Connects": "Afromedica Connects",
    Policy: "Policy",
    Team: "Team",
    Contact: "Contact",
  },
  nl: {
    "About Us": "Over Ons",
    "Afromedica Academy": "Afromedica Academie",
    "Afromedica Talks": "Afromedica Gesprekken",
    "Afromedica Connects": "Afromedica Verbindt",
    Policy: "Beleid",
    Team: "Team",
    Contact: "Contact",
  },
} as const

type SupportedLang = keyof typeof navTranslations
const SUPPORTED: SupportedLang[] = ["en", "nl"]

// --- Helpers ---
const stripTrailingSlash = (p: string) => (p !== "/" ? p.replace(/\/+$/, "") : "/")

function parsePath(path: string) {
  const parts = (path || "").split("/").filter(Boolean)
  const lang = SUPPORTED.includes(parts[0] as SupportedLang) ? (parts[0] as SupportedLang) : "en"
  const rest = SUPPORTED.includes(parts[0] as SupportedLang) ? parts.slice(1) : parts
  return { lang, rest }
}

// Initial path from SSR build props
function initialFromProps(props: QuartzComponentProps) {
  const slugArr: string[] = Array.isArray((props as any)?.fileData?.slug)
    ? (props as any).fileData.slug
    : []
  const inferred = "/" + slugArr.filter(Boolean).join("/")
  const path = stripTrailingSlash(inferred || "/")
  const { lang } = parsePath(path)
  return { path, lang }
}

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  const init = initialFromProps(props)
  const [currentPath, setCurrentPath] = useState<string>(init.path)

  const { lang: currentLang, rest: restSegments } = parsePath(currentPath)
  const t = navTranslations[currentLang]

  // --- Sync with client navigation (SPA) ---
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateFromLocation = () => {
      const path = stripTrailingSlash(window.location.pathname || "/")
      setCurrentPath(path)
    }
    updateFromLocation()

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

    window.addEventListener("locationchange", updateFromLocation)
    window.addEventListener("popstate", updateFromLocation)
    return () => {
      window.removeEventListener("locationchange", updateFromLocation)
      window.removeEventListener("popstate", updateFromLocation)
      history.pushState = origPush
      history.replaceState = origReplace
    }
  }, [])

  // --- Nav links for current language ---
  const langPrefix = `/${currentLang}`
  const links = [
    { href: `${langPrefix}/About-us/about`, label: t["About Us"] },
    { href: `${langPrefix}/Afromedica-Academy/Afromedica-Academy`, label: t["Afromedica Academy"] },
    { href: `${langPrefix}/Afromedica-Talks/Afromedica-Talks`, label: t["Afromedica Talks"] },
    { href: `${langPrefix}/Afromedica-Connects/Afromedica-Connects`, label: t["Afromedica Connects"] },
    { href: `${langPrefix}/Policy/policy`, label: t["Policy"] },
    { href: `${langPrefix}/Team/team`, label: t["Team"] },
    { href: `${langPrefix}/Contact/contact`, label: t["Contact"] },
  ] as const

  // --- Language switch URLs ---
  const makeLangHref = (target: SupportedLang) =>
    restSegments.length ? `/${target}/${restSegments.join("/")}` : `/${target}/`

  const handleLangClick = (target: SupportedLang) => (e: Event) => {
    if (typeof window === "undefined") return
    e.preventDefault()
    const dest = makeLangHref(target)
    window.location.href = dest // full reload to guarantee correct content
  }

  // --- Active link detection ---
  const isActive = (href: string) => {
    const a = stripTrailingSlash(href)
    const b = stripTrailingSlash(currentPath)
    return b === a || b.startsWith(a + "/")
  }

  // --- UI labels ---
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
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={`nav-link${isActive(link.href) ? " active" : ""}`}>
                {link.label}
              </a>
            </li>
          ))}

          <li className="language-switcher">
            <div className="dropdown">
              <button className="dropdown-toggle" type="button">
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
