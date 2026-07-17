import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Users, GraduationCap, UserCog, Wallet, ArrowRight, Bell, Clock } from 'lucide-react'
import { listUsers, listStudents, listStaff, getNotices } from '../api'
import { useAuth } from '../auth/AuthContext'
import { ROLE_LABELS, homeRouteFor } from '../auth/permissions'
import { PageHeader, StatTile, Card } from '../components/ui'

const inr = (n) => `₹ ${Number(n).toLocaleString('en-IN')}`

export default function AdminDashboard() {
  const { user, can } = useAuth()
  const [users, setUsers] = useState([])
  const [students, setStudents] = useState([])
  const [staff, setStaff] = useState([])
  const [notices, setNotices] = useState([])

  const isAdmin = user.role === 'super_admin' || user.role === 'management'

  useEffect(() => {
    if (!isAdmin) return
    listUsers().then(setUsers)
    listStudents().then(setStudents)
    listStaff().then(setStaff)
    getNotices().then(setNotices)
  }, [isAdmin])

  // Students/teachers who land here get routed to their own dashboard.
  if (!isAdmin) return <Navigate to={homeRouteFor(user.role)} replace />

  const collected = students.reduce((s, x) => s + (x.fees?.paid || 0), 0)

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user.name.split(' ')[0]}`}
        subtitle={`${ROLE_LABELS[user.role]} dashboard · Apple Valley Creative School`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Users} tone="primary" index={0} label="Total students" value={students.length} />
        <StatTile icon={GraduationCap} tone="accent" index={1} label="Staff" value={staff.length} />
        <StatTile icon={UserCog} tone="success" index={2} label="System users" value={users.length} />
        <StatTile icon={Wallet} tone="red" index={3} label="Fees collected" value={inr(collected)} sub="This term" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Quick actions" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {can('users', 'read') && (
              <QuickLink to="/erp/users" icon={UserCog} title="Manage users" text="Onboard staff & students, set permissions" />
            )}
            {can('students', 'read') && (
              <QuickLink to="/erp/students" icon={Users} title="Students" text="View and manage student records" />
            )}
            {can('fees', 'read') && (
              <QuickLink to="/erp/fees" icon={Wallet} title="Fees" text="Collections, dues and receipts" />
            )}
            {can('teachers', 'read') && (
              <QuickLink to="/erp/teachers" icon={GraduationCap} title="Teachers" text="Staff records and attendance" />
            )}
          </div>
        </Card>

        <Card title="Notices" action={<Bell className="h-5 w-5 text-accent-600" />}>
          <ul className="space-y-3">
            {notices.map((n) => (
              <li key={n.id} className="border-l-2 border-accent pl-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {n.date}
                </div>
                <p className="font-medium text-ink">{n.title}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

function QuickLink({ to, icon: Icon, title, text }) {
  return (
    <Link to={to} className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-primary hover:shadow-soft">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <div className="font-semibold text-ink">{title}</div>
        <div className="text-xs text-slate-500">{text}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  )
}
