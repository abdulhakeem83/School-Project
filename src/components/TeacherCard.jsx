import { motion } from 'framer-motion'
import { GraduationCap, Clock, BookMarked } from 'lucide-react'
import { fadeUp } from '../utils/motion'
import Avatar from './Avatar'

/**
 * Faculty profile card with initials avatar, qualification, experience and subject.
 */
export default function TeacherCard({ teacher }) {
  const { name, role, qualification, experience, subject, photo } = teacher

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card-base group relative h-full overflow-hidden text-center hover:shadow-lift"
    >
      {/* Decorative header band */}
      <div className="relative h-20 overflow-hidden bg-brand-gradient">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
        {/* Shine sweep on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      </div>

      <div className="relative z-10 -mt-12 px-6 pb-6">
        <div className="mx-auto w-fit transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-3 group-hover:scale-110">
          <Avatar name={name} src={photo} size="md" className="transition-shadow duration-300 group-hover:ring-accent/70" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary">{name}</h3>
        <p className="text-sm font-medium text-primary">{role}</p>
        {/* Animated underline */}
        <span className="mx-auto mt-2 block h-0.5 w-0 rounded-full bg-gradient-to-r from-primary via-brandred to-accent transition-all duration-300 group-hover:w-16" />

        <dl className="mt-4 space-y-2 text-left text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            <span>{qualification}</span>
          </div>
          <div className="flex items-start gap-2">
            <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            <span>{subject}</span>
          </div>
          {experience && (
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
              <span>{experience} experience</span>
            </div>
          )}
        </dl>
      </div>
    </motion.article>
  )
}
