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
          light: "#FFFFFF",           // White background
          lightgray: "#F5F5F4",       // Warm light gray
          gray: "#D6D3D1",            // Neutral stone gray
          darkgray: "#4B4B4B",        // Dark muted gray
          dark: "#1C3A3E",            // Deep AfroMedica teal
          secondary: "#F8B133",       // Gold accent
          tertiary: "#DDAF94",        // Clay pink
          highlight: "rgba(248, 177, 51, 0.1)",   // Gold-tinted callout bg
          textHighlight: "#fff3b088", // Banana yellow translucent
        },
        darkMode: {
          light: "#1F1F1F",           // Dark base
          lightgray: "#2A2A2A",       // Subtle container contrast
          gray: "#5A5A5A",            // Medium gray
          darkgray: "#D4D4D8",        // Pale gray text
          dark: "#F8F8F8",            // Lightest text
          secondary: "#F8B133",       // Gold accent
          tertiary: "#DDAF94",        // Clay pink
          highlight: "rgba(248, 177, 51, 0.1)",   // Warm glow
          textHighlight: "#fde68a88", // Gentle amber
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
