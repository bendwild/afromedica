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
  Mail: "mail",
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>Follow us on social media</p>
        <ul>
          {Object.entries(links).map(([label, url]) => {
            const iconId = ICONS[label] ?? "link"
            return (
              <li>
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <svg class="icon" width="20" height="20">
                    <use href={`/static/icons.svg#${iconId}`} />
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
