import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import SmartImage from './SmartImage'

/**
 * Responsive masonry-style gallery grid with a built-in lightbox.
 * Uses CSS columns for the masonry effect (no extra dependency).
 */
export default function GalleryGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const open = activeIndex !== null

  const close = () => setActiveIndex(null)
  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setActiveIndex((i) => (i + 1) % items.length)

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="group relative block w-full overflow-hidden rounded-2xl shadow-soft ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`View image: ${item.caption}`}
          >
            <SmartImage
              src={item.src}
              alt={item.caption}
              label={item.category}
              className="min-h-[180px] w-full"
              imgClassName="w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center justify-between text-left text-white">
                <span className="text-sm font-medium">{item.caption}</span>
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            <motion.figure
              key={items[activeIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={items[activeIndex].src}
                alt={items[activeIndex].caption}
                label={items[activeIndex].category}
                className="max-h-[75vh] w-full rounded-2xl"
                imgClassName="max-h-[75vh] w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-white/85">
                {items[activeIndex].caption}
                <span className="ml-2 text-white/50">
                  ({activeIndex + 1} / {items.length})
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
