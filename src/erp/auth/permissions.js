// ---------------------------------------------------------------------------
// RBAC model for the School ERP.
//
// A user has ONE role (super_admin | management | teacher | student). The role
// provides sensible DEFAULT permissions. The super admin can then OVERRIDE
// permissions per user (stored on the user's `permissions` object), giving the
// fine-grained "read / create / update / delete per module" control.
//
// When we move to Supabase, these same module/action keys map 1:1 to
// Row-Level-Security policies — so the model does not change, only the storage.
// ---------------------------------------------------------------------------

export const ROLES = ['super_admin', 'management', 'teacher', 'student']

export const ROLE_LABELS = {
  super_admin: 'Super Admin',
  management: 'Management',
  teacher: 'Teacher',
  student: 'Student',
}

export const ACTIONS = ['read', 'create', 'update', 'delete']

// Modules the ERP is (or will be) made of.
export const MODULES = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'students', label: 'Students' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'fees', label: 'Fees' },
  { key: 'management', label: 'Management' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'users', label: 'Users & Roles' },
]

const all = { read: true, create: true, update: true, delete: true }
const readOnly = { read: true, create: false, update: false, delete: false }
const none = { read: false, create: false, update: false, delete: false }

// Default permission matrix per role. Missing modules default to `none`.
export const ROLE_PERMISSIONS = {
  super_admin: {
    dashboard: all, students: all, teachers: all, attendance: all,
    fees: all, management: all, gallery: all, users: all,
  },
  management: {
    dashboard: readOnly, students: all, teachers: all, attendance: readOnly,
    fees: all, management: all, gallery: all, users: none,
  },
  teacher: {
    dashboard: readOnly, students: readOnly, teachers: readOnly,
    attendance: { read: true, create: true, update: true, delete: false },
    fees: none, management: none, gallery: readOnly, users: none,
  },
  // A student only sees their OWN data (via their dashboard) + the gallery.
  // They must not see the admin tables of all students/fees/attendance.
  student: {
    dashboard: readOnly, students: none, teachers: none,
    attendance: none, fees: none, management: none,
    gallery: readOnly, users: none,
  },
}

// Build a full permission object for a role (every module present).
export function defaultPermissionsFor(role) {
  const base = ROLE_PERMISSIONS[role] || {}
  const result = {}
  for (const { key } of MODULES) result[key] = { ...none, ...(base[key] || {}) }
  return result
}

// Effective permission: the user's stored overrides if present, else role default.
export function can(user, moduleKey, action = 'read') {
  if (!user) return false
  if (user.role === 'super_admin') return true // super admin can do everything
  const source = user.permissions || defaultPermissionsFor(user.role)
  return Boolean(source?.[moduleKey]?.[action])
}

// Landing route after login, by role.
export function homeRouteFor(role) {
  switch (role) {
    case 'student':
      return '/erp/student'
    case 'teacher':
      return '/erp/teacher'
    default:
      return '/erp/dashboard' // super_admin & management
  }
}
