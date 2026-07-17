import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, BookOpen, CalendarCheck, Bell, Clock, ArrowRight } from 'lucide-react'
import { listStaff, listStudents, getNotices } from '../api'
import { useAuth } from '../auth/AuthContext'
import { PageHeader, StatTile, Card } from '../components/ui'
import { DEFAULT_TIMETABLE } from '../data/seed'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [me, setMe] = useState(null)
  const [students, setStudents] = useState([])
  const [notices, setNotices] = useState([])

  useEffect(() => {
    listStaff().then((all) => setMe(all.find((s) => s.id === user.staffId) || all[2]))
    listStudents().then(setStudents)
    getNotices().then(setNotices)
  }, [user.staffId])

  // Group students by class for the teacher's "my classes" overview.
  const byClass = students.reduce((m, s) => { m[s.className] = (m[s.className] || 0) + 1; return m }, {})
  const classes = Object.entries(byClass)

  return (
    <div>
      <PageHeader title={`Welcome, ${user.name.split(' ')[0]}`} subtitle={me ? `${me.role} · ${me.subject}` : 'Teacher dashboard'} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={BookOpen} tone="primary" index={0} label="My subject" value={me?.subject || '—'} />
        <StatTile icon={Users} tone="accent" index={1} label="Total students" value={students.length} />
        <StatTile icon={CalendarCheck} tone="success" index={2} label="My attendance" value={`${me?.attendancePct ?? '—'}%`} />
        <StatTile icon={BookOpen} tone="red" index={3} label="Classes" value={classes.length} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="My classes" className="lg:col-span-2" action={<Link to="/erp/attendance" className="text-sm font-medium text-primary hover:underline">Mark attendance →</Link>}>
          <div className="grid gap-2 sm:grid-cols-2">
            {classes.map(([cls, count]) => (
              <Link key={cls} to="/erp/attendance" className="group flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 hover:border-primary hover:shadow-soft">
                <div>
                  <div className="font-medium text-ink">{cls}</div>
                  <div className="text-xs text-slate-400">{count} students</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </Card>

        <Card title="Notices" action={<Bell className="h-5 w-5 text-accent-600" />}>
          <ul className="space-y-3">
            {notices.map((n) => (
              <li key={n.id} className="border-l-2 border-accent pl-3">
                <div className="flex items-center gap-2 text-xs text-slate-400"><Clock className="h-3.5 w-3.5" /> {n.date}</div>
                <p className="font-medium text-ink">{n.title}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Weekly timetable" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <tbody>
              {DEFAULT_TIMETABLE.map((row) => (
                <tr key={row.day} className="border-b border-slate-50">
                  <td className="py-2 pr-3 font-semibold text-ink">{row.day}</td>
                  {row.periods.map((p, i) => (
                    <td key={i} className="py-2 pr-2"><span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{p}</span></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
