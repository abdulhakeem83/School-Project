import { photo } from './constants'

// Latest announcements / events (static).
export const NEWS = [
  {
    id: 'n1',
    title: 'Admissions Open for 2026–27',
    category: 'Admissions',
    date: '2026-06-15',
    excerpt:
      'Applications are now open for all classes from Nursery to Class XI. Limited seats — apply early to secure a place.',
    src: photo('news-admissions', 800, 520),
    featured: true,
  },
  {
    id: 'n2',
    title: 'Annual Day Celebration 2026',
    category: 'Event',
    date: '2026-02-20',
    excerpt:
      'A grand evening of music, dance and drama as our students showcase a year of creativity and hard work.',
    src: photo('news-annualday', 800, 520),
  },
  {
    id: 'n3',
    title: 'Inter-School Science Exhibition',
    category: 'Academics',
    date: '2026-01-18',
    excerpt:
      'Young innovators present working models across robotics, sustainability and space science.',
    src: photo('news-science', 800, 520),
  },
  {
    id: 'n4',
    title: 'Annual Sports Meet',
    category: 'Sports',
    date: '2025-12-05',
    excerpt:
      'Three days of athletics, team spirit and record-breaking performances across all houses.',
    src: photo('news-sports', 800, 520),
  },
]
