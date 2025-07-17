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
          <li><a href={`${BASE_PATH}/About/about`} className="nav-link">About Us</a></li>
          <li><a href={`${BASE_PATH}/Afromedica academy/afroacademy`} className="nav-link">AfroAcademy</a></li>
          <li><a href={`${BASE_PATH}/Afromedica talks`} className="nav-link">Afromedica Talks</a></li>
          <li><a href={`${BASE_PATH}/Afromedica connects`} className="nav-link">Afromedica Connects</a></li>
          <li><a href={`${BASE_PATH}/Policy`} className="nav-link">Policy</a></li>
          <li><a href={`${BASE_PATH}/About/team`} className="nav-link">Team</a></li>
          <li><a href={`${BASE_PATH}/contact`} className="nav-link">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
