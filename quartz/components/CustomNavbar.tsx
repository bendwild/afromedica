// quartz/components/CustomNavbar.tsx
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
const SUPPORTED: ReadonlyArray<SupportedLang> = ["en", "nl"] as const

/** Remove a trailing "index" segment if present */
function dropTrailingIndex(segments: string[]): string[] {
  if (!segments || segments.length === 0) return []
  return segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments
}

/** Build a path like "/en/Policy/policy" or "/en" if no rest */
function buildPath(lang: SupportedLang, rest: string[]): string {
  const r = rest.filter(Boolean)
  return r.length ? `/${lang}/${r.join("/")}` : `/${lang}`
}

/** Active check with simple normalization (strip trailing slashes) */
function normalized(p: string): string {
  if (p === "/") return "/"
  return p.replace(/\/+$/, "")
}

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  // Read slug segments from Quartz props (SSR-safe)
  const anyProps = props as any
  const rawSlug: string[] = Array.isArray(anyProps?.fileData?.slug) ? anyProps.fileData.slug : []
  const slug = dropTrailingIndex(rawSlug).filter(Boolean)

  // Determine language + rest from slug (default to "en")
  const first = slug[0]
  const currentLang: SupportedLang = SUPPORTED.includes(first as SupportedLang)
    ? (first as SupportedLang)
    : "en"
  const restSegments: string[] = SUPPORTED.includes(first as SupportedLang) ? slug.slice(1) : slug

  // Current path for "active" state
  const currentPath = buildPath(currentLang, restSegments)

  // Translations for current language
  const t = navTranslations[currentLang]

  // Helper to make language switch URL for the SAME subpage
  const makeLangHref = (target: SupportedLang) => buildPath(target, restSegments)

  // Build navbar links for the current language
  const links = [
    { href: buildPath(currentLang, ["About-us", "about"]), label: t["About Us"] },
    { href: buildPath(currentLang, ["Afromedica-Academy", "Afromedica-Academy"]), label: t["Afromedica Academy"] },
    { href: buildPath(currentLang, ["Afromedica-Talks", "Afromedica-Talks"]), label: t["Afromedica Talks"] },
    { href: buildPath(currentLang, ["Afromedica-Connects", "Afromedica-Connects"]), label: t["Afromedica Connects"] },
    { href: buildPath(currentLang, ["Policy", "policy"]), label: t["Policy"] },
    { href: buildPath(currentLang, ["Team", "team"]), label: t["Team"] },
    { href: buildPath(currentLang, ["Contact", "contact"]), label: t["Contact"] },
  ] as const

  const isActive = (href: string) => {
    const a = normalized(href)
    const b = normalized(currentPath)
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
