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
  const [open, setOpen] = React.useState(false)

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
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors">
                    <Bars3Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="px-5 py-5 w-full">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Browse site navigation and shop by skin trait</SheetDescription>
                  <MobileNav closeMenu={() => setOpen(false)} />
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

function MobileNav({ closeMenu }: { closeMenu: () => void }) {
  const [isTraitExpanded, setIsTraitExpanded] = React.useState(false)

  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center justify-center mb-8">
        <Image src="/images/logo.png" alt="ABBI" width={120} height={40} className="w-auto h-5" priority />
      </div>

      <div className="flex flex-col flex-1 gap-5 overflow-y-auto">
        <div className="flex items-center justify-between" onClick={closeMenu}>
          <NavLink href="/skin-analysis" variant="mobile">
            Skin Analysis
          </NavLink>
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </div>

        <NavLink href="/shop" variant="mobile" onClick={closeMenu}>
          Shop All
        </NavLink>

        <div onClick={closeMenu}>
          <NavLink href="/shop?category=creams" variant="mobile" className="block mb-1">
            Creams
          </NavLink>
          <p className="text-[16px] font-medium tracking-[-0.32px] text-muted-foreground">
            Choose between In-Lab and Mix-At-Home
          </p>
        </div>

        <div onClick={closeMenu}>
          <NavLink href="/shop?category=essentials" variant="mobile" className="block mb-1">
            Essentials
          </NavLink>
          <p className="text-[16px] font-medium tracking-[-0.32px] text-muted-foreground">
            Cleansers, Serums, Oils & Mists
          </p>
        </div>

        <div onClick={closeMenu}>
          <NavLink href="/shop?category=simple-solutions" variant="mobile" className="block mb-1">
            Simple Solutions
          </NavLink>
          <p className="text-[16px] font-medium tracking-[-0.32px] text-muted-foreground">Complete skincare packages</p>
        </div>

        <div>
          <button
            onClick={() => setIsTraitExpanded(!isTraitExpanded)}
            className="text-lg hover:text-primary transition-colors flex items-center justify-between w-full font-sans font-medium mb-1 text-foreground"
          >
            Shop by Trait
            <ChevronDownIcon className={`h-6 w-6 transition-transform ${isTraitExpanded ? "rotate-180" : ""}`} />
          </button>
          <p className="text-[16px] font-medium tracking-[-0.32px] text-muted-foreground mb-3">
            Shop based on your skin's top priorities
          </p>
          {isTraitExpanded && (
            <div className="flex flex-col gap-3 pl-4">
              <NavLink href="/shop?category=creams&traits=wrinkles" variant="footer" onClick={closeMenu}>
                Wrinkles
              </NavLink>
              <NavLink href="/shop?category=creams&traits=radiance" variant="footer" onClick={closeMenu}>
                Radiance
              </NavLink>
              <NavLink href="/shop?category=creams&traits=imperfections" variant="footer" onClick={closeMenu}>
                Imperfections
              </NavLink>
              <NavLink href="/shop?category=creams&traits=spots" variant="footer" onClick={closeMenu}>
                Spots
              </NavLink>
              <NavLink href="/shop?category=creams&traits=hydration" variant="footer" onClick={closeMenu}>
                Hydration
              </NavLink>
              <NavLink href="/shop?category=creams&traits=sensitivity" variant="footer" onClick={closeMenu}>
                Sensitivity
              </NavLink>
              <NavLink href="/shop?category=creams&traits=shine" variant="footer" onClick={closeMenu}>
                Shine
              </NavLink>
              <NavLink href="/shop?category=creams&traits=texture" variant="footer" onClick={closeMenu}>
                Texture
              </NavLink>
            </div>
          )}
        </div>

        <NavLink href="/ingredients" variant="mobile" onClick={closeMenu}>
          Ingredients
        </NavLink>

        <NavLink href="/about" variant="mobile" onClick={closeMenu}>
          About
        </NavLink>

        <NavLink href="/join" variant="mobile" onClick={closeMenu}>
          Join
        </NavLink>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
        <button className="flex items-center gap-2 text-lg font-sans font-medium text-muted-foreground hover:text-primary transition-colors">
          <span className="text-2xl">🇺🇸</span>
          United States
        </button>
        <button className="flex items-center gap-2 text-lg font-sans font-medium text-muted-foreground hover:text-primary transition-colors">
          Contact Us
          <PhoneIcon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}
