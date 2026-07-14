import {
  BookOpen,
  Laptop,
  MonitorSmartphone,
  Trees,
  Palette,
  HeartHandshake,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { asset } from './constants'

// Facilities used on both the Home preview and the Facilities page.
// These are kept general and honest — update the copy (and swap `src` to
// real photos via asset(...)) to match the school's actual facilities.
export const FACILITIES = [
  {
    id: 'f1',
    icon: MonitorSmartphone,
    title: 'Interactive Classrooms',
    short: 'Bright, well-organised classrooms for joyful learning.',
    description:
      'Clean, well-organised classrooms with engaging, activity-based lessons that make everyday learning effective and enjoyable.',
    src: asset('images/campus/students-group.jpg'),
  },
  {
    id: 'f2',
    icon: BookOpen,
    title: 'Library & Reading Corner',
    short: 'A calm space to read, explore and grow.',
    description:
      'A reading corner curated to build a lifelong love of books, curiosity and independent learning.',
    src: asset('images/campus/student-book.jpg'),
  },
  {
    id: 'f3',
    icon: Laptop,
    title: 'Computer Learning',
    short: 'Building early digital confidence.',
    description:
      'Hands-on computer basics that help students become comfortable and confident with technology.',
    src: asset('images/campus/waving.jpg'),
  },
  {
    id: 'f4',
    icon: HeartHandshake,
    title: 'Deeni (Religious) Education',
    short: 'Comprehensive moral and spiritual learning.',
    description:
      'A comprehensive religious (Deeni) education woven alongside modern academics, nurturing faith, culture and strong ethical values.',
    src: asset('images/campus/building.jpg'),
  },
  {
    id: 'f5',
    icon: Palette,
    title: 'Arts & Activities',
    short: 'Space for creativity and self-expression.',
    description:
      'Drawing, craft and co-curricular activities that encourage creativity, confidence and practical learning.',
    src: asset('images/campus/cheering.jpg'),
  },
  {
    id: 'f6',
    icon: Trees,
    title: 'Play Area',
    short: 'Safe, open space for play and activity.',
    description:
      'Age-appropriate play time that encourages active, joyful and healthy outdoor learning.',
    src: asset('images/campus/waving.jpg'),
  },
  {
    id: 'f7',
    icon: Users,
    title: 'Individual Attention',
    short: 'Small, caring classes for every child.',
    description:
      'Small class sizes so that every student receives personal attention and caring mentorship.',
    src: asset('images/campus/student-book.jpg'),
  },
  {
    id: 'f8',
    icon: ShieldCheck,
    title: 'Safe Environment',
    short: 'A secure, caring campus.',
    description:
      'A safe and inspiring atmosphere where children learn and grow with confidence every day.',
    src: asset('images/campus/building.jpg'),
  },
]

// The Home page shows the first eight facilities as a preview grid.
export const FACILITIES_PREVIEW = FACILITIES.slice(0, 8)
