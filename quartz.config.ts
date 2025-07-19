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
      header: "IBM Plex Serif",      // similar to aarnphm
      body: "Inter",                 // clean and modern
      code: "Fira Code",
    },
    colors: {
    lightMode: {
      light: "#fafafa",            // near-white background
      lightgray: "#f0f0f0",        // soft cards
      gray: "#cccccc",             // border gray
      darkgray: "#333333",         // text
      dark: "#111111",             // strong black
      secondary: "#A187B8",        // your accent stays
      tertiary: "#e0e0e0",         // subtle lines
      accent: "#A187B8",
      highlight: "rgba(161, 135, 184, 0.1)",
      textHighlight: "#A187B855",
    },
    darkMode: {
      light: "#121212",            // main background
      lightgray: "#1f1f1f",        // card color
      gray: "#2e2e2e",
      darkgray: "#cccccc",
      dark: "#fafafa",
      secondary: "#A187B8",
      tertiary: "#3a3a3a",
      accent: "#A187B8",
      highlight: "rgba(161, 135, 184, 0.06)",
      textHighlight: "#A187B855",
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
