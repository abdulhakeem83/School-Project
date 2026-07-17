import { useEffect, useMemo, useState } from 'react'
import { Wallet, TrendingUp, AlertCircle, IndianRupee, Search, Receipt } from 'lucide-react'
import { listStudents, collectFee } from '../api'
import Can from '../auth/Can'
import Modal from '../components/Modal'
import { PageHeader, Card, StatTile, Badge, TextField, usePaged, Pagination } from '../components/ui'

const inr = (n) => `₹ ${Number(n).toLocaleString('en-IN')}`
const status = (f) => (f.paid >= f.annual ? { label: 'Paid', tone: 'green' } : f.paid > 0 ? { label: 'Partial', tone: 'amber' } : { label: 'Pending', tone: 'red' })

export default function Fees() {
  const [students, setStudents] = useState([])
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')
  const [modal, setModal] = useState(null)
  const [amount, setAmount] = useState('')

  const refresh = () => listStudents().then(setStudents)
  useEffect(() => { refresh() }, [])

  const totals = useMemo(() => {
    const expected = students.reduce((s, x) => s + x.fees.annual, 0)
    const collected = students.reduce((s, x) => s + x.fees.paid, 0)
    return { expected, collected, outstanding: expected - collected, pct: expected ? Math.round((collected / expected) * 100) : 0 }
  }, [students])

  const rows = useMemo(() => students.filter((s) => {
    const st = status(s.fees).label
    const mq = `${s.name} ${s.admissionNo}`.toLowerCase().includes(q.toLowerCase())
    const mf = filter === 'All' || st === filter
    return mq && mf
  }), [students, q, filter])
  const pg = usePaged(rows, 10, `${q}|${filter}|${students.length}`)

  const openCollect = (s) => { const due = s.fees.annual - s.fees.paid; setAmount(String(due)); setModal({ type: 'collect', student: s }) }
  const submit = async (e) => { e.preventDefault(); await collectFee(modal.student.id, amount); setModal(null); refresh() }

  return (
    <div>
      <PageHeader title="Fees" subtitle="Collections, dues and receipts" />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={IndianRupee} tone="primary" index={0} label="Expected (annual)" value={inr(totals.expected)} />
        <StatTile icon={TrendingUp} tone="success" index={1} label="Collected" value={inr(totals.collected)} sub={`${totals.pct}% collected`} />
        <StatTile icon={AlertCircle} tone="red" index={2} label="Outstanding" value={inr(totals.outstanding)} />
        <StatTile icon={Wallet} tone="accent" index={3} label="Students" value={students.length} />
      </div>

      <Card>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
            {['All', 'Paid', 'Partial', 'Pending'].map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3">Student</th><th className="pb-3">Class</th><th className="pb-3">Annual</th>
                <th className="pb-3">Paid</th><th className="pb-3">Due</th><th className="pb-3">Status</th><th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {pg.paged.map((s) => {
                const st = status(s.fees); const due = s.fees.annual - s.fees.paid
                return (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                    <td className="py-3 font-medium text-ink">{s.name}<div className="text-xs text-slate-400">{s.admissionNo}</div></td>
                    <td className="py-3 text-slate-600">{s.className} · {s.section}</td>
                    <td className="py-3 text-slate-600">{inr(s.fees.annual)}</td>
                    <td className="py-3 text-slate-600">{inr(s.fees.paid)}</td>
                    <td className="py-3 font-medium text-ink">{inr(due)}</td>
                    <td className="py-3"><Badge tone={st.tone}>{st.label}</Badge></td>
                    <td className="py-3 text-right">
                      {due > 0 ? (
                        <Can module="fees" action="update" fallback={<span className="text-xs text-slate-300">—</span>}>
                          <button onClick={() => openCollect(s)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-600"><Receipt className="h-3.5 w-3.5" /> Collect</button>
                        </Can>
                      ) : <Badge tone="green">Cleared</Badge>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Pagination {...pg} onPage={pg.setPage} />
      </Card>

      <Modal open={modal?.type === 'collect'} onClose={() => setModal(null)} title="Collect fee" subtitle={modal?.student?.name} size="sm">
        {modal?.student && (
          <form onSubmit={submit} className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 text-sm">
              <Row k="Annual fee" v={inr(modal.student.fees.annual)} />
              <Row k="Already paid" v={inr(modal.student.fees.paid)} />
              <Row k="Balance due" v={inr(modal.student.fees.annual - modal.student.fees.paid)} strong />
            </div>
            <TextField label="Amount to collect (₹)" type="number" value={amount} onChange={setAmount} required />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
              <button type="submit" className="btn-primary"><Receipt className="h-5 w-5" /> Record payment</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}
function Row({ k, v, strong }) {
  return <div className="flex justify-between py-0.5"><span className="text-slate-500">{k}</span><span className={strong ? 'font-bold text-ink' : 'text-ink'}>{v}</span></div>
}
