import { motion } from 'framer-motion'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import PageBanner from '../components/PageBanner'
import SectionTitle from '../components/SectionTitle'
import TeacherCard from '../components/TeacherCard'
import CTASection from '../components/CTASection'

import { LEADERSHIP, TEACHERS } from '../data/teachers'
import { staggerContainer, inView } from '../utils/motion'

export default function Faculty() {
  useSEO({
    title: 'Faculty',
    description:
      'Meet the experienced, caring faculty of North Public School — our Principal, Vice Principal and dedicated teachers across every subject.',
  })

  return (
    <PageTransition>
      <PageBanner
        title="Our Faculty"
        subtitle="Experienced, passionate educators who know, challenge and celebrate every child."
        breadcrumb={['Faculty']}
      />

      {/* Leadership */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="School Leadership"
          title="Guiding our school with vision"
          subtitle="Meet the leaders who set the tone for excellence and care across our campus."
        />
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2"
        >
          {LEADERSHIP.map((leader) => (
            <TeacherCard key={leader.id} teacher={leader} />
          ))}
        </motion.div>
      </section>

      {/* Teaching Faculty */}
      <section className="bg-white py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Teaching Faculty"
            title="Meet our teachers"
            subtitle="Qualified, dedicated mentors committed to bringing out the best in every student."
          />
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {TEACHERS.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Join our team of educators"
        subtitle="We’re always looking for passionate teachers to grow with us. Reach out to know more."
        primaryLabel="Contact Us"
        primaryTo="/contact"
      />
    </PageTransition>
  )
}
