import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"

interface BacklinksOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: BacklinksOptions = {
  hideWhenEmpty: true,
}

export default ((opts?: Partial<BacklinksOptions>) => {
  const options: BacklinksOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const Backlinks: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug))
    if (options.hideWhenEmpty && backlinkFiles.length === 0) {
      return null
    }

    // Extract "/afromedica" from baseUrl like "https://bendwild.github.io/afromedica"
    const basePath = new URL(cfg.configuration?.baseUrl ?? "/", "https://dummy.com").pathname.replace(/\/$/, "")

    return (
      <div class={classNames(displayClass, "backlinks")}>
        <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
        <OverflowList>
          {backlinkFiles.length > 0 ? (
            backlinkFiles.map((f) => {
              const targetSlug = f.slug!.replace(/^\//, "") // remove leading slash if present
              const href = `${basePath}/${targetSlug}`
              return (
                <li>
                  <a href={href} class="internal">
                    {f.frontmatter?.title}
                  </a>
                </li>
              )
            })
          ) : (
            <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
          )}
        </OverflowList>
      </div>
    )
  }

  Backlinks.css = style
  Backlinks.afterDOMLoaded = overflowListAfterDOMLoaded

  return Backlinks
}) satisfies QuartzComponentConstructor
