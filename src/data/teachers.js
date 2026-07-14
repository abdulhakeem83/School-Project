// Faculty directory — PLACEHOLDER data with friendly dummy names and dummy
// avatar photos. Replace `name`, `qualification`, `experience` and set a real
// `photo` (e.g. asset('images/faculty/name.jpg')) with the school's actual
// staff details before treating this as the official faculty list.

import { avatarUrl } from './constants'

const withPhoto = (person) => ({ ...person, photo: person.photo || avatarUrl(person.name) })

export const LEADERSHIP = [
  {
    id: 'l1',
    name: 'Mr. Abdul Rahman',
    role: 'Principal',
    qualification: 'M.A., B.Ed.',
    experience: '20+ years',
    subject: 'Academic Leadership',
  },
  {
    id: 'l2',
    name: 'Mrs. Ayesha Begum',
    role: 'Vice Principal',
    qualification: 'M.Sc., B.Ed.',
    experience: '15+ years',
    subject: 'Academics & Administration',
  },
].map(withPhoto)

export const TEACHERS = [
  { id: 't1', name: 'Ms. Fatima Sheikh', role: 'Pre-Primary Teacher', qualification: 'B.Ed. (Early Childhood)', experience: '8 years', subject: 'Pre-Primary' },
  { id: 't2', name: 'Mrs. Sana Kausar', role: 'Primary Teacher', qualification: 'B.A., D.El.Ed.', experience: '10 years', subject: 'Primary Section' },
  { id: 't3', name: 'Mr. Imran Ahmed', role: 'Senior Teacher', qualification: 'M.A. English, B.Ed.', experience: '12 years', subject: 'English' },
  { id: 't4', name: 'Mr. Ravi Kumar', role: 'Senior Teacher', qualification: 'M.Sc. Mathematics, B.Ed.', experience: '11 years', subject: 'Mathematics' },
  { id: 't5', name: 'Ms. Zainab Ali', role: 'Teacher', qualification: 'M.Sc., B.Ed.', experience: '7 years', subject: 'Science' },
  { id: 't6', name: 'Mr. Mohammed Yousuf', role: 'Teacher', qualification: 'M.A. History, B.Ed.', experience: '9 years', subject: 'Social Science' },
  { id: 't7', name: 'Maulana Abdul Qadir', role: 'Deeni Teacher', qualification: 'Aalim, Islamic Studies', experience: '14 years', subject: 'Deeni (Religious) Education' },
  { id: 't8', name: 'Mrs. Shabana Parveen', role: 'Teacher', qualification: 'M.A. Urdu, B.Ed.', experience: '10 years', subject: 'Urdu' },
  { id: 't9', name: 'Mr. Prakash Rao', role: 'Teacher', qualification: 'M.A. Kannada, B.Ed.', experience: '8 years', subject: 'Kannada' },
  { id: 't10', name: 'Ms. Nikhat Fatima', role: 'Teacher', qualification: 'M.C.A., B.Ed.', experience: '6 years', subject: 'Computer Basics' },
].map(withPhoto)
