import {
  ClipboardList,
  FileCheck2,
  CalendarCheck,
  UserCheck,
  CreditCard,
  PartyPopper,
} from 'lucide-react'

// Step-by-step admission process for the Admissions page.
export const ADMISSION_STEPS = [
  {
    icon: ClipboardList,
    title: 'Enquiry & Registration',
    description: 'Fill in the online enquiry form and collect the registration form from the office.',
  },
  {
    icon: FileCheck2,
    title: 'Submit Documents',
    description: 'Submit the completed form along with the required documents listed below.',
  },
  {
    icon: CalendarCheck,
    title: 'Interaction / Assessment',
    description: 'Attend a friendly interaction (and an assessment for higher classes).',
  },
  {
    icon: UserCheck,
    title: 'Confirmation',
    description: 'Receive the admission offer and confirmation from the admissions office.',
  },
  {
    icon: CreditCard,
    title: 'Fee Payment',
    description: 'Complete the admission and first-term fee payment to reserve the seat.',
  },
  {
    icon: PartyPopper,
    title: 'Welcome Aboard',
    description: 'Collect the welcome kit, uniform details and join the Apple Valley Creative School family!',
  },
]

export const ELIGIBILITY = [
  { grade: 'Nursery', age: '3+ years as on 31st March' },
  { grade: 'LKG', age: '4+ years as on 31st March' },
  { grade: 'UKG', age: '5+ years as on 31st March' },
  { grade: 'Class I', age: '6+ years as on 31st March' },
  { grade: 'Class II – X', age: 'As per previous grade completion' },
]

export const DOCUMENTS = [
  'Birth certificate (original + photocopy)',
  'Aadhaar card of the student',
  'Recent passport-size photographs (4)',
  'Transfer Certificate (for Class II and above)',
  'Report card / marksheet of the previous class',
  'Address proof of the parent / guardian',
  'Caste / category certificate (if applicable)',
]

// Fee structure — please contact the school office for current fees.
// TODO: replace 'On request' with the school's actual fee figures.
export const FEE_STRUCTURE = [
  { level: 'Pre-Primary (Nursery – UKG)', admission: 'On request', tuition: 'On request', transport: 'On request' },
  { level: 'Primary (I – V)', admission: 'On request', tuition: 'On request', transport: 'On request' },
  { level: 'Higher Primary (VI – VIII)', admission: 'On request', tuition: 'On request', transport: 'On request' },
  { level: 'High School (IX – X)', admission: 'On request', tuition: 'On request', transport: 'On request' },
]

export const TIMINGS = [
  { label: 'Pre-Primary', value: '9:00 AM – 12:30 PM' },
  { label: 'Primary (I – V)', value: '9:00 AM – 2:00 PM' },
  { label: 'Classes VI – X', value: '9:00 AM – 3:30 PM' },
  { label: 'School Office', value: 'Mon – Sat · 9:00 AM – 4:00 PM' },
]

export const FAQS = [
  {
    q: 'When do admissions open for the new session?',
    a: 'Admissions for the 2026–27 session are currently open. Registration typically begins in November and continues until seats are filled.',
  },
  {
    q: 'Is there an entrance test for admission?',
    a: 'For Pre-Primary and Primary, admission is through a friendly interaction. For Classes VI and above, a basic assessment in core subjects is conducted.',
  },
  {
    q: 'What is the student-teacher ratio?',
    a: 'We keep our classes small so that every child receives individual attention and caring mentorship.',
  },
  {
    q: 'Does the school provide transport facilities?',
    a: 'Please contact the school office to check transport availability for your area.',
  },
  {
    q: 'What kind of education does the school offer?',
    a: 'Apple Valley Creative School offers a perfect blend of high-quality modern education and comprehensive religious (Deeni) education, from Pre-Primary to High School.',
  },
  {
    q: 'Are scholarships or concessions available?',
    a: 'Please contact the school office to learn about available scholarships and concessions for deserving students.',
  },
]
