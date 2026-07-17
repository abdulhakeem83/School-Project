import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Wallet,
  BarChart3,
  Images,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { ROLE_LABELS, homeRouteFor } from '../auth/permissions'
import { asset } from '../../data/constants'

const NAV = [
  { module: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: 'home' },
  { module: 'students', label: 'Students', icon: Users, to: '/erp/students' },
  { module: 'teachers', label: 'Teachers', icon: GraduationCap, to: '/erp/teachers' },
  { module: 'attendance', label: 'Attendance', icon: CalendarCheck, to: '/erp/attendance' },
  { module: 'fees', label: 'Fees', icon: Wallet, to: '/erp/fees' },
  { module: 'management', label: 'Management', icon: BarChart3, to: '/erp/management' },
  { module: 'gallery', label: 'Gallery', icon: Images, to: '/erp/gallery' },
  { module: 'users', label: 'Users & Roles', icon: ShieldCheck, to: '/erp/users' },
]

export default function ErpLayout() {
  const { user, logout, can } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const items = NAV.filter((n) => can(n.module, 'read')).map((n) => ({
    ...n,
    to: n.to === 'home' ? homeRouteFor(user.role) : n.to,
  }))

  const handleLogout = () => {
    logout()
    navigate('/erp/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-primary-900 text-slate-200 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-4">
          <img src={asset('images/logo.jpg')} alt="AVCS" className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/70" />
          <div className="leading-tight">
            <div className="font-display text-sm font-bold text-white">Apple Valley</div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-accent">School ERP</div>
          </div>
        </div>

        <nav className="mt-3 space-y-1 px-3">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-accent text-ink shadow-soft'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute inset-x-0 bottom-0 space-y-2 p-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View public website
          </Link>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main column */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
          <button
            className="rounded-lg p-2 text-ink hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right leading-tight">
              <div className="text-sm font-semibold text-ink">{user.name}</div>
              <div className="text-xs font-medium text-primary">{ROLE_LABELS[user.role]}</div>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
              {user.name?.[0]?.toUpperCase()}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-ink transition hover:border-brandred hover:text-brandred"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
