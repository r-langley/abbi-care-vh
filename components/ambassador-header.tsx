"use client"

import Link from "next/link"
import Image from "next/image"
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/solid"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"
import React from "react"
import { UserAvatar } from "@/components/ui/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RegionLanguageSelector } from "@/components/region-language-selector"
import { NavLink } from "@/components/ui/nav-link"

export function AmbassadorHeader() {
  const { totalItems } = useCart()
  const { userInfo, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const navItems = [
    { label: "Home", href: "/ambassador" },
    { label: "Personal", href: "/ambassador/personal" },
    { label: "Orders", href: "/ambassador/orders" },
    { label: "Shop", href: "/ambassador/shop" },
    { label: "Customers", href: "/ambassador/customers" },
    { label: "Team", href: "/ambassador/team" },
    { label: "Aacademy", href: "/ambassador/academy" },
  ]

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#586158] text-white text-center py-2 px-4 bg-primary">
        <p className="text-xs font-mono tracking-wide font-medium md:text-xs">ENJOY 10% OFF YOUR FIRST ORDER</p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto px-0">
          <div className="flex items-center justify-between px-5 h-14">
            {/* Left: Hamburger + Region Selector */}
            <div className="flex items-center gap-0">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors">
                    <Bars3Icon className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="px-5 py-5 w-full md:w-1/2">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Ambassador site navigation</SheetDescription>
                  <AmbassadorMobileNav closeMenu={() => setOpen(false)} navItems={navItems} />
                </SheetContent>
              </Sheet>

              <div className="md:block">
                <RegionLanguageSelector />
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <Link href="/ambassador" className="flex items-center">
                <Image src="/images/logo.png" alt="ABBI" width={120} height={40} className="w-auto h-5" priority />
              </Link>
            </div>

            {/* Right: Cart + Account */}
            <div className="flex items-center gap-0">
              <Link href="/cart" className="relative p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors">
                <ShoppingBagIcon className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-mono rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors flex items-center gap-2">
                    <span className="text-sm font-medium hidden md:block">
                      {userInfo?.firstName} {userInfo?.lastName[0]}.
                    </span>
                    <UserAvatar size="sm" className="w-6 h-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/ambassador">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/ambassador/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8 px-5 py-3 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === item.href
                    ? "text-foreground after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}

function AmbassadorMobileNav({
  closeMenu,
  navItems,
}: {
  closeMenu: () => void
  navItems: { label: string; href: string }[]
}) {
  return (
    <nav className="flex flex-col h-full">
      <div className="sticky top-0 backdrop-blur-sm bg-white/95 px-5 py-2.5 flex items-center justify-between border-b border-[#e7e7e7] z-10 -mx-5 -mt-5 mb-5">
        <div className="flex-1" />
        <div className="flex items-center justify-center flex-1">
          <Image src="/images/logo.png" alt="ABBI" width={120} height={40} className="w-auto h-5" priority />
        </div>
        <div className="flex-1 flex justify-end">
          <SheetTrigger asChild>
            <button className="bg-[#f5f6f5] rounded-full size-8 flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5 text-[#586158]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </SheetTrigger>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} variant="mobile" onClick={closeMenu}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
