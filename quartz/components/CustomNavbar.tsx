// quartz/components/CustomNavbar.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  const links = [
    { href: "/about", label: "About Us" },
    { href: "/afromedica-academy", label: "Afromedica Academy" },
    { href: "/afromedica-talks", label: "Afromedica Talks" },
    { href: "/afromedica-connects", label: "Afromedica Connects" },
    { href: "/policy", label: "Policy" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ] as const

  const currentPath = (props as any)?.fileData?.permalink || "/"
  const normalized = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""))
  const isActive = (href: string) => normalized(currentPath) === normalized(href)

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/">
            <img
              src="https://raw.githubusercontent.com/bendwild/afromedica/v4/content/Extra/Images/afromedica%20(6).png"
              alt="AfroMedica Logo"
            />
          </a>
        </div>

        <ul className="nav-menu">
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} className={`nav-link${isActive(link.href) ? " active" : ""}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
