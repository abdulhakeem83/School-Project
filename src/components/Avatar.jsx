// Avatar for people (faculty, testimonials). Shows a photo when `src` is
// provided and gracefully falls back to a clean, branded initials avatar if
// the image is missing or fails to load — so the UI never breaks.

import { useState } from 'react'

const GRADIENTS = [
  'from-primary-600 to-primary-400',
  'from-success to-emerald-400',
  'from-accent-600 to-accent-400',
  'from-sky-600 to-sky-400',
  'from-violet-600 to-violet-400',
  'from-rose-500 to-rose-400',
]

function initials(name = '') {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

export default function Avatar({ name, src, size = 'md', className = '' }) {
  const [imgOk, setImgOk] = useState(Boolean(src))

  const sizes = {
    sm: 'h-12 w-12 text-base',
    md: 'h-20 w-20 text-2xl',
    lg: 'h-24 w-24 text-3xl',
  }

  if (src && imgOk) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setImgOk(false)}
        className={`${sizes[size]} rounded-full bg-primary-50 object-cover shadow-soft ring-4 ring-white ${className}`}
      />
    )
  }

  // Deterministic gradient based on the name so it stays stable.
  const idx = (name?.charCodeAt(0) || 0) % GRADIENTS.length

  return (
    <div
      className={`flex ${sizes[size]} items-center justify-center rounded-full bg-gradient-to-br ${GRADIENTS[idx]} font-display font-bold text-white shadow-soft ring-4 ring-white ${className}`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
