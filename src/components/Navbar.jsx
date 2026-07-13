import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn } from 'lucide-react'
import { NAV_LINKS } from '../data/constants'
import Logo from './Logo'

/**
 * Sticky navigation bar.
 * - Transparent when at the top of the Home page (over the hero).
 * - Solid white with a shadow once scrolled, and on all interior pages.
 * - Fully responsive with an animated mobile drawer.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  // Only the Home page has a dark hero to sit on top of.
  const transparent = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname])

  const linkBase =
    'relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-accent after:transition-all after:duration-300 hover:after:w-full'

  const linkColor = transparent
    ? 'text-white/90 hover:text-white'
    : 'text-slate-700 hover:text-primary'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/90 shadow-soft backdrop-blur-md'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between lg:h-20" aria-label="Primary">
        <Link to="/" aria-label="North Public School — Home">
          {/* Use light logo text while transparent over the hero */}
          <div className={transparent ? '[&_span]:!text-white [&_.text-slate-500]:!text-white/70' : ''}>
            <Logo />
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${linkBase} ${linkColor} ${isActive ? 'after:w-full' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              transparent
                ? 'bg-white text-primary hover:bg-accent hover:text-ink'
                : 'bg-primary text-white hover:bg-primary-800'
            }`}
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Login
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={`inline-flex items-center justify-center rounded-lg p-2 lg:hidden ${
            transparent ? 'text-white' : 'text-ink'
          }`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-base font-medium transition ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-base font-semibold text-white"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
