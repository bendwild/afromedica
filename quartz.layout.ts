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
    // 👇 New “Popular Topics” section
    Component.HTML({
      html: `
        <div class="card">
          <h3>Popular Topics</h3>
          <div class="tags-group">
            <a href="/tags/health-equity" class="tag">#Health Equity</a>
            <a href="/tags/global-health" class="tag">#Global Health</a>
            <a href="/tags/culturally-sensitive-healthcare" class="tag">#Culturally Sensitive Care</a>
            <a href="/tags/racism-and-health" class="tag">#Racism & Health</a>
            <a href="/tags/education" class="tag">#Education</a>
            <a href="/tags/policy" class="tag">#Policy</a>
            <a href="/tags/inclusion" class="tag">#Inclusion</a>
          </div>
        </div>
      `,
    }),
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
