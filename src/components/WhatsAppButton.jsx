import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP } from '../data/constants'

// WhatsApp brand glyph (Lucide doesn't ship brand icons, so we inline it).
function WhatsAppGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.94-5.359 11.944-11.893a11.821 11.821 0 00-3.483-8.411Z" />
    </svg>
  )
}

/**
 * Floating WhatsApp click-to-chat button (bottom-right, site-wide).
 * - Subtle pulse ring to draw the eye without being distracting.
 * - Tooltip label on hover / focus.
 * - Fades in after a short scroll so it doesn't cover the hero on load.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const href = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={WHATSAPP.tooltip}
            className="group relative flex items-center"
          >
            {/* Pulsing ring (subtle) */}
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40 [animation-duration:2.4s]" />

            {/* Tooltip label — expands on hover / focus */}
            <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-ink px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lift transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              {WHATSAPP.tooltip}
            </span>

            {/* Button */}
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift ring-4 ring-white/60 transition-transform duration-300 group-hover:scale-110">
              <WhatsAppGlyph className="h-7 w-7" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
