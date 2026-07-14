import { asset } from './constants'

// Latest announcements / events. Update these with the school's real notices.
export const NEWS = [
  {
    id: 'n1',
    title: 'Admissions Open for 2026–27',
    category: 'Admissions',
    date: '2026-06-15',
    excerpt:
      'Applications are now open for all classes from Nursery to Class X. Limited seats — apply early to secure a place.',
    src: asset('images/campus/cheering.jpg'),
    featured: true,
  },
  {
    id: 'n2',
    title: 'New Academic Session Begins',
    category: 'Announcement',
    date: '2026-06-01',
    excerpt:
      'We warmly welcome all our students back for a new year of learning, creativity and growth.',
    src: asset('images/campus/waving.jpg'),
  },
  {
    id: 'n3',
    title: 'Learning Beyond the Classroom',
    category: 'Activities',
    date: '2026-05-20',
    excerpt:
      'A blend of academics, arts and activities that help every child discover and develop their talents.',
    src: asset('images/campus/students-group.jpg'),
  },
  {
    id: 'n4',
    title: 'A Love for Reading',
    category: 'Academics',
    date: '2026-05-10',
    excerpt:
      'We nurture curiosity and a lifelong love for books and learning in every one of our students.',
    src: asset('images/campus/student-book.jpg'),
  },
]
