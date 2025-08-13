import { useEffect, useState } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

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

const languageOptions = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
] as const

// Define the path mapping for language switching
const pathMappings = {
  // English to other languages
  "/en/About-us/about": { nl: "/nl/About-us/about", fr: "/fr/About-us/about" },
  "/en/Afromedica-Academy/Afromedica-Academy": { nl: "/nl/Afromedica-Academy/Afromedica-Academy", fr: "/fr/Afromedica-Academy/Afromedica-Academy" },
  "/en/Afromedica-Talks/Afromedica-Talks": { nl: "/nl/Afromedica-Talks/Afromedica-Talks", fr: "/fr/Afromedica-Talks/Afromedica-Talks" },
  "/en/Afromedica-Connects/Afromedica-Connects": { nl: "/nl/Afromedica-Connects/Afromedica-Connects", fr: "/fr/Afromedica-Connects/Afromedica-Connects" },
  "/en/Policy/policy": { nl: "/nl/Policy/policy", fr: "/fr/Policy/policy" },
  "/en/Team/team": { nl: "/nl/Team/team", fr: "/fr/Team/team" },
  "/en/Contact/contact": { nl: "/nl/Contact/contact", fr: "/fr/Contact/contact" },
  "/en/": { nl: "/nl/", fr: "/fr/" },
  
  // Dutch to other languages
  "/nl/About-us/about": { en: "/en/About-us/about", fr: "/fr/About-us/about" },
  "/nl/Afromedica-Academy/Afromedica-Academy": { en: "/en/Afromedica-Academy/Afromedica-Academy", fr: "/fr/Afromedica-Academy/Afromedica-Academy" },
  "/nl/Afromedica-Talks/Afromedica-Talks": { en: "/en/Afromedica-Talks/Afromedica-Talks", fr: "/fr/Afromedica-Talks/Afromedica-Talks" },
  "/nl/Afromedica-Connects/Afromedica-Connects": { en: "/en/Afromedica-Connects/Afromedica-Connects", fr: "/fr/Afromedica-Connects/Afromedica-Connects" },
  "/nl/Policy/policy": { en: "/en/Policy/policy", fr: "/fr/Policy/policy" },
  "/nl/Team/team": { en: "/en/Team/team", fr: "/fr/Team/team" },
  "/nl/Contact/contact": { en: "/en/Contact/contact", fr: "/fr/Contact/contact" },
  "/nl/": { en: "/en/", fr: "/fr/" },
  
  // French to other languages
  "/fr/About-us/about": { en: "/en/About-us/about", nl: "/nl/About-us/about" },
  "/fr/Afromedica-Academy/Afromedica-Academy": { en: "/en/Afromedica-Academy/Afromedica-Academy", nl: "/nl/Afromedica-Academy/Afromedica-Academy" },
  "/fr/Afromedica-Talks/Afromedica-Talks": { en: "/en/Afromedica-Talks/Afromedica-Talks", nl: "/nl/Afromedica-Talks/Afromedica-Talks" },
  "/fr/Afromedica-Connects/Afromedica-Connects": { en: "/en/Afromedica-Connects/Afromedica-Connects", nl: "/nl/Afromedica-Connects/Afromedica-Connects" },
  "/fr/Policy/policy": { en: "/en/Policy/policy", nl: "/nl/Policy/policy" },
  "/fr/Team/team": { en: "/en/Team/team", nl: "/nl/Team/team" },
  "/fr/Contact/contact": { en: "/en/Contact/contact", nl: "/nl/Contact/contact" },
  "/fr/": { en: "/en/", nl: "/nl/" },
} as const

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  // mark props as used to satisfy noUnusedParameters
  void props

  const [currentLang, setCurrentLang] = useState<SupportedLang>("en")
  const [currentPath, setCurrentPath] = useState("/")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const updateFromLocation = () => {
      const path = window.location.pathname
      console.log("Current path:", path) // Debug log
      setCurrentPath(path)
      
      // More robust language detection
      const langMatch = path.match(/^\/(en|fr|nl)(?:\/|$)/)
      const detectedLang = langMatch ? langMatch[1] as SupportedLang : "en"
      console.log("Detected language:", detectedLang) // Debug log
      setCurrentLang(detectedLang)
    }

    // Initial detection on mount
    updateFromLocation()

    // Update on SPA navigations (Quartz dispatches a custom 'nav' event)
    const onNav = () => {
      setTimeout(updateFromLocation, 10) // Small delay to ensure DOM is updated
    }
    document.addEventListener("nav", onNav as EventListener)

    // Also update on browser back/forward
    window.addEventListener("popstate", updateFromLocation)

    // Close dropdown when clicking outside
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.language-switcher')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener("nav", onNav as EventListener)
      window.removeEventListener("popstate", updateFromLocation)
      document.removeEventListener('click', closeDropdown)
    }
  }, [])

  const translations = navTranslations[currentLang]

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
  ] as const

  // Function to get the equivalent page in another language
  const getLanguageUrl = (targetLang: SupportedLang): string => {
    const normalizedPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath
    
    // Check if we have a direct mapping
    const mappings = pathMappings[normalizedPath as keyof typeof pathMappings]
    if (mappings && mappings[targetLang]) {
      return mappings[targetLang]
    }
    
    // Fallback: simple language prefix replacement
    const pathWithoutLang = normalizedPath.replace(/^\/(en|fr|nl)/, '') || '/'
    return `/${targetLang}${pathWithoutLang}`
  }

  const currentLangOption = languageOptions.find(opt => opt.code === currentLang)

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
              currentPath === link.href || 
              currentPath.startsWith(link.href + "/") ||
              (currentPath.endsWith('/') && currentPath.slice(0, -1) === link.href)
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
              <button 
                className="dropdown-toggle"
                onClick={(e) => {
                  e.stopPropagation()
                  setDropdownOpen(!dropdownOpen)
                }}
              >
                {currentLangOption?.flag} {currentLangOption?.name} ▼
              </button>
              <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}>
                {languageOptions.map(option => (
                  <li key={option.code}>
                    <a
                      href={getLanguageUrl(option.code)}
                      className={currentLang === option.code ? "current-lang" : ""}
                      onClick={() => setDropdownOpen(false)}
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
        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .dropdown-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          min-width: 150px;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-menu li {
          margin: 0;
        }

        .dropdown-menu a {
          display: block;
          padding: 0.5rem 1rem;
          color: #333;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .dropdown-menu a:hover {
          background-color: #f5f5f5;
        }

        .dropdown-menu a.current-lang {
          background-color: #e3f2fd;
          font-weight: bold;
        }
      `}</style>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
