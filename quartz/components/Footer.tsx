import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string> // key = URL, value = icon id (e.g. "linkedin")
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}

    return (
      <footer class={`${displayClass ?? ""}`}>
        <ul class="social-icons">
          {Object.entries(links).map(([url, iconId]) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={iconId}>
                <svg>
                  <use href={`/icons.svg#${iconId}`} />
                </svg>
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
