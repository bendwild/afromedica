// quartz/components/CustomNavbar.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const CustomNavbar: QuartzComponent = (props: QuartzComponentProps) => {
  const links = [
  { href: "/About-Us/about", label: "About Us" },
  { href: "/Afromedica-Academy/Afromedica-Academy", label: "Afromedica Academy" },
  { href: "/Afromedica-Talks/Afromedica-Talks", label: "Afromedica Talks" },
  { href: "/Afromedica-Connects/Afromedica-Connects", label: "Afromedica Connects" },
  { href: "/Policy/policy", label: "Policy" },
  { href: "/Team/team", label: "Team" },
  { href: "/Contact/contact", label: "Contact" },
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
