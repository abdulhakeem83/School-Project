import {
  GraduationCap,
  Users,
  BarChart3,
  Images,
  UserRound,
  Wallet,
  CalendarCheck,
  BadgeIndianRupee,
  TrendingUp,
  TrendingDown,
  ClipboardList,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// The School ERP scope (Phase 2), kept intentionally simple and grouped into
// four modules. The Gallery module is already LIVE as a public page in Phase 1.
// ---------------------------------------------------------------------------

export const ERP_GROUPS = [
  {
    key: 'student',
    title: 'Student Module',
    tagline: 'Everything about your students, in one place.',
    icon: GraduationCap,
    status: 'soon',
    features: [
      { icon: UserRound, label: 'Student Details', text: 'Profiles, class & section, contact records.' },
      { icon: Wallet, label: 'Fee Management', text: 'Fee collection, receipts and pending dues.' },
      { icon: CalendarCheck, label: 'Attendance Management', text: 'Daily attendance with simple reports.' },
    ],
  },
  {
    key: 'teacher',
    title: 'Teacher Module',
    tagline: 'Manage staff records with zero hassle.',
    icon: Users,
    status: 'soon',
    features: [
      { icon: UserRound, label: 'Teacher Details', text: 'Profiles, subjects and contact records.' },
      { icon: BadgeIndianRupee, label: 'Salary Management', text: 'Salary, allowances and pay slips.' },
      { icon: CalendarCheck, label: 'Attendance Management', text: 'Staff attendance and leave tracking.' },
    ],
  },
  {
    key: 'management',
    title: 'Management Module',
    tagline: 'A clear picture of the school’s finances.',
    icon: BarChart3,
    status: 'soon',
    features: [
      { icon: TrendingUp, label: 'Income Tracking', text: 'Record fees, grants and other income.' },
      { icon: TrendingDown, label: 'Expenditure Tracking', text: 'Track and categorise all expenses.' },
      { icon: ClipboardList, label: 'School Records', text: 'Overall management records & summaries.' },
    ],
  },
  {
    key: 'gallery',
    title: 'Gallery',
    tagline: 'A public gallery visitors can browse.',
    icon: Images,
    status: 'live',
    to: '/gallery',
    features: [
      { icon: Images, label: 'Public Gallery', text: 'Campus, sports and event photos for everyone.' },
    ],
  },
]
