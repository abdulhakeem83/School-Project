// ---------------------------------------------------------------------------
// Seed data for the MOCK ERP. All fictional — no real student PII.
// Data is generated DETERMINISTICALLY (index-based, no randomness) so the demo
// stays stable across reloads. Replaced by real DB tables when we add Supabase.
// ---------------------------------------------------------------------------
import { defaultPermissionsFor } from '../auth/permissions'
import { asset } from '../../data/constants'

// ---- login accounts ----
export const DEMO_USERS = [
  { id: 'u-admin', name: 'Syed Saber', email: 'admin@avcs.edu', password: 'admin123', role: 'super_admin', permissions: null, studentId: null },
  { id: 'u-manage', name: 'Office Management', email: 'management@avcs.edu', password: 'manage123', role: 'management', permissions: null, studentId: null },
  { id: 'u-teacher', name: 'Mr. Imran Ahmed', email: 'teacher@avcs.edu', password: 'teacher123', role: 'teacher', permissions: null, staffId: 'st-3', studentId: null },
  { id: 'u-student', name: 'Aliya Fatima', email: 'student@avcs.edu', password: 'student123', role: 'student', permissions: null, studentId: 's-1' },
]

// ---- helpers ----
const FIRST_M = ['Ahmed', 'Mohammed', 'Abdul', 'Imran', 'Yousuf', 'Bilal', 'Zaid', 'Faizan', 'Rehan', 'Sami', 'Arjun', 'Rahul', 'Karthik', 'Vijay', 'Anil']
const FIRST_F = ['Aliya', 'Fatima', 'Ayesha', 'Sana', 'Zainab', 'Nusrat', 'Farha', 'Iqra', 'Hiba', 'Mahnoor', 'Anjali', 'Divya', 'Priya', 'Kavya', 'Sneha']
const LAST = ['Khan', 'Ahmed', 'Sheikh', 'Begum', 'Kausar', 'Rao', 'Kumar', 'Patil', 'Reddy', 'Naik', 'Ali', 'Hussain', 'Pasha', 'Sait', 'Fatima']
const GUARD = ['Mohammed Ismail', 'Abdul Kareem', 'Syed Rahim', 'Rahul Rao', 'Imtiaz Ali', 'Prakash Kumar', 'Nasir Ahmed', 'Vijay Patil', 'Shabbir Hussain', 'Anil Reddy']
const CLASSES = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X']
const SUBJECTS = ['English', 'Mathematics', 'Science', 'Social Science', 'Urdu', 'Deeni Education']

function feeForClass(cls) {
  const i = CLASSES.indexOf(cls)
  if (i <= 2) return 18000
  if (i <= 7) return 22000
  if (i <= 10) return 26000
  return 30000
}
function gradeFor(m) {
  if (m >= 90) return 'A+'
  if (m >= 80) return 'A'
  if (m >= 70) return 'B+'
  if (m >= 60) return 'B'
  return 'C'
}

export const DEFAULT_TIMETABLE = [
  { day: 'Monday', periods: ['English', 'Maths', 'Science', 'Urdu', 'Deeni'] },
  { day: 'Tuesday', periods: ['Maths', 'Social', 'English', 'Computer', 'Deeni'] },
  { day: 'Wednesday', periods: ['Science', 'English', 'Maths', 'Urdu', 'Games'] },
  { day: 'Thursday', periods: ['Social', 'Science', 'Maths', 'Deeni', 'Urdu'] },
  { day: 'Friday', periods: ['English', 'Deeni', 'Maths', 'Science', 'Library'] },
  { day: 'Saturday', periods: ['Revision', 'Activity', 'Sports', '—', '—'] },
]

