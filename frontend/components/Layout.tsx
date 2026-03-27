import { Link } from "react-router-dom";
import { ShoppingCart, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Package className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-foreground">RefreshMart</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Browse
              </Link>
              <Link
                to="/sell"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Sell
              </Link>
              <Link
                to="/account"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Account
              </Link>
            </nav>

            {/* Auth & Cart Icons */}
            <div className="flex items-center gap-4">
              {/* Auth Links */}
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                >
                  Login
                </Link>
                <div className="w-px h-4 bg-border"></div>
                <Link
                  to="/register"
                  className="text-sm bg-primary text-primary-foreground px-4 py-1 rounded hover:opacity-90 transition-opacity font-medium"
                >
                  Sign Up
                </Link>
              </div>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-sm">Cart</span>
              </Link>

              {/* Mobile Menu Toggle (placeholder for now) */}
              <button className="md:hidden text-foreground hover:text-primary">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">About</h3>
              <p className="text-sm text-muted-foreground">
                RefreshMart is a marketplace for buying and selling refurbished electronics,
                furniture, and household items.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Browse</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/browse?category=electronics" className="text-muted-foreground hover:text-primary transition-colors">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to="/browse?category=furniture" className="text-muted-foreground hover:text-primary transition-colors">
                    Furniture
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Email: <span className="font-mono">countact@gmail.com</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Phone: <span className="font-mono">(91) 9345453448</span>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 RefreshMart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
