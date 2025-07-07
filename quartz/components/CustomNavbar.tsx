import { QuartzComponent, QuartzComponentConstructor } from "../types"

const CustomNavbar: QuartzComponent = () => {
  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/index">
            <img
              src="https://raw.githubusercontent.com/bendwild/afro/v4/content/Extra/Images/afromedica%20(6).png"
              alt="AfroMedica Logo"
            />
          </a>
        </div>
        <ul className="nav-menu">
          <li><a href="/about" className="nav-link">About Us</a></li>
          <li><a href="/afrocademy" className="nav-link">Afrocademy</a></li>
          <li><a href="/projects" className="nav-link">Projects</a></li>
          <li><a href="/team" className="nav-link">Team</a></li>
          <li><a href="/contact" className="nav-link">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
