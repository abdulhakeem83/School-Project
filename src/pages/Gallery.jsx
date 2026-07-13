import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import PageBanner from '../components/PageBanner'
import GalleryGrid from '../components/GalleryGrid'
import CTASection from '../components/CTASection'

import { GALLERY, GALLERY_CATEGORIES } from '../data/gallery'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')

  useSEO({
    title: 'Gallery',
    description:
      'Explore life at North Public School through our photo gallery — campus, sports, Annual Day, national celebrations, science fairs and class activities.',
  })

  // Filter the gallery by the selected category chip.
  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? GALLERY
        : GALLERY.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  return (
    <PageTransition>
      <PageBanner
        title="Photo Gallery"
        subtitle="Moments of learning, celebration and togetherness captured across our campus."
        breadcrumb={['Gallery']}
      />

      <section className="container-page py-16">
        {/* Category filter chips */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {GALLERY_CATEGORIES.map((category) => {
            const active = category === activeCategory
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 hover:text-primary'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Grid (re-mounts on filter change to re-run entrance animations) */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-10"
        >
          {filtered.length > 0 ? (
            <GalleryGrid items={filtered} />
          ) : (
            <p className="py-16 text-center text-slate-500">No photos in this category yet.</p>
          )}
        </motion.div>
      </section>

      <CTASection
        title="Be part of these moments"
        subtitle="Join the North Public School family and create memories that last a lifetime."
        primaryLabel="Apply Now"
        primaryTo="/admissions"
      />
    </PageTransition>
  )
}
