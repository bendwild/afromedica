import { QuartzComponent, QuartzComponentConstructor } from "../types"

const CustomNavbar: QuartzComponent = () => {
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
          <li><a href="/About-us/about-us" className="nav-link">About Us</a></li>
          <li><a href="/Afromedica-Academy/Afromedica-Academy" className="nav-link">Afromedica Academy</a></li>
          <li><a href="/Afromedica-Talks/Afromedica-Talks" className="nav-link">Afromedica Talks</a></li>
          <li><a href="/Afromedica-Connects/Afromedica-Connects" className="nav-link">Afromedica Connects</a></li>
          <li><a href="/Policy/policy" className="nav-link">Policy</a></li>
          <li><a href="/Team/team" className="nav-link">Team</a></li>
          <li><a href="/Contact/contact" className="nav-link">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
