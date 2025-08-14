import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const homepage = `/${cfg.locale}/` // sends user to the localized home
  const t = i18n(cfg.locale)

  return (
    <article className="popover-hint">
      <h1>404</h1>
      <p>{String(t.pages?.error?.notFound ?? "Page not found")}</p>
      <a href={homepage}>{String(t.pages?.error?.home ?? "Go home")}</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
