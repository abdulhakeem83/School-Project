import { Link } from 'react-router-dom'
import { Phone, Sparkles } from 'lucide-react'
import { CONTACT } from '../data/constants'

/**
 * Slim, eye-catching announcement bar shown site-wide above the navbar.
 * Draws attention to admissions with a subtle pulse and a shine sweep.
 */
export default function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-brand-gradient text-white">
      {/* animated shine sweep */}
      <div className="animate-shine pointer-events-none" />
      <div className="container-page flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-xs font-medium sm:text-sm">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
          <strong className="font-bold">Admissions Open 2026–27</strong>
        </span>

        <Link
          to="/admissions"
          className="rounded-full bg-white/15 px-3 py-0.5 font-semibold ring-1 ring-white/25 transition hover:bg-accent hover:text-ink"
        >
          Apply Now →
        </Link>

        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
          className="hidden items-center gap-1.5 hover:text-accent sm:flex"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {CONTACT.phone}
        </a>
      </div>
    </div>
  )
}
