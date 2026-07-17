import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Quote, CheckCircle2 } from 'lucide-react'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import StatCard from '../components/StatCard'
import FeatureCard from '../components/FeatureCard'
import FacilityCard from '../components/FacilityCard'
import NewsCard from '../components/NewsCard'
import TestimonialCard from '../components/TestimonialCard'
import GalleryGrid from '../components/GalleryGrid'
import CTASection from '../components/CTASection'
import Avatar from '../components/Avatar'
import SmartImage from '../components/SmartImage'

import { STATS, FEATURES, PROGRAMS } from '../data/highlights'
import { FACILITIES_PREVIEW } from '../data/facilities'
import { NEWS } from '../data/news'
import { TESTIMONIALS } from '../data/testimonials'
import { GALLERY_PREVIEW } from '../data/gallery'
import { SCHOOL, asset } from '../data/constants'
import { staggerContainer, fadeUp, slideRight, inView } from '../utils/motion'

// Small helper: a section wrapper whose children stagger into view.
function Grid({ children, className }) {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  useSEO({
    title: 'Home',
    description:
      'Apple Valley Creative School, Basavakalyan — where creativity meets excellence. A blend of high-quality modern education and comprehensive religious (Deeni) education. Admissions open.',
  })

  const welcomePoints = [
    'Blend of modern & Deeni education',
    'Experienced and caring faculty',
    'Strong focus on values & character',
  ]

  return (
    <PageTransition>
      {/* 1. Hero */}
      <Hero />

      {/* 2. School Highlights */}
      <section className="container-page -mt-20 relative z-10">
        <Grid className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} index={i} {...stat} />
          ))}
        </Grid>
      </section>

      {/* 3. Welcome / Principal's message */}
      <section className="container-page py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="relative"
          >
            <div className="group overflow-hidden rounded-3xl shadow-card">
              <SmartImage
                src={asset('images/campus/student-book.jpg')}
                alt={`A student at ${SCHOOL.name}`}
                label="Our Students"
                className="aspect-square w-full"
                imgClassName="aspect-square w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-white p-5 shadow-lift ring-1 ring-slate-100 sm:block">
              <div className="font-display text-3xl font-extrabold text-primary">
                {new Date().getFullYear() - SCHOOL.established}+
              </div>
              <div className="text-sm text-slate-600">Years shaping futures</div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            <motion.span variants={fadeUp} className="eyebrow">
              Welcome to {SCHOOL.name}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
            >
              A message from our President
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Quote className="mt-4 h-8 w-8 text-accent" aria-hidden="true" />
            </motion.div>
            <motion.p variants={fadeUp} className="mt-2 text-base leading-relaxed text-slate-600">
              At {SCHOOL.name}, we believe education is the most powerful tool to transform
              society. Our motto —{' '}
              <span className="motto">“Where Creativity Meets Excellence”</span> — is the core
              foundation of everything we do, combining high-quality modern education with
              comprehensive religious (Deeni) education.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-slate-600">
              Our goal is to ensure that while our students scale great heights in the modern
              world, they remain firmly anchored in their faith, culture and ethical values.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-5 space-y-2">
              {welcomePoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium text-ink">
                  <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
              <Avatar name="Syed Saber" size="sm" />
              <div>
                <div className="font-semibold text-ink">Syed Saber</div>
                <div className="text-sm text-slate-500">President, {SCHOOL.name}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="bg-white py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Everything your child needs to thrive"
            subtitle="A future-ready environment built around academics, character, creativity and care."
          />
          <Grid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </Grid>
        </div>
      </section>

      {/* 5. Academic Programs */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Academic Programs"
          title="A pathway for every stage of learning"
          subtitle="Thoughtfully designed programmes that grow with your child, from first steps to graduation."
        />
        <Grid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program) => (
            <motion.article
              key={program.title}
              variants={fadeUp}
              className="card-base group relative overflow-hidden p-6 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${program.accent}`}
              />
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-ink">{program.title}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {program.grades}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-accent-700">{program.ageRange}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{program.description}</p>
            </motion.article>
          ))}
        </Grid>
      </section>

      {/* 6. Facilities */}
      <section className="bg-white py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="World-Class Facilities"
            title="Spaces designed for discovery"
            subtitle="From smart classrooms to sprawling playgrounds, our campus inspires learning at every turn."
          />
          <Grid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES_PREVIEW.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} variant="compact" />
            ))}
          </Grid>
          <div className="mt-10 text-center">
            <Link to="/facilities" className="btn-ghost">
              View All Facilities
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Latest News */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Latest News & Events"
          title="What's happening at school"
          subtitle="Stay in the loop with our announcements, celebrations and achievements."
        />
        <Grid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NEWS.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </Grid>
      </section>

      {/* 8. Gallery Preview */}
      <section className="bg-white py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow={`Life at ${SCHOOL.name}`}
            title="A glimpse into our campus"
            subtitle="Moments of learning, celebration and togetherness from around our school."
          />
          <div className="mt-12">
            <GalleryGrid items={GALLERY_PREVIEW} />
          </div>
          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-ghost">
              View Full Gallery
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Testimonials"
          title="Loved by parents, students & alumni"
          subtitle={`Real words from the families who make up the ${SCHOOL.name} community.`}
        />
        <Grid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </Grid>
      </section>

      {/* 10. CTA */}
      <CTASection />
    </PageTransition>
  )
}
