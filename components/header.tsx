"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Bars3Icon,
  ShoppingBagIcon,
  UserCircleIcon,
  PhoneIcon,
  FlagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"
import React from "react"
import { NavLink } from "@/components/ui/nav-link"
import { TabsNav } from "@/components/ui/tabs-nav"
import { UserAvatar } from "@/components/ui/user-avatar"

export function Header() {
  const { totalItems } = useCart()
  const { isLoggedIn, login, logout } = useAuth()
  const pathname = usePathname()
  const isHomepage = pathname === "/"
  const isShopPage = pathname === "/shop"

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#586158] text-white text-center py-2 px-4">
        <p className="text-xs md:text-sm font-mono tracking-wide font-medium">ENJOY 10% OFF YOUR FIRST ORDER</p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-3 items-center px-2.5 h-14">
            {/* Left: Menu + Country + Contact */}
            <div className="flex items-center gap-3 justify-start">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors">
                    <Bars3Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="px-5 py-5 w-[50vw]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Browse site navigation and shop by skin trait</SheetDescription>
                  <MobileNav />
                </SheetContent>
              </Sheet>

              <div className="hidden md:flex items-center gap-2">
                <FlagIcon className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground" />
                <PhoneIcon className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground" />
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center">
                <Image src="/images/logo.png" alt="ABBI" width={120} height={40} className="w-auto h-5" priority />
              </Link>
            </div>

            {/* Right: Cart + Account */}
            <div className="flex items-center justify-end gap-0">
              <Link href="/cart" className="relative p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors">
                <ShoppingBagIcon className="w-6 h-6 md:w-7 md:h-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-mono rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={isLoggedIn ? logout : login}
                className="p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors relative group"
                title={isLoggedIn ? "Log Out (Prototype)" : "Log In (Prototype)"}
              >
                {isLoggedIn ? (
                  <UserAvatar size="sm" className="md:w-7 md:h-7" />
                ) : (
                  <UserCircleIcon className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground" />
                )}
                {/* Tooltip */}
                <span className="absolute -bottom-8 right-0 bg-[#586158] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {isLoggedIn ? "Log Out" : "Log In"}
                </span>
              </button>
            </div>
          </div>

          {isHomepage && (
            <nav className="flex items-center justify-center gap-8 border-border px-2.5 py-2.5 border-t-0">
              <NavLink href="/skin-analysis">Skin Analysis</NavLink>
              <NavLink href="/shop">Shop</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/join">Join</NavLink>
            </nav>
          )}

          {isShopPage && (
            <TabsNav
              tabs={[
                { label: "Creams", value: "creams" },
                { label: "Simple Solutions", value: "simple-solutions" },
                { label: "Essentials", value: "essentials" },
              ]}
              baseUrl="/shop"
              paramName="category"
            />
          )}

          {!isHomepage && !isShopPage && (
            <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-t border-border">
              <NavLink href="/skin-analysis">Skin Analysis</NavLink>
              <NavLink href="/shop">Shop</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/join">Join</NavLink>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}

function MobileNav() {
  const [isTraitExpanded, setIsTraitExpanded] = React.useState(false)

  return (
    <nav className="flex flex-col gap-6 mt-8">
      <NavLink href="/skin-analysis" variant="mobile">
        Skin Analysis
      </NavLink>
      <NavLink href="/shop" variant="mobile">
        Shop All
      </NavLink>
      <NavLink href="/shop?category=creams" variant="mobile">
        Creams
      </NavLink>
      <NavLink href="/shop?category=essentials" variant="mobile">
        Essentials
      </NavLink>
      <NavLink href="/shop?category=simple-solutions" variant="mobile">
        Simple Solutions
      </NavLink>
      <NavLink href="/ingredients" variant="mobile">
        Ingredients
      </NavLink>

      <div>
        <button
          onClick={() => setIsTraitExpanded(!isTraitExpanded)}
          className="text-lg hover:text-primary transition-colors flex items-center justify-between w-full font-sans font-medium text-muted-foreground"
        >
          Shop by Trait
          <ChevronDownIcon className={`h-6 w-6 transition-transform ${isTraitExpanded ? "rotate-180" : ""}`} />
        </button>
        {isTraitExpanded && (
          <div className="flex flex-col gap-3 pl-4 mt-3">
            <NavLink href="/shop?category=creams&traits=wrinkles" variant="footer">
              Wrinkles
            </NavLink>
            <NavLink href="/shop?category=creams&traits=radiance" variant="footer">
              Radiance
            </NavLink>
            <NavLink href="/shop?category=creams&traits=imperfections" variant="footer">
              Imperfections
            </NavLink>
            <NavLink href="/shop?category=creams&traits=spots" variant="footer">
              Spots
            </NavLink>
            <NavLink href="/shop?category=creams&traits=hydration" variant="footer">
              Hydration
            </NavLink>
            <NavLink href="/shop?category=creams&traits=sensitivity" variant="footer">
              Sensitivity
            </NavLink>
            <NavLink href="/shop?category=creams&traits=shine" variant="footer">
              Shine
            </NavLink>
            <NavLink href="/shop?category=creams&traits=texture" variant="footer">
              Texture
            </NavLink>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <NavLink href="/about" variant="mobile" className="block mb-4">
          About
        </NavLink>
        <NavLink href="/join" variant="mobile" className="block">
          Join
        </NavLink>
      </div>
    </nav>
  )
}
