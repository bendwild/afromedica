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
  // English to Dutch
  "/en/About-us/about": { nl: "/nl/About-us/about" },
  "/en/Afromedica-Academy/Afromedica-Academy": { nl: "/nl/Afromedica-Academy/Afromedica-Academy" },
  "/en/Afromedica-Talks/Afromedica-Talks": { nl: "/nl/Afromedica-Talks/Afromedica-Talks" },
  "/en/Afromedica-Connects/Afromedica-Connects": { nl: "/nl/Afromedica-Connects/Afromedica-Connects" },
  "/en/Policy/policy": { nl: "/nl/Policy/policy" },
  "/en/Team/team": { nl: "/nl/Team/team" },
  "/en/Contact/contact": { nl: "/nl/Contact/contact" },
  "/en/": { nl: "/nl/" },
  
  // Dutch to English
  "/nl/About-us/about": { en: "/en/About-us/about" },
  "/nl/Afromedica-Academy/Afromedica-Academy": { en: "/en/Afromedica-Academy/Afromedica-Academy" },
  "/nl/Afromedica-Talks/Afromedica-Talks": { en: "/en/Afromedica-Talks/Afromedica-Talks" },
  "/nl/Afromedica-Connects/Afromedica-Connects": { en: "/en/Afromedica-Connects/Afromedica-Connects" },
  "/nl/Policy/policy": { en: "/en/Policy/policy" },
  "/nl/Team/team": { en: "/en/Team/team" },
  "/nl/Contact/contact": { en: "/en/Contact/contact" },
  "/nl/": { en: "/en/" },
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
      const langMatch = path.match(/^\/(en|nl)(?:\/|$)/)
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
    const pathWithoutLang = normalizedPath.replace(/^\/(en|nl)/, '') || '/'
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


    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
