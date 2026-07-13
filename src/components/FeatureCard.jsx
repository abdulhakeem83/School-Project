import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motion'

/**
 * Icon feature card used in the "Why Choose Us" grid.
 */
export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.article
      variants={fadeUp}
      className="card-base group h-full p-6 hover:-translate-y-1.5 hover:shadow-card"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-500 text-white shadow-soft transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mb-2 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </motion.article>
  )
}
