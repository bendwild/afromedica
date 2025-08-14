import { useEffect, useState } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Navigation translations
const navTranslations = {
  en: { "About Us": "About Us", "Afromedica Academy": "Afromedica Academy", "Afromedica Talks": "Afromedica Talks", "Afromedica Connects": "Afromedica Connects", "Policy": "Policy", "Team": "Team", "Contact": "Contact" },
  nl: { "About Us": "Over Ons", "Afromedica Academy": "Afromedica Academie", "Afromedica Talks": "Afromedica Gesprekken", "Afromedica Connects": "Afromedica Verbindt", "Policy": "Beleid", "Team": "Team", "Contact": "Contact" },
} as const

type SupportedLang = keyof typeof navTranslations

const languageOptions = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
] as const

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  void props
  const [currentLang, setCurrentLang] = useState<SupportedLang>("en")
  const [currentPath, setCurrentPath] = useState("/")

  // SSR-safe: only access window inside useEffect
  useEffect(() => {
    const path = window.location.pathname
    setCurrentPath(path)

    const langMatch = path.match(/^\/(en|nl)(?:\/|$)/)
    setCurrentLang(langMatch ? (langMatch[1] as SupportedLang) : "en")
  }, [])

  const translations = navTranslations[currentLang]

  // Build nav links
  const langPrefix = `/${currentLang}`
  const links = [
    { href: `${langPrefix}/About-us/about`, label: translations["About Us"] },
    { href: `${langPrefix}/Afromedica-Academy/Afromedica-Academy`, label: translations["Afromedica Academy"] },
    { href: `${langPrefix}/Afromedica-Talks/Afromedica-Talks`, label: translations["Afromedica Talks"] },
    { href: `${langPrefix}/Afromedica-Connects/Afromedica-Connects`, label: translations["Afromedica Connects"] },
    { href: `${langPrefix}/Policy/policy`, label: translations["Policy"] },
    { href: `${langPrefix}/Team/team`, label: translations["Team"] },
    { href: `${langPrefix}/Contact/contact`, label: translations["Contact"] },
  ] as const

  // Build language switch URLs safely
  const getLanguageUrl = (targetLang: SupportedLang) => {
    const pathWithoutLang = currentPath.replace(/^\/(en|nl)/, "") || "/"
    return `/${targetLang}${pathWithoutLang}`
  }

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href={`${langPrefix}/`}>
            <img
              src="https://raw.githubusercontent.com/bendwild/afromedica/v4/content/Extra/Images/afromedica%20(6).png"
              alt="AfroMedica Logo"
            />
          </a>
        </div>

        <ul className="nav-menu">
          {links.map(link => {
            const isActive = currentPath === link.href || currentPath.startsWith(link.href + "/")
            return (
              <li key={link.href}>
                <a href={link.href} className={`nav-link${isActive ? " active" : ""}`}>
                  {link.label}
                </a>
              </li>
            )
          })}

          <li className="language-switcher">
            <div className="dropdown">
              <button className="dropdown-toggle">
                {languageOptions.find(opt => opt.code === currentLang)?.flag}{" "}
                {languageOptions.find(opt => opt.code === currentLang)?.name} ▼
              </button>
              <ul className="dropdown-menu">
                {languageOptions.map(option => (
                  <li key={option.code}>
                    <a href={getLanguageUrl(option.code)} className={currentLang === option.code ? "current-lang" : ""}>
                      {option.flag} {option.name}
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
