import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Lock, Rocket, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'

import { ERP_GROUPS } from '../data/erpModules'
import { staggerContainer, fadeUp, inView } from '../utils/motion'

/**
 * NOTE: This page intentionally has NO authentication (Phase 1).
 * It is a simple visual preview of the four upcoming School ERP modules.
 */
export default function Login() {
  useSEO({
    title: 'School ERP — Preview',
    description:
      'A preview of the North Public School ERP — simple modules for Students, Teachers, Management and a public Gallery. Coming in Phase 2.',
  })

  return (
    <PageTransition>
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-gradient pb-24 pt-28">
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="container-page relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur">
              <LayoutDashboard className="h-4 w-4 text-accent" aria-hidden="true" />
              Admin & Staff Portal
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold text-white sm:text-5xl">
              School ERP System
            </h1>
            <p className="mt-4 text-lg font-medium text-accent">Simple. Focused. Easy to use.</p>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Just the essentials — four modules to manage students, teachers, finances and the
              school gallery. No clutter, no complexity. Launching in Phase 2.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Module groups */}
      <section className="container-page -mt-16 relative z-10 pb-16">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-6 md:grid-cols-2"
        >
          {ERP_GROUPS.map((group) => {
            const live = group.status === 'live'
            return (
              <motion.article
                key={group.key}
                variants={fadeUp}
                className="card-base group flex flex-col p-7 hover:-translate-y-1 hover:shadow-card"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-500 text-white shadow-soft transition-transform duration-300 group-hover:scale-110">
                      <group.icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-ink">{group.title}</h2>
                      <p className="text-sm text-slate-500">{group.tagline}</p>
                    </div>
                  </div>

                  {/* Status badge */}
                  {live ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success-light px-2.5 py-1 text-[11px] font-semibold text-success">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Live Now
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent-700">
                      <Lock className="h-3 w-3" aria-hidden="true" />
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-3">
                  {group.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-start gap-3 rounded-xl bg-surface p-3 ring-1 ring-slate-100"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <f.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-ink">{f.label}</div>
                        <div className="text-xs leading-relaxed text-slate-500">{f.text}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Live module link */}
                {live && group.to && (
                  <Link
                    to={group.to}
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary transition hover:gap-2.5"
                  >
                    View the public gallery
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </motion.article>
            )
          })}
        </motion.div>

        {/* Phase 2 note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5 }}
          className="mt-12 overflow-hidden rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-8 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <Rocket className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink">
            <Sparkles className="mr-1 inline h-5 w-5 text-accent" aria-hidden="true" />
            Kept simple on purpose
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            This School ERP will be implemented in <strong className="text-primary">Phase 2</strong>{' '}
            after design approval. Only these four modules are planned — an easy-to-use system with
            secure logins added once the design is signed off.
          </p>

          <Link to="/" className="btn-ghost mt-6">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to Home
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  )
}
