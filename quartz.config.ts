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
        headerFont: {
          name: "Clash Display",
          provider: "google",
        },
        bodyFont: {
          name: "Inter",
          provider: "google",
        },
        codeFont: {
          name: "JetBrains Mono",
          provider: "google",
        },
      },
      colors: {
        lightMode: {
          light: "#f8f9fa",               // Seasalt
          lightgray: "#e9ecef",           // Anti-flash white
          gray: "#adb5bd",                // French gray
          darkgray: "#495057",            // Outer space
          dark: "#212529",                // Eerie black
          secondary: "#A187B8",           // African Violet (accent)
          tertiary: "#dee2e6",            // Platinum
          highlight: "rgba(161, 135, 184, 0.08)",
          textHighlight: "#a187b855",
        },
        darkMode: {
          light: "#212529",               // Eerie black
          lightgray: "#343a40",           // Onyx
          gray: "#6c757d",                // Slate gray
          darkgray: "#ced4da",            // French gray
          dark: "#f8f9fa",                // Seasalt
          secondary: "#A187B8",           // African Violet (accent)
          tertiary: "#495057",            // Outer space
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
