import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from 'lucide-react'
import { SCHOOL, CONTACT, QUICK_LINKS, SOCIAL_LINKS, asset } from '../data/constants'

// Map social icon names (from data) to their Lucide components.
const ICONS = { Facebook, Instagram, Twitter, Youtube, Linkedin }

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    // No backend in Phase 1 — just confirm to the user.
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-slate-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand + intro */}
        <div>
          <span className="flex items-center gap-2.5">
            <img
              src={asset('images/logo.jpg')}
              alt={`${SCHOOL.name} emblem`}
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-accent/70"
            />
            <span className="font-display text-base font-bold leading-tight text-white">
              {SCHOOL.name}
            </span>
          </span>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {SCHOOL.tagline}. {SCHOOL.affiliation}. Nurturing confident, compassionate and
            future-ready learners since {SCHOOL.established}.
          </p>

          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = ICONS[social.icon]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-accent hover:text-ink"
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                </a>
              )
            })}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-base font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-block transition hover:translate-x-1 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-base font-semibold text-white">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{CONTACT.addressLines.join(', ')}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-accent">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-display text-base font-semibold text-white">Newsletter</h3>
          <p className="mt-4 text-sm text-slate-400">
            Subscribe for admission updates, events and school news.
          </p>
          <form onSubmit={handleSubscribe} className="mt-4">
            <div className="flex overflow-hidden rounded-full bg-white/10 p-1 ring-1 ring-white/15 focus-within:ring-accent">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex shrink-0 items-center justify-center rounded-full bg-accent px-4 text-ink transition hover:bg-accent-400"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {subscribed && (
              <p className="mt-2 text-sm font-medium text-accent" role="status">
                Thanks for subscribing! 🎉
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center text-sm text-slate-400 sm:flex-row sm:text-left">
          <p>
            © {year} {SCHOOL.name}. All rights reserved.
          </p>
          <p>
            <span className="text-accent">The SANA Educational &amp; Cultural Trust</span> ·
            Basavakalyan, Karnataka
          </p>
        </div>
      </div>
    </footer>
  )
}
