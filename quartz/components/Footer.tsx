import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { FaLinkedin, FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa"

interface LinkItem {
  url: string
  label: string
}

interface Options {
  links: Record<string, LinkItem>
}

// Map keys to icon components here
const iconMap: Record<string, JSX.Element> = {
  linkedin: <FaLinkedin />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  discord: <FaDiscord />,
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([key, { url, label }]) => (
            <li key={key}>
              <a href={url} aria-label={label} target="_blank" rel="noopener noreferrer">
                {iconMap[key.toLowerCase()] || label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
