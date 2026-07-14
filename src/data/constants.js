// ---------------------------------------------------------------------------
// Central place for school-wide constants. In Phase 2, values that become
// dynamic (contact info, social links, etc.) can be fetched from an API and
// this file kept as the fallback/shape reference.
// ---------------------------------------------------------------------------

export const SCHOOL = {
  name: 'Apple Valley Creative School',
  shortName: 'AVCS',
  tagline: 'Where Creativity Meets Excellence',
  established: 2007,
  // Run by The SANA Educational & Cultural Trust. Blends modern academics
  // with comprehensive religious (Deeni) education.
  affiliation: 'A unit of The SANA Educational & Cultural Trust',
  headline: 'Where Creativity Meets Excellence',
  intro:
    'A premier school in Basavakalyan nurturing young minds through a perfect blend of high-quality modern education and comprehensive religious (Deeni) education.',
}

export const CONTACT = {
  addressLines: [
    'Chilla Galli, Tq. Basavakalyan',
    'Dist. Bidar, Karnataka — 585327',
  ],
  phone: '+91 70905 85327',
  altPhone: '+91 73575 85327',
  email: 'applevalleybsk@gmail.com',
  admissionsEmail: 'applevalleybsk@gmail.com',
  hours: 'Mon – Sat · 9:00 AM – 3:30 PM',
  officeHours: 'Office: Mon – Sat · 9:00 AM – 4:00 PM',
  // Key people (shown on the Contact page).
  contacts: [
    { name: 'School Office', phone: '+91 70905 85327', altPhone: '+91 73575 85327' },
    { name: 'Syed Saber (President)', phone: '+91 76767 67852' },
    { name: 'Shaik Naseer', phone: '+91 82174 80280' },
  ],
}

// WhatsApp click-to-chat. `number` must be digits only, with country code.
export const WHATSAPP = {
  number: '917090585327',
  message:
    'Hello! I would like to know more about admissions at Apple Valley Creative School.',
  tooltip: 'Chat with us on WhatsApp',
}

// Primary navigation used by the Navbar and Footer.
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Faculty', to: '/faculty' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const QUICK_LINKS = [
  { label: 'Admissions', to: '/admissions' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Faculty', to: '/faculty' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Contact', to: '/contact' },
]

// TODO: replace the '#' placeholders with the school's real social profile URLs.
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'Facebook' },
  { label: 'Instagram', href: '#', icon: 'Instagram' },
  { label: 'YouTube', href: '#', icon: 'Youtube' },
]

// Deterministic, always-available stock photography via picsum. Used as a
// polished placeholder until real photos are dropped in. SmartImage falls
// back to a branded placeholder if the network is unavailable, so the UI
// never shows a broken image.
export const photo = (seed, w = 900, h = 640) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

// Dummy avatar for placeholder people (faculty, testimonials). Generates a
// friendly, deterministic cartoon face from a seed. Replace with real photos
// by setting a `photo` field (e.g. asset('images/faculty/name.jpg')).
export const avatarUrl = (seed) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&radius=50&backgroundColor=eef4ff,fff9e6,fdeaec`

// Real local images. Drop files into `public/images/` and reference them by
// path, e.g. asset('campus/front-gate.jpg') or asset('logo.png'). Works with
// Vite's relative base so the same build runs on Netlify, Vercel and GitHub
// Pages. See public/images/README.md for the expected filenames.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`
