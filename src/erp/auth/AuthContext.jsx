import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../api'
import { can as canFn } from './permissions'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore any existing session on first load.
  useEffect(() => {
    setUser(api.currentUser())
    setLoading(false)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      async login(email, password) {
        const u = await api.login(email, password)
        setUser(u)
        return u
      },
      logout() {
        api.logout()
        setUser(null)
      },
      // Re-read the current user from the store (after self edits).
      refresh() {
        setUser(api.currentUser())
      },
      can: (moduleKey, action = 'read') => canFn(user, moduleKey, action),
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