// ---- 50 students (deterministic) ----
export function buildStudents() {
  const list = []
  for (let i = 0; i < 50; i++) {
    const male = i % 2 === 0
    const first = male ? FIRST_M[i % FIRST_M.length] : FIRST_F[i % FIRST_F.length]
    const last = LAST[(i * 3) % LAST.length]
    const className = CLASSES[i % CLASSES.length]
    const section = i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
    const annual = feeForClass(className)
    const payState = i % 4 // 0 paid, 1 part, 2 half, 3 unpaid-ish
    const paid = payState === 0 ? annual : payState === 1 ? annual - 6000 : payState === 2 ? Math.round(annual / 2) : annual - 12000
    const total = 210
    const present = total - ((i * 3) % 22) - (i % 5)
    const marks = SUBJECTS.map((s, j) => {
      const m = 58 + ((i * 5 + j * 13) % 42)
      return { subject: s, marks: m, max: 100, grade: gradeFor(m) }
    })
    list.push({
      id: `s-${i + 1}`,
      admissionNo: `AVCS-2026-${101 + i}`,
      name: `${first} ${last}`,
      className,
      section,
      rollNo: Math.floor(i / CLASSES.length) + 1 + (i % 7),
      gender: male ? 'Male' : 'Female',
      dob: `20${12 - (i % 6)}-0${(i % 9) + 1}-1${i % 9}`,
      guardian: GUARD[i % GUARD.length],
      phone: `+91 9${(100000000 + i * 137137).toString().slice(0, 9)}`,
      address: 'Basavakalyan, Dist. Bidar',
      status: i % 11 === 0 ? 'Inactive' : 'Active',
      attendance: { present: Math.max(present, 150), total },
      fees: { annual, paid: Math.max(paid, 0), dueDate: '2026-08-10' },
      marks,
    })
  }
  return list
}

// ---- 12 staff ----
export function buildStaff() {
  return [
    { id: 'st-1', name: 'Mr. Abdul Rahman', role: 'Principal', subject: 'Administration', gender: 'Male', phone: '+91 90000 10001', email: 'principal@avcs.edu', salary: 45000, joinDate: '2010-06-01', status: 'Active', attendancePct: 99 },
    { id: 'st-2', name: 'Mrs. Ayesha Begum', role: 'Vice Principal', subject: 'Administration', gender: 'Female', phone: '+91 90000 10002', email: 'vp@avcs.edu', salary: 38000, joinDate: '2012-06-01', status: 'Active', attendancePct: 98 },
    { id: 'st-3', name: 'Mr. Imran Ahmed', role: 'Senior Teacher', subject: 'English', gender: 'Male', phone: '+91 90000 10003', email: 'teacher@avcs.edu', salary: 28000, joinDate: '2014-06-15', status: 'Active', attendancePct: 96 },
    { id: 'st-4', name: 'Mr. Ravi Kumar', role: 'Senior Teacher', subject: 'Mathematics', gender: 'Male', phone: '+91 90000 10004', email: 'ravi@avcs.edu', salary: 27000, joinDate: '2015-06-10', status: 'Active', attendancePct: 94 },
    { id: 'st-5', name: 'Ms. Zainab Ali', role: 'Teacher', subject: 'Science', gender: 'Female', phone: '+91 90000 10005', email: 'zainab@avcs.edu', salary: 24000, joinDate: '2017-06-05', status: 'Active', attendancePct: 95 },
    { id: 'st-6', name: 'Mr. Mohammed Yousuf', role: 'Teacher', subject: 'Social Science', gender: 'Male', phone: '+91 90000 10006', email: 'yousuf@avcs.edu', salary: 23000, joinDate: '2018-06-20', status: 'Active', attendancePct: 92 },
    { id: 'st-7', name: 'Maulana Abdul Qadir', role: 'Deeni Teacher', subject: 'Deeni Education', gender: 'Male', phone: '+91 90000 10007', email: 'qadir@avcs.edu', salary: 22000, joinDate: '2013-06-01', status: 'Active', attendancePct: 99 },
    { id: 'st-8', name: 'Mrs. Shabana Parveen', role: 'Teacher', subject: 'Urdu', gender: 'Female', phone: '+91 90000 10008', email: 'shabana@avcs.edu', salary: 22000, joinDate: '2016-06-12', status: 'Active', attendancePct: 97 },
    { id: 'st-9', name: 'Mr. Prakash Rao', role: 'Teacher', subject: 'Kannada', gender: 'Male', phone: '+91 90000 10009', email: 'prakash@avcs.edu', salary: 22000, joinDate: '2019-06-01', status: 'Active', attendancePct: 90 },
    { id: 'st-10', name: 'Ms. Nikhat Fatima', role: 'Teacher', subject: 'Computer', gender: 'Female', phone: '+91 90000 10010', email: 'nikhat@avcs.edu', salary: 21000, joinDate: '2020-06-08', status: 'Active', attendancePct: 93 },
    { id: 'st-11', name: 'Ms. Sana Kausar', role: 'Primary Teacher', subject: 'Primary Section', gender: 'Female', phone: '+91 90000 10011', email: 'sana@avcs.edu', salary: 20000, joinDate: '2021-06-01', status: 'Active', attendancePct: 96 },
    { id: 'st-12', name: 'Ms. Fatima Sheikh', role: 'Pre-Primary Teacher', subject: 'Pre-Primary', gender: 'Female', phone: '+91 90000 10012', email: 'fatimah@avcs.edu', salary: 19000, joinDate: '2022-06-01', status: 'Active', attendancePct: 98 },
  ]
}

