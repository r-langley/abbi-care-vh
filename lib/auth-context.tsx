"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {authenticateToken, LogIn} from '@/api';
import {UserInfo} from '@/api/auth';

interface AuthContextType {
  isLoggedIn: boolean
  loading: boolean
  userRole: "member" | "ambassador"
  userInfo: UserInfo | null
  setUserRole: (role: "member" | "ambassador") => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"member" | "ambassador">("member")
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const router = useRouter()

  // Load login state from localStorage on mount
  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("authToken")
    if (token) {
      authenticateToken( token )
          .then((user) => {
            if (user?.email) {
              setUserInfo(user)
              setIsLoggedIn(true)
              const role = user.is_affiliate ? "ambassador" : "member"
              handleSetUserRole(role)
            }
          })
          .catch(() => {
            localStorage.removeItem("authToken")
            setIsLoggedIn(false)
            setUserInfo(null)
          }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const data = await LogIn( email, password )
      const token: string | undefined = data.token

      if (!token) {
        return false
      }
      localStorage.setItem("authToken", token)
      setIsLoggedIn(true)

      const user: any = data.user ?? null

      let role: "member" | "ambassador" | undefined = user?.is_affiliate ? "ambassador" : "member"

      setUserInfo(user || null);

      if (role) {
        handleSetUserRole(role)
      }

      return true
    } catch (err) {
      console.error("Login error:", err)
      return false
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserInfo(null)
    localStorage.removeItem("authToken")
    localStorage.removeItem("skinScanResults")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const handleSetUserRole = (role: "member" | "ambassador") => {
    setUserRole(role)
    localStorage.setItem("userRole", role)
  }

  return (
      <AuthContext.Provider value={{ isLoggedIn, loading, userRole, userInfo, setUserRole: handleSetUserRole, login, logout }}>
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
