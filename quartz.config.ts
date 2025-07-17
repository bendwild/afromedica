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
          light: "#fcfbf1",      // --color-base-00
          lightgray: "#f5f3e0",  // --color-base-05
          gray: "#e2e4cc",       // --color-base-20
          darkgray: "#989988",   // --color-base-30
          dark: "#46473f",       // --color-base-40
          secondary: "hsl(79, 25%, 67%)",    // --color-accent
          tertiary: "hsl(76, 25%, 57%)",     // --color-accent-1
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1c1a15",       // --color-base-00
          lightgray: "#352e23",   // --color-base-05
          gray: "#4b4638",        // --color-base-30
          darkgray: "#8e7d58",    // --color-base-60
          dark: "#d9cfb3",        // --color-base-100
          secondary: "hsl(79, 20%, 45%)",    // --color-accent
          tertiary: "hsl(79, 20%, 35%)",     // --color-accent-1
          highlight: "rgba(110, 140, 130, 0.15)",
          textHighlight: "#b7ad4e88",
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