// ---- finance (income / expenditure) ----
export function buildFinance() {
  return [
    { id: 'f-1', date: '2026-07-01', title: 'Tuition fees collection', category: 'Fees', type: 'income', amount: 320000 },
    { id: 'f-2', date: '2026-07-02', title: 'Admission fees', category: 'Admissions', type: 'income', amount: 85000 },
    { id: 'f-3', date: '2026-07-03', title: 'Staff salaries', category: 'Salaries', type: 'expense', amount: 291000 },
    { id: 'f-4', date: '2026-07-04', title: 'Electricity bill', category: 'Utilities', type: 'expense', amount: 12500 },
    { id: 'f-5', date: '2026-07-05', title: 'Transport fees', category: 'Transport', type: 'income', amount: 46000 },
    { id: 'f-6', date: '2026-07-06', title: 'Stationery & books', category: 'Supplies', type: 'expense', amount: 18400 },
    { id: 'f-7', date: '2026-07-08', title: 'Donation — Trust', category: 'Donation', type: 'income', amount: 60000 },
    { id: 'f-8', date: '2026-07-09', title: 'Building maintenance', category: 'Maintenance', type: 'expense', amount: 22000 },
    { id: 'f-9', date: '2026-07-10', title: 'Exam fees', category: 'Fees', type: 'income', amount: 28000 },
    { id: 'f-10', date: '2026-07-11', title: 'Water & sanitation', category: 'Utilities', type: 'expense', amount: 6800 },
  ]
}

// ---- gallery (ERP-managed) ----
export function buildGallery() {
  return [
    { id: 'g-1', title: 'School campus', category: 'Campus', src: asset('images/campus/building.jpg') },
    { id: 'g-2', title: 'Our students', category: 'Students', src: asset('images/campus/students-group.jpg') },
    { id: 'g-3', title: 'A love for reading', category: 'Students', src: asset('images/campus/student-book.jpg') },
    { id: 'g-4', title: 'Celebrating together', category: 'Events', src: asset('images/campus/cheering.jpg') },
    { id: 'g-5', title: 'Ready for school', category: 'Students', src: asset('images/campus/waving.jpg') },
  ]
}

// ---- notices ----
export const NOTICES = [
  { id: 'no1', date: '2026-07-10', title: 'Unit Test I begins', body: 'Unit Test I starts on 21 July. Timetable shared with class teachers.' },
  { id: 'no2', date: '2026-07-05', title: 'Fee reminder', body: 'Second-term fees are due by 10 August. Please pay at the school office.' },
  { id: 'no3', date: '2026-06-28', title: 'PTM this Saturday', body: 'Parent–Teacher Meeting on Saturday, 9:30 AM to 12:00 PM.' },
]

export function buildInitialUsers() {
  return DEMO_USERS.map((u) => ({ ...u, permissions: u.permissions || defaultPermissionsFor(u.role) }))
}
