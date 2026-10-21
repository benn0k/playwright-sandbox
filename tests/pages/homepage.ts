import { expect, type Locator, type Page } from "@playwright/test";
export class homepage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productCard: Locator;
  readonly shopButton: Locator;
  readonly clinicButton: Locator;
  readonly skipTourButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId("hero").getByText("QATools");
    this.productCard = page.getByTestId(/^product-card-\d+$/);
    this.shopButton = page.getByTestId("cta-shop");
    this.clinicButton = page.getByTestId("cta-clinic");
    this.skipTourButton = page.getByTestId("tour-skip");
  }

  async goToHomepage() {
    await this.page.goto("https://playground.qatools.dev/");
  }
  async verifyHomepage() {
    await expect(this.pageTitle).toBeVisible();
  }

  async verifyFeaturedProducts() {
    await expect(this.productCard).toHaveCount(4);
  }

  async verifyShopButton() {
    await expect(this.shopButton).toBeVisible();
    await expect(this.shopButton).toHaveAttribute("href", "/products");
  }

  async verifyClinicButton() {
    await expect(this.clinicButton).toBeVisible();
    await expect(this.clinicButton).toHaveAttribute("href", "/clinic");
  }

  async clickShop() {
    this.shopButton.click();
  }

  async clickClinic() {
    this.clinicButton.click();
  }
}
