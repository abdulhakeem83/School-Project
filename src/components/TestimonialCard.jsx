import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { fadeUp } from '../utils/motion'
import Avatar from './Avatar'

/**
 * Testimonial card for parents, students and alumni.
 */
export default function TestimonialCard({ testimonial }) {
  const { name, role, quote, rating = 5 } = testimonial

  return (
    <motion.figure
      variants={fadeUp}
      className="card-base flex h-full flex-col gap-4 p-6 hover:-translate-y-1 hover:shadow-card"
    >
      <Quote className="h-8 w-8 text-accent" aria-hidden="true" />
      <blockquote className="flex-1 text-sm leading-relaxed text-slate-700">
        “{quote}”
      </blockquote>

      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
        ))}
      </div>

      <figcaption className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <Avatar name={name} size="sm" />
        <div>
          <div className="font-semibold text-ink">{name}</div>
          <div className="text-xs text-slate-500">{role}</div>
        </div>
      </figcaption>
    </motion.figure>
  )
}
