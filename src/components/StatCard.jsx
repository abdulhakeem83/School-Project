import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Animated statistic card. The number counts up when scrolled into view.
 */
export default function StatCard({ icon: Icon, value, suffix = '', label, index = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let frame
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-base group flex flex-col items-center gap-3 p-6 text-center hover:-translate-y-1 hover:shadow-card"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <div className="font-display text-4xl font-extrabold text-primary">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </motion.div>
  )
}
