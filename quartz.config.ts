import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
    fontOrigin: "googleFonts",
    cdnCaching: true,
    typography: {
    header: "Playfair Display",
    body: "Inter",
    code: "JetBrains Mono",
    },
    colors: {
    lightMode: {
      light: "#f2e9e4",     // Isabelline – background
      lightgray: "#c9ada7", // Pale Dogwood – cards/buttons
      gray: "#9a8c98",      // Rose Quartz – dividers/borders
      darkgray: "#4a4e69",  // Ultra Violet – subheadings
      dark: "#22223b",      // Space Cadet – headings
      secondary: "#423F3B", // Black Olive – button hover
      tertiary: "#D0D1CE",  // Timberwolf – soft hover border
      highlight: "rgba(154, 140, 152, 0.1)", // light glow
      textHighlight: "#22223b55", // subtle mark
    },
    darkMode: {
      light: "#22223b",     // Space Cadet – background
      lightgray: "#4a4e69", // Ultra Violet – card/button
      gray: "#9a8c98",      // Rose Quartz – dividers
      darkgray: "#f2e9e4",  // Isabelline – text
      dark: "#f2e9e4",      // Isabelline – headers
      secondary: "#c9ada7", // Pale Dogwood – accents
      tertiary: "#D0D1CE",  // Timberwolf – hover edges
      highlight: "rgba(242, 233, 228, 0.06)", // glow
      textHighlight: "#f2e9e455", // soft mark
        },
      },
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.ClickableImages(),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
