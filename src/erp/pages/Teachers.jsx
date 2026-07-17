import { useEffect, useMemo, useState } from 'react'
import { UserPlus, Pencil, Trash2, Eye, Search, GraduationCap, Wallet, CalendarCheck } from 'lucide-react'
import { listStaff, createStaff, updateStaff, deleteStaff } from '../api'
import Can from '../auth/Can'
import Modal from '../components/Modal'
import { PageHeader, Card, TextField, SelectField, Badge, StatTile, usePaged, Pagination } from '../components/ui'

const inr = (n) => `₹ ${Number(n).toLocaleString('en-IN')}`
const ROLES = ['Principal', 'Vice Principal', 'Senior Teacher', 'Teacher', 'Deeni Teacher', 'Primary Teacher', 'Pre-Primary Teacher']
const empty = { name: '', role: 'Teacher', subject: '', gender: 'Male', phone: '', email: '', salary: 22000, joinDate: '2024-06-01' }

export default function Teachers() {
  const [staff, setStaff] = useState([])
  const [q, setQ] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const refresh = () => listStaff().then(setStaff)
  useEffect(() => { refresh() }, [])

  const filtered = useMemo(
    () => staff.filter((s) => `${s.name} ${s.subject} ${s.role}`.toLowerCase().includes(q.toLowerCase())),
    [staff, q],
  )
  const pg = usePaged(filtered, 10, `${q}|${staff.length}`)

  const openAdd = () => { setForm(empty); setError(''); setModal({ type: 'add' }) }
  const openEdit = (s) => { setForm({ ...s }); setError(''); setModal({ type: 'edit', staff: s }) }

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try {
      if (modal.type === 'add') await createStaff({ ...form, salary: Number(form.salary) })
      else await updateStaff(modal.staff.id, { ...form, salary: Number(form.salary) })
      setModal(null); refresh()
    } catch (err) { setError(err.message) }
  }
  const confirmDelete = async () => { await deleteStaff(modal.staff.id); setModal(null); refresh() }

  const payroll = staff.reduce((s, x) => s + (x.salary || 0), 0)
  const avgAtt = staff.length ? Math.round(staff.reduce((s, x) => s + (x.attendancePct || 0), 0) / staff.length) : 0

  return (
    <div>
      <PageHeader
        title="Teachers & Staff"
        subtitle={`${staff.length} staff members`}
        actions={<Can module="teachers" action="create"><button onClick={openAdd} className="btn-primary"><UserPlus className="h-5 w-5" /> Add staff</button></Can>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatTile icon={GraduationCap} tone="primary" index={0} label="Total staff" value={staff.length} />
        <StatTile icon={Wallet} tone="accent" index={1} label="Monthly payroll" value={inr(payroll)} />
        <StatTile icon={CalendarCheck} tone="success" index={2} label="Avg. attendance" value={`${avgAtt}%`} />
      </div>

      <Card>
        <div className="relative mb-4 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, subject or role" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3">Name</th><th className="pb-3">Role</th><th className="pb-3">Subject</th>
                <th className="pb-3">Phone</th><th className="pb-3">Salary</th><th className="pb-3">Att.</th><th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pg.paged.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="py-3 font-medium text-ink">{s.name}</td>
                  <td className="py-3 text-slate-600">{s.role}</td>
                  <td className="py-3 text-slate-600">{s.subject}</td>
                  <td className="py-3 text-slate-600">{s.phone}</td>
                  <td className="py-3 text-slate-600">{inr(s.salary)}</td>
                  <td className="py-3"><Badge tone={s.attendancePct >= 95 ? 'green' : s.attendancePct >= 90 ? 'amber' : 'red'}>{s.attendancePct}%</Badge></td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => setModal({ type: 'view', staff: s })} className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-primary hover:text-primary" aria-label="View"><Eye className="h-4 w-4" /></button>
                      <Can module="teachers" action="update"><button onClick={() => openEdit(s)} className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-primary hover:text-primary" aria-label="Edit"><Pencil className="h-4 w-4" /></button></Can>
                      <Can module="teachers" action="delete"><button onClick={() => setModal({ type: 'delete', staff: s })} className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-brandred hover:text-brandred" aria-label="Delete"><Trash2 className="h-4 w-4" /></button></Can>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination {...pg} onPage={pg.setPage} />
      </Card>

      <Modal open={modal?.type === 'add' || modal?.type === 'edit'} onClose={() => setModal(null)} title={modal?.type === 'add' ? 'Add staff member' : 'Edit staff member'}>
        <form onSubmit={submit} className="space-y-4">
          {error && <div className="rounded-lg bg-brandred-50 px-3 py-2 text-sm text-brandred">{error}</div>}
          <TextField label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Role" value={form.role} onChange={(v) => setForm((f) => ({ ...f, role: v }))} options={ROLES} />
            <TextField label="Subject" value={form.subject} onChange={(v) => setForm((f) => ({ ...f, subject: v }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Gender" value={form.gender} onChange={(v) => setForm((f) => ({ ...f, gender: v }))} options={['Male', 'Female']} />
            <TextField label="Join date" type="date" value={form.joinDate} onChange={(v) => setForm((f) => ({ ...f, joinDate: v }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
            <TextField label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          </div>
          <TextField label="Monthly salary (₹)" type="number" value={form.salary} onChange={(v) => setForm((f) => ({ ...f, salary: v }))} />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">{modal?.type === 'add' ? 'Add staff' : 'Save changes'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title={modal?.staff?.name} subtitle={modal?.staff?.role}>
        {modal?.staff && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[['Subject', modal.staff.subject], ['Gender', modal.staff.gender], ['Phone', modal.staff.phone], ['Email', modal.staff.email], ['Salary', inr(modal.staff.salary)], ['Joined', modal.staff.joinDate], ['Attendance', `${modal.staff.attendancePct}%`], ['Status', modal.staff.status]].map(([k, v]) => (
              <div key={k}><div className="text-xs text-slate-400">{k}</div><div className="font-medium text-ink">{v}</div></div>
            ))}
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'delete'} onClose={() => setModal(null)} title="Delete staff" size="sm"
        footer={<><button onClick={() => setModal(null)} className="btn-ghost">Cancel</button><button onClick={confirmDelete} className="inline-flex items-center gap-2 rounded-full bg-brandred px-5 py-2.5 font-semibold text-white hover:bg-brandred-600">Delete</button></>}>
        <p className="text-slate-600">Delete <strong className="text-ink">{modal?.staff?.name}</strong> from staff records?</p>
      </Modal>
    </div>
  )
}
