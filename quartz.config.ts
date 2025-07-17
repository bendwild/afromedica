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
      typography: {
        bodyFont: "'Inter', sans-serif",
        headerFont: "'Clash Display', sans-serif",
      },
      colors: {
        lightMode: {
          light: "#f8f9fa",              // Background
          lightgray: "#e9ecef",          // Card background
          gray: "#adb5bd",               // Subtle text
          darkgray: "#495057",           // Secondary headings
          dark: "#212529",               // Main text
          secondary: "#A187B8",          // Accent
          tertiary: "#dee2e6",           // Borders
          highlight: "rgba(161, 135, 184, 0.08)",
          textHighlight: "#a187b855",
        },
        darkMode: {
          light: "#212529",              // Background
          lightgray: "#343a40",          // Card background
          gray: "#6c757d",               // Subtle text
          darkgray: "#ced4da",           // Secondary headings
          dark: "#f8f9fa",               // Main text
          secondary: "#A187B8",          // Accent
          tertiary: "#495057",           // Borders
          highlight: "rgba(161, 135, 184, 0.06)",
          textHighlight: "#f8f9fa55",
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
