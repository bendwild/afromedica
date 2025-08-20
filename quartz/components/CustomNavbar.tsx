import { QuartzComponent } from "../types"

const CustomNavbar: QuartzComponent = () => {
  if (typeof window === "undefined") return null

  const path = window.location.pathname // e.g. /en/Policy/policy
  const segments = path.split("/").filter(Boolean) // ["en", "Policy", "policy"]

  // Supported languages
  const supportedLangs = ["en", "nl", "fr"]

  // Detect current language
  const currentLang = supportedLangs.includes(segments[0]) ? segments[0] : "en"

  // All other segments after language
  const restSegments = supportedLangs.includes(segments[0])
    ? segments.slice(1)
    : segments

  // Helper to build language switch URLs
  const makeLangHref = (lang: string) => {
    return "/" + [lang, ...restSegments].join("/")
  }

  const links = [
    { href: `/${currentLang}/About-us/about`, label: "About Us" },
    { href: `/${currentLang}/Policy/policy`, label: "Policy" },
    { href: `/${currentLang}/Projects/projects`, label: "Projects" },
  ]

  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-white">
      {/* Left side links */}
      <div className="flex space-x-6">
        {links.map((link) => {
          const isActive = path.startsWith(link.href)
          return (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-accent ${
                isActive ? "text-accent font-semibold" : "text-gray-700"
              }`}
            >
              {link.label}
            </a>
          )
        })}
      </div>

      {/* Language Switcher */}
      <div className="flex space-x-4">
        {supportedLangs.map((lang) => (
          <a
            key={lang}
            href={makeLangHref(lang)}
            className={`uppercase hover:text-accent ${
              lang === currentLang ? "text-accent font-bold" : "text-gray-600"
            }`}
          >
            {lang}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default CustomNavbar
