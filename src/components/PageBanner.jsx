import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * Reusable hero banner for interior pages, with a breadcrumb trail.
 */
export default function PageBanner({ title, subtitle, breadcrumb = [] }) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
              <li>
                <Link to="/" className="transition hover:text-accent">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb} className="flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium text-white">{crumb}</span>
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
