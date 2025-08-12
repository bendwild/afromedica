import { useEffect, useState } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

// Navigation translations
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
  fr: {
    "About Us": "À Propos",
    "Afromedica Academy": "Académie Afromedica",
    "Afromedica Talks": "Conférences Afromedica",
    "Afromedica Connects": "Connexions Afromedica",
    "Policy": "Politique",
    "Team": "Équipe",
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
}

const languageOptions = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
]

const CustomNavbar: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const [currentLang, setCurrentLang] = useState("en")
  const [currentPath, setCurrentPath] = useState("/")

  useEffect(() => {
    const path = window.location.pathname
    setCurrentPath(path)

    // Detect language from first path segment, e.g. /en/..., /fr/..., /nl/...
    const langMatch = path.match(/^\/(en|fr|nl)(\/|$)/)
    setCurrentLang(langMatch ? langMatch[1] : "en")
  }, [])

  const translations = navTranslations[currentLang] || navTranslations.en

  // Build nav links with current language prefix
  const langPrefix = `/${currentLang}`
  const links = [
    { href: `${langPrefix}/About-us/about`, label: translations["About Us"] },
    { href: `${langPrefix}/Afromedica-Academy/Afromedica-Academy`, label: translations["Afromedica Academy"] },
    { href: `${langPrefix}/Afromedica-Talks/Afromedica-Talks`, label: translations["Afromedica Talks"] },
    { href: `${langPrefix}/Afromedica-Connects/Afromedica-Connects`, label: translations["Afromedica Connects"] },
    { href: `${langPrefix}/Policy/policy`, label: translations["Policy"] },
    { href: `${langPrefix}/Team/team`, label: translations["Team"] },
    { href: `${langPrefix}/Contact/contact`, label: translations["Contact"] },
  ]

  // Remove current language prefix from current path but keep the rest
  // e.g. /en/About-us/about → /About-us/about
  // so we can reuse for language switcher URLs
  const currentPagePath = currentPath.replace(/^\/(en|fr|nl)(\/|$)/, "/")

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
            const isActive =
              currentPath === link.href || currentPath.startsWith(link.href + "/")
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
                    <a
                      href={`/${option.code}${currentPagePath}`}
                      className={currentLang === option.code ? "current-lang" : ""}
                    >
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
