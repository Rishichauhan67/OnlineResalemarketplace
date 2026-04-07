import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Browse from "./pages/Browse";
import Sell from "./pages/Sell";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />

              <Routes>
                {/* ✅ REAL PAGES */}
                {/* <Route path="/" element={<Index />} /> */}
                <Route path="/browse" element={<Browse />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/account" element={<Account />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* Clerk auth routes */}
                <Route path="/sign-in/*" element={<div>Sign In</div>} />
                <Route path="/sign-up/*" element={<div>Sign Up</div>} />

                {/* fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </CartProvider>
        </BrowserRouter>
      </QueryClientProvider>
  );
}