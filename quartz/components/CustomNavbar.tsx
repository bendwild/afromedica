// quartz/components/CustomNavbar.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Translations for menu
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
const SUPPORTED: ReadonlyArray<SupportedLang> = ["en", "nl"] as const

const stripTrailingSlash = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""))
const dropTrailingIndex = (segments: string[]) =>
  segments.length && segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments

const buildPath = (lang: SupportedLang, rest: string[]) =>
  rest.length ? `/${lang}/${rest.join("/")}` : `/${lang}`

const normalized = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""))

function deriveFromProps(props: QuartzComponentProps) {
  const anyProps = props as any
  const permalink: string | undefined = anyProps?.fileData?.permalink
  const slugArr: string[] = Array.isArray(anyProps?.fileData?.slug) ? anyProps.fileData.slug : []

  let path = "/"
  if (typeof permalink === "string" && permalink.length) {
    try {
      const u = new URL(permalink, "https://dummy.local")
      path = u.pathname || "/"
    } catch {
      path = permalink.startsWith("/") ? permalink : `/${permalink}`
    }
  } else if (slugArr.length) {
    path = "/" + slugArr.filter(Boolean).join("/")
  }

  path = stripTrailingSlash(path || "/")
  const parts = path.split("/").filter(Boolean)
  const first = parts[0]

  const lang: SupportedLang = SUPPORTED.includes(first as SupportedLang)
    ? (first as SupportedLang)
    : "en"

  const rest = dropTrailingIndex(SUPPORTED.includes(first as SupportedLang) ? parts.slice(1) : parts)

  return { path, lang, rest }
}

// Language names and flags
const langLabels: Record<SupportedLang, string> = {
  en: "🇺🇸 English",
  nl: "🇳🇱 Nederlands",
}

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  const { path: currentPath, lang: currentLang, rest: restSegments } = deriveFromProps(props)
  const t = navTranslations[currentLang]

  const links = [
    { href: buildPath(currentLang, ["about"]), label: t["About Us"], slug: "about" },
    { href: buildPath(currentLang, ["afromedica-academy"]), label: t["Afromedica Academy"], slug: "afromedica-academy" },
    { href: buildPath(currentLang, ["afromedica-talks"]), label: t["Afromedica Talks"], slug: "afromedica-talks" },
    { href: buildPath(currentLang, ["afromedica-connects"]), label: t["Afromedica Connects"], slug: "afromedica-connects" },
    { href: buildPath(currentLang, ["policy"]), label: t["Policy"], slug: "policy" },
    { href: buildPath(currentLang, ["team"]), label: t["Team"], slug: "team" },
    { href: buildPath(currentLang, ["contact"]), label: t["Contact"], slug: "contact" },
  ] as const

  // Build href for switching language, with fallback to root
  const makeLangHref = (target: SupportedLang) => {
    if (restSegments.length === 0) return `/${target}`

    // Check if this slug is in the menu (means it's translated)
    const restSlug = restSegments[0].toLowerCase()
    const validSlugs = links.map(l => l.slug)
    if (validSlugs.includes(restSlug)) {
      return buildPath(target, restSegments)
    } else {
      return `/${target}`
    }
  }

  const isActive = (href: string) => normalized(currentPath) === normalized(href)

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
                {langLabels[currentLang]} ▼
              </button>
              <ul className="dropdown-menu">
                {SUPPORTED.map(lang => (
                  <li key={lang}>
                    <a
                      href={makeLangHref(lang)}
                      className={currentLang === lang ? "current-lang" : ""}
                    >
                      {langLabels[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
