# Silver Oak Global — Website UX / UI & Functional Audit

**Site:** https://www.silveroakglobal.com/
**Audited:** 2026-06-08
**Viewports:** Desktop (1920×889 actual / 1440 target). Mobile pass still pending.
**Method:** Visual review by Aatif + live DOM/CSS inspection via Claude (Chrome extension).

> ⚠️ This document was assembled from (1) Aatif's visual findings and (2) automated DOM/CSS
> measurement. Items marked **[measured]** were verified programmatically; items marked
> **[visual]** are from manual review and should be confirmed/repro'd before dev work.

---

## 0. Original request

> open silveroakglobal.com and perform a DEEP analysis of everything wrong with it —
> every wrong animation, every wrong transition, every wrong placement or margins,
> in both laptop and mobile configurations.

---

## 1. Aatif's visual findings (verbatim, source of truth)

### Hero section (PC)
- The header colours change but don't switch to navy blue properly (it's broken).
- The background is a video with embedded text and animations.
- The low resolution of the video makes the text also look low resolution.
- There's no CTA.
- No cool loading animation.

### Search bar / hero CTA (PC)
- Scrolling down you see the search bar (which is the CTA) but it isn't visible on first load on PC.
- The "Starting Price" has `500000` pre-inserted.

### Search / results
- It isn't asking the user to search between rent / off-plan / for sale — it just always defaults to off-plan.
- The selection for filters isn't very visible.
- The existing filters are very limited — they don't provide much functionality.
- The images are very low resolution.
- Results are automatically sorted cheapest → most expensive, with **no** option to sort any other way,
  or to limit by bedrooms / bathrooms, off-plan vs for sale, or by community.
- Much of the information displayed is **wrong**. Example: *Palace Residences at Al Mamsha, Sharjah*
  is displayed with a **500,000,000** starting price.

### "Join our priority list" section
- Very basic UI for country-code selection.
- **No phone number validation at all.**
- Fields: first name, last name, email address.

### FAQ section
- Very large text size.
- **Zero sources** cited for where the answers come from.

### "Exclusive Properties in Dubai" section
- Zoomed-in, low-resolution images.

### Calculators
- **Affordability:** monthly income doesn't show until the minimum requirement is met,
  **but** the mortgage calculator still shows values even when the minimum requirement isn't met.
- The example value for monthly income in the affordability calculator isn't even eligible —
  it's below 10k AED.
- **Mortgage:** interest rate changes by 0.1 via the buttons, making 3.99% or 4.99% impossible to enter.
- You can't type an interest rate manually.
- A random arrow beside the interest rate does nothing.
- A random arrow in the property-price field too.
- "Get Pre-approval" button has issues with the country-code UI.

### Chatbot
- Chatbot says **unavailable**.
- Chatbot asks you to fill the contact form; when filled it says "sent, we'll contact you soon"
  but it **doesn't actually get sent to Leadrat**.
- The chatbot's name is literally **"Hi there 👋"** and it has **no profile picture**.
- The chat UI has a 3-dot button → "turn off notifications", but the user was never prompted
  to enable notifications in the first place.

### Data / content
- Most of the real-estate developers listed actually show **0 properties**.
- The conversion rates used for [currency] are [incomplete note — needs detail].

### Misc / regressions
- On resubmission to the main hero page, the header changes to **white** and **doesn't change back to navy**.
- Font on the **subtext** of the video background doesn't match anything else on the site.
- Font on the **main text** of the video background doesn't match anything else on the site.

---

## 2. Consolidated findings (severity-ranked, dev-ready)

### 🔴 Critical — credibility / conversion blockers

| # | Area | Issue | Fix |
|---|------|-------|-----|
| C1 | Data integrity | Wrong listing data, e.g. *Palace Residences at Al Mamsha* shown at **500,000,000** starting price **[visual]** | Audit data pipeline / currency-unit handling; add sanity bounds & validation |
| C2 | Developers | Most listed developers show **0 properties [visual]** | Hide empty developers or backfill listings |
| C3 | Lead capture | Chatbot form says "sent" but **does not reach Leadrat [visual]** | Fix Leadrat integration; add server-side delivery confirmation + error states |
| C4 | Hero | Headline/subtext **baked into the video** → low-res, unselectable, no SEO, no a11y, can't edit **[measured: video has no poster, 7.3 MB]** | Render headline + subhead as real HTML text over the video |
| C5 | Hero | **No visible CTA** in the first viewport; search bar (the real CTA) is below the fold **[visual+measured]** | Surface the search bar in the hero; add a button CTA (e.g. "Talk to an Advisor") |

### 🟠 High — broken behaviour & core UX

