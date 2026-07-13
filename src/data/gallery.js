import { photo } from './constants'

// Gallery categories double as filter chips on the Gallery page.
export const GALLERY_CATEGORIES = [
  'All',
  'Campus',
  'Sports',
  'Annual Day',
  'Independence Day',
  'Republic Day',
  'Science Fair',
  'Class Activities',
]

// Each item carries a category, a descriptive alt/caption and a stable image.
export const GALLERY = [
  { id: 'g1', category: 'Campus', caption: 'Main academic block', src: photo('campus-main', 900, 700) },
  { id: 'g2', category: 'Sports', caption: 'Inter-house cricket final', src: photo('sports-cricket', 900, 600) },
  { id: 'g3', category: 'Annual Day', caption: 'Annual Day cultural performance', src: photo('annualday-stage', 900, 700) },
  { id: 'g4', category: 'Science Fair', caption: 'Student science exhibition', src: photo('science-fair', 900, 600) },
  { id: 'g5', category: 'Independence Day', caption: 'Independence Day flag hoisting', src: photo('independence-flag', 900, 700) },
  { id: 'g6', category: 'Class Activities', caption: 'Interactive smart classroom', src: photo('class-smart', 900, 600) },
  { id: 'g7', category: 'Campus', caption: 'Landscaped school courtyard', src: photo('campus-courtyard', 900, 600) },
  { id: 'g8', category: 'Sports', caption: 'Annual athletics meet', src: photo('sports-athletics', 900, 700) },
  { id: 'g9', category: 'Republic Day', caption: 'Republic Day parade', src: photo('republic-parade', 900, 600) },
  { id: 'g10', category: 'Science Fair', caption: 'Robotics project showcase', src: photo('science-robotics', 900, 700) },
  { id: 'g11', category: 'Class Activities', caption: 'Art & craft workshop', src: photo('class-art', 900, 600) },
  { id: 'g12', category: 'Annual Day', caption: 'Prize distribution ceremony', src: photo('annualday-prize', 900, 600) },
  { id: 'g13', category: 'Campus', caption: 'Central library reading hall', src: photo('campus-library', 900, 700) },
  { id: 'g14', category: 'Independence Day', caption: 'Patriotic dance performance', src: photo('independence-dance', 900, 600) },
  { id: 'g15', category: 'Sports', caption: 'Yoga & wellness session', src: photo('sports-yoga', 900, 600) },
  { id: 'g16', category: 'Class Activities', caption: 'Group project presentation', src: photo('class-project', 900, 700) },
]

// The Home page shows just a preview slice of the gallery.
export const GALLERY_PREVIEW = GALLERY.slice(0, 6)
