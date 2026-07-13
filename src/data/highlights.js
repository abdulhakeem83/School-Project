import {
  MonitorSmartphone,
  Users,
  Laptop,
  Trophy,
  FlaskConical,
  Bus,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Award,
  CalendarClock,
  Percent,
} from 'lucide-react'

// School statistics for the animated StatCard row.
export const STATS = [
  { icon: Users, value: 1000, suffix: '+', label: 'Happy Students' },
  { icon: GraduationCap, value: 75, suffix: '+', label: 'Expert Teachers' },
  { icon: CalendarClock, value: 25, suffix: '', label: 'Years of Excellence' },
  { icon: Percent, value: 100, suffix: '%', label: 'Board Results' },
]

// "Why Choose Us" feature cards.
export const FEATURES = [
  {
    icon: MonitorSmartphone,
    title: 'Smart Classrooms',
    description:
      'Interactive digital boards and multimedia content that make every lesson engaging.',
  },
  {
    icon: Users,
    title: 'Experienced Faculty',
    description:
      'Highly qualified, caring mentors dedicated to every child’s growth and success.',
  },
  {
    icon: Laptop,
    title: 'Digital Learning',
    description:
      'A blended-learning approach that builds confident, tech-ready 21st-century learners.',
  },
  {
    icon: Trophy,
    title: 'Sports Facilities',
    description:
      'Expansive grounds and coaching across cricket, football, athletics and more.',
  },
  {
    icon: FlaskConical,
    title: 'Science Labs',
    description:
      'Fully-equipped Physics, Chemistry and Biology labs for hands-on discovery.',
  },
  {
    icon: Bus,
    title: 'Transportation',
    description:
      'A GPS-tracked fleet of buses covering all major routes across the city, safely.',
  },
  {
    icon: BookOpen,
    title: 'Library',
    description:
      'A vast reference and reading library with thousands of titles and journals.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Campus',
    description:
      'CCTV-monitored, gated campus with trained staff and full-time medical care.',
  },
]

// Academic programmes offered.
export const PROGRAMS = [
  {
    title: 'Pre-Primary',
    grades: 'Nursery – UKG',
    ageRange: 'Ages 3 – 5',
    description:
      'Play-based, activity-led foundation that sparks curiosity and joyful learning.',
    accent: 'from-amber-400 to-accent',
  },
  {
    title: 'Primary',
    grades: 'Class I – V',
    ageRange: 'Ages 6 – 10',
    description:
      'Strong fundamentals in language, numeracy and values with plenty of exploration.',
    accent: 'from-sky-400 to-primary-500',
  },
  {
    title: 'Middle School',
    grades: 'Class VI – VIII',
    ageRange: 'Ages 11 – 13',
    description:
      'Concept-driven learning that builds critical thinking and independent study skills.',
    accent: 'from-emerald-400 to-success',
  },
  {
    title: 'High School',
    grades: 'Class IX – X',
    ageRange: 'Ages 14 – 15',
    description:
      'Rigorous CBSE curriculum with mentoring, board readiness and career awareness.',
    accent: 'from-violet-400 to-primary-600',
  },
  {
    title: 'Senior Secondary',
    grades: 'Class XI – XII',
    ageRange: 'Ages 16 – 17',
    description:
      'Science, Commerce and Humanities streams with dedicated competitive-exam support.',
    accent: 'from-rose-400 to-primary-700',
  },
]

// Milestones for the About page achievements timeline.
export const TIMELINE = [
  {
    year: '2000',
    title: 'The Beginning',
    description:
      'North Public School opened its doors with 120 students and a bold vision for holistic education.',
  },
  {
    year: '2006',
    title: 'CBSE Affiliation',
    description:
      'Received full affiliation from CBSE, New Delhi and expanded to Senior Secondary.',
  },
  {
    year: '2012',
    title: 'Smart Campus',
    description:
      'Introduced smart classrooms and dedicated science, computer and language labs.',
  },
  {
    year: '2018',
    title: 'State Sports Champions',
    description:
      'Our students brought home state-level championships in athletics and cricket.',
  },
  {
    year: '2024',
    title: '100% Board Results',
    description:
      'Celebrated 25 years of excellence with a full 100% pass rate and 40+ distinctions.',
  },
]

export const ACHIEVEMENTS = [
  { icon: Award, label: 'Best CBSE School — Regional Excellence Award 2023' },
  { icon: Trophy, label: 'State-Level Sports Champions, 5 years running' },
  { icon: GraduationCap, label: '100% board results with 40+ distinctions' },
  { icon: Users, label: '10,000+ proud alumni across the globe' },
]
