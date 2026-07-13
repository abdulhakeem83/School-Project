import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { fadeUp } from '../utils/motion'
import SmartImage from './SmartImage'

// Formats an ISO date string to a friendly, readable form.
function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/**
 * News / announcement card.
 */
export default function NewsCard({ item }) {
  const { title, category, date, excerpt, src } = item

  return (
    <motion.article
      variants={fadeUp}
      className="card-base group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-card"
    >
      <div className="relative h-44 overflow-hidden">
        <SmartImage
          src={src}
          alt={title}
          label={category}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink shadow-soft">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-ink">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">{excerpt}</p>
        <button
          type="button"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5"
        >
          Read more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  )
}
