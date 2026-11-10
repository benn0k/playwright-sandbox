# playwright-sandbox

A practice sandbox for writing Playwright tests against the [QATools
Playground](https://playground.qatools.dev/) demo shop, using the Page Object
Model (POM) pattern.

## Structure

- `tests/pages/` — one POM per page (`homepage.ts`, `products.ts`, ...)
- `tests/specs/` — the actual test files
- `playwright.config.ts` — Playwright configuration (projects, base URL, reporter)

See [CHALLENGES.md](./CHALLENGES.md) for the list of POM/testing exercises
this sandbox is built around, including which ones are done and which are
still open.

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
npm test          # run all tests headless
npm run test:ui   # run tests in Playwright's UI mode
npm run report    # open the last HTML report
```
