import { useState } from 'react'
import { SCHOOL, asset } from '../data/constants'

/**
 * School logo lockup: circular emblem + wordmark. Uses the real logo image
 * from `public/images/logo.jpg` and falls back to a text-only wordmark if the
 * file is missing. `variant="light"` for dark backgrounds.
 */
export default function Logo({ variant = 'dark' }) {
  const light = variant === 'light'
  const [imgOk, setImgOk] = useState(true)

  return (
    <span className="flex items-center gap-2.5">
      {imgOk && (
        <img
          src={asset('images/logo.jpg')}
          alt={`${SCHOOL.name} emblem`}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-accent/70 shadow-soft sm:h-12 sm:w-12"
          onError={() => setImgOk(false)}
        />
      )}
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-sm font-extrabold sm:text-base ${light ? 'text-white' : 'text-brandred'}`}>
          Apple Valley
        </span>
        <span className={`font-display text-[11px] font-bold uppercase tracking-wide ${light ? 'text-accent' : 'text-primary'}`}>
          Creative School
        </span>
      </span>
    </span>
  )
}
