import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import CustomNavbar from "./quartz/components/CustomNavbar" // 👈 Import your navbar

// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [CustomNavbar()], // 👈 Add navbar here
  afterBody: [],
  footer: Component.Footer({
    links: {
    linkedin: {
      url: "https://www.linkedin.com/company/afromedica/?viewAsMember=true",
      label: "LinkedIn",
    },
    facebook: {
      url: "https://www.facebook.com/AfroMedica",
      label: "Facebook",
    },
    instagram: {
      url: "https://www.instagram.com/_afromedica_/?hl=nl",
      label: "Instagram",
    },
    discord: {
      url: "https://discord.gg/qUcCAHassB",
      label: "Discord",
    },
  },
}),
}

// Components for individual content pages (notes, pages)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// Components for list pages (tags, folders, etc.)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
