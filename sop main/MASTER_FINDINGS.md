# Silver Oak Global — MASTER FINDINGS (everything found so far)

**Compiled:** 2026-06-09 · **Site:** https://www.silveroakglobal.com/
**Tags:** `[measured]` verified via DOM/CSS/network · `[verified]` confirmed via web/data ·
`[reported]` Aatif's visual find · `[PoC]` actively proven · `[observed]` seen in screenshots
**Severity:** 🔴 Critical · 🟠 High · 🟡 Medium · 🔵 Low

**Totals:** 88 distinct issues — 🔴 12 · 🟠 24 · 🟡 39 · 🔵 13 (+ confirmed-good list at end)

---

## A. Hero / landing

| # | Sev | Issue | Tag |
|---|---|---|---|
| A1 | 🔴 | Hero `<video>` has **no poster** → full-screen (~945px) **blank grey block for 6+ s** on load (`readyState:0`). | measured |
| A2 | 🔴 | Hero **headline + subtext are baked into the video** → blurry/low-res, not selectable, no SEO, no a11y, can't edit. | reported+verified |
| A3 | 🔴 | **No visible CTA** in the first viewport — the search bar (the real CTA) sits below the fold. | reported+measured |
| A4 | 🟠 | 7.3 MB autoplay MP4, no `preload`/poster strategy; not reliably autoplaying (`paused:true`). | measured |
| A5 | 🟠 | Header colour doesn't switch to navy properly — **broken colour transition**. | reported |
| A6 | 🟠 | On returning/resubmitting to home, **header turns white and never reverts** to navy. | reported |
| A7 | 🟡 | Hero **main-text font** doesn't match the rest of the site. | reported |
| A8 | 🟡 | Hero **subtext font** doesn't match anything else. | reported |
| A9 | 🟡 | Logo wordmark "SILVER OAK PROPERTIES" **too small / low-contrast** on navy. | reported |
| A10 | 🟡 | Language/flag selector renders **blank then pops in** (layout shift) on load. | measured |
| A11 | 🔵 | No loading animation / skeleton on first load. | reported |
| A12 | 🔵 | Heavy video background used where lighter CSS animation would do. | reported |

## B. Search & filtering

| # | Sev | Issue | Tag |
|---|---|---|---|
| B1 | 🟠 | **Can't combine property type + location** — selecting a location clears the type filter. | reported |
| B2 | 🟠 | Search **always defaults to off-plan** — no rent / for-sale / off-plan toggle. | reported |
| B3 | 🟠 | **No sorting at all** on listings (not even by price; no sort selector). | reported |
| B4 | 🟠 | Filters very limited — **no beds / baths / size / community / status**. | reported+benchmark |
| B5 | 🟡 | "Starting Price" **hardcoded to `500000`** (value, not placeholder) — must delete to go lower. | measured |
| B6 | 🟡 | Gold **SEARCH button overflows** (right edge 1915px vs 1910px page), clipped. | measured |
| B7 | 🟡 | Filter selectors are **not very visible**. | reported |
| B8 | 🔵 | Too few listings to meaningfully test filters together. | reported |

## C. Listings & property cards

| # | Sev | Issue | Tag |
|---|---|---|---|
| C1 | 🟠 | Property images **squished** — wrong aspect ratio forced into placeholder (missing `object-fit` → stretch). | reported+mechanism |
| C2 | 🟠 | Image squishing **also on the main page**. | reported |
| C3 | 🟡 | Card images **low-res / zoomed-in**. | reported |
| C4 | 🟡 | **Call/Email/WhatsApp on every card** before the user opens the property (clutter). | reported |
| C5 | 🟡 | Cards show only name+price+location+size — **no beds/baths/agent/freshness/verified** (vs competitors). | benchmark |

## D. Data accuracy & pricing (39 off-plan projects verified)

| # | Sev | Issue | Tag |
|---|---|---|---|
| D1 | 🔴 | **Diamondz by Danube**: site **AED 1,890,000** vs market **~1,100,000** (overstated ~790k). | verified |
| D2 | 🔴 | **One by Binghatti**: site **AED 1,111,111** vs market **~1,699,999** (understated ~590k). | verified |
| D3 | 🔴 | **Parkwood by Emaar**: site **AED 1,450,000** vs market **~1,750,000** (understated ~300k). | verified |
| D4 | 🟡 | Minor price drift: Bayz 102 (high), Azizi Milan 20 (high), Sobha Orbis (low), Riverside Crescent 320 (low). | verified |
| D5 | 🟡 | **Azizi Milan 30/20/9** labelled "Al Furjan" but the development is **City of Arabia/Dubailand**. | verified |
| D6 | 🟠 | Original **"Palace Residences at Al Mamsha = AED 500,000,000"** error — not in current 39 listings/sitemap; lived in the (now-empty) homepage carousel. Couldn't reproduce; data source suspect. | investigated |
| D7 | 🟡 | Currency converter (AED/USD/INR) accuracy **unverified** — AED is pegged to USD 3.6725 (1.175M AED ≈ $320k). | flagged |

