import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle, GraduationCap, Award, ShieldCheck } from 'lucide-react'
import { SCHOOL, asset } from '../data/constants'
import { staggerContainer, fadeUp } from '../utils/motion'

const HERO_BG = asset('images/campus/building.jpg')

/**
 * Home page hero: full-bleed school building background, gradient overlay,
 * headline, description and primary/secondary calls to action.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt={`${SCHOOL.name} campus building`}
          className="h-full w-full object-cover"
          fetchpriority="high"
        />
        {/* Gradient overlay for legible text */}
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Decorative floating accents */}
      <div className="pointer-events-none absolute right-10 top-28 hidden h-24 w-24 rounded-3xl bg-accent/20 blur-xl lg:block" />

      <div className="container-page relative py-28 lg:py-32">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur"
          >
            <Award className="h-4 w-4 text-accent" aria-hidden="true" />
            {SCHOOL.affiliation}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
          >
            Where <span className="text-accent">Creativity</span> Meets{' '}
            <span className="text-accent">Excellence</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85"
          >
            {SCHOOL.intro} At {SCHOOL.name}, we blend academic excellence with values, creativity
            and care — so every child is ready to lead tomorrow.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/admissions" className="btn-primary">
              Apply Now
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link to="/about" className="btn-outline">
              <PlayCircle className="h-5 w-5" aria-hidden="true" />
              Explore School
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80"
          >
            <li className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
              Modern + Deeni Education
            </li>
            <li className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" aria-hidden="true" />
              Experienced Faculty
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
              Safe, Caring Campus
            </li>
          </motion.ul>
        </motion.div>
      </div>

      {/* Soft fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
    </section>
  )
}
