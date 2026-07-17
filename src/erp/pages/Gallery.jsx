import { useEffect, useMemo, useState } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'
import { listGallery, addGallery, deleteGallery } from '../api'
import Can from '../auth/Can'
import Modal from '../components/Modal'
import { PageHeader, Card, TextField, SelectField, Badge } from '../components/ui'

const CATS = ['Campus', 'Students', 'Events', 'Sports', 'Activities']
const empty = { title: '', category: 'Campus', src: '' }

export default function Gallery() {
  const [items, setItems] = useState([])
  const [cat, setCat] = useState('All')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)

  const refresh = () => listGallery().then(setItems)
  useEffect(() => { refresh() }, [])

  const filtered = useMemo(() => (cat === 'All' ? items : items.filter((i) => i.category === cat)), [items, cat])

  const submit = async (e) => { e.preventDefault(); await addGallery(form); setForm(empty); setModal(null); refresh() }
  const remove = async () => { await deleteGallery(modal.item.id); setModal(null); refresh() }

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle={`${items.length} photos · manage the public gallery`}
        actions={<Can module="gallery" action="create"><button onClick={() => { setForm(empty); setModal({ type: 'add' }) }} className="btn-primary"><ImagePlus className="h-5 w-5" /> Add photo</button></Can>}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {['All', ...CATS].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition ${cat === c ? 'bg-primary text-white ring-primary' : 'bg-white text-ink ring-slate-200 hover:ring-primary'}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((i) => (
          <Card key={i.id} className="group overflow-hidden !p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={i.src} alt={i.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              <Can module="gallery" action="delete">
                <button onClick={() => setModal({ type: 'delete', item: i })} className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-brandred opacity-0 shadow transition group-hover:opacity-100" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </Can>
            </div>
            <div className="p-3">
              <div className="truncate font-medium text-ink">{i.title}</div>
              <Badge tone="blue">{i.category}</Badge>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <p className="col-span-full py-10 text-center text-slate-400">No photos in this category.</p>}
      </div>

      <Modal open={modal?.type === 'add'} onClose={() => setModal(null)} title="Add photo">
        <form onSubmit={submit} className="space-y-4">
          <TextField label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
          <SelectField label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} options={CATS} />
          <TextField label="Image URL" value={form.src} onChange={(v) => setForm((f) => ({ ...f, src: v }))} placeholder="https://… or /images/campus/xyz.jpg" required />
          {form.src && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img src={form.src} alt="preview" className="h-40 w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Add photo</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === 'delete'} onClose={() => setModal(null)} title="Delete photo" size="sm"
        footer={<><button onClick={() => setModal(null)} className="btn-ghost">Cancel</button><button onClick={remove} className="inline-flex items-center gap-2 rounded-full bg-brandred px-5 py-2.5 font-semibold text-white hover:bg-brandred-600">Delete</button></>}>
        <p className="text-slate-600">Remove <strong className="text-ink">{modal?.item?.title}</strong> from the gallery?</p>
      </Modal>
    </div>
  )
}
