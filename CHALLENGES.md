# POM Challenges — automationintesting.online

Target site: https://automationintesting.online/ (Restful-Booker-Platform demo)

Suggested layout:
- `tests/pages/` — one POM per page (RoomsListPage, ReservationPage, AdminLoginPage, ...)
- `tests/components/` — reusable widgets shared across pages (CalendarComponent, Header, ContactForm)
- `tests/specs/` — the actual test files
- `tests/utils/` — test data, helpers
- `tests/fixtures.ts` — `test.extend()` wiring POMs into tests

## Challenges

- [ ] **1. RoomsListPage POM** — list the three room cards (Single/Double/Suite), expose `getPrice(roomName)` and `bookNow(roomName)`. Assert displayed prices (£100/£150/£225).

- [ ] **2. ContactForm component** — fill and submit the "Send Us a Message" form (Name/Email/Phone/Subject/Message). Write a happy-path test, then a negative test for submitting empty — first figure out empirically what actually happens (no visible inline errors were observed on empty submit; check native HTML5 validation vs. a silent/rejected network call before asserting).

- [ ] **3. CalendarComponent** — reusable component object (not tied to a single page) for selecting a check-in/check-out range. Day buttons repeat the same text ("01"–"31") across different visible months, so a plain `getByRole('button', { name: '10' })` is ambiguous — solve the disambiguation once here so page POMs never have to think about it.

- [ ] **4. ReservationPage POM** — drive `/reservation/{id}?checkin=...&checkout=...`: select dates via the CalendarComponent, verify the price summary math (nights × rate + cleaning fee + service fee = total), click "Reserve Now". Confirm whether landing with checkin/checkout query params alone is enough, or whether a real calendar interaction is required for Reserve Now to proceed — assert on the actual observed behavior.

- [ ] **5. AdminLoginPage POM** — valid and invalid credential tests. Also assert on the pre-login header state: a "Logout" button is visible on `/admin` even before authenticating — decide what the correct assertion is and encode it rather than ignoring it.

- [ ] **6. BasePage + admin management** — extract a `BasePage` with the shared header/nav locators (identical across public site and admin), extend it for the logged-in admin views (room/booking/message management).
