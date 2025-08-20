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
const SUPPORTED: SupportedLang[] = ["en", "nl"]

// ---- small helpers (SSR-safe) ----
const stripTrailingSlash = (p: string) => (p !== "/" ? p.replace(/\/+$/, "") : "/")

const joinPath = (segments: string[]) => {
  const p = "/" + segments.filter(Boolean).join("/")
  return stripTrailingSlash(p || "/")
}

const buildForLang = (lang: SupportedLang, rest: string[]) =>
  rest.length ? `/${lang}/${rest.join("/")}` : `/${lang}/`

const parseFromProps = (props: QuartzComponentProps) => {
  const anyProps = props as any
  const slugArr: string[] = Array.isArray(anyProps?.fileData?.slug) ? anyProps.fileData.slug : []
  const lang = (slugArr[0] && SUPPORTED.includes(slugArr[0] as SupportedLang))
    ? (slugArr[0] as SupportedLang)
    : "en"
  const rest = (slugArr[0] && SUPPORTED.includes(slugArr[0] as SupportedLang))
    ? slugArr.slice(1)
    : slugArr
  const pathNow = joinPath([lang, ...rest])
  return { lang, rest, pathNow }
}

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  const { lang: currentLang, rest: restSegments, pathNow } = parseFromProps(props)
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

  const isActive = (href: string) => {
    const a = stripTrailingSlash(href)
    const b = stripTrailingSlash(pathNow)
    return b === a || b.startsWith(a + "/")
  }

  const currentLangLabel = currentLang === "nl" ? "Nederlands" : "English"
  const currentLangFlag = currentLang === "nl" ? "🇳🇱" : "🇺🇸"

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href={buildForLang(currentLang, restSegments)}>
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
                    href={buildForLang("en", restSegments)}
                    className={currentLang === "en" ? "current-lang" : ""}
                  >
                    🇺🇸 English
                  </a>
                </li>
                <li>
                  <a
                    href={buildForLang("nl", restSegments)}
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
