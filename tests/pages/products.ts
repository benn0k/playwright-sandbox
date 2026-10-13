import { expect, type Locator, type Page } from "@playwright/test";
export class products {
  readonly page: Page;
  readonly filterBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterBar = page.getByTestId("filter-bar");
  }

  async goToProducts() {
    await this.page.goto("https://playground.qatools.dev/products");
  }
  async verifyProducts() {
    await expect(this.filterBar).toBeVisible();
  }
}
