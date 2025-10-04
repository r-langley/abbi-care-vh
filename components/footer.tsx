import { NavLink } from "@/components/ui/nav-link"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-mono text-sm mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
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
            <h3 className="font-mono text-sm mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <NavLink href="/skin-analysis" variant="footer">
                  Skin Analysis
                </NavLink>
              </li>
              <li>
                <NavLink href="/about" variant="footer">
                  About ABBI
                </NavLink>
              </li>
              <li>
                <NavLink href="#" variant="footer">
                  How It Works
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-sm mb-4">Support</h3>
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
          <div>
            <h3 className="font-mono text-sm mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <NavLink href="#" variant="footer">
                  Instagram
                </NavLink>
              </li>
              <li>
                <NavLink href="#" variant="footer">
                  Facebook
                </NavLink>
              </li>
              <li>
                <NavLink href="/join" variant="footer">
                  Newsletter
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 ABBI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
