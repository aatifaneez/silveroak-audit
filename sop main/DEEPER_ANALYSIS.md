# Silver Oak Global — Deeper Analysis + Competitor Benchmark

**Date:** 2026-06-09
**Method:** Live DOM/CSS inspection + WebFetch of own pages and competitor sites.
**Note:** Window was backgrounded during this pass, so this is data/DOM-level (no new screenshots).
Items marked **[verified]** were checked programmatically; **[reported]** are Aatif's visual finds.

---

## 1. Aatif's new PC findings (verbatim — source of truth)

1. Header "Properties" dropdown has a title **"Categories"** containing **Area Guides + Blogs**, instead of a proper **Insights** tab like other firms.
2. **Can't filter property type AND location at the same time** — selecting a location clears the property-type filter.
3. Not enough listings to properly test all filters together.
4. **No sorting** on the listings reached via the header dropdown — not sorted by price, and no sort selector.
5. **Every listing shows Call / Email / WhatsApp** on the card *before* you open the property.
6. The **"experts" images** in the contact section have **heads not fully visible**.
7. **No phone-number validation anywhere** in any contact field.
8. **Weird hitboxes** on the social buttons (FB/IG/YT/Twitter/LinkedIn) and the "Our Services" buttons — clickable area doesn't match the shape.
9. **Property images are squished** — image isn't the placeholder's aspect ratio, so it's distorted to fit.
10. **Lack of font continuity**, especially **number fonts**.
11. Listing-detail **subtext is unnecessary/nonsensical**, e.g. `ROI: 7-9%` then `"ROI up to 7-9%"` — redundant.
12. **Download-brochure** form has validation but it's **inaccurate, especially phone numbers**.
13. The **brochures themselves are very incomplete**.
14. **"Read All" on a Google review** opens a page to *post* a review — it doesn't show the actual review.
15. **Blog page: blogs have no titles.**
16. The **squished-image** problem also appears on the **main page**.
17. About page says **"50+ specialists"** but the team is actually **37**.

---

## 2. Verified / expanded

### Data accuracy & placeholders
| Finding | Detail | Status |
|---|---|---|
| "50+ Specialists" overstated | About page claims **50+ specialists**, **18+ years**, **10+ languages**, **4.8 rating**. Team is ~37. | [verified] markup |
| Placeholder phone | A footer link is `tel:+1234567890` — clearly fake. | [verified] |
| Toll-free number | Footer shows `+971 800 555 555` — *may* be a real UAE toll-free vanity number; verify it's live. | check |
| Email domain mismatch | Contact email is **info@silveroakglobal.ae** (`.ae`) on a **`.com`** site — brand/domain inconsistency; confirm it's monitored. | [verified] |
| WhatsApp | `+971 55 130 7662` looks like a real mobile. | ok |
| Currency converter | Detail pages have an **AED / USD / INR** toggle. AED is **pegged to USD at 3.6725**, so a **AED 1,175,000** studio must show **≈ USD 320,000** and **≈ INR 30.5M**. Verify the converter isn't using a wrong/stale rate (this is the "conversion rates" concern). | verify interactively |

### Technical / CSS
| Finding | Detail | Status |
|---|---|---|
| Number-font inconsistency | Price digits render in **Montserrat**; body & stats render in **Raleway**. Mixed number fonts. | [verified] |
| Phone validation | The phone input is `type=tel`, `required`, but has **no `pattern`/format rule** → accepts anything. Same pattern across forms. | [verified] |
| Image cropping (experts) | Card/expert images use `object-fit: cover`, which **crops** — with bad `object-position` it cuts off heads. | [verified] |
| Image squishing | Where a component **omits `object-fit`** (defaults to stretch) or sets fixed width+height, images distort. Fix: wrap in fixed aspect-ratio box + `object-fit: cover` + sensible `object-position`. | [reported]+mechanism |
| Hitboxes | Social/Service icons are circular but the **clickable element is a larger square/padded box** → hitbox doesn't match the visual. Fix: size the `<a>`/button to the icon + round it. | [reported] |
| ROI redundant subtext | Detail page literally shows `ROI: 7-10%` **and** `ROI up to 7-10% in Returns`. Remove the duplicate caption. | [verified] |

