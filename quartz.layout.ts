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
    "https://www.linkedin.com/company/afromedica/?viewAsMember=true": "linkedin",
    "https://www.facebook.com/AfroMedica": "facebook",
    "https://www.instagram.com/_afromedica_/?hl=nl": "instagram",
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
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes(),
  ],
  right: [
    Component.Graph({
      localGraph: {
        showTags: false,
        drag: true, 
        zoom: true,
       },
      globalGraph: {
        repelForce: 0.5,
        showTags: true,
        drag: true, 
        zoom: true,
        enableRadial: true,
           },
    }),
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
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
