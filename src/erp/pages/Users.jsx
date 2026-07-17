import { useEffect, useState } from 'react'
import { UserPlus, Trash2, ShieldCheck, Check } from 'lucide-react'
import Modal from '../components/Modal'
import {
  listUsers,
  createUser,
  updateUserPermissions,
  updateUserRole,
  deleteUser,
} from '../api'
import {
  ROLES,
  ROLE_LABELS,
  MODULES,
  ACTIONS,
  defaultPermissionsFor,
} from '../auth/permissions'
import { useAuth } from '../auth/AuthContext'
import { PageHeader, Card } from '../components/ui'

const empty = { name: '', email: '', password: '', role: 'student' }

export default function Users() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState([])
  const [drawer, setDrawer] = useState(null) // { mode: 'add' | 'edit', user }
  const [form, setForm] = useState(empty)
  const [perms, setPerms] = useState(defaultPermissionsFor('student'))
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')

  const refresh = () => listUsers().then(setUsers)
  useEffect(() => { refresh() }, [])

  const openAdd = () => {
    setForm(empty)
    setRole('student')
    setPerms(defaultPermissionsFor('student'))
    setError('')
    setDrawer({ mode: 'add' })
  }

  const openEdit = (u) => {
    setForm({ name: u.name, email: u.email, password: '', role: u.role })
    setRole(u.role)
    setPerms(u.permissions || defaultPermissionsFor(u.role))
    setError('')
    setDrawer({ mode: 'edit', user: u })
  }

  // When role changes, reset the matrix to that role's defaults.
  const changeRole = (r) => {
    setRole(r)
    setForm((f) => ({ ...f, role: r }))
    setPerms(defaultPermissionsFor(r))
  }

  const toggle = (mod, act) =>
    setPerms((p) => ({ ...p, [mod]: { ...p[mod], [act]: !p[mod]?.[act] } }))

  const save = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (drawer.mode === 'add') {
        await createUser({ ...form, role, permissions: perms })
      } else {
        if (role !== drawer.user.role) await updateUserRole(drawer.user.id, role)
        await updateUserPermissions(drawer.user.id, perms)
      }
      setDrawer(null)
      refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (u) => {
    if (u.id === me.id) return
    if (!confirm(`Delete user "${u.name}"?`)) return
    await deleteUser(u.id)
    refresh()
  }

  const roleBadge = {
    super_admin: 'bg-brandred-50 text-brandred',
    management: 'bg-primary/10 text-primary',
    teacher: 'bg-accent/20 text-accent-700',
    student: 'bg-success-light text-success',
  }

  return (
    <div>
      <PageHeader
        title="Users & Roles"
        subtitle="Onboard users and control exactly what each person can access."
        actions={
          <button onClick={openAdd} className="btn-primary">
            <UserPlus className="h-5 w-5" /> Add user
          </button>
        }
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-slate-50">
                  <td className="py-3 font-medium text-ink">{u.name}</td>
                  <td className="py-3 text-slate-500">{u.email}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleBadge[u.role]}`}>
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(u)} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-ink hover:border-primary hover:text-primary">
                        <ShieldCheck className="mr-1 inline h-3.5 w-3.5" /> Permissions
                      </button>
                      <button
                        onClick={() => remove(u)}
                        disabled={u.id === me.id}
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-brandred hover:text-brandred disabled:opacity-30"
                        aria-label="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Onboard / edit access modal */}
      <Modal
        open={Boolean(drawer)}
        onClose={() => setDrawer(null)}
        size="lg"
        title={drawer?.mode === 'add' ? 'Onboard new user' : `Edit access — ${drawer?.user?.name}`}
        subtitle="Assign a role, then fine-tune module access."
      >
        {error && (
          <div className="mb-4 rounded-xl bg-brandred-50 px-4 py-2.5 text-sm font-medium text-brandred">{error}</div>
        )}
        <form onSubmit={save} className="space-y-4">
              {drawer?.mode === 'add' && (
                <>
                  <Field label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
                  <Field label="Temporary password" value={form.password} onChange={(v) => setForm((f) => ({ ...f, password: v }))} required />
                </>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Role</label>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r} type="button" onClick={() => changeRole(r)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition ${
                        role === r ? 'bg-primary text-white ring-primary' : 'bg-white text-ink ring-slate-200 hover:ring-primary'
                      }`}
                    >
                      {ROLE_LABELS[r]}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-slate-400">Selecting a role applies its default permissions. Fine-tune below.</p>
              </div>

              {/* Permission matrix */}
              <div>
                <label className="mb-2 block text-sm font-medium text-ink">Module access</label>
                <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                        <th className="p-2.5 text-left">Module</th>
                        {ACTIONS.map((a) => <th key={a} className="p-2.5 capitalize">{a}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {MODULES.map((m) => (
                        <tr key={m.key} className="border-t border-slate-100">
                          <td className="p-2.5 font-medium text-ink">{m.label}</td>
                          {ACTIONS.map((a) => {
                            const on = Boolean(perms[m.key]?.[a])
                            const disabled = role === 'super_admin'
                            return (
                              <td key={a} className="p-2.5 text-center">
                                <button
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => toggle(m.key, a)}
                                  className={`flex h-6 w-6 items-center justify-center rounded-md ring-1 transition ${
                                    on || disabled ? 'bg-success text-white ring-success' : 'bg-white text-transparent ring-slate-300 hover:ring-success'
                                  } ${disabled ? 'opacity-70' : ''}`}
                                  aria-label={`${m.label} ${a}`}
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {role === 'super_admin' && (
                  <p className="mt-1.5 text-xs text-brandred">Super Admin always has full access.</p>
                )}
              </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setDrawer(null)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">
              {drawer?.mode === 'add' ? 'Create user' : 'Save changes'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        type={type} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
