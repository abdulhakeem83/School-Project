import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, FileText, Clock, ChevronDown, ArrowRight, IndianRupee } from 'lucide-react'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import PageBanner from '../components/PageBanner'
import SectionTitle from '../components/SectionTitle'
import CTASection from '../components/CTASection'

import {
  ADMISSION_STEPS,
  ELIGIBILITY,
  DOCUMENTS,
  FEE_STRUCTURE,
  TIMINGS,
  FAQS,
} from '../data/admissions'
import { staggerContainer, fadeUp, inView } from '../utils/motion'

// Single, accessible FAQ accordion item.
function FaqItem({ faq, isOpen, onToggle, id }) {
  return (
    <div className="card-base overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
      >
        <span className="font-semibold text-ink">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState(0)

  useSEO({
    title: 'Admissions',
    description:
      'Admissions open at North Public School for 2026–27. View the admission process, eligibility, required documents, fee structure, school timings and FAQs.',
  })

  return (
    <PageTransition>
      <PageBanner
        title="Admissions 2026–27"
        subtitle="Begin your child’s journey with us. Here’s everything you need to know to apply."
        breadcrumb={['Admissions']}
      />

      {/* Highlight banner */}
      <section className="container-page py-10">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-success-light px-6 py-5 ring-1 ring-success/20 sm:flex-row">
          <p className="flex items-center gap-2 text-center font-semibold text-success sm:text-left">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            Admissions are now OPEN for all classes — Nursery to Class XI.
          </p>
          <Link to="/contact" className="btn-primary whitespace-nowrap">
            Apply Now
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Admission Process */}
      <section className="container-page py-12">
        <SectionTitle
          eyebrow="Admission Process"
          title="Six simple steps to join us"
          subtitle="Our admission process is transparent, friendly and designed to be stress-free for families."
        />
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ADMISSION_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="card-base group relative p-6 hover:-translate-y-1.5 hover:shadow-card"
            >
              <span className="absolute right-5 top-5 font-display text-4xl font-extrabold text-primary/10">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <step.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Eligibility + Documents */}
      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          {/* Eligibility */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="card-base p-8">
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
              <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
              Eligibility
            </h3>
            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary/5 text-primary">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Class</th>
                    <th className="px-4 py-3 font-semibold">Age Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ELIGIBILITY.map((row) => (
                    <tr key={row.grade} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-ink">{row.grade}</td>
                      <td className="px-4 py-3 text-slate-600">{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Documents */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="card-base p-8">
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
              <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
              Required Documents
            </h3>
            <ul className="mt-6 space-y-3">
              {DOCUMENTS.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                  {doc}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="container-page py-16">
        <SectionTitle
          eyebrow="Fee Structure"
          title="Transparent, all-inclusive fees"
          subtitle="Indicative annual fees. Please contact the admissions office for the detailed, class-wise fee schedule."
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 overflow-x-auto"
        >
          <div className="min-w-[640px] overflow-hidden rounded-2xl shadow-soft ring-1 ring-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-gradient text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Level</th>
                  <th className="px-6 py-4 font-semibold">Admission (one-time)</th>
                  <th className="px-6 py-4 font-semibold">Tuition (annual)</th>
                  <th className="px-6 py-4 font-semibold">Transport (annual)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {FEE_STRUCTURE.map((row) => (
                  <tr key={row.level} className="transition hover:bg-primary/5">
                    <td className="px-6 py-4 font-medium text-ink">{row.level}</td>
                    <td className="px-6 py-4 text-slate-600">{row.admission}</td>
                    <td className="px-6 py-4 text-slate-600">{row.tuition}</td>
                    <td className="px-6 py-4 text-slate-600">{row.transport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
          <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
          Fees are indicative and for demonstration only. Transport is optional and route-based.
        </p>
      </section>

      {/* School Timings */}
      <section className="bg-white py-16">
        <div className="container-page">
          <SectionTitle
            eyebrow="School Timings"
            title="A well-structured school day"
            subtitle="Timings are designed to give students the right balance of learning, activity and rest."
          />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {TIMINGS.map((t) => (
              <motion.div key={t.label} variants={fadeUp} className="card-base p-6 text-center">
                <Clock className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink">{t.label}</h3>
                <p className="mt-1 text-sm font-medium text-accent-700">{t.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Can’t find your answer? Reach out to our admissions team — we’re happy to help."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              id={i}
              faq={faq}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to apply?"
        subtitle="Our admissions team is here to guide you through every step. Get in touch today."
        primaryLabel="Start Your Application"
        primaryTo="/contact"
      />
    </PageTransition>
  )
}
