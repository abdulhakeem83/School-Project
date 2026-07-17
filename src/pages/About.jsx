import { motion } from 'framer-motion'
import { Target, Eye, Heart, Sparkles, Award } from 'lucide-react'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import PageBanner from '../components/PageBanner'
import SectionTitle from '../components/SectionTitle'
import CTASection from '../components/CTASection'
import Avatar from '../components/Avatar'
import SmartImage from '../components/SmartImage'

import { SCHOOL, asset } from '../data/constants'
import { staggerContainer, fadeUp, slideRight, inView } from '../utils/motion'

// Our Mission, expressed as four guiding values.
const CORE_VALUES = [
  {
    icon: Sparkles,
    title: 'Holistic Education',
    text: 'A perfect blend of high-quality modern academics and comprehensive religious (Deeni) education.',
  },
  {
    icon: Heart,
    title: 'Creative Excellence',
    text: 'An inspiring environment that encourages critical thinking, innovation and practical learning over rote memorisation.',
  },
  {
    icon: Award,
    title: 'Dedicated Mentorship',
    text: 'Highly qualified, experienced educators who guide, motivate and unlock the true potential of every child.',
  },
  {
    icon: Target,
    title: 'Character Building',
    text: 'Strong moral ethics, cultural respect and a lifelong love for learning in a safe, supportive atmosphere.',
  },
]

// Message from the President.
const PRESIDENT = {
  name: 'Syed Saber',
  role: `President, ${SCHOOL.name}`,
  paragraphs: [
    'Dear Parents, Students, and Well-wishers, welcome to Apple Valley Creative School.',
    'From the very inception of this institution, our guiding philosophy has been rooted in the belief that education is the most powerful tool to transform society. At Apple Valley, our motto, “Where Creativity Meets Excellence,” is not just a slogan; it is the core foundation of everything we do.',
    'We live in a rapidly changing world that demands not just academic intelligence, but also strong character, adaptability, and deep moral values. To achieve this, we have brought together a dedicated team of highly qualified, experienced, and deeply committed educators. Together, we work tirelessly to provide a balanced environment where high-quality modern education seamlessly blends with comprehensive religious (Deeni) education.',
    'Our goal is to ensure that while our students scale great heights in the modern world, they remain firmly anchored in their faith, culture, and ethical values. We do not just aim to produce successful professionals; we aim to nurture compassionate leaders and responsible citizens who will make our community proud.',
    'I invite you to be a part of this beautiful journey as we work together to unlock the true potential of our children and guide them toward a bright, successful future.',
  ],
}

export default function About() {
  useSEO({
    title: 'About Us',
    description: `Learn about ${SCHOOL.name} — our history, vision, mission, core values and achievements since ${SCHOOL.established}.`,
  })

  return (
    <PageTransition>
      <PageBanner
        title="About Our School"
        subtitle={`Discover the story, values and people behind ${SCHOOL.name}.`}
        breadcrumb={['About']}
      />

      {/* Introduction */}
      <section className="container-page py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={slideRight} initial="hidden" whileInView="show" viewport={inView}>
            <div className="group overflow-hidden rounded-3xl shadow-card">
              <SmartImage
                src={asset('images/campus/building.jpg')}
                alt={`${SCHOOL.name} campus`}
                label="Our Campus"
                className="aspect-[4/3] w-full"
                imgClassName="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </motion.div>

          <motion.div variants={staggerContainer()} initial="hidden" whileInView="show" viewport={inView}>
            <motion.span variants={fadeUp} className="eyebrow">
              Our Story
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Where creativity meets excellence
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-slate-600">
              Located at Chilla Galli in Basavakalyan, {SCHOOL.name} is a premier educational
              institution dedicated to shaping the bright futures of young minds — nurturing their
              innate creativity and guiding them toward academic success.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-slate-600">
              Our school boasts a dedicated team of highly qualified, experienced and passionate
              educators who employ modern, interactive teaching methodologies. We believe in
              holistic development, offering a perfect blend of high-quality modern education
              alongside comprehensive religious (Deeni) education — so our students grow up with
              strong academic foundations, excellent moral values and deep spiritual ethics.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-slate-600">
              We provide a safe and inspiring environment that empowers children to face the
              challenges of the modern world with confidence while staying deeply rooted in their
              cultural and moral values.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Eye,
              title: 'Our Vision',
              text: 'To be a leading educational institution that empowers students to achieve academic brilliance and creative excellence, while remaining deeply rooted in strong moral, ethical and spiritual values — nurturing confident, compassionate and responsible global citizens who can positively impact the world.',
            },
            {
              icon: Target,
              title: 'Our Mission',
              text: 'To provide a perfect blend of modern academics and Deeni education, foster an inspiring environment for critical thinking and innovation, maintain dedicated and experienced mentors, and instill strong moral ethics and a lifelong love for learning.',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base p-8"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <card.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Core Values"
          title="The principles that guide us"
          subtitle="These four values shape the culture of our school and the character of our students."
        />
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CORE_VALUES.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className="card-base group p-6 text-center hover:-translate-y-1.5 hover:shadow-card"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-700 transition group-hover:bg-accent group-hover:text-ink">
                <value.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{value.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* President's message */}
      <section className="bg-white py-20">
        <div className="container-page">
          <SectionTitle eyebrow="From the President" title="A message from our President" />
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.5 }}
            className="card-base mx-auto mt-12 max-w-3xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-4">
              <Avatar name={PRESIDENT.name} size="md" />
              <figcaption>
                <div className="font-display text-lg font-bold text-ink">{PRESIDENT.name}</div>
                <div className="text-sm font-medium text-primary">{PRESIDENT.role}</div>
              </figcaption>
            </div>
            <blockquote className="mt-6 space-y-4 leading-relaxed text-slate-600">
              {PRESIDENT.paragraphs.map((p, i) => {
                const MOTTO = 'Where Creativity Meets Excellence'
                if (!p.includes(MOTTO)) return <p key={i}>{p}</p>
                const [before, after] = p.split(MOTTO)
                return (
                  <p key={i}>
                    {before}
                    <span className="motto">{MOTTO}</span>
                    {after}
                  </p>
                )
              })}
            </blockquote>
            <p className="mt-6 font-display font-semibold text-ink">Warm regards,</p>
            <p className="text-slate-600">{PRESIDENT.name} — {PRESIDENT.role}</p>
          </motion.figure>
        </div>
      </section>

      <CTASection
        title="Come see it for yourself"
        subtitle={`Book a campus visit and experience the ${SCHOOL.name} difference first-hand.`}
        primaryLabel="Schedule a Visit"
        primaryTo="/contact"
      />
    </PageTransition>
  )
}
