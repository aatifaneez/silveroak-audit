# Silver Oak Global — Listing Price Verification

**Site:** https://www.silveroakglobal.com/
**Checked:** 2026-06-09
**Scope:** Every property listed on the site, cross-checked against the project's real
launch/market starting price from developer sites and portals (Property Finder, Bayut,
developer official pages, Khaleej Times/Gulf News for major towers).

> **Method note:** Off-plan "starting prices" legitimately vary by source, unit type, phase,
> and over time (prices rise during construction). Differences within ~±10% are normal and
> flagged 🟡 (minor), not ⚠️ (notable). Always reconcile flags against your own CRM/source data.

---

## Inventory found

The **only live inventory is 39 off-plan projects** (sitemap-confirmed). Everything else is empty:

| Section | Status |
|---|---|
| `/offplan-properties` | **39 projects** (5 pages) — the only populated listings |
| `/buy-properties`, `/properties-for-sale-in-dubai` | "No properties found" |
| `/rent-properties`, `/properties-for-rent-in-dubai` | empty |
| Sharjah / Umm Al Quwain (`?country=shj`/`uaq`) | "Expansion in progress / coming soon" |
| Homepage "Exclusive Properties" carousel | **rendered 0 cards on load** (intermittent) — see note |

---

## Verdict summary

| Result | Count |
|---|---|
| ✅ Accurate (matches launch/market start) | **32** |
| 🟡 Minor difference (within normal variance) | **4** |
| ⚠️ Notable discrepancy — verify | **3** |

**The 3 to fix/verify first:**
1. **Diamondz by Danube** — site **AED 1,890,000** vs market start **~AED 1,100,000** (studio). Overstated ~+790k.
2. **One by Binghatti** — site **AED 1,111,111** vs market start **~AED 1,699,999**. Understated ~−590k.
3. **Parkwood by Emaar** — site **AED 1,450,000** vs market start **~AED 1,750,000**. Understated ~−300k.

> ⚠️ **Could not verify your "Palace Residences at Al Mamsha = AED 500,000,000" example** — that
> project is **not in the current live inventory** (not in the 39 listings, not in the sitemap). It
> was in the homepage featured carousel, which currently renders empty. It may have been removed,
> or only appears via the intermittently-broken carousel. None of the 39 *current* listings has a
> gross error like 500M.

---

## Full comparison (all 39)

