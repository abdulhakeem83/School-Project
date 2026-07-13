import {
  BookOpen,
  FlaskConical,
  Laptop,
  MonitorSmartphone,
  Trophy,
  Bus,
  Stethoscope,
  UtensilsCrossed,
  Music2,
  Theater,
  Trees,
} from 'lucide-react'
import { photo } from './constants'

// Detailed facilities used on both the Home preview and the Facilities page.
export const FACILITIES = [
  {
    id: 'f1',
    icon: BookOpen,
    title: 'Library',
    short: 'A calm, well-stocked space to read, research and grow.',
    description:
      'Over 15,000 titles, reference sections, digital catalogues and quiet reading zones curated to build a lifelong love of reading.',
    src: photo('facility-library', 800, 560),
  },
  {
    id: 'f2',
    icon: FlaskConical,
    title: 'Science Labs',
    short: 'Hands-on Physics, Chemistry and Biology labs.',
    description:
      'Fully-equipped, safety-first laboratories where students turn theory into discovery through guided experiments.',
    src: photo('facility-science', 800, 560),
  },
  {
    id: 'f3',
    icon: Laptop,
    title: 'Computer Lab',
    short: 'Modern computing labs with high-speed internet.',
    description:
      'Two dedicated labs with the latest hardware, coding tools and robotics kits to build strong digital fluency.',
    src: photo('facility-computer', 800, 560),
  },
  {
    id: 'f4',
    icon: MonitorSmartphone,
    title: 'Smart Classes',
    short: 'Interactive digital boards in every classroom.',
    description:
      'Engaging multimedia lessons, visual learning and instant assessments that make every concept click.',
    src: photo('facility-smartclass', 800, 560),
  },
  {
    id: 'f5',
    icon: Trophy,
    title: 'Sports',
    short: 'Expansive grounds and professional coaching.',
    description:
      'Cricket, football, basketball, athletics and indoor games with certified coaches and inter-school tournaments.',
    src: photo('facility-sports', 800, 560),
  },
  {
    id: 'f6',
    icon: Bus,
    title: 'Transport',
    short: 'Safe, GPS-tracked bus fleet across the city.',
    description:
      'A well-maintained fleet with trained drivers, attendants and live GPS tracking for complete peace of mind.',
    src: photo('facility-transport', 800, 560),
  },
  {
    id: 'f7',
    icon: Stethoscope,
    title: 'Medical Room',
    short: 'On-campus infirmary with a full-time nurse.',
    description:
      'A well-stocked medical room, trained staff and tie-ups with nearby hospitals for any emergency.',
    src: photo('facility-medical', 800, 560),
  },
  {
    id: 'f8',
    icon: UtensilsCrossed,
    title: 'Cafeteria',
    short: 'Hygienic, nutritious and freshly-prepared meals.',
    description:
      'A spacious cafeteria serving balanced, freshly-cooked meals prepared under strict hygiene standards.',
    src: photo('facility-cafeteria', 800, 560),
  },
  {
    id: 'f9',
    icon: Theater,
    title: 'Auditorium',
    short: 'A 700-seat air-conditioned auditorium.',
    description:
      'A state-of-the-art auditorium with professional sound and lighting for assemblies, events and performances.',
    src: photo('facility-auditorium', 800, 560),
  },
  {
    id: 'f10',
    icon: Music2,
    title: 'Music Room',
    short: 'Dedicated space for vocal and instrumental music.',
    description:
      'A sound-treated music room equipped with instruments to nurture every young artist’s talent.',
    src: photo('facility-music', 800, 560),
  },
  {
    id: 'f11',
    icon: Trees,
    title: 'Playground',
    short: 'Green, open play areas for every age group.',
    description:
      'Safe, age-appropriate play zones and open lawns that encourage active, joyful outdoor time.',
    src: photo('facility-playground', 800, 560),
  },
]

// The Home page shows the first eight facilities as a preview grid.
export const FACILITIES_PREVIEW = FACILITIES.slice(0, 8)
