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
          background: "#f8f9fa",       // Seasalt
          secondaryBackground: "#e9ecef", // Anti-flash white
          text: "#212529",             // Eerie Black
          gray: "#adb5bd",             // French Gray 2
          highlight: "rgba(161, 135, 184, 0.08)", // African Violet soft
          link: "#A187B8",             // African Violet
        },
        darkMode: {
          background: "#212529",       // Eerie Black
          secondaryBackground: "#343a40", // Onyx
          text: "#f8f9fa",             // Seasalt
          gray: "#6c757d",             // Slate Gray
          highlight: "rgba(161, 135, 184, 0.06)",
          link: "#A187B8",
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
