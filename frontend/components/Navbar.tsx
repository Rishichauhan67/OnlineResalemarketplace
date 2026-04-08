import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <div className="w-full bg-white border-b shadow-sm">
      {/* MAIN TOP HEADER */}
      <div className="flex items-center gap-4 px-6 py-3">
        
        {/* 1. LOGO */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-xl font-bold text-green-500">RefurbMarket</h1>
        </Link>

        {/* 2. NAV LINKS (Left of Search) */}

        {/* 3. SEARCH BAR (Flexible Middle) */}
        <div className="flex-1 max-w-2xl mx-16">
          <input
            type="text"
            placeholder="Search for mobiles, accessories & more"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="hidden lg:flex items-center gap-7 ml-4">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-600">Home</Link>
          <Link to="/shop" className="text-sm font-medium text-gray-700 hover:text-green-600">Shop</Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-green-600">About</Link>
          <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-green-600">Contact</Link>
        </div>

        {/* 4. ACTIONS (Cart & Auth) */}
        <div className="flex items-center gap-4 ml-80">
          {/* CART */}
          <Link
            to="/cart"
            className="relative px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 text-gray-900"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* CLERK AUTH */}
          <div className="flex items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* BOTTOM MENU BAR */}
      <div className="flex gap-6 px-6 py-2 text-sm border-t overflow-x-auto whitespace-nowrap scrollbar-hide">
        <span className="cursor-pointer hover:text-green-600">All</span>
        <span className="cursor-pointer hover:text-green-600">Sell Phone</span>
        <span className="cursor-pointer hover:text-green-600">Sell Gadgets</span>
        <span className="cursor-pointer hover:text-green-600">Buy Refurbished</span>
        <span className="cursor-pointer hover:text-green-600">Find New Gadget</span>
        <span className="cursor-pointer hover:text-green-600">Buy Laptop</span>
        <span className="cursor-pointer hover:text-green-600">More</span>
      </div>
    </div>
  );
}