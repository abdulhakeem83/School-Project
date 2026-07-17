import { Suspense, lazy } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import WhatsAppButton from './components/WhatsAppButton'

import { AuthProvider } from './erp/auth/AuthContext'
import ProtectedRoute from './erp/auth/ProtectedRoute'
import ErpLayout from './erp/layout/ErpLayout'

// Public marketing pages (lazy-loaded).
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Admissions = lazy(() => import('./pages/Admissions'))
const Facilities = lazy(() => import('./pages/Facilities'))
const Faculty = lazy(() => import('./pages/Faculty'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

// ERP pages (lazy-loaded).
const ErpLogin = lazy(() => import('./erp/pages/Login'))
const AdminDashboard = lazy(() => import('./erp/pages/AdminDashboard'))
const StudentDashboard = lazy(() => import('./erp/pages/StudentDashboard'))
const TeacherDashboard = lazy(() => import('./erp/pages/TeacherDashboard'))
const Users = lazy(() => import('./erp/pages/Users'))
const Students = lazy(() => import('./erp/pages/Students'))
const Teachers = lazy(() => import('./erp/pages/Teachers'))
const Attendance = lazy(() => import('./erp/pages/Attendance'))
const Fees = lazy(() => import('./erp/pages/Fees'))
const Management = lazy(() => import('./erp/pages/Management'))
const ErpGallery = lazy(() => import('./erp/pages/Gallery'))
const NoAccess = lazy(() => import('./erp/pages/NoAccess'))

// Public site chrome (navbar, footer, announcement bar).
function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ---- School ERP ---- */}
          <Route path="/erp/login" element={<ErpLogin />} />
          <Route
            path="/erp"
            element={
              <ProtectedRoute>
                <ErpLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="student"
              element={
                <ProtectedRoute module="dashboard">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="teacher"
              element={
                <ProtectedRoute module="dashboard">
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="students"
              element={
                <ProtectedRoute module="students">
                  <Students />
                </ProtectedRoute>
              }
            />
            <Route
              path="teachers"
              element={
                <ProtectedRoute module="teachers">
                  <Teachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="attendance"
              element={
                <ProtectedRoute module="attendance">
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="fees"
              element={
                <ProtectedRoute module="fees">
                  <Fees />
                </ProtectedRoute>
              }
            />
            <Route
              path="management"
              element={
                <ProtectedRoute module="management">
                  <Management />
                </ProtectedRoute>
              }
            />
            <Route
              path="gallery"
              element={
                <ProtectedRoute module="gallery">
                  <ErpGallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute module="users">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="no-access" element={<NoAccess />} />
          </Route>

          {/* ---- Public marketing site ---- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
