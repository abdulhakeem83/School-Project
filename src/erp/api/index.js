// ---------------------------------------------------------------------------
// ERP data-access layer (MOCK implementation).
//
// Every screen talks to the ERP through these functions only. To move to a
// real backend later, reimplement this file against Supabase — the pages don't
// change. All collections are persisted to localStorage so add/edit/delete
// survive a refresh during the demo.
// ---------------------------------------------------------------------------
import {
  buildInitialUsers,
  buildStudents,
  buildStaff,
  buildFinance,
  buildGallery,
  NOTICES,
  DEFAULT_TIMETABLE,
} from '../data/seed'
import { defaultPermissionsFor } from '../auth/permissions'

const SESSION_KEY = 'avcs_erp_session_v2'
const K = {
  users: 'avcs_erp_users_v2',
  students: 'avcs_erp_students_v2',
  staff: 'avcs_erp_staff_v2',
  finance: 'avcs_erp_finance_v2',
  gallery: 'avcs_erp_gallery_v2',
}

// Generic collection load/save with a seed initializer.
function load(key, seedFn) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const initial = seedFn()
  localStorage.setItem(key, JSON.stringify(initial))
  return initial
}
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
const uid = (p) => `${p}-${Date.now()}-${Math.floor(performance.now())}`

function stripPw(u) {
  if (!u) return null
  const { password, ...rest } = u // eslint-disable-line no-unused-vars
  return rest
}

// =========================================================== AUTH
export async function login(email, password) {
  const users = load(K.users, buildInitialUsers)
  const found = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase().trim())
  if (!found || found.password !== password) throw new Error('Invalid email or password')
  localStorage.setItem(SESSION_KEY, found.id)
  return stripPw(found)
}
export function currentUser() {
  const id = localStorage.getItem(SESSION_KEY)
  if (!id) return null
  return stripPw(load(K.users, buildInitialUsers).find((u) => u.id === id))
}
export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

// =========================================================== USERS
export async function listUsers() {
  return load(K.users, buildInitialUsers).map(stripPw)
}
export async function createUser({ name, email, password, role, permissions }) {
  const users = load(K.users, buildInitialUsers)
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase().trim()))
    throw new Error('A user with this email already exists')
  const newUser = {
    id: uid('u'), name: name.trim(), email: email.trim(), password, role,
    permissions: permissions || defaultPermissionsFor(role), studentId: null,
  }
  users.push(newUser)
  save(K.users, users)
  return stripPw(newUser)
}
export async function updateUserPermissions(id, permissions) {
  const users = load(K.users, buildInitialUsers)
  const u = users.find((x) => x.id === id)
  if (!u) throw new Error('User not found')
  u.permissions = permissions
  save(K.users, users)
  return stripPw(u)
}
export async function updateUserRole(id, role) {
  const users = load(K.users, buildInitialUsers)
  const u = users.find((x) => x.id === id)
  if (!u) throw new Error('User not found')
  u.role = role
  u.permissions = defaultPermissionsFor(role)
  save(K.users, users)
  return stripPw(u)
}
export async function deleteUser(id) {
  save(K.users, load(K.users, buildInitialUsers).filter((u) => u.id !== id))
  return true
}

// =========================================================== STUDENTS
export async function listStudents() {
  return load(K.students, buildStudents)
}
export async function getStudent(id) {
  return load(K.students, buildStudents).find((s) => s.id === id) || null
}
export async function createStudent(data) {
  const students = load(K.students, buildStudents)
  const student = {
    id: uid('s'),
    admissionNo: data.admissionNo || `AVCS-2026-${200 + students.length}`,
    status: 'Active',
    attendance: { present: 0, total: 0 },
    fees: { annual: Number(data.annualFee) || 22000, paid: 0, dueDate: '2026-08-10' },
    marks: [],
    ...data,
  }
  students.push(student)
  save(K.students, students)
  return student
}
export async function updateStudent(id, data) {
  const students = load(K.students, buildStudents)
  const s = students.find((x) => x.id === id)
  if (!s) throw new Error('Student not found')
  Object.assign(s, data)
  save(K.students, students)
  return s
}
export async function deleteStudent(id) {
  save(K.students, load(K.students, buildStudents).filter((s) => s.id !== id))
  return true
}
export async function getStudentDashboard(studentId) {
  const students = load(K.students, buildStudents)
  const student = students.find((s) => s.id === studentId) || students[0]
  return {
    student,
    attendance: student.attendance,
    fees: student.fees,
    marks: student.marks,
    timetable: DEFAULT_TIMETABLE,
    notices: NOTICES,
  }
}

// =========================================================== STAFF
export async function listStaff() {
  return load(K.staff, buildStaff)
}
export async function createStaff(data) {
  const staff = load(K.staff, buildStaff)
  const s = { id: uid('st'), status: 'Active', attendancePct: 100, ...data }
  staff.push(s)
  save(K.staff, staff)
  return s
}
export async function updateStaff(id, data) {
  const staff = load(K.staff, buildStaff)
  const s = staff.find((x) => x.id === id)
  if (!s) throw new Error('Staff not found')
  Object.assign(s, data)
  save(K.staff, staff)
  return s
}
export async function deleteStaff(id) {
  save(K.staff, load(K.staff, buildStaff).filter((s) => s.id !== id))
  return true
}

// =========================================================== FEES
// Fees are part of the student record. Collecting a fee increases `paid`.
export async function collectFee(studentId, amount) {
  const students = load(K.students, buildStudents)
  const s = students.find((x) => x.id === studentId)
  if (!s) throw new Error('Student not found')
  s.fees.paid = Math.min(s.fees.annual, s.fees.paid + Number(amount))
  save(K.students, students)
  return s
}

// =========================================================== FINANCE
export async function listFinance() {
  return load(K.finance, buildFinance)
}
export async function addFinance(entry) {
  const finance = load(K.finance, buildFinance)
  finance.unshift({ id: uid('f'), ...entry, amount: Number(entry.amount) })
  save(K.finance, finance)
  return finance
}
export async function deleteFinance(id) {
  save(K.finance, load(K.finance, buildFinance).filter((f) => f.id !== id))
  return true
}

// =========================================================== GALLERY
export async function listGallery() {
  return load(K.gallery, buildGallery)
}
export async function addGallery(item) {
  const gallery = load(K.gallery, buildGallery)
  gallery.unshift({ id: uid('g'), ...item })
  save(K.gallery, gallery)
  return gallery
}
export async function deleteGallery(id) {
  save(K.gallery, load(K.gallery, buildGallery).filter((g) => g.id !== id))
  return true
}

// =========================================================== NOTICES
export async function getNotices() {
  return NOTICES
}

// Reset all mock data (dev helper).
export function resetErpData() {
  Object.values(K).forEach((k) => localStorage.removeItem(k))
  localStorage.removeItem(SESSION_KEY)
}
