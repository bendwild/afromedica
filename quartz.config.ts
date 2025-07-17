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
          light: "#fdfaf6",           // broken pastel white
          lightgray: "#f4f4f5",       // subtle gray containers
          gray: "#d4d4d8",            // muted borders/text
          darkgray: "#52525b",        // subheadings
          dark: "#1a1a1a",            // main text
          secondary: "#b49a7a",       // muted clay accent
          tertiary: "#c9bdae",        // beige hover/focus
          highlight: "rgba(167, 109, 82, 0.06)", // soft clay bg
          textHighlight: "#f1e9e088", // paper yellow highlight
        },
        darkMode: {
          light: "#18181b",           // dark base background
          lightgray: "#232326",       // containers
          gray: "#4b4b50",            // dimmed text
          darkgray: "#d4d4d8",        // heading contrast
          dark: "#f4f4f5",            // text on dark
          secondary: "#d59b83",       // lighter clay
          tertiary: "#a78f85",        // hover/focus
          highlight: "rgba(213, 155, 131, 0.08)", // clay glow
          textHighlight: "#f4f1ec88", // soft paper highlight
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
