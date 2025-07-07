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
      light: "#fffdfc",             // off-white
      lightgray: "#f6f2ee",         // pale beige
      gray: "#bfb8b0",              // muted taupe gray
      darkgray: "#776b5d",          // earthy taupe
      dark: "#3a2c2d",              // deep brown-cherry
      secondary: "#9bc5aa",         // pastel sage green
      tertiary: "#f4c2a1",          // warm peachy coral
      highlight: "rgba(250, 190, 140, 0.2)", // light warm orange glow
      textHighlight: "#fef08a88",   // soft banana yellow translucent
    },
    darkMode: {
      light: "#2e2a28",             // charcoal brown
      lightgray: "#3c3937",         // dark muted gray-brown
      gray: "#8f867f",              // dusty rose-gray
      darkgray: "#e0dad4",          // light bone
      dark: "#fefdfc",              // near-white
      secondary: "#adcbb7",         // soft pastel green
      tertiary: "#f2b99d",          // mellow coral
      highlight: "rgba(250, 190, 140, 0.2)", // warm orange glow
      textHighlight: "#fde68a88",   // gentle amber
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
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
