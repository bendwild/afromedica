import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

const ICONS: Record<string, string> = {
  LinkedIn: "linkedin",
  Facebook: "facebook",
  Instagram: "instagram",
  "Discord Community": "discord",
  Contact: "mail",
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>Follow us on social media / <a href={links["Contact"]}>Contact us</a></p>
        <ul>
          {Object.entries(links).map(([text, link]) => {
            const icon = ICONS[text] ?? "link"
            return (
              <li>
                <a href={link} target="_blank" rel="noopener noreferrer" aria-label={text}>
                  <svg class="icon" width="20" height="20">
                    <use href={`/static/icons.svg#${icon}`} />
                  </svg>
                </a>
              </li>
            )
          })}
        </ul>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
