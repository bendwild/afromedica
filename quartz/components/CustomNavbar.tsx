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
  "ar": {
    "About Us": "من نحن",
    "Afromedica Academy": "أكاديمية أفروميديكا",
    "Afromedica Talks": "محاضرات أفروميديكا",
    "Afromedica Connects": "اتصالات أفروميديكا", 
    "Policy": "السياسة",
    "Team": "الفريق",
    "Contact": "اتصل بنا"
  },
  "pt": {
    "About Us": "Sobre Nós",
    "Afromedica Academy": "Academia Afromedica",
    "Afromedica Talks": "Palestras Afromedica",
    "Afromedica Connects": "Conexões Afromedica",
    "Policy": "Política", 
    "Team": "Equipe",
    "Contact": "Contato"
  }
}

const CustomNavbar: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : ""
  
  // Detect current language from URL path
  const detectLanguage = (): string => {
    if (currentPath.startsWith("/en/")) return "en"
    if (currentPath.startsWith("/fr/")) return "fr"
    if (currentPath.startsWith("/ar/")) return "ar"
    if (currentPath.startsWith("/pt/")) return "pt"
    return "en" // default to English
  }

  const currentLang = detectLanguage()
  const translations = navTranslations[currentLang] || navTranslations["en"]
  
  // Define language-specific links
  const getLanguageLinks = (lang: string) => {
    const langPrefix = lang === "en" ? "/en" : `/${lang}`
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
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "pt", name: "Português", flag: "🇧🇷" }
  ]

  // Get current page path without language prefix for switching
  const getCurrentPagePath = (): string => {
    const pathWithoutLang = currentPath.replace(/^\/(en|fr|ar|pt)/, "")
    return pathWithoutLang || "/"
  }

  const currentPagePath = getCurrentPagePath()

  return (
    <nav className="main-navigation" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <div className="nav-container">
        <div className="nav-logo">
          <a href={currentLang === "en" ? "/en/" : `/${currentLang}/`}>
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
                {languageOptions.find(opt => opt.code === currentLang)?.flag} {languageOptions.find(opt => opt.code === currentLang)?.name} ▼
              </button>
              <ul className="dropdown-menu">
                {languageOptions.map((option) => (
                  <li key={option.code}>
                    <a 
                      href={option.code === "en" ? `/en${currentPagePath}` : `/${option.code}${currentPagePath}`}
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
      
      <style jsx>{`
        .main-navigation {
          /* Your existing styles */
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }
        
        .nav-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
          gap: 1.5rem;
        }
        
        .nav-link {
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .nav-link:hover,
        .nav-link.active {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        /* Language Switcher Styles */
        .language-switcher {
          position: relative;
          margin-left: 1rem;
        }
        
        .dropdown {
          position: relative;
        }
        
        .dropdown-toggle {
          background: none;
          border: 1px solid #ccc;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        
        .dropdown-toggle:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .dropdown:hover .dropdown-menu {
          display: block;
        }
        
        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          min-width: 150px;
        }
        
        .dropdown-menu li {
          list-style: none;
        }
        
        .dropdown-menu a {
          display: block;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: inherit;
          white-space: nowrap;
        }
        
        .dropdown-menu a:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .dropdown-menu a.current-lang {
          background-color: rgba(0, 0, 0, 0.1);
          font-weight: bold;
        }
        
        /* RTL Support for Arabic */
        [dir="rtl"] .nav-menu {
          flex-direction: row-reverse;
        }
        
        [dir="rtl"] .language-switcher {
          margin-left: 0;
          margin-right: 1rem;
        }
        
        [dir="rtl"] .dropdown-menu {
          right: auto;
          left: 0;
        }
      `}</style>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
