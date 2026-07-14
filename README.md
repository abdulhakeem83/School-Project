# Apple Valley Creative School — Website

> _Where Creativity Meets Excellence_

A complete, production-quality **static** marketing website for **Apple Valley Creative School**, Basavakalyan (a unit of The SANA Educational & Cultural Trust), built with React + Vite + Tailwind CSS. It is a polished, responsive, client-ready design. Some sections use placeholder content (faculty, fees, gallery photos, testimonials) that should be replaced with the school's real details — see **Content to replace** below. It is architected so it can grow into a full **School ERP** later without a redesign.

---

## ✨ Tech Stack

- **React 18** (functional components + hooks)
- **Vite 5** (fast dev server & optimized builds)
- **Tailwind CSS 3** (custom brand theme)
- **React Router 6** (client-side routing, lazy-loaded pages)
- **Framer Motion** (fade / slide / zoom / hover animations)
- **Lucide React** (icons)

## 🚀 Getting Started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

> Requires Node.js 18+.

## 📁 Project Structure

```
school-project-website/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                 # Vercel SPA rewrite
├── public/
│   ├── favicon.svg
│   ├── _redirects              # Netlify SPA fallback
│   └── 404.html                # GitHub Pages SPA redirect
└── src/
    ├── main.jsx                # app entry + Router
    ├── App.jsx                 # layout + routes
    ├── index.css               # Tailwind + base styles
    ├── assets/images/          # (placeholder for real assets in Phase 2)
    ├── components/             # reusable UI components
    │   ├── Navbar, Footer, Hero, Logo
    │   ├── SectionTitle, PageBanner, CTASection
    │   ├── StatCard, FeatureCard, FacilityCard
    │   ├── TeacherCard, NewsCard, TestimonialCard
    │   ├── GalleryGrid (with lightbox)
    │   ├── SmartImage, Avatar (graceful image/avatar fallbacks)
    │   ├── WhatsAppButton (floating contact button)
    │   └── ScrollToTop, PageLoader, PageTransition
    ├── pages/                  # one file per route
    │   ├── Home, About, Admissions, Facilities
    │   ├── Faculty, Gallery, Contact, Login, NotFound
    ├── data/                   # all dummy/static content lives here
    │   ├── constants.js        # school info, nav, contact, socials
    │   ├── teachers.js, gallery.js, news.js
    │   ├── testimonials.js, facilities.js
    │   ├── admissions.js, highlights.js, erpModules.js
    ├── hooks/useSEO.js         # per-page title + meta description
    └── utils/motion.js         # shared Framer Motion variants
```

## 🎨 Brand & Design

| Token       | Value     | Use              |
| ----------- | --------- | ---------------- |
| Primary     | `#1D4ED8` | Brand blue       |
| Accent      | `#FFC20E` | Yellow · CTA     |
| Brand red   | `#E11D2A` | Logo / ribbons   |
| Success     | `#2E8B57` | Confirmations    |
| Background   | `#F8FAFC` | Page surface     |
| Text (ink)  | `#1E293B` | Body text        |

Design language: minimal, premium and friendly — generous white space, rounded
corners, soft shadows, subtle gradients and smooth hover/scroll animations.

## 🖼️ Images

- **Scenery/facility/gallery** photos use deterministic [picsum.photos](https://picsum.photos) URLs so the site always has real imagery. The `SmartImage` component gracefully falls back to a clean, branded placeholder if the network is unavailable — so the UI **never shows a broken image**.
- **People** (faculty, testimonials) use branded initials avatars via the `Avatar` component.
- In **Phase 2**, drop real assets into `src/assets/images/` (or a CDN) and set the `src`/`photo` fields in `src/data/*` — no component changes required.

## 🧭 Pages

Home · About · Admissions · Facilities · Faculty · Gallery · Contact · Login (ERP preview) · 404.

- **Contact** form and **newsletter** show success messages only (no backend).
- **Login** is intentionally **not** an auth page — it previews the upcoming ERP modules.

## ☁️ Deployment

The site is a static SPA and works out of the box on **Vercel**, **Netlify** and
**GitHub Pages** — the SPA redirect files for all three are already included.
The build command is `npm run build` and the publish/output directory is `dist/`.

### Recommended — Vercel (from the pushed repo)

`vercel.json` is already configured, so this is the fastest path to a live URL:

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
2. **Add New → Project** and import the `School-Project` repository.
3. Vercel auto-detects Vite. Confirm the settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**. You get a live `*.vercel.app` URL in ~1 minute.
5. Every push to `main` redeploys automatically. To ship, merge `develop → main`
   (or change the Production Branch to `develop` in **Settings → Git**).
6. _(Optional)_ Add a custom domain under **Settings → Domains**.

### Alternative — Netlify

1. **[app.netlify.com](https://app.netlify.com)** → **Add new site → Import from Git** → pick the repo.
2. Build command `npm run build`, publish directory `dist`. Deploy.
3. SPA routing is handled by `public/_redirects` (copied into `dist/` on build).

### Alternative — GitHub Pages

1. `npm run build`, then publish the `dist/` folder to a `gh-pages` branch
   (e.g. with `npx gh-pages -d dist`) or via a GitHub Actions workflow.
2. Deep-link routing is handled by `public/404.html` + the snippet in `index.html`.
   _(Alternatively, swap `BrowserRouter` for `HashRouter` in `src/main.jsx`.)_

## 🔮 Phase 2 — ERP (Planned)

The UI is structured so these modules connect to a backend later **without a redesign**:

- **Students** — details, admission, fees, attendance, report cards
- **Teachers** — details, attendance, salary, leave
- **Management** — income, expenditure, reports, dashboard
- **Gallery** — upload, categories, delete
- **Auth** — admin / teacher / student / parent logins

All content currently lives in `src/data/` — swap these modules for API calls in Phase 2.

---

## 📝 Content to replace (placeholders)

Search the code for `TODO` and `To be updated`, and update these with the school's real data:

- **Logo** → add `public/images/logo.png` (see `public/images/README.md`).
- **Faculty** → `src/data/teachers.js` (real names, subjects, optional photos).
- **Fees** → `src/data/admissions.js` (`FEE_STRUCTURE`, currently "On request").
- **Stats** → `src/data/highlights.js` (`STATS` — student/teacher counts, years).
- **Photos** → drop real images in `public/images/` and switch `photo(...)` to `asset(...)`.
- **Testimonials & News** → `src/data/testimonials.js`, `src/data/news.js`.
- **Social links** → `src/data/constants.js` (`SOCIAL_LINKS`, currently `#`).

Central school info (name, address, phones, email, tagline) lives in
`src/data/constants.js`.

---

_© Apple Valley Creative School · The SANA Educational & Cultural Trust, Basavakalyan._
