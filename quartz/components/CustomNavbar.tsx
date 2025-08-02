import { QuartzComponent, QuartzComponentConstructor } from "../types"

const CustomNavbar: QuartzComponent = () => {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : ""

  const links = [
    { href: "/About-us/about", label: "About Us" },
    { href: "/Afromedica-Academy/Afromedica-Academy", label: "Afromedica Academy" },
    { href: "/Afromedica-Talks/Afromedica-Talks", label: "Afromedica Talks" },
    { href: "/Afromedica-Connects/Afromedica-Connects", label: "Afromedica Connects" },
    { href: "/Policy/policy", label: "Policy" },
    { href: "/Team/team", label: "Team" },
    { href: "/Contact/contact", label: "Contact" },
  ]

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/index">
            <img
              src="https://raw.githubusercontent.com/bendwild/afromedica/v4/content/Extra/Images/afromedica%20(6).png"
              alt="AfroMedica Logo"
            />
          </a>
        </div>
        <ul className="nav-menu">
          {links.map((link) => {
            const isActive = currentPath === link.href
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
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
