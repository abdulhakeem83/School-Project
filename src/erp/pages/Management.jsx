import { useEffect, useMemo, useState } from 'react'
import { TrendingUp, TrendingDown, Scale, Plus, Trash2, IndianRupee } from 'lucide-react'
import { listFinance, addFinance, deleteFinance } from '../api'
import Can from '../auth/Can'
import Modal from '../components/Modal'
import { PageHeader, Card, StatTile, Badge, TextField, SelectField, usePaged, Pagination } from '../components/ui'

const inr = (n) => `₹ ${Number(n).toLocaleString('en-IN')}`
const CATS = ['Fees', 'Admissions', 'Transport', 'Donation', 'Salaries', 'Utilities', 'Supplies', 'Maintenance', 'Other']
const empty = { date: '2026-07-15', title: '', category: 'Fees', type: 'income', amount: '' }

export default function Management() {
  const [rows, setRows] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)

  const refresh = () => listFinance().then(setRows)
  useEffect(() => { refresh() }, [])

  const t = useMemo(() => {
    const income = rows.filter((r) => r.type === 'income').reduce((s, r) => s + r.amount, 0)
    const expense = rows.filter((r) => r.type === 'expense').reduce((s, r) => s + r.amount, 0)
    return { income, expense, net: income - expense }
  }, [rows])

  // Category breakdown (expenses) for a simple bar chart.
  const byCat = useMemo(() => {
    const m = {}
    rows.filter((r) => r.type === 'expense').forEach((r) => { m[r.category] = (m[r.category] || 0) + r.amount })
    const max = Math.max(1, ...Object.values(m))
    return Object.entries(m).map(([k, v]) => ({ cat: k, amount: v, pct: Math.round((v / max) * 100) })).sort((a, b) => b.amount - a.amount)
  }, [rows])

  const pg = usePaged(rows, 10, String(rows.length))

  const submit = async (e) => { e.preventDefault(); await addFinance(form); setForm(empty); setModal(false); refresh() }
  const remove = async (id) => { await deleteFinance(id); refresh() }

  return (
    <div>
      <PageHeader
        title="Management"
        subtitle="Income, expenditure and financial summary"
        actions={<Can module="management" action="create"><button onClick={() => setModal(true)} className="btn-primary"><Plus className="h-5 w-5" /> Add transaction</button></Can>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatTile icon={TrendingUp} tone="success" index={0} label="Total income" value={inr(t.income)} />
        <StatTile icon={TrendingDown} tone="red" index={1} label="Total expenditure" value={inr(t.expense)} />
        <StatTile icon={Scale} tone={t.net >= 0 ? 'primary' : 'red'} index={2} label="Net balance" value={inr(t.net)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Recent transactions" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3">Date</th><th className="pb-3">Title</th><th className="pb-3">Category</th>
                  <th className="pb-3">Type</th><th className="pb-3 text-right">Amount</th><th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {pg.paged.map((r) => (
                  <tr key={r.id} className="border-b border-slate-50">
                    <td className="py-3 text-slate-500">{r.date}</td>
                    <td className="py-3 font-medium text-ink">{r.title}</td>
                    <td className="py-3 text-slate-600">{r.category}</td>
                    <td className="py-3"><Badge tone={r.type === 'income' ? 'green' : 'red'}>{r.type}</Badge></td>
                    <td className={`py-3 text-right font-semibold ${r.type === 'income' ? 'text-success' : 'text-brandred'}`}>{r.type === 'income' ? '+' : '−'} {inr(r.amount)}</td>
                    <td className="py-3 text-right">
                      <Can module="management" action="delete">
                        <button onClick={() => remove(r.id)} className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-brandred hover:text-brandred" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                      </Can>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination {...pg} onPage={pg.setPage} />
        </Card>

        <Card title="Expenditure by category">
          <div className="space-y-3">
            {byCat.map((c) => (
              <div key={c.cat}>
                <div className="mb-1 flex justify-between text-sm"><span className="text-slate-600">{c.cat}</span><span className="font-medium text-ink">{inr(c.amount)}</span></div>
                <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-gradient-to-r from-primary to-brandred" style={{ width: `${c.pct}%` }} /></div>
              </div>
            ))}
            {byCat.length === 0 && <p className="text-sm text-slate-400">No expenses recorded.</p>}
          </div>
        </Card>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add transaction">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Type" value={form.type} onChange={(v) => setForm((f) => ({ ...f, type: v }))} options={[{ value: 'income', label: 'Income' }, { value: 'expense', label: 'Expense' }]} />
            <TextField label="Date" type="date" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} />
          </div>
          <TextField label="Title / description" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} options={CATS} />
            <TextField label="Amount (₹)" type="number" value={form.amount} onChange={(v) => setForm((f) => ({ ...f, amount: v }))} required />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary"><IndianRupee className="h-5 w-5" /> Save</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