## E. Inventory & content gaps

| # | Sev | Issue | Tag |
|---|---|---|---|
| E1 | 🔴 | **Only 39 off-plan projects live.** `/buy-properties`, `/properties-for-sale-in-dubai`, `/rent-properties` all **empty**. | verified |
| E2 | 🟠 | **Most "Developers Partnered With Us" show 0 properties.** | reported |
| E3 | 🟠 | Homepage **"Exclusive Properties" carousel renders 0 cards** on load (intermittent). | measured |
| E4 | 🟡 | Sharjah / Umm Al Quwain pages: "expansion in progress" — 0 listings. | verified |
| E5 | 🟡 | Section titled **"Exclusive Properties in Dubai"** features Sharjah/UAQ projects (mislabel). | observed |
| E6 | 🔵 | Developer logos use generic alt **"Developer 1…12"** (a11y/SEO). | measured |
| E7 | 🔵 | Logo marquee: **inconsistent sizes + duplicated logos** (EMAAR/NAKHEEL repeat). | observed |

## F. Calculators

| # | Sev | Issue | Tag |
|---|---|---|---|
| F1 | 🟠 | **Mortgage calc shows values even when the minimum requirement isn't met** (inconsistent with affordability calc, which gates output). | reported |
| F2 | 🟠 | Mortgage **interest rate steps by 0.1 via buttons** → 3.99% / 4.99% impossible. | reported |
| F3 | 🟠 | Interest rate **can't be typed** manually. | reported |
| F4 | 🟡 | Affordability **example monthly income is below 10k AED → ineligible** (bad sample). | reported |
| F5 | 🟡 | "Get Pre-approval" button has **country-code UI issues**. | reported |
| F6 | 🔵 | **Random arrow** beside interest-rate field does nothing. | reported |
| F7 | 🔵 | **Random arrow** in property-price field does nothing. | reported |

## G. Forms & validation

| # | Sev | Issue | Tag |
|---|---|---|---|
| G1 | 🟠 | **No phone validation anywhere** (input `type=tel`, `required`, **no `pattern`**). | reported+measured |
| G2 | 🟠 | **Download-Brochure** validation is **inaccurate, esp. phone**. | reported |
| G3 | 🟡 | "Join our priority list" — **basic country-code selector** UI. | reported |

## H. Content: brochures, blogs, reviews, about

| # | Sev | Issue | Tag |
|---|---|---|---|
| H1 | 🟠 | **Brochures are very incomplete.** | reported |
| H2 | 🟠 | Review **"Read All" opens a write-a-review page** — doesn't show the actual review. | reported |
| H3 | 🟠 | **Blog cards have no visible titles** (titles exist in markup/alt, not rendered). | reported+verified |
| H4 | 🟡 | **"50+ Specialists"** claimed on About; team is **37** (overstated). Also 18+ yrs / 10+ langs / 4.8. | reported+verified |
| H5 | 🟡 | **ROI redundant subtext**: shows `ROI: 7-10%` **and** `"ROI up to 7-10% in Returns"`. | reported+verified |
| H6 | 🟡 | Listing-detail **subtexts unnecessary/nonsensical** in general. | reported |
| H7 | 🟡 | Google review cards **truncate mid-sentence with "…"**; uneven heights/fill. | observed |
| H8 | 🟡 | "Achievements" heading then "Google Reviews" subtitle — confusing labelling. | observed |
| H9 | 🔵 | Recognition & Awards images **low-contrast** on white. | observed |
| H10 | 🔵 | FAQ section **text very large**; FAQ answers cite **no sources**. | reported |

## I. Typography, layout, spacing