| # | Project | Developer | Location (site) | Site start (AED) | Market start (AED) | Verdict |
|---|---------|-----------|-----------------|------------------|--------------------|---------|
| 1 | Bora Bora at Damac Islands | Damac | Damac Islands | 2,296,000 | ~2,296,000 (Bora Bora 3) | ✅ |
| 2 | Bali at DAMAC Islands | Damac | Damac Islands | 2,407,000 | 2,380,000–2,490,000 | ✅ |
| 3 | Fashionz by Danube | Danube | JVT | 679,000 | ~684,000 | ✅ (−5k) |
| 4 | Timez by Danube | Danube | Dubai Silicon Oasis | 800,000 | ~800,000 | ✅ |
| 5 | Bayz 101 by Danube | Danube | Business Bay | 1,175,000 | 1,155,000–1,175,000 | ✅ |
| 6 | **Diamondz by Danube** | Danube | JLT | **1,890,000** | **~1,100,000** (studio) | ⚠️ overstated |
| 7 | Bayz 102 by Danube | Danube | Business Bay | 1,380,000 | 1,200,000–1,380,000 | 🟡 high end |
| 8 | Downtown Residences by Deyaar | Deyaar | Business Bay | 1,860,000 | ~1,860,000 (1-bed) | ✅ |
| 9 | Rosehill | Emaar | Dubai Hills Estate | 1,600,000 | ~1,600,888 | ✅ |
| 10 | Azizi Raffi | Azizi | Al Furjan | 685,000 | 658,000–685,000 | ✅ |
| 11 | Azizi Ruby | Azizi | JVC | 601,000 | 596,000–620,000 | ✅ |
| 12 | Azizi Arian | Azizi | Jebel Ali | 569,000 | ~569,000 | ✅ |
| 13 | Binghatti Ghost | Binghatti | Al Jaddaf | 850,000 | ~888,888 (range 658k+) | ✅ close |
| 14 | **One by Binghatti** | Binghatti | Business Bay | **1,111,111** | **~1,699,999** | ⚠️ understated |
| 15 | Binghatti Aquarise | Binghatti | Business Bay | 999,000 | ~999,999 | ✅ |
| 16 | Samana Ibiza | Samana | Dubailand | 699,000 | ~699,000 | ✅ |
| 17 | Vela Viento | Omniyat | Business Bay | 18,540,000 | 17.5M–18.5M | ✅ |
| 18 | Armani Beach Residences | Arada | Palm Jumeirah | 21,000,000 | 21M–21.5M | ✅ |
| 19 | Palm Beach Tower 3 | Nakheel | Palm Jumeirah | 3,700,000 | ~3,700,000 | ✅ |
| 20 | Burj Azizi | Azizi | Sheikh Zayed Road | 7,500,000 | 7,500,000 (launch) | ✅ |
| 21 | Azizi Milan 51 | Azizi | City of Arabia | 581,000 | 550k–586k | ✅ |
| 22 | Azizi Milan 30 | Azizi | Al Furjan* | 650,000 | ~650,000 | ✅ (*loc?) |
| 23 | Azizi Milan 20 | Azizi | Al Furjan* | 680,000 | ~560,000 | 🟡 high (*loc?) |
| 24 | Azizi Milan 9 | Azizi | Al Furjan* | 750,000 | 550k–950k | ✅ (*loc?) |
| 25 | Trussardi Residences | Mira | Al Furjan | 1,400,000 | 1.4M (Ph1 3.3M / Ph2 840k) | ✅ |
| 26 | Park Lane by Emaar | Emaar | Dubai Hills Estate | 1,400,000 | ~1,400,000 | ✅ |
| 27 | **Parkwood by Emaar** | Emaar | Dubai Hills Estate | **1,450,000** | **~1,750,000** | ⚠️ understated |
| 28 | Golf Grand by Emaar | Emaar | Dubai Hills Estate | 1,400,000 | ~1,400,000 | ✅ |
| 29 | Club Place by Emaar | Emaar | Dubai Hills Estate | 1,450,000 | ~1,450,000 | ✅ |
| 30 | Mercedes Benz Places | Binghatti | Downtown | 8,800,000 | 8.8M–10M | ✅ (low end) |
| 31 | Bentley Villas (Mira Villas) | Mira | Meydan | 20,000,000 | 20M+ | ✅ |
| 32 | Binghatti Skyrise | Binghatti | Business Bay | 975,000 | ~975,000 | ✅ |
| 33 | Sobha Orbis | Sobha | Motor City | 965,070 | ~985,000 | 🟡 (−20k) |
| 34 | Sobha Solis | Sobha | Motor City | 1,070,000 | 1.01M–1.07M | ✅ |
| 35 | Sobha Seahaven | Sobha | Dubai Harbour | 3,140,000 | 3.14M–3.18M | ✅ |
| 36 | Eywa | R.Evolution | Business Bay | 10,000,000 | 10M–11.5M | ✅ (low end) |
| 37 | Burj Binghatti Jacob & Co | Binghatti | Business Bay | 8,000,000 | ~8,000,000 | ✅ |
| 38 | Sobha One | Sobha | Ras Al Khor | 1,100,000 | 1.1M (1-bed ~1.68M+) | ✅ (low end) |
| 39 | Riverside Crescent 320 | Sobha | Sobha Hartland 2 | 1,200,000 | 1.3M–1.6M | 🟡 (−100k+) |

\* Azizi Milan towers are labelled "Al Furjan" on the site, but the Azizi Milan development is in
**City of Arabia / Dubailand** — possible location mislabel (data issue, not a price issue).

---

## Takeaways

- **Good news:** the live off-plan prices are mostly accurate — 32/39 match the developer/market
  starting price, and there is **no gross error** (like the 500M example) anywhere in the 39 live listings.
- **Fix:** Diamondz (overstated), One by Binghatti & Parkwood (understated).
- **Investigate:** the homepage "Exclusive Properties" carousel renders **empty** on load and contains
  featured projects (incl. Palace Residences / Safa 1 / Pearlside / Jacob & Co) that aren't in the
  sitemap — so they can't be verified and may carry the stale/500M data you saw. Re-check that carousel's
  data source.
- A handful of starting prices reflect a higher unit type than the true entry price (e.g. Diamondz),
  so they read as "expensive." Decide whether "starting price" should always be the lowest available unit.

**Sources:** developer official sites (emaar.com, sobharealty.com, danubeproperties.com, binghatti.com,
miradevelopments.ae, omniyat), Property Finder, Bayut, and press (Khaleej Times / Gulf News for Burj Azizi).
Prices are launch/current-availability figures as of June 2026 and are indicative.
