import { motion } from 'framer-motion'
import { GraduationCap, Clock, BookMarked } from 'lucide-react'
import { fadeUp } from '../utils/motion'
import Avatar from './Avatar'

/**
 * Faculty profile card with initials avatar, qualification, experience and subject.
 */
export default function TeacherCard({ teacher }) {
  const { name, role, qualification, experience, subject } = teacher

  return (
    <motion.article
      variants={fadeUp}
      className="card-base group h-full overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-card"
    >
      {/* Decorative header band */}
      <div className="relative h-20 bg-brand-gradient">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
      </div>

      <div className="-mt-10 px-6 pb-6">
        <div className="mx-auto w-fit">
          <Avatar name={name} size="md" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">{name}</h3>
        <p className="text-sm font-medium text-primary">{role}</p>

        <dl className="mt-4 space-y-2 text-left text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            <span>{qualification}</span>
          </div>
          <div className="flex items-start gap-2">
            <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            <span>{subject}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            <span>{experience} experience</span>
          </div>
        </dl>
      </div>
    </motion.article>
  )
}
