import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motion'
import SmartImage from './SmartImage'

/**
 * Facility card. `variant="compact"` shows an icon tile (Home preview);
 * the default variant shows a photo + description (Facilities page).
 */
export default function FacilityCard({ facility, variant = 'full' }) {
  const { icon: Icon, title, short, description, src } = facility

  if (variant === 'compact') {
    return (
      <motion.article
        variants={fadeUp}
        className="card-base group flex h-full flex-col items-center gap-3 p-6 text-center hover:-translate-y-1.5 hover:shadow-card"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-700 transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{short}</p>
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={fadeUp}
      className="card-base group h-full overflow-hidden hover:-translate-y-1.5 hover:shadow-card"
    >
      <div className="relative h-52 overflow-hidden">
        <SmartImage
          src={src}
          alt={`${title} at North Public School`}
          label={title}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-primary shadow-soft backdrop-blur">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </motion.article>
  )
}
