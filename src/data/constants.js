// ---------------------------------------------------------------------------
// Central place for school-wide constants. In Phase 2, values that become
// dynamic (contact info, social links, etc.) can be fetched from an API and
// this file kept as the fallback/shape reference.
// ---------------------------------------------------------------------------

export const SCHOOL = {
  name: 'North Public School',
  shortName: 'NPS',
  tagline: 'Learning Today, Leading Tomorrow',
  established: 2000,
  affiliation: 'Affiliated to CBSE, New Delhi',
  headline: 'Empowering Young Minds for a Better Tomorrow',
  intro:
    'A premier co-educational school in India offering a nurturing, future-ready environment from Pre-Primary through Senior Secondary.',
}

export const CONTACT = {
  addressLines: ['123 Vidya Marg, Sector 21', 'New Delhi, India — 110021'],
  phone: '+91 98765 43210',
  altPhone: '+91 11 4567 8900',
  email: 'info@northpublicschool.edu.in',
  admissionsEmail: 'admissions@northpublicschool.edu.in',
  hours: 'Mon – Sat · 8:00 AM – 3:30 PM',
  officeHours: 'Office: Mon – Sat · 8:30 AM – 4:00 PM',
}

// WhatsApp click-to-chat. `number` must be digits only, with country code.
// (Derived here from CONTACT.phone; edit to your real WhatsApp business number.)
export const WHATSAPP = {
  number: CONTACT.phone.replace(/\D/g, ''), // e.g. "919876543210"
  message: 'Hello! I would like to know more about admissions at North Public School.',
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

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'Youtube' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
]

// Deterministic, always-available real photography via picsum.
// SmartImage gracefully falls back to a branded placeholder if the network
// is unavailable, so the UI never shows a broken image.
export const photo = (seed, w = 900, h = 640) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`
