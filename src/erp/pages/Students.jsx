import { useEffect, useMemo, useState } from 'react'
import { UserPlus, Pencil, Trash2, Eye, Search } from 'lucide-react'
import {
  listStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../api'
import Can from '../auth/Can'
import Modal from '../components/Modal'
import { PageHeader, Card, TextField, SelectField, Badge, StatTile, Ring, usePaged, Pagination } from '../components/ui'
import { Users, UserCheck, Wallet } from 'lucide-react'

const CLASSES = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X']
const inr = (n) => `₹ ${Number(n).toLocaleString('en-IN')}`
const feeStatus = (f) =>
  f.paid >= f.annual ? { label: 'Paid', tone: 'green' } : f.paid > 0 ? { label: 'Partial', tone: 'amber' } : { label: 'Pending', tone: 'red' }

const emptyForm = { name: '', gender: 'Male', className: 'Class I', section: 'A', rollNo: '', guardian: '', phone: '', annualFee: 22000 }

export default function Students() {
  const [students, setStudents] = useState([])
  const [q, setQ] = useState('')
  const [cls, setCls] = useState('All')
  const [modal, setModal] = useState(null) // {type, student}
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const refresh = () => listStudents().then(setStudents)
  useEffect(() => { refresh() }, [])

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchQ = `${s.name} ${s.admissionNo}`.toLowerCase().includes(q.toLowerCase())
      const matchC = cls === 'All' || s.className === cls
      return matchQ && matchC
    })
  }, [students, q, cls])

  const pg = usePaged(filtered, 10, `${q}|${cls}|${students.length}`)

  const openAdd = () => { setForm(emptyForm); setError(''); setModal({ type: 'add' }) }
  const openEdit = (s) => {
    setForm({ name: s.name, gender: s.gender, className: s.className, section: s.section, rollNo: s.rollNo, guardian: s.guardian, phone: s.phone, annualFee: s.fees.annual })
    setError(''); setModal({ type: 'edit', student: s })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (modal.type === 'add') {
        await createStudent(form)
      } else {
        await updateStudent(modal.student.id, {
          name: form.name, gender: form.gender, className: form.className,
          section: form.section, rollNo: Number(form.rollNo), guardian: form.guardian, phone: form.phone,
          fees: { ...modal.student.fees, annual: Number(form.annualFee) },
        })
      }
      setModal(null); refresh()
    } catch (err) { setError(err.message) }
  }

  const confirmDelete = async () => { await deleteStudent(modal.student.id); setModal(null); refresh() }

  const activeCount = students.filter((s) => s.status !== 'Inactive').length
  const dues = students.reduce((sum, s) => sum + Math.max(0, s.fees.annual - s.fees.paid), 0)

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${students.length} students enrolled`}
        actions={
          <Can module="students" action="create">
            <button onClick={openAdd} className="btn-primary"><UserPlus className="h-5 w-5" /> Add student</button>
          </Can>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatTile icon={Users} tone="primary" index={0} label="Total students" value={students.length} />
        <StatTile icon={UserCheck} tone="success" index={1} label="Active" value={activeCount} />
        <StatTile icon={Wallet} tone="red" index={2} label="Outstanding fees" value={inr(dues)} />
      </div>

      <Card>
        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or admission no."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
            <option>All</option>
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3">Adm. No.</th><th className="pb-3">Name</th><th className="pb-3">Class</th>
                <th className="pb-3">Roll</th><th className="pb-3">Guardian</th><th className="pb-3">Fees</th><th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pg.paged.map((s) => {
                const fs = feeStatus(s.fees)
                return (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                    <td className="py-3 text-slate-500">{s.admissionNo}</td>
                    <td className="py-3 font-medium text-ink">{s.name}</td>
                    <td className="py-3 text-slate-600">{s.className} · {s.section}</td>
                    <td className="py-3 text-slate-600">{s.rollNo}</td>
                    <td className="py-3 text-slate-600">{s.guardian}</td>
                    <td className="py-3"><Badge tone={fs.tone}>{fs.label}</Badge></td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setModal({ type: 'view', student: s })} className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-primary hover:text-primary" aria-label="View"><Eye className="h-4 w-4" /></button>
                        <Can module="students" action="update">
                          <button onClick={() => openEdit(s)} className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-primary hover:text-primary" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                        </Can>
                        <Can module="students" action="delete">
                          <button onClick={() => setModal({ type: 'delete', student: s })} className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-brandred hover:text-brandred" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                        </Can>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="py-8 text-center text-slate-400">No students match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination {...pg} onPage={pg.setPage} />
      </Card>

      {/* Add / Edit modal */}
      <Modal
        open={modal?.type === 'add' || modal?.type === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.type === 'add' ? 'Add new student' : 'Edit student'}
        subtitle="Student records are demo data."
      >
        <form onSubmit={submit} className="space-y-4" id="student-form">
          {error && <div className="rounded-lg bg-brandred-50 px-3 py-2 text-sm text-brandred">{error}</div>}
          <TextField label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Gender" value={form.gender} onChange={(v) => setForm((f) => ({ ...f, gender: v }))} options={['Male', 'Female']} />
            <TextField label="Roll No." type="number" value={form.rollNo} onChange={(v) => setForm((f) => ({ ...f, rollNo: v }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Class" value={form.className} onChange={(v) => setForm((f) => ({ ...f, className: v }))} options={CLASSES} />
            <SelectField label="Section" value={form.section} onChange={(v) => setForm((f) => ({ ...f, section: v }))} options={['A', 'B', 'C']} />
          </div>
          <TextField label="Guardian name" value={form.guardian} onChange={(v) => setForm((f) => ({ ...f, guardian: v }))} />
          <TextField label="Phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
          <TextField label="Annual fee (₹)" type="number" value={form.annualFee} onChange={(v) => setForm((f) => ({ ...f, annualFee: v }))} />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">{modal?.type === 'add' ? 'Add student' : 'Save changes'}</button>
          </div>
        </form>
      </Modal>

      {/* View modal */}
      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title={modal?.student?.name} subtitle={modal?.student?.admissionNo} size="lg">
        {modal?.student && <StudentView s={modal.student} />}
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={modal?.type === 'delete'} onClose={() => setModal(null)} title="Delete student" size="sm"
        footer={<>
          <button onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
          <button onClick={confirmDelete} className="inline-flex items-center gap-2 rounded-full bg-brandred px-5 py-2.5 font-semibold text-white hover:bg-brandred-600">Delete</button>
        </>}
      >
        <p className="text-slate-600">Are you sure you want to delete <strong className="text-ink">{modal?.student?.name}</strong>? This cannot be undone.</p>
      </Modal>
    </div>
  )
}

function StudentView({ s }) {
  const attPct = s.attendance.total ? Math.round((s.attendance.present / s.attendance.total) * 100) : 0
  const fs = feeStatus(s.fees)
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center justify-center rounded-xl bg-slate-50 p-4"><Ring value={attPct} /></div>
        <div className="sm:col-span-2 grid grid-cols-2 gap-3 text-sm">
          <Info k="Class" v={`${s.className} · ${s.section}`} />
          <Info k="Roll No." v={s.rollNo} />
          <Info k="Gender" v={s.gender} />
          <Info k="DOB" v={s.dob} />
          <Info k="Guardian" v={s.guardian} />
          <Info k="Phone" v={s.phone} />
          <Info k="Fees" v={<Badge tone={fs.tone}>{fs.label}</Badge>} />
          <Info k="Paid" v={`${inr(s.fees.paid)} / ${inr(s.fees.annual)}`} />
        </div>
      </div>
      {s.marks?.length > 0 && (
        <div>
          <h3 className="mb-2 font-semibold text-ink">Latest marks</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {s.marks.map((m) => (
              <div key={m.subject} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <div className="text-slate-500">{m.subject}</div>
                <div className="font-semibold text-ink">{m.marks}/{m.max} <span className="text-xs text-primary">({m.grade})</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
function Info({ k, v }) {
  return <div><div className="text-xs text-slate-400">{k}</div><div className="font-medium text-ink">{v}</div></div>
}
