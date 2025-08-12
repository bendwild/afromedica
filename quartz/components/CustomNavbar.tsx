import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

// Define navigation translations for each language
const navTranslations = {
  "en": {
    "About Us": "About Us",
    "Afromedica Academy": "Afromedica Academy", 
    "Afromedica Talks": "Afromedica Talks",
    "Afromedica Connects": "Afromedica Connects",
    "Policy": "Policy",
    "Team": "Team",
    "Contact": "Contact"
  },
  "fr": {
    "About Us": "À Propos",
    "Afromedica Academy": "Académie Afromedica",
    "Afromedica Talks": "Conférences Afromedica", 
    "Afromedica Connects": "Connexions Afromedica",
    "Policy": "Politique",
    "Team": "Équipe",
    "Contact": "Contact"
  },
  "nl": {
    "About Us": "Over Ons",
    "Afromedica Academy": "Afromedica Academie",
    "Afromedica Talks": "Afromedica Gesprekken", 
    "Afromedica Connects": "Afromedica Verbindt",
    "Policy": "Beleid",
    "Team": "Team",
    "Contact": "Contact"
  }
}

const CustomNavbar: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : ""
  
  // Detect current language from URL path
  const detectLanguage = (): string => {
    if (currentPath.startsWith("/en/")) return "en"
    if (currentPath.startsWith("/fr/")) return "fr"
    if (currentPath.startsWith("/nl/")) return "nl"
    return "en" // default to English
  }

  const currentLang = detectLanguage()
  const translations = navTranslations[currentLang] || navTranslations["en"]
  
  // Define language-specific links
  const getLanguageLinks = (lang: string) => {
    const langPrefix = `/${lang}`
    return [
      { href: `${langPrefix}/About-us/about`, label: translations["About Us"] },
      { href: `${langPrefix}/Afromedica-Academy/Afromedica-Academy`, label: translations["Afromedica Academy"] },
      { href: `${langPrefix}/Afromedica-Talks/Afromedica-Talks`, label: translations["Afromedica Talks"] },
      { href: `${langPrefix}/Afromedica-Connects/Afromedica-Connects`, label: translations["Afromedica Connects"] },
      { href: `${langPrefix}/Policy/policy`, label: translations["Policy"] },
      { href: `${langPrefix}/Team/team`, label: translations["Team"] },
      { href: `${langPrefix}/Contact/contact`, label: translations["Contact"] },
    ]
  }

  const links = getLanguageLinks(currentLang)

  // Language switcher options
  const languageOptions = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" }
  ]

  // Get current page path without language prefix for switching
  const getCurrentPagePath = (): string => {
    const pathWithoutLang = currentPath.replace(/^\/(en|fr|nl)/, "")
    return pathWithoutLang || "/"
  }

  const currentPagePath = getCurrentPagePath()

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href={`/${currentLang}/`}>
            <img
              src="https://raw.githubusercontent.com/bendwild/afromedica/v4/content/Extra/Images/afromedica%20(6).png"
              alt="AfroMedica Logo"
            />
          </a>
        </div>
        
        <ul className="nav-menu">
          {links.map((link) => {
            const isActive =
              currentPath === link.href || currentPath.startsWith(link.href + "/")
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link${isActive ? " active" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          
          {/* Language Switcher Dropdown */}
          <li className="language-switcher">
            <div className="dropdown">
              <button className="dropdown-toggle">
                {languageOptions.find(opt => opt.code === currentLang)?.flag}{" "}
                {languageOptions.find(opt => opt.code === currentLang)?.name} ▼
              </button>
              <ul className="dropdown-menu">
                {languageOptions.map((option) => (
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
