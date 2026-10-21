# POM Challenges — playground.qatools.dev

Target site: https://playground.qatools.dev/ (QATools Playground demo shop)

Suggested layout:

- `tests/pages/` — one POM per page (`homepage.ts`, `products.ts`, ...)
- `tests/components/` — reusable widgets shared across pages (NavbarComponent,
  PromoCarouselComponent, ProductCardComponent)
- `tests/specs/` — the actual test files
- `tests/utils/` — test data, helpers
- `tests/fixtures.ts` — `test.extend()` wiring POMs into tests

You already have a starting `homepage` POM (`pageTitle`, `productCard` via
`getByTestId(/^product-card-\d+$/)`) and two passing tests (title visible, 4
featured products). The challenges below build on that.

Useful `data-testid`s discovered on the homepage: `hero`, `cta-shop`,
`cta-clinic`, `categories`,
`category-{electronics,clothing,books,home,toys,sports}`, `featured`,
`product-card-{1-4}`, `wish-toggle-{1-4}`, `product-link-{1-4}`,
`star-rating-{1-4}`, `price-{1-4}`, `add-to-cart-{1-4}`,
`product-details-{1-4}`, `oos-badge`, `promo-carousel`,
`promo-prev`/`promo-next`, `promo-dot-{0-6}`, `nav-wishlist`, `nav-cart`.

## Easy

- [x] **1. Hero CTAs** — extend the POM to expose the "Open the Shop app" and
      "Open the Clinic app" buttons (`cta-shop`, `cta-clinic`). Assert their
      `href`s, then click one and assert the resulting URL (`/products` or
      `/clinic`).

- [ ] **2. Category tiles** — assert all six category tiles (Electronics,
      Clothing, Books, Home, Toys, Sports) are visible under `categories`, and
      that each links to `/products?category={Name}`. Parameterize over the six
      names instead of writing six near-identical asserts.

- [ ] **3. Product card fields** — extend the POM with `getPrice(productName)`,
      `getCategoryBadge(productName)` and `getRating(productName)` helpers
      scoped off `product-card-{n}`, and assert the known values for all four
      featured products (Wireless Headphones $79.99/Electronics/4.5, Smart Watch
      $149.00/Electronics/4.2, Cotton T-Shirt $19.99/Clothing/4.0, Running Shoes
      $89.50/Sports/4.6).

## Medium

- [ ] **4. Wishlist toggle** — clicking a card's heart icon (`wish-toggle-{n}`)
      flips `aria-pressed`, shows a toast ("Added "X" to wishlist"), and
      increments the `nav-wishlist` count; clicking again removes it and
      decrements. The toast auto-dismisses after a few seconds — assert it
      disappears by waiting for it to detach/hide, not with a fixed
      `waitForTimeout`.

- [ ] **5. Add to cart, including the out-of-stock case** — adding an in-stock
      item increments the `nav-cart` badge and shows a toast. Running Shoes
      (`product-card-4`) is out of stock: its `add-to-cart-4` button is
      `disabled` and an `oos-badge` ("Out of stock") is shown — assert the
      disabled state explicitly rather than skipping the card, and confirm the
      cart count does _not_ change for it.

- [ ] **6. Star ratings from the accessible name, not pixel-counting** —
      `star-rating-{n}` exposes the numeric rating via `aria-label` (e.g.
      "Rating: 4.5 out of 5"), separate from the visible "(4.5)" review-count
      text next to it. Parse the aria-label and assert it matches the visible
      number, rather than asserting on which star icons look filled.

## Harder

- [ ] **7. Promo carousel with unstable per-slide testids** — the ad banner
      (`promo-carousel`) autoplays on an interval, and the active slide's own
      testid changes with its content (e.g. `promo-slide-ci-config` on one
      render, something else next) rather than being a stable index-based id —
      so a selector keyed to one slide's testid breaks as soon as the content
      rotates. Build a `PromoCarouselComponent` that identifies the active slide
      via the `promo-dot-{0-6}` indicators instead, and test that
      `promo-next`/`promo-prev` manually advance/retreat it, and that autoplay
      genuinely advances the slide on its own — assert this with polling
      (`expect.poll`/retrying assertion) rather than a single arbitrary
      `waitForTimeout`.

- [ ] **8. Running cart/wishlist counts across multiple products** — add two or
      three different products to the cart and wishlist in one test and assert
      the `nav-cart`/`nav-wishlist` badge counts reflect the running totals (not
      just 0→1). Then reload the page (or navigate to `/products` and back) and
      assert on whatever you actually observe — first figure out empirically
      whether the counts persist or reset, don't assume either.

- [ ] **9. BasePage/NavbarComponent shared across apps** — extract a
      `NavbarComponent` (or `BasePage`) covering the "Practice apps" and "Learn"
      dropdown menus (`nav-apps-menu-button`, `nav-learn-menu-button`),
      `nav-wishlist`/`nav-cart` counts, and the "Sign in" link, since this
      header is identical across the homepage, `/products`, and `/clinic`.
      Verify the "Practice apps" menu opens on click and lists both "Shop" and
      "Clinic" with their descriptions, then have `homepage` and `products` both
      compose this component instead of duplicating its locators.
