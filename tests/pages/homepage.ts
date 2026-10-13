import { expect, type Locator, type Page } from "@playwright/test";
export class homepage {
  readonly page: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId("hero").getByText("QATools");
  }

  async goToHomepage() {
    await this.page.goto("https://playground.qatools.dev/");
  }
  async verifyHomepage() {
    await expect(this.pageTitle).toBeVisible();
  }
}
