import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

const icons = {
  LinkedIn: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V8H0v16zm7.5-8.5c0-4.41 3.59-8 8-8s8 3.59 8 8v8.5h-5v-7c0-1.38-1.12-2.5-2.5-2.5S13.5 15.62 13.5 17v7H8v-8.5z"/>
    </svg>
  ),
  Facebook: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.5 9.87v-7h-2v-3h2v-2c0-2 1.19-3 3-3h2v3h-1c-.6 0-1 .4-1 1v1h3l-1 3h-2v7A10 10 0 0 0 22 12z"/>
    </svg>
  ),
  Instagram: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm8 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
      <circle cx="11" cy="12" r="3"/>
    </svg>
  ),
  Discord: (
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 245 240" fill="currentColor">
    <path d="M104.4 104.6c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.3-5 10.2-11.1s-4.5-11.1-10.2-11.1zm36.2 0c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.3-5 10.2-11.1s-4.6-11.1-10.2-11.1z"/>
    <path d="M189.5 20h-134A20 20 0 0 0 35.3 39.7L32 186.2a20 20 0 0 0 20 20.5h117.7a20 20 0 0 0 20-20.5l-3.1-146.5A20 20 0 0 0 189.5 20zm-41.6 118.4s-3.9-4.7-7.1-9c14.1-4 19.4-12.7 19.4-12.7-4.4 3-8.6 5-12.4 6.4-5.4 2.3-10.6 3.8-15.7 4.7-10.5 2-20.1 1.5-28.5-0.1-6.2-1.1-11.5-2.7-16-4.7-0.7-0.3-1.3-0.5-1.9-0.8-0.1-0.1-0.2-0.1-0.3-0.2-0.1 0-0.2-0.1-0.3-0.2-2.7-1.4-4.2-2.3-4.2-2.3s5 8.2 18 12.6c-3.2 4.3-7.2 9.3-7.2 9.3-23.8-0.7-32.8-16.4-32.8-16.4 0-35.1 15.7-63.5 15.7-63.5 15.7-11.7 30.6-11.4 30.6-11.4l1.1 1.3c-19.7 5.7-28.8 14.3-28.8 14.3s2.4-1.3 6.5-3.1c11.8-5.3 21.1-6.7 24.9-7 0.6-0.1 1.1-0.2 1.7-0.2 6.3-0.9 13.1-1.1 20.2-0.1 8.6 1.3 17.8 4.8 27.2 11.7 0 0-8.7-8.1-26.9-13.8l1.5-1.7s14.8-0.3 30.5 11.4c0 0 15.6 28.4 15.6 63.5 0 0-9.1 15.8-32.9 16.4z"/>
  </svg>
  ),
  Mail: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
    </svg>
  ),
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
        <p>Follow us on:</p>
        <ul class="social-icons">
          {Object.entries(links).map(([text, link]) => (
            <li key={text}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text}
                title={text}
              >
                {icons[text] || text}
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
