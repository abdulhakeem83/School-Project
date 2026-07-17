import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { can } from './permissions'

/**
 * Guards ERP routes. Redirects to /erp/login if signed out. If `module` is
 * given, also checks the user has at least read access to that module.
 */
export default function ProtectedRoute({ children, module }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!user) {
    return <Navigate to="/erp/login" state={{ from: location.pathname }} replace />
  }

  if (module && !can(user, module, 'read')) {
    return <Navigate to="/erp/no-access" replace />
  }

  return children
}
