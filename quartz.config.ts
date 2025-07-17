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
          light: "#dbcdc6",       // Timberwolf
          lightgray: "#ead7d1",   // Champagne pink
          gray: "#dd99bb",        // Amaranth pink
          darkgray: "#7b506f",    // Chinese violet
          dark: "#1f1a38",        // Dark purple
          secondary: "#dd99bb",   // Accent pink
          tertiary: "#ead7d1",    // Hover neutral
          highlight: "rgba(221, 153, 187, 0.08)", // Amaranth pink glow
          textHighlight: "#f4e9f088",             // Light soft lavender
        },
        darkMode: {
          light: "#1f1a38",       // Dark purple
          lightgray: "#7b506f",   // Chinese violet
          gray: "#dd99bb",        // Amaranth pink
          darkgray: "#ead7d1",    // Champagne pink
          dark: "#dbcdc6",        // Timberwolf
          secondary: "#dd99bb",   // Accent
          tertiary: "#ead7d1",    // Hover/focus
          highlight: "rgba(221, 153, 187, 0.12)", // Subtle glow
          textHighlight: "#f8eaf188",             // Pale rose
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
