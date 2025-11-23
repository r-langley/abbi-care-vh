"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoggedIn, userInfo } = useAuth()
  const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/account")
    }
  }, [isLoggedIn, router])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please enter email and password.")
      return
    }

    setLoading(true)
    try {
      const ok = await login(email, password)
      if (!ok) {
        setError("Invalid credentials.")
      } else {
        setEmail("")
        setPassword("")
      }
    } catch {
      setError("Login failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2">Welcome Back</h1>
            {
                userInfo ? <p className="text-sm text-muted-foreground">Logged in as {userInfo.email}</p>
                : <p className="text-sm text-muted-foreground">Sign in to your ABBI account</p>
            }
          </div>

          { isLoggedIn ?
            null :
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          }

          { isLoggedIn ?
              null :
              <div className="mt-6 text-center">
                <button className="text-sm text-primary hover:underline">Forgot password?</button>
              </div>
          }
        </Card>
      </div>
    </>
  )
}
