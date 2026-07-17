import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function NoAccess() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brandred-50 text-brandred">
        <ShieldAlert className="h-8 w-8" />
      </span>
      <h1 className="font-display text-2xl font-bold text-ink">Access denied</h1>
      <p className="max-w-md text-slate-500">
        You don't have permission to view this module. Please contact your administrator if you
        think this is a mistake.
      </p>
      <Link to="/erp/dashboard" className="btn-ghost">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
    </div>
  )
}