### Content / UX
| Finding | Detail | Status |
|---|---|---|
| Blog cards have no visible title | Titles exist in the markup/`alt` (e.g. "Buying Property in Dubai With Bitcoin…") but **aren't rendered** on the card — only the image shows. | [verified] |
| Review "Read All" | Links out to a **write-a-review** flow instead of showing the full review text. | [reported] |
| Call/Email/WhatsApp on every card | Adds clutter + repetition before the user has shown intent. | [reported] |
| Dropdown taxonomy | "Properties" mega-menu groups Area Guides/Blogs under **"Categories"** — competitors use a clear **Insights/Resources** section. | [reported] |
| Filters mutually exclusive | Type vs location can't combine; no beds/baths/sort (see benchmark below). | [reported]+benchmark |

---

## 3. Competitor benchmark — search & listings

How Silver Oak's property search compares to leading UAE players (fäm Properties, Property Finder, Bayut):

| Capability | Silver Oak | fäm | Property Finder | Bayut |
|---|---|---|---|---|
| Type + Location **together** | ❌ (mutually exclusive) | ✅ | ✅ | ✅ |
| Bedrooms / Bathrooms filter | ❌ | ✅ (studio–7+) | ✅ | ✅ |
| Price range | ⚠️ single "min" pre-filled 500000 | ✅ | ✅ | ✅ |
| Size (sqft) range | ❌ | ✅ | ✅ | ✅ |
| Off-plan vs Ready toggle | ❌ (separate pages only) | ✅ | ✅ | ✅ |
| **Sort** (price ↑↓, newest, size, AED/sqft) | ❌ none | ✅ | ✅ | ✅ |
| Map view | ❌ | ✅ | ✅ | ✅ |
| Verified/authenticity badge | ❌ | — | ✅ Verified | ✅ TruCheck |
| Listing card: beds/baths/size/£-per-sqft | ❌ (name+price+location+size only) | ✅ | ✅ | ✅ |
| Agent on card | ❌ | ✅ | ✅ (SuperAgent) | ✅ (TruBroker) |
| "Listed X ago" / freshness | ❌ | ✅ | ✅ | ✅ |
| Listing volume | **39 (off-plan only)** | thousands | tens of thousands | tens of thousands |

**Takeaway:** Silver Oak's search is roughly a decade behind the market standard — no combined filtering, no sorting, no beds/baths, no map, sparse cards, and a single populated category (off-plan). Even allowing for a smaller brokerage, **sorting + combined filters + beds/baths** are table stakes.

---

## 4. Still pending

- [ ] **Currency converter** accuracy — verify AED→USD uses the 3.6725 peg (needs interactive click; window must be foregrounded).
- [ ] **Brochure completeness** — download a sample brochure PDF and assess.
- [ ] **Mobile pass + screenshots** (window must be foregrounded).
- [ ] **Security review** — see SECURITY_PLAN below.

---

## 5. Security review — scope & plan (not yet executed)

Per Aatif's sequencing, security comes after this. Planned approach:

**Passive / read-only (safe, no authorization risk):**
- Security headers (CSP, HSTS, X-Frame-Options, etc.), TLS config.
- Exposed config / secrets in client JS bundles (API keys, Leadrat tokens, AWS keys).
- `robots.txt`, `sitemap.xml`, source maps, public `/_next/` artifacts.
- Info disclosure (verbose errors, stack traces, open S3 bucket `listing-storage.s3.eu-north-1.amazonaws.com`).
- Form endpoints: where the contact/brochure forms POST, and whether the Leadrat integration leaks keys client-side.

**Static review (best signal) — once Aatif shares the backend files:**
- Auth flows, access control, input validation, secrets management, data-leak loopholes.

**Out of scope (won't do on the live site):** active exploitation, auth bypass, injection attacks, brute force, or accessing data we're not authorized to — these risk real damage and need formal authorization + a staging environment.
