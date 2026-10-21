import { test, expect } from "@playwright/test";
import { homepage } from "../pages/homepage";

let testedHomepage: homepage;
//Set up homepage before each test
test.beforeEach(async ({ page }) => {
  testedHomepage = new homepage(page);
  await testedHomepage.goToHomepage();
  await testedHomepage.skipTourButton.click();
});

test("Homepage should load and contain title", async () => {
  await testedHomepage.verifyHomepage();
});

test("Homepage should have 4 featured products", async () => {
  await testedHomepage.verifyFeaturedProducts();
});

test("Open Shop app and Open Clinic app buttons should exist on the page, be properly linked, and shop app button should route to the right page", async () => {
  await testedHomepage.verifyShopButton();
  await testedHomepage.verifyClinicButton();
});

test("Clicking Open the Shop App button should direct me to /products", async ({
  page,
}) => {
  await testedHomepage.clickShop();
  await expect(page).toHaveURL(/.*\/products/);
});

test("Clicking Open the Clinic App button should direct me to /clinic", async ({
  page,
}) => {
  await testedHomepage.clickClinic();
  await expect(page).toHaveURL(/.*\/clinic/);
});
