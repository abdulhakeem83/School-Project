import { motion } from 'framer-motion'
import { fadeUp, inView } from '../utils/motion'

/**
 * Consistent section heading: optional eyebrow, title and subtitle.
 * `align` controls text alignment; `light` renders on dark backgrounds.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`flex max-w-2xl flex-col gap-3 ${alignment}`}
    >
      {eyebrow && (
        <span
          className={`eyebrow ${light ? 'bg-white/15 text-accent' : ''}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight sm:text-4xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed ${light ? 'text-white/80' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
