import { useAuth } from './AuthContext'

/**
 * Renders children only if the current user may perform `action` on `module`.
 * Usage: <Can module="students" action="update"><EditButton/></Can>
 */
export default function Can({ module, action = 'read', children, fallback = null }) {
  const { can } = useAuth()
  return can(module, action) ? children : fallback
}
