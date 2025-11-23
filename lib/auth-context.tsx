"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

interface UserInfo {
  firstName: string
  lastName: string
  id: string
  firstname: string
  lastname: string
  email: string
  created_at?: string
}

interface AuthContextType {
  isLoggedIn: boolean
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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const router = useRouter()

  // Load login state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken")

    if (token) {
      setIsLoggedIn(true)
      apiFetch("/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch profile")
            return res.json()
          })
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
          })
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await apiFetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pwd: password }),
      })

      if (!res.ok) {
        return false
      }

      const data = await res.json()
      const token: string | undefined = data.token
      let role: "member" | "ambassador" | undefined = data?.is_affiliate ? "ambassador" : "member"

      if (!token) {
        return false
      }
      localStorage.setItem("authToken", token)
      setIsLoggedIn(true)

      const userData = await apiFetch("/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })

      const user: any = await userData.json();

      if (user) {
        setUserInfo(user);
        role = user.is_affiliate ? "ambassador" : "member";
      } else {
        setUserInfo(null)
      }

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
    //todo redirect to ambassador page when ready
    // if (role === "ambassador") {
    //   router.push("/ambassador")
    // } else {
      router.push("/account")
    // }
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
