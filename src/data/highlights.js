import {
  MonitorSmartphone,
  Users,
  BookOpenCheck,
  Palette,
  HeartHandshake,
  Sparkles,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  CalendarClock,
  Activity,
} from 'lucide-react'

// School statistics for the animated StatCard row.
// TODO: replace these placeholder figures with the school's real numbers.
export const STATS = [
  { icon: Users, value: 500, suffix: '+', label: 'Happy Students' },
  { icon: GraduationCap, value: 25, suffix: '+', label: 'Dedicated Teachers' },
  { icon: CalendarClock, value: 15, suffix: '+', label: 'Years of Excellence' },
  { icon: Activity, value: 20, suffix: '+', label: 'Co-curricular Activities' },
]

// "Why Choose Us" feature cards — aligned to the school's real approach.
export const FEATURES = [
  {
    icon: BookOpenCheck,
    title: 'Modern + Deeni Education',
    description:
      'A perfect blend of high-quality modern academics and comprehensive religious (Deeni) education.',
  },
  {
    icon: Users,
    title: 'Experienced Faculty',
    description:
      'Highly qualified, experienced and passionate educators who mentor every child with care.',
  },
  {
    icon: Palette,
    title: 'Creative Learning',
    description:
      'Interactive, activity-based teaching that encourages critical thinking and innovation over rote learning.',
  },
  {
    icon: HeartHandshake,
    title: 'Strong Moral Values',
    description:
      'Character building rooted in cultural respect, ethics and a lifelong love for learning.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Interactive Classrooms',
    description:
      'Engaging, well-organised classrooms that make everyday learning joyful and effective.',
  },
  {
    icon: BookOpen,
    title: 'Individual Attention',
    description:
      'Small, caring classes where every student is guided to unlock their true potential.',
  },
  {
    icon: Sparkles,
    title: 'Holistic Development',
    description:
      'A balanced focus on academics, creativity, confidence and spiritual well-being.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Environment',
    description:
      'A safe and inspiring atmosphere where children learn and grow with confidence.',
  },
]

// Academic stages offered (Pre-Primary through High School).
// TODO: confirm the exact classes/ages offered and adjust as needed.
export const PROGRAMS = [
  {
    title: 'Pre-Primary',
    grades: 'Nursery – UKG',
    ageRange: 'Ages 3 – 5',
    description:
      'Play-based, activity-led foundation that sparks curiosity and joyful learning.',
    accent: 'from-accent to-accent-600',
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
    title: 'Higher Primary',
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
      'Focused academics with mentoring, board readiness and strong moral grounding.',
    accent: 'from-brandred-400 to-brandred-600',
  },
]

// Optional: milestones for the About page (currently not displayed).
// Add the school's real milestones here to re-enable a journey timeline.
export const TIMELINE = [
  {
    year: '2007',
    title: 'Our Beginning',
    description:
      'Apple Valley Creative School was established under The SANA Educational & Cultural Trust.',
  },
]

export const ACHIEVEMENTS = []
