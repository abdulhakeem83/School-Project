import { Loader2 } from 'lucide-react'

// Fallback shown while a lazy-loaded page chunk is being fetched.
export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
