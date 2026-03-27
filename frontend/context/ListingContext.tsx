import React, { createContext, useContext, useState, useEffect } from "react";

export interface Listing {
  id: string;
  productName: string;
  brand: string;
  category: string;
  condition: string;
  price: number;
  description: string;
  imagePreview: string;
  postedDaysAgo: number;
  seller: string;
}

interface ListingContextType {
  listings: Listing[];
  addListing: (listing: Omit<Listing, "id" | "postedDaysAgo" | "seller">) => void;
  getListingsByCategory: (category: string) => Listing[];
  getAllListings: () => Listing[];
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export function ListingProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("listings");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever listings change
  useEffect(() => {
    localStorage.setItem("listings", JSON.stringify(listings));
  }, [listings]);

  const addListing = (listing: Omit<Listing, "id" | "postedDaysAgo" | "seller">) => {
    const newListing: Listing = {
      ...listing,
      id: Date.now().toString(),
      postedDaysAgo: 0,
      seller: "john_seller", // In real app, this would be the logged-in user
    };
    setListings((prev) => [newListing, ...prev]);
  };

  const getListingsByCategory = (category: string) => {
    if (category === "all") return listings;
    return listings.filter((l) => l.category === category);
  };

  const getAllListings = () => listings;

  return (
    <ListingContext.Provider
      value={{
        listings,
        addListing,
        getListingsByCategory,
        getAllListings,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}

export function useListing() {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error("useListing must be used within ListingProvider");
  }
  return context;
}
