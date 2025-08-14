import { QuartzComponent, QuartzComponentConstructor } from "../types"

const CustomNavbar: QuartzComponent = () => {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname.replace(/\/$/, "") : ""

  const links = [
    { href: "/en/About-us/about", label: "About Us" },
    { href: "/en/Afromedica-Academy/Afromedica-Academy", label: "Afromedica Academy" },
    { href: "/en/Resources/resources", label: "Resources" },
    { href: "/en/Contact/contact", label: "Contact" },
  ]

  return (
    <nav className="custom-navbar">
      <ul>
        {links.map(({ href, label }) => {
          const isActive =
            currentPath === href ||
            currentPath.startsWith(href.replace("/en", "")) || // Matches /fr /nl equivalents
            currentPath.startsWith(href)

          return (
            <li key={href}>
              <a
                href={href}
                className={isActive ? "active" : ""}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
