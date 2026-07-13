import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'
import PageBanner from '../components/PageBanner'
import SectionTitle from '../components/SectionTitle'

import { CONTACT, SCHOOL } from '../data/constants'
import { staggerContainer, fadeUp, slideRight, inView } from '../utils/motion'

const INITIAL = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  useSEO({
    title: 'Contact Us',
    description:
      'Get in touch with North Public School. Find our address, phone, email, school hours and send us a message using the contact form.',
  })

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Phase 1: no backend. We simply show a success confirmation.
    setSubmitted(true)
    setForm(INITIAL)
    setTimeout(() => setSubmitted(false), 6000)
  }

  const infoCards = [
    { icon: MapPin, title: 'Visit Us', lines: CONTACT.addressLines },
    { icon: Phone, title: 'Call Us', lines: [CONTACT.phone, CONTACT.altPhone] },
    { icon: Mail, title: 'Email Us', lines: [CONTACT.email, CONTACT.admissionsEmail] },
    { icon: Clock, title: 'School Hours', lines: [CONTACT.hours, CONTACT.officeHours] },
  ]

  return (
    <PageTransition>
      <PageBanner
        title="Contact Us"
        subtitle="We’d love to hear from you. Reach out with any question — admissions, visits or general enquiries."
        breadcrumb={['Contact']}
      />

      {/* Info cards */}
      <section className="container-page py-16">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {infoCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="card-base group p-6 text-center hover:-translate-y-1.5 hover:shadow-card"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <card.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{card.title}</h3>
              <div className="mt-2 space-y-1 text-sm text-slate-600">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Form + Map */}
      <section className="container-page pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="card-base p-8">
            <SectionTitle
              eyebrow="Send a Message"
              title="Let’s talk"
              subtitle="Fill in the form and our team will get back to you shortly."
              align="left"
            />

            {submitted && (
              <div
                role="status"
                className="mt-6 flex items-center gap-3 rounded-xl bg-success-light px-4 py-3 text-sm font-medium text-success ring-1 ring-success/20"
              >
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Thank you! Your message has been received. We’ll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Ananya Sharma" />
                <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
              </div>
              <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          </motion.div>

          {/* Map placeholder + quick contact */}
          <motion.div variants={slideRight} initial="hidden" whileInView="show" viewport={inView} className="flex flex-col gap-6">
            <div className="card-base flex flex-1 flex-col items-center justify-center overflow-hidden p-0">
              <div className="relative flex h-full min-h-[280px] w-full flex-col items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-white text-center">
                {/* Decorative grid pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(#0F4C8115_1px,transparent_1px),linear-gradient(90deg,#0F4C8115_1px,transparent_1px)] [background-size:28px_28px]" />
                <MapPin className="relative h-12 w-12 text-primary" aria-hidden="true" />
                <p className="relative mt-3 max-w-xs px-6 font-medium text-primary-800">
                  {SCHOOL.name}
                </p>
                <p className="relative mt-1 max-w-xs px-6 text-sm text-slate-600">
                  {CONTACT.addressLines.join(', ')}
                </p>
                <span className="relative mt-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                  Google Map — integration in Phase 2
                </span>
              </div>
            </div>

            <div className="card-base flex items-center gap-4 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-700">
                <MessageSquare className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-ink">Prefer to call?</h3>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

// Reusable labelled input field.
function Field({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
