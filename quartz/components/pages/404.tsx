import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // Use cfg.baseUrl instead of hardcoding
  const homepage = `${cfg.baseUrl}/${cfg.locale}/index`

  return (
    <article className="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={homepage}>{i18n(cfg.locale).pages.error.home}</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
