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
      header: "Merriweather",
      body: "Cabin",
      code: "IBM Plex Mono",
    },
    colors: {
    lightMode: {
      light: "#fafafa",         // page background
      lightgray: "#f0f0f3",     // card background
      gray: "#ced4da",          // subtle borders
      darkgray: "#4a4a4a",      // body text
      dark: "#1f1f1f",          // headings/nav
      secondary: "#6c63ff",     // optional highlight
      tertiary: "#e0e0e0",      // border accents
      accent: "#A187B8",        // signature purple
      highlight: "rgba(161, 135, 184, 0.08)",
      textHighlight: "#A187B855",
    },
    darkMode: {
      light: "#1f1f1f",         // background
      lightgray: "#2a2d31",     // card bg
      gray: "#495057",          // borders
      darkgray: "#dee2e6",      // text
      dark: "#fafafa",          // headings
      secondary: "#b197fc",     // soft violet
      tertiary: "#6c757d",      // muted elements
      accent: "#A187B8",
      highlight: "rgba(161, 135, 184, 0.06)",
      textHighlight: "#A187B855",
        },
      },
    },
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
      Plugin.ObsidianFlavoredMarkdown({ 
        enableInHtmlEmbed: true, 
        enableCheckbox: true,
      }),
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