| # | Area | Issue | Fix |
|---|------|-------|-----|
| H1 | Hero header | Header colour doesn't switch to navy properly; **after resubmitting to home, header turns white and never reverts [visual]** | Fix scroll/route state logic driving header colour |
| H2 | Hero load | Blank gray full-screen block for **6+ s** on first load (video `readyState:0`, no poster) **[measured]** | Add poster image; compress/lazy-load video |
| H3 | Search | No Rent / Off-plan / For-sale toggle — **always defaults to off-plan [visual]** | Add listing-type selector as a primary filter |
| H4 | Search | Results sort cheapest→expensive only; **no sort options, no beds/baths/community/type filters [visual]** | Add full filter + sort controls |
| H5 | Search | Starting Price hard-coded to `500000` (a value, not placeholder) **[measured]** | Empty default / use placeholder |
| H6 | Forms | Priority-list form has **no phone validation** and basic country-code UI **[visual]** | Add intl phone validation (e.g. libphonenumber) + better country selector |
| H7 | Calculators | Mortgage calc shows values **even when minimum requirement isn't met** (inconsistent with affordability calc) **[visual]** | Gate output behind validation consistently |
| H8 | Calculators | Interest rate steps by 0.1 only & **can't be typed** → 3.99 / 4.99% impossible **[visual]** | Allow free text input + finer step |
| H9 | Chatbot | Chatbot shows **"unavailable" [visual]** | Fix availability / provider config |
| H10 | Images | Listing & "Exclusive Properties" images are **low-res / zoomed-in [visual]** | Serve higher-res, correctly-cropped responsive images |

### 🟡 Medium — polish, consistency, trust

| # | Area | Issue | Fix |
|---|------|-------|-----|
| M1 | Layout | **Inconsistent horizontal gutters**: left edges ~24–32px most sections, but ~92px (Affordability) & ~115px (FAQ) — content jumps in/out on scroll **[measured]** | Single shared max-width container |
| M2 | Layout | **Inconsistent vertical spacing** between sections: 10 / 24 / 32 / 48px + stray 32px margin **[measured]** | Standardize a spacing scale |
| M3 | Nav | Header is `position: relative` (not sticky) on a **6,344px** page **[measured]** | Make header sticky |
| M4 | Hero | **SEARCH button overflows** page: right edge 1915px vs 1910px width, clipped **[measured]** | Contain within grid |
| M5 | Nav | "Who We Are" dropdown opens at `left:1651px`, hard against right edge **[measured]** | Right-align submenu |
| M6 | Typography | Video main-text & sub-text fonts **don't match** the rest of the site **[visual]** | Use the site type system (real text, see C4) |
| M7 | Branding | Logo wordmark "Silver Oak Properties" **too small / low-contrast [visual]** | Increase size & contrast |
| M8 | FAQ | Oversized text; **no sources** for answers **[visual]** | Reduce size; cite/link sources |
| M9 | Chat widget | Overlaps content (5th "Our Services" label, footer logos); z-index ≈ 2.1B **[measured]** | Add section padding / reposition |
| M10 | Footer | Placeholder phone `+971 800 555 555` **[measured]** | Real number |
| M11 | Calculators | Affordability example monthly income is **below 10k AED → ineligible [visual]** | Use a valid example value |

### 🔵 Low — nice-to-have / micro

| # | Area | Issue | Fix |
|---|------|-------|-----|
| L1 | Hero | No loading animation **[visual]** | Add a lightweight skeleton/intro |
| L2 | Calculators | "Random arrows" beside interest-rate & property-price fields do nothing **[visual]** | Remove or wire up |
| L3 | Calculators | "Get Pre-approval" country-code UI issues **[visual]** | Fix country-code component |
| L4 | Chatbot | Bot named literally **"Hi there 👋"**, no avatar **[visual]** | Set real name + profile image |
| L5 | Chatbot | 3-dot menu offers "turn off notifications" though user was never asked to enable them **[visual]** | Add proper opt-in flow |
| L6 | A11y/SEO | Developer logos use generic alt `"Developer 1…12"` **[measured]** | Use real brand names in `alt` |
| L7 | Layout shift | Language/flag selector renders blank then pops in **[measured]** | Reserve space / SSR default |

---

## 3. Confirmed healthy (no issues found) — desktop

- Zero JS/console errors **[measured]**.
- No broken images; all content images have `alt` (except generic dev-logo alts) **[measured]**.
- No horizontal page scroll at desktop width **[measured]**.
- Heading typography system is internally consistent: Raleway, 38px/700 gold section titles,
  22px subtitles **[measured]**.
- Only CSS animation is Tailwind skeleton `pulse`; no janky long transitions **[measured]**.

---

## 4. Still TODO

- [ ] **Full mobile pass @ 390px** — hamburger menu, touch targets, carousels, forms, overflow
      *(blocked: automation Chrome window must be foregrounded to resize/screenshot)*
- [ ] Annotated **screenshots** for each finding (desktop + mobile)
- [ ] Navbar dropdown reveal animation + hover-state transitions
- [ ] Detail the incomplete note on **currency conversion rates**

---

## Appendix A — "What is a CTA?"

**CTA = Call To Action**: the single most important thing you want a visitor to *do next*,
styled to stand out (e.g. "Search Properties", "Book a Consultation", "Get a Callback").
Sites usually have a **primary** CTA and an optional **secondary** CTA.

On a real-estate site the **search bar is the primary CTA** — it's an *interactive* CTA
(a tool the user fills in) rather than a *button* CTA. The hero therefore doesn't lack a CTA
outright; the problem is that the CTA is **pushed below the fold**, so the first screen everyone
sees has no visible call to action. (See C5.)
