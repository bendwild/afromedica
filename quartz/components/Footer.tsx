import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
  contactEmail: string
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const contactEmail = opts?.contactEmail ?? "contact@yourdomain.com"

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.followUsOn ?? "Follow us on"}
          <div class="social-links-scroll" aria-label="Social media links">
            <ul>
              {Object.entries(links).map(([text, link]) => (
                <li key={text}>
                  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={text}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </p>
        <p>
          <a href={`mailto:${contactEmail}`} class="contact-link" aria-label="Contact us via email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style="vertical-align: middle; margin-right: 0.4rem;"
            >
              <path d="M4 4h16v16H4z" stroke="none" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Us
          </a>
        </p>
        <p class="created-with">
          {i18n(cfg.locale).components.footer.createdWith ?? "Created with"}{" "}
          <a href="https://quartz.jzhao.xyz/" target="_blank" rel="noopener noreferrer">
            Quartz v{version}
          </a>{" "}
          © {year}
        </p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
