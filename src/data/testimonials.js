// Testimonials — PLACEHOLDER voices with friendly dummy names and avatars.
// Replace with real, consented quotes and (optionally) real photos.
import { avatarUrl } from './constants'

const withPhoto = (t) => ({ ...t, photo: t.photo || avatarUrl(t.name) })

export const TESTIMONIALS = [
  {
    id: 'ts1',
    name: 'Nusrat Jahan',
    role: 'Parent, Primary',
    quote:
      'The teachers know my child as an individual. She has grown so confident, curious and kind since joining Apple Valley Creative School.',
    rating: 5,
  },
  {
    id: 'ts2',
    name: 'Mohammed Ismail',
    role: 'Parent, Higher Primary',
    quote:
      'I love that my son learns modern subjects alongside strong moral and Deeni values. It is exactly the balance we were looking for.',
    rating: 5,
  },
  {
    id: 'ts3',
    name: 'Aliya Fatima',
    role: 'Student, High School',
    quote:
      'Learning here is creative and interactive, not just memorising. There is always something that makes school exciting.',
    rating: 5,
  },
  {
    id: 'ts4',
    name: 'Rahim & Sabiha',
    role: 'Parents, Pre-Primary',
    quote:
      'Caring staff, a safe environment and constant communication. As parents, we finally feel completely at ease.',
    rating: 5,
  },
  {
    id: 'ts5',
    name: 'Abdul Kareem',
    role: 'Former Student',
    quote:
      'The values and study habits I built here have stayed with me. I am truly grateful to my teachers and the school.',
    rating: 5,
  },
  {
    id: 'ts6',
    name: 'Farhana Begum',
    role: 'Parent, Primary',
    quote:
      'A perfect balance of academics and character-building in a warm, supportive atmosphere. Highly recommended.',
    rating: 5,
  },
].map(withPhoto)
