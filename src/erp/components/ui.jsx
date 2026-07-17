import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Pagination hook: slices `items` into pages. Pass `resetKey` (e.g. a search
// string) so the page resets to 1 whenever the filtered set changes.
export function usePaged(items, size = 10, resetKey = '') {
  const [page, setPage] = useState(1)
  useEffect(() => { setPage(1) }, [resetKey])
  const pages = Math.max(1, Math.ceil(items.length / size))
  const current = Math.min(page, pages)
  const start = (current - 1) * size
  return { page: current, setPage, pages, paged: items.slice(start, start + size), total: items.length, start, size }
}

// Pagination controls + "showing X–Y of Z".
export function Pagination({ page, pages, total, start, size, onPage }) {
  if (total === 0) return null
  const from = start + 1
  const to = Math.min(start + size, total)
  const btn = 'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium ring-1 transition disabled:opacity-40'
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <span className="text-xs text-slate-400">Showing {from}–{to} of {total}</span>
      <div className="flex items-center gap-1">
        <button className={`${btn} bg-white text-ink ring-slate-200 hover:ring-primary`} onClick={() => onPage(page - 1)} disabled={page === 1} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i} onClick={() => onPage(i + 1)}
            className={`${btn} ${page === i + 1 ? 'bg-primary text-white ring-primary' : 'bg-white text-ink ring-slate-200 hover:ring-primary'}`}
          >
            {i + 1}
          </button>
        ))}
        <button className={`${btn} bg-white text-ink ring-slate-200 hover:ring-primary`} onClick={() => onPage(page + 1)} disabled={page === pages} aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Page heading for ERP screens.
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// Small stat tile with icon.
export function StatTile({ icon: Icon, label, value, sub, tone = 'primary', index = 0 }) {
  const tones = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/20 text-accent-700',
    success: 'bg-success-light text-success',
    red: 'bg-brandred-50 text-brandred',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="card-base flex items-center gap-4 p-5"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="font-display text-2xl font-extrabold text-ink">{value}</div>
        <div className="truncate text-sm text-slate-500">{label}</div>
        {sub && <div className="text-xs text-slate-400">{sub}</div>}
      </div>
    </motion.div>
  )
}

// Card container with an optional title.
export function Card({ title, action, children, className = '' }) {
  return (
    <div className={`card-base p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

// Labelled text input for modal forms.
export function TextField({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        type={type} value={value} required={required} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  )
}

// Labelled select for modal forms.
export function SelectField({ label, value, onChange, options, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <select
        value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value
          const lab = typeof o === 'string' ? o : o.label
          return <option key={val} value={val}>{lab}</option>
        })}
      </select>
    </label>
  )
}

// Coloured status badge.
export function Badge({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-600',
    green: 'bg-success-light text-success',
    red: 'bg-brandred-50 text-brandred',
    amber: 'bg-accent/20 text-accent-700',
    blue: 'bg-primary/10 text-primary',
  }
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>
}

// Circular percentage ring (SVG).
export function Ring({ value = 0, size = 88, label }) {
  const r = (size - 10) / 2
  const c = 2 * Math.PI * r
  const dash = (value / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="8" className="fill-none stroke-slate-100" />
        <circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth="8" strokeLinecap="round"
          className="fill-none stroke-success transition-all duration-700"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span className="absolute font-display text-lg font-extrabold text-ink">{value}%</span>
      {label && <span className="absolute -bottom-5 text-xs text-slate-400">{label}</span>}
    </div>
  )
}
