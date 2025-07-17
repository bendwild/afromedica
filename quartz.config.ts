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
          light: "#f8f9fa",      // seasalt
          lightgray: "#e9ecef",  // anti-flash-white
          gray: "#adb5bd",       // french-gray
          darkgray: "#495057",   // slate-gray
          dark: "#212529",       // eerie-black
          secondary: "#A187B8",  // african-violet
          tertiary: "#dee2e6",   // platinum
          highlight: "rgba(161, 135, 184, 0.08)",
          textHighlight: "#A187B855",
        },
        darkMode: {
          light: "#212529",      // eerie-black
          lightgray: "#343a40",  // onyx
          gray: "#6c757d",       // slate-gray
          darkgray: "#dee2e6",   // platinum
          dark: "#f8f9fa",       // seasalt
          secondary: "#A187B8",  // african-violet
          tertiary: "#adb5bd",   // french-gray-2
          highlight: "rgba(161, 135, 184, 0.06)",
          textHighlight: "#A187B855",
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
      Plugin.ObsidianFlavoredMarkdown({ 
        enableInHtmlEmbed: true, 
        enableCheckbox: true,
      }),
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
