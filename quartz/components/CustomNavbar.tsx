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
          <li><a href={`${BASE_PATH}/About`} className="nav-link">About Us</a></li>
          <li><a href={`${BASE_PATH}/Afrocademy`} className="nav-link">Afrocademy</a></li>
          <li><a href={`${BASE_PATH}/Projects`} className="nav-link">Projects</a></li>
          <li><a href={`${BASE_PATH}/Team`} className="nav-link">Team</a></li>
          <li><a href={`${BASE_PATH}/Contact`} className="nav-link">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => CustomNavbar) satisfies QuartzComponentConstructor
