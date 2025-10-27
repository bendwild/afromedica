import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import CustomNavbar from "./quartz/components/CustomNavbar" // 👈 Import navbar

// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [CustomNavbar()],
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
    Component.RecentNotes(),
  ],
  right: [
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
    Component.Explorer(),
  ],
  right: [],
}
