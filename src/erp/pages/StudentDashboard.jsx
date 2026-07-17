import { useEffect, useState } from 'react'
import {
  CalendarCheck,
  Wallet,
  BookMarked,
  CreditCard,
  Bell,
  Clock,
} from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { getStudentDashboard } from '../api'
import { PageHeader, StatTile, Card, Ring } from '../components/ui'

const inr = (n) => `₹ ${Number(n).toLocaleString('en-IN')}`

export default function StudentDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    getStudentDashboard(user.studentId).then(setData)
  }, [user.studentId])

  if (!data) return <p className="text-slate-500">Loading…</p>

  const { student, attendance, fees, marks, timetable, notices } = data
  const attPct = Math.round((attendance.present / attendance.total) * 100)
  const feeDue = fees.annual - fees.paid
  const avg = Math.round(marks.reduce((s, m) => s + m.marks, 0) / marks.length)

  return (
    <div>
      <PageHeader
        title={`Welcome, ${student.name.split(' ')[0]} 👋`}
        subtitle={`${student.className} · Section ${student.section} · Roll No. ${student.rollNo}`}
      />

      {/* Stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={CalendarCheck} tone="success" index={0} label="Attendance" value={`${attPct}%`} sub={`${attendance.present}/${attendance.total} days`} />
        <StatTile icon={BookMarked} tone="primary" index={1} label="Average score" value={`${avg}%`} sub="This term" />
        <StatTile icon={Wallet} tone={feeDue > 0 ? 'red' : 'success'} index={2} label="Fees due" value={inr(feeDue)} sub={feeDue > 0 ? `Due ${fees.dueDate}` : 'All paid'} />
        <StatTile icon={CreditCard} tone="accent" index={3} label="Admission No." value={student.admissionNo.split('-').pop()} sub={student.admissionNo} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Marks */}
        <Card title="Latest marks" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-2">Subject</th>
                  <th className="pb-2">Marks</th>
                  <th className="pb-2">Grade</th>
                  <th className="pb-2 w-1/3">Score</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((m) => (
                  <tr key={m.subject} className="border-b border-slate-50">
                    <td className="py-2.5 font-medium text-ink">{m.subject}</td>
                    <td className="py-2.5 text-slate-600">{m.marks}/{m.max}</td>
                    <td className="py-2.5">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{m.grade}</span>
                    </td>
                    <td className="py-2.5">
                      <div className="h-2 w-full rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${(m.marks / m.max) * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Attendance ring + profile */}
        <div className="space-y-6">
          <Card title="Attendance">
            <div className="flex items-center gap-5">
              <Ring value={attPct} />
              <div className="text-sm text-slate-600">
                <p><span className="font-semibold text-ink">{attendance.present}</span> present</p>
                <p><span className="font-semibold text-ink">{attendance.total - attendance.present}</span> absent</p>
                <p className="text-slate-400">out of {attendance.total} days</p>
              </div>
            </div>
          </Card>

          <Card title="My profile">
            <dl className="space-y-1.5 text-sm">
              <Row k="Name" v={student.name} />
              <Row k="Class" v={`${student.className} · ${student.section}`} />
              <Row k="Guardian" v={student.guardian} />
              <Row k="Phone" v={student.phone} />
            </dl>
          </Card>
        </div>
      </div>

      {/* Timetable + notices */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Weekly timetable" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <tbody>
                {timetable.map((row) => (
                  <tr key={row.day} className="border-b border-slate-50">
                    <td className="py-2 pr-3 font-semibold text-ink">{row.day}</td>
                    {row.periods.map((p, i) => (
                      <td key={i} className="py-2 pr-2">
                        <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{p}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
                <p className="text-sm text-slate-500">{n.body}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-400">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  )
}
