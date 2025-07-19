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
      light: "#fcfcfc",        // ultra-light background
      lightgray: "#f5f5f5",    // panel cards
      gray: "#dedede",         // borders/shadows
      darkgray: "#333333",     // main text
      dark: "#111111",         // headings, nav
      secondary: "#A187B8",    // your accent color
      tertiary: "#e8e8e8",     // subtle lines
      accent: "#A187B8",
      highlight: "rgba(161, 135, 184, 0.1)",
      textHighlight: "#A187B855",
    },
    darkMode: {
      light: "#1a1a1a",        // dark background
      lightgray: "#2a2a2a",    // panel cards
      gray: "#444444",         // borders
      darkgray: "#dddddd",     // body text
      dark: "#ffffff",         // headings
      secondary: "#A187B8",    // accent remains
      tertiary: "#3c3c3c",     // separator lines
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
