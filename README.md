# North Public School — Website (Phase 1)

> _Learning Today, Leading Tomorrow_

A complete, production-quality **static** marketing website for **North Public School**, built with React + Vite + Tailwind CSS. This is **Phase 1** — a polished, responsive, client-ready design with **dummy/static data only** (no backend, no database, no APIs). It is architected so it can grow into a full **School ERP** in Phase 2 without a redesign.

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
| Primary     | `#0F4C81` | Brand blue       |
| Accent      | `#FFB703` | Highlights / CTA |
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

Works out of the box on **Netlify**, **Vercel** and **GitHub Pages** — the SPA
redirect files for all three are already included.

- **Netlify** → build `npm run build`, publish `dist/` (uses `public/_redirects`).
- **Vercel** → framework preset “Vite”; `vercel.json` handles routing.
- **GitHub Pages** → build and deploy `dist/`. `public/404.html` + a snippet in
  `index.html` handle deep-link routing. _(Alternatively, swap `BrowserRouter`
  for `HashRouter` in `src/main.jsx`.)_

## 🔮 Phase 2 — ERP (Planned)

The UI is structured so these modules connect to a backend later **without a redesign**:

- **Students** — details, admission, fees, attendance, report cards
- **Teachers** — details, attendance, salary, leave
- **Management** — income, expenditure, reports, dashboard
- **Gallery** — upload, categories, delete
- **Auth** — admin / teacher / student / parent logins

All content currently lives in `src/data/` — swap these modules for API calls in Phase 2.

---

_© North Public School. Phase 1 — static website for design approval._
