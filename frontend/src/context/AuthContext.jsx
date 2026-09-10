import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

function decodeEmailFallback(token) {
  // Best-effort: your JWT payload only carries { id }, so we don't
  // decode an email from it. We just track that a session exists.
  return token ? true : false
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [email, setEmail] = useState(() => localStorage.getItem("email"))

  function login(newToken, userEmail) {
    localStorage.setItem("token", newToken)
    if (userEmail) localStorage.setItem("email", userEmail)
    setToken(newToken)
    setEmail(userEmail || null)
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    setToken(null)
    setEmail(null)
  }

  const isAuthenticated = decodeEmailFallback(token)

  return (
    <AuthContext.Provider value={{ token, email, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider")
  return ctx
}
