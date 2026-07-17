import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { LogIn, Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { homeRouteFor } from '../auth/permissions'
import { asset } from '../../data/constants'
import { DEMO_USERS } from '../data/seed'

export default function ErpLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const user = await login(form.email, form.password)
      const dest = location.state?.from || homeRouteFor(user.role)
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  const fillDemo = (u) => setForm({ email: u.email, password: u.password })

  return (
    <div className="grid min-h-screen bg-surface lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden bg-brand-gradient lg:block">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="relative flex h-full flex-col justify-center px-14 text-white">
          <img src={asset('images/logo.jpg')} alt="AVCS" className="h-20 w-20 rounded-full object-cover ring-4 ring-white/30" />
          <h1 className="mt-8 font-display text-4xl font-extrabold leading-tight">
            Apple Valley <br /> School ERP
          </h1>
          <p className="mt-4 max-w-md text-white/80">
            One simple, secure system for students, teachers and management —
            attendance, fees, records and more.
          </p>
          <p className="mt-10 text-sm text-white/60">Where Creativity Meets Excellence</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>

          <div className="flex items-center gap-3 lg:hidden">
            <img src={asset('images/logo.jpg')} alt="AVCS" className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/70" />
            <span className="font-display text-lg font-bold text-ink">Apple Valley School ERP</span>
          </div>

          <h2 className="mt-6 font-display text-2xl font-bold text-ink">Sign in to your account</h2>
          <p className="mt-1 text-sm text-slate-500">Enter the credentials provided by your school.</p>

          {error && (
            <div role="alert" className="mt-5 rounded-xl bg-brandred-50 px-4 py-3 text-sm font-medium text-brandred ring-1 ring-brandred/20">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email" type="email" required autoComplete="username"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@avcs.edu"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password" type={showPw ? 'text' : 'password'} required autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink" aria-label="Toggle password visibility">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
              <LogIn className="h-5 w-5" aria-hidden="true" />
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Demo accounts — click to fill</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.id} type="button" onClick={() => fillDemo(u)}
                  className="rounded-lg bg-white px-3 py-2 text-left text-xs ring-1 ring-slate-200 transition hover:ring-primary"
                >
                  <div className="font-semibold capitalize text-ink">{u.role.replace('_', ' ')}</div>
                  <div className="text-slate-500">{u.email}</div>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Password for all demo accounts is shown in the seed file. e.g. student → student123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
