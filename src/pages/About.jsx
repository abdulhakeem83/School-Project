import { motion } from 'framer-motion'
import { Target, Eye, Heart, Sparkles, Award } from 'lucide-react'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import PageBanner from '../components/PageBanner'
import SectionTitle from '../components/SectionTitle'
import CTASection from '../components/CTASection'
import Avatar from '../components/Avatar'
import SmartImage from '../components/SmartImage'

import { SCHOOL, photo } from '../data/constants'
import { TIMELINE, ACHIEVEMENTS } from '../data/highlights'
import { staggerContainer, fadeUp, slideRight, inView } from '../utils/motion'

const CORE_VALUES = [
  { icon: Heart, title: 'Compassion', text: 'Kindness and empathy at the heart of all we do.' },
  { icon: Sparkles, title: 'Excellence', text: 'Striving to be our best in every endeavour.' },
  { icon: Target, title: 'Integrity', text: 'Honesty, responsibility and strong character.' },
  { icon: Eye, title: 'Curiosity', text: 'A lifelong love of learning and discovery.' },
]

const MESSAGES = [
  {
    name: 'Mr. Suresh Agarwal',
    role: 'Chairman',
    text: `When we founded ${SCHOOL.name}, we dreamed of a place where children are valued as individuals and inspired to dream big. Today, that dream lives in every classroom, every field and every smile on our campus. We remain committed to providing education that builds not just successful careers, but good human beings.`,
  },
  {
    name: 'Dr. Anjali Mehta',
    role: 'Principal',
    text: `Our approach is simple: know every child, challenge every child, and celebrate every child. We combine a rigorous CBSE curriculum with sports, arts and values so our students grow into confident, compassionate and capable young leaders. I warmly invite you to visit us and experience the North Public School difference.`,
  },
]

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
            <div className="overflow-hidden rounded-3xl shadow-card">
              <SmartImage
                src={photo('about-campus', 900, 700)}
                alt={`${SCHOOL.name} campus`}
                label="Our Campus"
                className="aspect-[4/3] w-full"
                imgClassName="aspect-[4/3] w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={staggerContainer()} initial="hidden" whileInView="show" viewport={inView}>
            <motion.span variants={fadeUp} className="eyebrow">
              Our Story
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              25 years of shaping young minds
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-slate-600">
              Founded in {SCHOOL.established}, {SCHOOL.name} began with a simple yet powerful idea —
              that education should nurture the whole child. What started with a handful of
              classrooms has blossomed into a thriving campus of over 1,000 students and 75+
              dedicated educators.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-slate-600">
              {SCHOOL.affiliation}, we offer a seamless journey from Pre-Primary to Senior
              Secondary, blending academic excellence with sports, arts, technology and strong
              human values.
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
              text: 'To be a leading centre of learning that empowers every student to become a confident, responsible and compassionate global citizen — ready to lead in a changing world.',
            },
            {
              icon: Target,
              title: 'Our Mission',
              text: 'To provide holistic, values-based education through innovative teaching, world-class facilities and a nurturing environment that celebrates the unique potential of every child.',
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

      {/* Chairman & Principal messages */}
      <section className="bg-white py-20">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {MESSAGES.map((m, i) => (
            <motion.figure
              key={m.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base flex flex-col gap-4 p-8"
            >
              <div className="flex items-center gap-4">
                <Avatar name={m.name} size="md" />
                <figcaption>
                  <div className="font-display text-lg font-bold text-ink">{m.name}</div>
                  <div className="text-sm font-medium text-primary">{m.role}</div>
                </figcaption>
              </div>
              <blockquote className="leading-relaxed text-slate-600">“{m.text}”</blockquote>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Our Journey"
          title="Milestones & achievements"
          subtitle="A quarter-century of growth, recognition and proud moments."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 h-full w-0.5 bg-primary/15 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 0.5 }}
                className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'
                }`}
              >
                {/* Dot */}
                <span
                  className={`absolute left-2.5 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-accent shadow-soft sm:left-auto ${
                    i % 2 === 0 ? 'sm:-right-2' : 'sm:-left-2'
                  }`}
                />
                <div className="card-base p-5">
                  <span className="font-display text-2xl font-extrabold text-primary">
                    {item.year}
                  </span>
                  <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement highlights */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-4 sm:grid-cols-2"
        >
          {ACHIEVEMENTS.map((a) => (
            <motion.div
              key={a.label}
              variants={fadeUp}
              className="flex items-center gap-4 rounded-2xl bg-primary/5 p-5 ring-1 ring-primary/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <a.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-ink">{a.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <CTASection
        title="Come see it for yourself"
        subtitle="Book a campus visit and experience the North Public School difference first-hand."
        primaryLabel="Schedule a Visit"
        primaryTo="/contact"
      />
    </PageTransition>
  )
}
