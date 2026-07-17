import { Link } from 'react-router-dom'
import { Rocket, ArrowLeft } from 'lucide-react'
import { PageHeader } from '../components/ui'

/**
 * Generic "coming soon" screen for ERP modules not built yet.
 */
export default function Placeholder({ title = 'Module', note }) {
  return (
    <div>
      <PageHeader title={title} subtitle="This module is part of the School ERP roadmap." />
      <div className="card-base flex flex-col items-center gap-4 p-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Rocket className="h-8 w-8" />
        </span>
        <h2 className="font-display text-xl font-bold text-ink">Coming soon</h2>
        <p className="max-w-md text-slate-500">
          {note || `The ${title} module will be built next. The Student module and user management are live now.`}
        </p>
        <Link to="/erp/dashboard" className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
      </div>
    </div>
  )
}
