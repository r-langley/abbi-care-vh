import { NavLink } from "@/components/ui/nav-link"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="px-10 py-10 bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-mono text-sm mb-4 font-medium text-accent">Shop</h3>
            <ul className="space-y-2">
              <li className="">
                <NavLink href="/shop" variant="footer">
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink href="/personalized-creams" variant="footer">
                  Personalized Creams
                </NavLink>
              </li>
              <li>
                <NavLink href="/essentials" variant="footer">
                  Essentials
                </NavLink>
              </li>
              <li>
                <NavLink href="/simple-solutions" variant="footer">
                  Simple Solutions
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm mb-4 font-medium text-accent">Support</h3>
            <ul className="space-y-2">
              <li>
                <NavLink href="#" variant="footer">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink href="#" variant="footer">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink href="#" variant="footer">
                  Shipping
                </NavLink>
              </li>
              <li>
                <NavLink href="#" variant="footer">
                  Returns
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 ABBI. All rights reserved.</p>
          <NavLink
            href="/design-system"
            variant="footer"
            className="text-xs opacity-30 hover:opacity-100 transition-opacity mt-2 inline-block"
          >
            Design System
          </NavLink>
        </div>
      </div>
    </footer>
  )
}
