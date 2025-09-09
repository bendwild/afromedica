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

// --- helpers (SSR-safe) ---
const stripTrailingSlash = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""))
const dropTrailingIndex = (segments: string[]) =>
  segments.length && segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments

/** Build "/en/Policy/policy" or "/en" if rest is empty */
const buildPath = (lang: SupportedLang, rest: string[]) =>
  rest.length ? `/${lang}/${rest.join("/")}` : `/${lang}`

/** Normalize for active check */
const normalized = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""))

/** Get { path, lang, rest } from Quartz props */
function deriveFromProps(props: QuartzComponentProps): {
  path: string
  lang: SupportedLang
  rest: string[]
} {
  const anyProps = props as any
  const permalink: string | undefined = anyProps?.fileData?.permalink
  const slugArr: string[] = Array.isArray(anyProps?.fileData?.slug) ? anyProps.fileData.slug : []

  // Prefer permalink (it reflects the emitted URL including /en or /nl)
  let path = "/"
  if (typeof permalink === "string" && permalink.length) {
    // Allow absolute URLs too (just take pathname)
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

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  const { path: currentPath, lang: currentLang, rest: restSegments } = deriveFromProps(props)
  const t = navTranslations[currentLang]

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

  // Language switch preserves the current subpage
  const makeLangHref = (target: SupportedLang) => buildPath(target, restSegments)

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
