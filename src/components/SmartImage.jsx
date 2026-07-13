import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

/**
 * Image with graceful degradation.
 * - Lazy-loads by default (performance).
 * - If the network image fails (e.g. offline), it falls back to a clean,
 *   branded placeholder instead of a broken-image icon — so the design always
 *   looks intentional. Swap `src` for real assets in Phase 2 with no UI change.
 */
export default function SmartImage({ src, alt = '', className = '', label, imgClassName = '' }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-white ${className}`}
        role="img"
        aria-label={alt || label || 'Image placeholder'}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center text-primary-600">
          <ImageIcon className="h-8 w-8 opacity-70" aria-hidden="true" />
          {(label || alt) && (
            <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
              {label || alt}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName}`}
    />
  )
}
