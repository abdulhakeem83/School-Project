// Branded initials avatar for people (faculty, testimonials).
// Clean and always available — no external headshot dependency in Phase 1.

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

export default function Avatar({ name, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-12 w-12 text-base',
    md: 'h-20 w-20 text-2xl',
    lg: 'h-24 w-24 text-3xl',
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
