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
    baseUrl: "https://afromedica.be",

    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      cdnCaching: true,
      fontOrigin: "googleFonts",
      typography: {
        header: "Montserrat",
        body: "Cabin",
        code: "Fira Code",
    },
      
colors: {
  lightMode: {
    light: "#fffaf0",        // softer warm cream for better readability
    lightgray: "#e0d7f8",    // softer lavender for borders
    gray: "#9a7fd1",         // medium lavender for graphs/links
    darkgray: "#4b2c7a",     // deep purple for body text
    dark: "#2b1b0f",         // dark brown for headers/icons
    secondary: "#009688",    // vibrant aqua for links / active nodes
    tertiary: "#00d1c1",     // teal for hover / visited states
    highlight: "rgba(0, 209, 193, 0.15)", // subtle aqua highlight
    textHighlight: "rgba(255, 223, 160, 0.3)", // warm peach highlight
  },
  darkMode: {
    light: "#2b1b0f",        // deep brown background
    lightgray: "#4b2c7a",    // deep purple-gray borders
    gray: "#9a7fd1",         // soft lavender for links / graphs
    darkgray: "#e0d7f8",     // light lavender for body text
    dark: "#fffaf0",         // cream for headers/icons
    secondary: "#ffb166",    // warm orange for active links / nodes
    tertiary: "#cf772e",     // deep orange for hover / visited states
    highlight: "rgba(255, 177, 102, 0.15)", // subtle warm highlight
    textHighlight: "rgba(0, 209, 193, 0.28)", // aqua highlight for markdown
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
      Plugin.HardLineBreaks(),
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
