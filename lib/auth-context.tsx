"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

interface UserInfo {
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  isLoggedIn: boolean
  userRole: "member" | "ambassador"
  userInfo: UserInfo | null
  setUserRole: (role: "member" | "ambassador") => void
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"member" | "ambassador">("member")
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const router = useRouter()

  // Load login state from localStorage on mount
  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn")
    const scanResults = localStorage.getItem("skinScanResults")
    const savedRole = localStorage.getItem("userRole") as "member" | "ambassador" | null

    // User is logged in if either the login flag is set OR scan results exist
    if (loginState === "true" || scanResults) {
      setIsLoggedIn(true)
      setUserInfo({
        firstName: "Sarah",
        lastName: "Miller",
        email: "sarah.miller@example.com",
      })
    }

    if (savedRole) {
      setUserRole(savedRole)
    }
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
    setUserRole("ambassador")
    localStorage.setItem("userRole", "ambassador")
    setUserInfo({
      firstName: "Sarah",
      lastName: "Miller",
      email: "sarah.miller@example.com",
    })
    router.push("/account")
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserInfo(null)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("skinScanResults")
  }

  const handleSetUserRole = (role: "member" | "ambassador") => {
    setUserRole(role)
    localStorage.setItem("userRole", role)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userInfo, setUserRole: handleSetUserRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