| # | Sev | Issue | Tag |
|---|---|---|---|
| I1 | 🟡 | **Number-font inconsistency** — prices in **Montserrat**, body/stats in **Raleway**. | reported+measured |
| I2 | 🟡 | General **lack of font continuity**. | reported |
| I3 | 🟡 | **Inconsistent vertical spacing** between sections (10/24/32/48px + stray 32px margin). | measured |
| I4 | 🟡 | **Inconsistent horizontal gutters** (24–32px most, but 92px Affordability, 115px FAQ) — content jumps on scroll. | measured |
| I5 | 🟠 | **Navbar not sticky** (`position:relative`) on a **6,344px** page — scrolls away. | measured |
| I6 | 🔵 | "Our Services" icons **alternate vertically** (zig-zag) — reads unbalanced. | observed |
| I7 | 🔵 | "Join priority list" card has a **double/offset shadow** + large empty 2-col gap. | observed |

## J. Components & interaction

| # | Sev | Issue | Tag |
|---|---|---|---|
| J1 | 🔴 | **Chatbot says "unavailable."** | reported |
| J2 | 🔴 | Chatbot **"says sent" but lead never reaches Leadrat** (lands in Gmail only). | reported+PoC |
| J3 | 🟡 | **Chat widget overlaps content** (5th "Our Services" label, footer logos); z-index ~2.1B (Tidio). | measured |
| J4 | 🟡 | Chatbot is literally named **"Hi there 👋"** with **no profile picture**. | reported |
| J5 | 🟡 | Chat 3-dot menu offers **"turn off notifications"** though the user was never asked to enable them. | reported |
| J6 | 🟡 | **Weird hitboxes** on social icons + "Our Services" buttons (clickable area ≠ shape). | reported |
| J7 | 🟡 | **Expert images: heads cut off** (`object-fit:cover` + bad `object-position`). | reported+mechanism |
| J8 | 🟡 | **"Who We Are" dropdown opens at the far-right edge** (left:1651px) — overflow risk. | measured |
| J9 | 🟡 | Properties dropdown titled **"Categories"** holding Area Guides + Blogs instead of a proper **Insights** tab. | reported |
| J10 | 🔵 | Twitter icon still uses the **old bird logo**. | observed |

## K. Footer / contact / brand

| # | Sev | Issue | Tag |
|---|---|---|---|
| K1 | 🟠 | Placeholder phone link **`tel:+1234567890`** in the footer. | verified |
| K2 | 🟡 | Contact email **`info@silveroakglobal.ae`** (`.ae`) on a **`.com`** site. | verified |
| K3 | 🟡 | Brand uses **3 TLDs** — `.com` / `.ae` / `.in` — inconsistently. | verified |
| K4 | 🟡 | Footer phone **`+971 800 555 555`** looks placeholder (may be real toll-free — verify). | observed |

## L. Security (passive review)

| # | Sev | Issue | Tag |
|---|---|---|---|
| L1 | 🔴 | **Web3Forms access keys hardcoded in client JS** (2 UUIDs) + recipient `leads@silveroakglobal.in` exposed → anyone can inject leads / spam / exhaust quota. **Proven** (test lead reached Gmail). | verified+PoC |
| L2 | 🔴 | **Forms submit to Web3Forms (email), not Leadrat** — CRM pipeline broken. **Confirmed** (Gmail yes, Leadrat no). | verified+PoC |
| L3 | 🔴 | **`to` recipient field appears attacker-controllable** → possible lead-redirect / spam-relay abuse. | flagged |
| L4 | 🟠 | **Missing security headers**: no CSP, no X-Frame-Options (clickjacking), no nosniff, no Referrer-Policy, no Permissions-Policy. | measured |
| L5 | 🟠 | **Public admin/CMS login** at `sop-cms.silveroak.ae` ("Login | Real Estate Web"), reachable from any IP. | verified |
| L6 | 🟡 | **Internal emails harvestable** in client bundle (`marketing@`, `info@`, `leads@`). | verified |
| L7 | 🟡 | **Stack/info disclosure** via headers (`x-powered-by: Next.js`, `server: Vercel`, `x-matched-path`). | measured |
| L8 | 🔵 | **Placeholder/sample data in production code** (`email@example.com`, `john@gmail.com`, `tel:+1234567890`). | verified |

---

## ✅ Confirmed good (not flaws)
- Zero JS/console errors; no broken images; content images have alt text.
- No horizontal page scroll at desktop; heading type system internally consistent.
- 32 of 39 listing prices accurate; no gross error in the live 39.
- S3 bucket public listing **disabled**; HSTS present; CMS data fetched **server-side** (keys not in client); cookies are GA-only.

## ⏳ Not yet done
- **Mobile pass + screenshots** (needs the *aatif sop* window foregrounded).
- **Currency-converter** + **brochure-completeness** checks (need foreground / a sample PDF).
- **Backend static review** (CMS auth, IDOR, secrets, input validation) — needs the source files.
