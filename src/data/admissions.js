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
    description: 'Collect the welcome kit, uniform details and join the North Public School family!',
  },
]

export const ELIGIBILITY = [
  { grade: 'Nursery', age: '3+ years as on 31st March' },
  { grade: 'LKG', age: '4+ years as on 31st March' },
  { grade: 'UKG', age: '5+ years as on 31st March' },
  { grade: 'Class I', age: '6+ years as on 31st March' },
  { grade: 'Class II – IX', age: 'As per previous grade completion' },
  { grade: 'Class XI', age: 'Based on Class X results & stream availability' },
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

// Indicative fee structure (annual, in INR) — static/demo values.
export const FEE_STRUCTURE = [
  { level: 'Pre-Primary (Nursery – UKG)', admission: '₹ 15,000', tuition: '₹ 48,000', transport: '₹ 12,000' },
  { level: 'Primary (I – V)', admission: '₹ 18,000', tuition: '₹ 58,000', transport: '₹ 12,000' },
  { level: 'Middle (VI – VIII)', admission: '₹ 20,000', tuition: '₹ 66,000', transport: '₹ 14,000' },
  { level: 'High School (IX – X)', admission: '₹ 22,000', tuition: '₹ 74,000', transport: '₹ 14,000' },
  { level: 'Senior Secondary (XI – XII)', admission: '₹ 25,000', tuition: '₹ 86,000', transport: '₹ 16,000' },
]

export const TIMINGS = [
  { label: 'Pre-Primary', value: '8:30 AM – 12:30 PM' },
  { label: 'Primary (I – V)', value: '8:00 AM – 2:00 PM' },
  { label: 'Classes VI – XII', value: '8:00 AM – 3:30 PM' },
  { label: 'School Office', value: 'Mon – Sat · 8:30 AM – 4:00 PM' },
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
    a: 'We maintain an average ratio of 25:1, ensuring every child receives individual attention and mentoring.',
  },
  {
    q: 'Does the school provide transport facilities?',
    a: 'Yes. We operate a GPS-tracked bus fleet with trained drivers and attendants covering all major routes across the city.',
  },
  {
    q: 'Which board is the school affiliated to?',
    a: 'North Public School is affiliated to the Central Board of Secondary Education (CBSE), New Delhi.',
  },
  {
    q: 'Are scholarships available?',
    a: 'Yes, merit-based and need-based scholarships are available for deserving students. Please contact the admissions office for details.',
  },
]
