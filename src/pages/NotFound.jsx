import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Compass } from 'lucide-react'

import useSEO from '../hooks/useSEO'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
  })

  return (
    <PageTransition>
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <Compass className="h-10 w-10" aria-hidden="true" />
          </span>
          <p className="mt-8 font-display text-7xl font-extrabold text-primary sm:text-8xl">404</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            Oops! Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            The page you’re looking for may have moved or no longer exists. Let’s get you back on
            track.
          </p>
          <Link to="/" className="btn-primary mt-8">
            <Home className="h-5 w-5" aria-hidden="true" />
            Back to Home
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  )
}
