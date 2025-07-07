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
    header: "Schibsted Grotesk",
    body: "Source Sans Pro",
    code: "IBM Plex Mono",
  },
  colors: {
    lightMode: {
      light: "#fefcfb",            // near white
      lightgray: "#f3f0ee",        // very light beige/gray
      gray: "#b8b5b0",             // warm gray
      darkgray: "#6d6a75",         // muted gray-lavender
      dark: "#3c3744",             // deep muted violet-brown
      secondary: "#88bdbc",        // soft pastel teal (logo-based)
      tertiary: "#e3c6b8",         // pale apricot/pink
      highlight: "rgba(136, 189, 188, 0.2)",  // light pastel teal
      textHighlight: "#fff3a088",  // warm yellow-orange translucent
    },
    darkMode: {
      light: "#2c2b30",            // dark charcoal
      lightgray: "#403f44",        // softer gray
      gray: "#8e8c94",             // dusty lavender gray
      darkgray: "#d5d1d8",         // soft off-white
      dark: "#f3f2f4",             // near-white
      secondary: "#aedbd8",        // lighter pastel teal
      tertiary: "#eacac0",         // soft pale coral
      highlight: "rgba(136, 189, 188, 0.2)",  // light pastel teal
      textHighlight: "#ffe49988",  // soft amber yellow
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
    ],
    filters: [Plugin.RemoveDrafts()],
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
