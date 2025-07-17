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
        header: "Playfair Display",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#f4f3ee",         // Isabelline – background
          lightgray: "#bcb8b1",     // Silver – cards/buttons background
          gray: "#8a817c",          // Battleship gray – borders, dividers
          darkgray: "#463f3a",      // Taupe – subheadings, secondary text
          dark: "#463f3a",          // Taupe – headings, main text
          secondary: "#e0afa0",     // Melon – buttons hover, highlights
          tertiary: "#dcd8d5",      // Taupe 900 (light) – subtle border, hover edges
          highlight: "rgba(224,175,160,0.1)", // Melon with transparency for glow
          textHighlight: "#463f3b55",           // Taupe transparent mark
        },
        darkMode: {
          light: "#463f3a",          // Taupe – background dark
          lightgray: "#6f645d",      // Taupe 600 – cards/buttons dark bg
          gray: "#978b82",           // Taupe 700 – borders/dividers dark
          darkgray: "#f4f3ee",       // Isabelline – text/light elements on dark
          dark: "#f4f3ee",           // Isabelline – headings
          secondary: "#e0afa0",      // Melon – accents on dark
          tertiary: "#b9b1ac",       // Taupe 800 – hover edges on dark
          highlight: "rgba(224,175,160,0.06)", // Melon subtle glow
          textHighlight: "#f4f3ee55",             // Isabelline transparent mark
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
