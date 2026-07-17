import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, Check, X, Save, Users } from 'lucide-react'
import { listStudents } from '../api'
import { useAuth } from '../auth/AuthContext'
import { PageHeader, Card, StatTile, Badge } from '../components/ui'

const CLASSES = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X']

export default function Attendance() {
  const { can } = useAuth()
  const editable = can('attendance', 'update')
  const [students, setStudents] = useState([])
  const [cls, setCls] = useState('Class VIII')
  const today = '2026-07-15'
  const [marks, setMarks] = useState({}) // id -> 'present' | 'absent'
  const [saved, setSaved] = useState(false)

  useEffect(() => { listStudents().then(setStudents) }, [])

  const classStudents = useMemo(() => students.filter((s) => s.className === cls), [students, cls])

  // Default everyone to present when the class changes.
  useEffect(() => {
    const init = {}
    classStudents.forEach((s) => { init[s.id] = 'present' })
    setMarks(init); setSaved(false)
  }, [cls, students.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (id, status) => { if (editable) { setMarks((m) => ({ ...m, [id]: status })); setSaved(false) } }
  const present = Object.values(marks).filter((v) => v === 'present').length
  const absent = classStudents.length - present
  const pct = classStudents.length ? Math.round((present / classStudents.length) * 100) : 0

  return (
    <div>
      <PageHeader title="Attendance" subtitle={`Mark daily attendance · ${today}`} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatTile icon={Users} tone="primary" index={0} label={`Students in ${cls}`} value={classStudents.length} />
        <StatTile icon={CalendarCheck} tone="success" index={1} label="Present" value={present} />
        <StatTile icon={X} tone="red" index={2} label="Absent" value={absent} />
      </div>

      <Card
        title={`${cls} · ${pct}% present`}
        action={
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-primary focus:outline-none">
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        }
      >
        {classStudents.length === 0 ? (
          <p className="py-8 text-center text-slate-400">No students in this class.</p>
        ) : (
          <>
            <div className="grid gap-2 sm:grid-cols-2">
              {classStudents.map((s) => {
                const status = marks[s.id]
                return (
                  <div key={s.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-2.5">
                    <div>
                      <div className="font-medium text-ink">{s.name}</div>
                      <div className="text-xs text-slate-400">Roll {s.rollNo} · {s.section}</div>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => set(s.id, 'present')} disabled={!editable}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 transition ${status === 'present' ? 'bg-success text-white ring-success' : 'bg-white text-slate-300 ring-slate-200 hover:ring-success'} disabled:opacity-60`}
                        aria-label="Present"
                      ><Check className="h-4 w-4" /></button>
                      <button
                        onClick={() => set(s.id, 'absent')} disabled={!editable}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 transition ${status === 'absent' ? 'bg-brandred text-white ring-brandred' : 'bg-white text-slate-300 ring-slate-200 hover:ring-brandred'} disabled:opacity-60`}
                        aria-label="Absent"
                      ><X className="h-4 w-4" /></button>
                    </div>
                  </div>
                )
              })}
            </div>

            {editable && (
              <div className="mt-5 flex items-center justify-end gap-3">
                {saved && <Badge tone="green">Attendance saved ✓</Badge>}
                <button onClick={() => setSaved(true)} className="btn-primary"><Save className="h-5 w-5" /> Save attendance</button>
              </div>
            )}
            {!editable && <p className="mt-4 text-sm text-slate-400">You have read-only access to attendance.</p>}
          </>
        )}
      </Card>
    </div>
  )
}
