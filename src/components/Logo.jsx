import { GraduationCap } from 'lucide-react'
import { SCHOOL } from '../data/constants'

/**
 * School logo lockup: mark + wordmark. `variant="light"` for dark backgrounds.
 */
export default function Logo({ variant = 'dark' }) {
  const light = variant === 'light'
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-500 text-white shadow-soft">
        <GraduationCap className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold ${light ? 'text-white' : 'text-ink'}`}
        >
          {SCHOOL.name}
        </span>
        <span
          className={`text-[11px] font-medium ${light ? 'text-white/70' : 'text-slate-500'}`}
        >
          {SCHOOL.tagline}
        </span>
      </span>
    </span>
  )
}
