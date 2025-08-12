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
    baseUrl: "https://afromedica.be",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      cdnCaching: true,
      fontOrigin: "googleFonts",
      typography: {
        header: "IBM Plex Serif",
        body: "IBM Plex Serif",
        code: "Fira Code",
    },
    colors: {
    lightMode: {
      light: "#fffcdb",        // warm background
      lightgray: "#d1c3f2",    // soft lavender
      gray: "#a389db",         // medium lavender
      darkgray: "#5e388e",     // deep purple
      dark: "#2d1f17",         // dark brown
      secondary: "#8effe1",    // aqua accent
      tertiary: "#378f8a",     // teal accent
      highlight: "rgba(142, 255, 225, 0.15)", // subtle aqua highlight
      textHighlight: "rgba(255, 205, 159, 0.28)", // warm peach highlight
    },
    darkMode: {
      light: "#2d1f17",        // deep brown background
      lightgray: "#5e388e",    // deep purple-gray
      gray: "#a389db",         // soft lavender
      darkgray: "#d1c3f2",     // light lavender
      dark: "#fffcdb",         // light warm cream
      secondary: "#f4ac6a",    // warm orange
      tertiary: "#cf772e",     // deep orange
      highlight: "rgba(244, 172, 106, 0.15)", // warm orange highlight
      textHighlight: "rgba(142, 255, 225, 0.28)", // aqua highlight
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
      Plugin.HardLineBreaks(),
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
