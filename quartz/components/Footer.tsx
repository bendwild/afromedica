import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

// Copy your icons.svg content here
const sprite = `
  <symbol id="linkedin" viewBox="0 0 24 24">...</symbol>
  <symbol id="facebook" viewBox="0 0 24 24">...</symbol>
  <symbol id="instagram" viewBox="0 0 24 24">...</symbol>
  <symbol id="discord" viewBox="0 0 24 24">...</symbol>
  <symbol id="mail" viewBox="0 0 24 24">...</symbol>
`

interface Options {
  links: Record<string, string> // key = URL, value = icon id
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}

    return (
      <footer class={`${displayClass ?? ""}`}>
        {/* Inject symbols once, hidden */}
        <svg style="display: none;" dangerouslySetInnerHTML={{ __html: sprite }} />

        <ul class="social-icons">
          {Object.entries(links).map(([url, iconId]) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={iconId}>
                <svg>
                  <use href={`#${iconId}`} />
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
