import { motion } from 'framer-motion'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import PageBanner from '../components/PageBanner'
import SectionTitle from '../components/SectionTitle'
import FacilityCard from '../components/FacilityCard'
import CTASection from '../components/CTASection'

import { FACILITIES } from '../data/facilities'
import { staggerContainer, inView } from '../utils/motion'

export default function Facilities() {
  useSEO({
    title: 'Facilities',
    description:
      'Explore the facilities at Apple Valley Creative School — well-organised classrooms, library, activity spaces and a safe, inspiring learning environment.',
  })

  return (
    <PageTransition>
      <PageBanner
        title="Our Facilities"
        subtitle="Thoughtfully designed spaces and infrastructure that make learning safe, joyful and effective."
        breadcrumb={['Facilities']}
      />

      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Infrastructure"
          title="Everything under one roof"
          subtitle="From cutting-edge labs to green playgrounds, every facility is built with your child’s growth in mind."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FACILITIES.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </motion.div>
      </section>

      <CTASection
        title="Want a closer look?"
        subtitle="Schedule a guided campus tour and see our facilities in action."
        primaryLabel="Book a Campus Tour"
        primaryTo="/contact"
      />
    </PageTransition>
  )
}
