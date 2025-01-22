import { Locator, Page } from "@playwright/test"
import { CategoryPage } from "./category-page"

export class WaitlistPage extends CategoryPage {
  pageTitle: Locator

  constructor(page: Page) {
    super(page)
    this.pageTitle = page.getByTestId("waitlist-page-title")
  }

  async goto() {
    await this.navMenu.open()
    await this.navMenu.storeLink.click()
    await this.pageTitle.waitFor({ state: "visible" })
    await this.productsListLoader.waitFor({ state: "hidden" })
  }
}