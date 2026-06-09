# Silver Oak Global — Passive Security Review

**Date:** 2026-06-09
**Scope:** **Passive / read-only only** — security headers, client-side JS bundle analysis,
cookies/storage, public endpoints, and read-only GETs on owner-authorized infrastructure.
**Explicitly NOT done:** no login attempts, no brute force, no Web3Forms submissions, no
injection/fuzzing, no auth bypass. Those require the backend source (static review) or a
staging environment + formal sign-off.

> Secrets below are **partially masked**. The full values are already visible in your public
> client JS bundle (that's the problem) — rotate them regardless.

---

## 🔴 High / notable

### H1 — Web3Forms access keys exposed in client JS (form-abuse / lead-pollution loophole)
Both site forms POST to `https://api.web3forms.com/submit` with hardcoded access keys, and the
recipient address is embedded too:

```
access_key: "e2df016a-…-8cdec3d52f72"
access_key: "91145cdc-…-5e12c4ec4fbb"
to:         "leads@silveroakglobal.in"
```
- These keys + recipient are readable by **anyone** who opens DevTools.
- **Risk:** anyone can replay the request to **flood `leads@silveroakglobal.in` with fake/spam leads**,
  **exhaust your Web3Forms quota/plan**, or use it as a spam relay. No server-side gatekeeping.
- **Also explains your CRM bug:** submissions go to **Web3Forms (email)** — *not* into Leadrat.
  The Leadrat endpoint (`connect.leadrat.com/api/v1/integration/Website`) is referenced but the actual
  form submit fires to Web3Forms, so leads land in an inbox, not the CRM.
- **Fix:** enable Web3Forms hCaptcha/Botcheck + domain restriction, **rotate both keys**, and ideally
  proxy submissions through your own backend (so the key is server-side) and push to Leadrat there.

### H2 — Missing security headers
| Header | Status | Risk |
|---|---|---|
| Content-Security-Policy | ❌ MISSING | XSS / injected-script execution |
| X-Frame-Options (or CSP frame-ancestors) | ❌ MISSING | **Clickjacking** (site can be iframed) |
| X-Content-Type-Options: nosniff | ❌ MISSING | MIME sniffing |
| Referrer-Policy | ❌ MISSING | Referrer leakage |
| Permissions-Policy | ❌ MISSING | Unrestricted camera/mic/geo APIs |
| Strict-Transport-Security | ✅ present (max-age 2y) | — good |

Fix: add these via `next.config.js` headers() or Vercel config.

### H3 — Publicly reachable admin/CMS login
`https://sop-cms.silveroak.ae/` serves **"Login | Real Estate Web"** (email + password + Remember Me +
Forgot Password), reachable from any IP. (I did **not** test any credentials.)
- **Fix:** enforce MFA, rate-limiting/account lockout, IP all-listing or VPN for admin, ensure no
  default/weak credentials, and confirm "Forgot Password" can't enumerate valid emails.

---

## 🟡 Medium

### M1 — Internal emails harvestable in client bundle
`marketing@silveroakglobal.com`, `info@silveroakglobal.ae`, `leads@silveroakglobal.in` are all in the
client JS → easy targets for phishing/spam. Also note the brand spans **three TLDs** (`.com`, `.ae`, `.in`)
used inconsistently across the site.

### M2 — Stack/info disclosure via headers
`x-powered-by: Next.js`, `server: Vercel`, `x-matched-path`, `x-nextjs-prerender` reveal the stack.
Low severity; strip `x-powered-by` and unnecessary `x-*` headers.

### M3 — Placeholder/sample data left in production code
`email@example.com`, `john@gmail.com`, and the footer `tel:+1234567890` are sample values shipped to
production — data-hygiene issue (and a UX bug for the phone link).

---

## 🟢 Properly configured (verified good)

- **S3 bucket** `listing-storage.s3.eu-north-1.amazonaws.com` — public listing **disabled** (403 on root);
  objects served individually. ✅
- **HSTS** present (2-year max-age). ✅
- **CMS read API not exposed client-side** — property/content data is fetched **server-side** (RSC),
  so the CMS URL/keys aren't in the browser bundle. ✅ (Guessed endpoints `/api/v1/properties|leads|auth`
  all returned 404 from outside.)
- **robots.txt** disallows `/api/`, `/private/`, `/_next/`; `/private/` returns 404 (doesn't exist).
- **Cookies:** only Google Analytics (`_ga`, `_ga_*`). No session/PII cookies client-side (no public-user auth).
- Source maps: a `.map` request returned a soft-200 with non-map content → **likely not exposed**
  (inconclusive — worth confirming source maps are off in production).
- Chat widget is **Tidio** (public widget key in URL — by design, not a leak).

---

## Recommended next (needs the backend files / authenticated review)
1. **CMS API authorization** — confirm every `sop-cms.silveroak.ae/api/...` endpoint requires auth and
   enforces per-record access control (no IDOR; can't read leads/users by changing an ID).
2. **Auth flow** — session/JWT handling, password policy, lockout, "forgot password" enumeration.
3. **Secrets management** — ensure server env vars (CMS keys, Leadrat key, DB creds) are never sent to the client.
4. **Lead pipeline** — move form submission server-side; validate + rate-limit; wire to Leadrat correctly.
5. **Input validation** — server-side validation on all form/API inputs (the client has none for phone).

> When you share the files, I'll do the static review for the above (auth, access control, IDOR,
> secrets, injection) — that's the high-signal part. I will not run active attacks on the live site.
