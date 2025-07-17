import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // Build the full homepage URL from the baseUrl
  const homepage = cfg.baseUrl?.startsWith("http")
    ? cfg.baseUrl
    : `https://${cfg.baseUrl ?? "example.com"}`

  // Ensure it ends with a trailing slash
  const url = new URL(homepage)
  if (!url.pathname.endsWith("/")) {
    const lastSlashIndex = url.pathname.lastIndexOf("/")
    url.pathname = url.pathname.substring(0, lastSlashIndex + 1)
  }

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={url.toString()}>{i18n(cfg.locale).pages.error.home}</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
