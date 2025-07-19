import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, JSX.Element>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}

    return (
      <footer class={`${displayClass ?? ""}`}>
        <ul class="social-icons">
          {Object.entries(links).map(([key, icon]) => (
            <li key={key}>
              <a href={key} target="_blank" rel="noopener noreferrer" aria-label={key}>
                {icon}
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
