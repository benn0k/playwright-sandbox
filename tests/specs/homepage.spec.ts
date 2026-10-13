import { test, expect } from "@playwright/test";
import { homepage } from "../pages/homepage";

test("Homepage should load and contain title", async ({ page }) => {
  const testedHomepage = new homepage(page);
  await testedHomepage.goToHomepage();
  await testedHomepage.verifyHomepage();
});
