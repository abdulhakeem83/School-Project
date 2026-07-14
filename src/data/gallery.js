import { asset } from './constants'

// Gallery categories double as filter chips on the Gallery page.
export const GALLERY_CATEGORIES = ['All', 'Campus', 'Students', 'Events']

// Real photos from Apple Valley Creative School, Basavakalyan.
// Add more by dropping files into public/images/campus/ and listing them here.
export const GALLERY = [
  { id: 'g1', category: 'Campus', caption: 'Our school campus — Apple Valley Creative School', src: asset('images/campus/building.jpg') },
  { id: 'g2', category: 'Students', caption: 'Our happy students', src: asset('images/campus/students-group.jpg') },
  { id: 'g3', category: 'Students', caption: 'A love for reading', src: asset('images/campus/student-book.jpg') },
  { id: 'g4', category: 'Events', caption: 'Celebrating together', src: asset('images/campus/cheering.jpg') },
  { id: 'g5', category: 'Students', caption: 'Ready for a new school day', src: asset('images/campus/waving.jpg') },
]

// The Home page shows just a preview slice of the gallery.
export const GALLERY_PREVIEW = GALLERY
