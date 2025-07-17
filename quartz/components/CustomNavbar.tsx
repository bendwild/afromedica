import { QuartzComponent, QuartzComponentConstructor } from "../types"

const CustomNavbar: QuartzComponent = () => {
  const BASE_PATH = "/afromedica"

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href={`${BASE_PATH}/index`}>
            <img
              src="https://raw.githubusercontent.com/bendwild/afromedica/v4/content/Extra/Images/afromedica%20(6).png"
              alt="AfroMedica Logo"
            />
          </a>
        </div>
        <ul className="nav-menu">
          <li><a href={`${BASE_PATH}/About-us/about`} className="nav-link">About Us</a></li>
          <li><a href={`${BASE_PATH}/Afromedica-Academy/academy`} className="nav-link">AfroAcademy</a></li>
          <li><a href={`${BASE_PATH}/Afromedica-Talks/talks`} className="nav-link">Afromedica Talks</a></li>
          <li><a href={`${BASE_PATH}/Afromedica-Connects/connect`} className="nav-link">Afromedica Connects</a></li>
          <li><a href={`${BASE_PATH}/Policy/policy`} className="nav-link">Policy</a></li>
          <li><a href={`${BASE_PATH}/Team/team`} className="nav-link">Team</a></li>
          <li><a href={`${BASE_PATH}/Contact/contact`} className="nav-link">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
