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
    header: "Clash Display",
    body: "Inter",
    code: "JetBrains Mono",
    },
    colors: {
    lightMode: {
      light: "#FFF8EA",     // Background
      lightgray: "#9E7676", // UI elements
      gray: "#815B5B",      // Subtle elements
      darkgray: "#594545",  // Text and headers
      dark: "#594545",      // Strong accents
      secondary: "#815B5B", // Cards/hover bg
      tertiary: "#9E7676",  // Cards/hover border
      highlight: "rgba(129, 91, 91, 0.1)", // Light hover effect
      textHighlight: "#FFF8EA88", // Faint selection
    },
    darkMode: {
      light: "#594545",     // Background
      lightgray: "#815B5B", // UI elements
      gray: "#9E7676",      // Mid accents
      darkgray: "#FFF8EA",  // Text
      dark: "#FFF8EA",      // Strong text
      secondary: "#9E7676", // Cards
      tertiary: "#815B5B",  // Cards/hover
      highlight: "rgba(158, 118, 118, 0.1)", // Glow
      textHighlight: "#FFF8EA44", // Soft highlight
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
