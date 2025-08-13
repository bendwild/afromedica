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
  // English to Dutch (with and without trailing slashes)
  "/en/About-us/about": { nl: "/nl/About-us/about" },
  "/en/About-us/about/": { nl: "/nl/About-us/about/" },
  "/en/Afromedica-Academy/Afromedica-Academy": { nl: "/nl/Afromedica-Academy/Afromedica-Academy" },
  "/en/Afromedica-Academy/Afromedica-Academy/": { nl: "/nl/Afromedica-Academy/Afromedica-Academy/" },
  "/en/Afromedica-Talks/Afromedica-Talks": { nl: "/nl/Afromedica-Talks/Afromedica-Talks" },
  "/en/Afromedica-Talks/Afromedica-Talks/": { nl: "/nl/Afromedica-Talks/Afromedica-Talks/" },
  "/en/Afromedica-Connects/Afromedica-Connects": { nl: "/nl/Afromedica-Connects/Afromedica-Connects" },
  "/en/Afromedica-Connects/Afromedica-Connects/": { nl: "/nl/Afromedica-Connects/Afromedica-Connects/" },
  "/en/Policy/policy": { nl: "/nl/Policy/policy" },
  "/en/Policy/policy/": { nl: "/nl/Policy/policy/" },
  "/en/Team/team": { nl: "/nl/Team/team" },
  "/en/Team/team/": { nl: "/nl/Team/team/" },
  "/en/Contact/contact": { nl: "/nl/Contact/contact" },
  "/en/Contact/contact/": { nl: "/nl/Contact/contact/" },
  "/en/": { nl: "/nl/" },
  "/en": { nl: "/nl" },
  
  // Dutch to English (with and without trailing slashes)
  "/nl/About-us/about": { en: "/en/About-us/about" },
  "/nl/About-us/about/": { en: "/en/About-us/about/" },
  "/nl/Afromedica-Academy/Afromedica-Academy": { en: "/en/Afromedica-Academy/Afromedica-Academy" },
  "/nl/Afromedica-Academy/Afromedica-Academy/": { en: "/en/Afromedica-Academy/Afromedica-Academy/" },
  "/nl/Afromedica-Talks/Afromedica-Talks": { en: "/en/Afromedica-Talks/Afromedica-Talks" },
  "/nl/Afromedica-Talks/Afromedica-Talks/": { en: "/en/Afromedica-Talks/Afromedica-Talks/" },
  "/nl/Afromedica-Connects/Afromedica-Connects": { en: "/en/Afromedica-Connects/Afromedica-Connects" },
  "/nl/Afromedica-Connects/Afromedica-Connects/": { en: "/en/Afromedica-Connects/Afromedica-Connects/" },
  "/nl/Policy/policy": { en: "/en/Policy/policy" },
  "/nl/Policy/policy/": { en: "/en/Policy/policy/" },
  "/nl/Team/team": { en: "/en/Team/team" },
  "/nl/Team/team/": { en: "/en/Team/team/" },
  "/nl/Contact/contact": { en: "/en/Contact/contact" },
  "/nl/Contact/contact/": { en: "/en/Contact/contact/" },
  "/nl/": { en: "/en/" },
  "/nl": { en: "/en" },
} as const

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  // mark props as used to satisfy noUnusedParameters
  void props

  const [currentLang, setCurrentLang] = useState<SupportedLang>("en")
  const [currentPath, setCurrentPath] = useState("/")


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
    // Note: Using CSS hover instead of JS state management

    return () => {
      document.removeEventListener("nav", onNav as EventListener)
      window.removeEventListener("popstate", updateFromLocation)
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
    console.log("Getting language URL for:", targetLang)
    console.log("Current path:", currentPath)
    
    // Try exact match first
    let mappings = pathMappings[currentPath as keyof typeof pathMappings]
    console.log("Exact match mappings:", mappings)
    
    if (mappings && mappings[targetLang]) {
      console.log("Using exact match:", mappings[targetLang])
      return mappings[targetLang]
    }
    
    // Try normalized path (remove trailing slash)
    const normalizedPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath
    console.log("Normalized path:", normalizedPath)
    
    mappings = pathMappings[normalizedPath as keyof typeof pathMappings]
    console.log("Normalized match mappings:", mappings)
    
    if (mappings && mappings[targetLang]) {
      console.log("Using normalized match:", mappings[targetLang])
      return mappings[targetLang]
    }
    
    // Enhanced fallback: preserve the exact structure
    if (currentPath.startsWith('/en/')) {
      const pathWithoutLang = currentPath.substring(3) // Remove '/en'
      const newUrl = `/nl${pathWithoutLang}`
      console.log("Enhanced fallback for EN->NL:", newUrl)
      return newUrl
    }
    
    if (currentPath.startsWith('/nl/')) {
      const pathWithoutLang = currentPath.substring(3) // Remove '/nl'
      const newUrl = `/en${pathWithoutLang}`
      console.log("Enhanced fallback for NL->EN:", newUrl)
      return newUrl
    }
    
    // Last resort fallback
    const fallbackUrl = `/${targetLang}/`
    console.log("Last resort fallback:", fallbackUrl)
    return fallbackUrl
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
              <button className="dropdown-toggle">
                {currentLangOption?.flag} {currentLangOption?.name} ▼
              </button>
              <ul className="dropdown-menu">
                {languageOptions.map(option => (
                  <li key={option.code}>
                    <a
                      href={getLanguageUrl(option.code)}
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
