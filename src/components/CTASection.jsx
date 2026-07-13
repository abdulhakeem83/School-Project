import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { CONTACT } from '../data/constants'

/**
 * Call-to-action band used near the bottom of most pages.
 */
export default function CTASection({
  title = 'Admissions Open for 2026–27',
  subtitle = 'Give your child the head start they deserve. Limited seats available — apply today.',
  primaryLabel = 'Apply Today',
  primaryTo = '/admissions',
}) {
  return (
    <section className="container-page py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center shadow-lift sm:px-12"
      >
        {/* Decorative accents */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-accent/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-white/85">{subtitle}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to={primaryTo} className="btn-primary">
              {primaryLabel}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="btn-outline">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
