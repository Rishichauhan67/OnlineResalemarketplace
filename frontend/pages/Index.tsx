import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard, { Product } from "@/components/ProductCard";


// Mock products data
const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "MacBook Pro 2019 - 13 inch",
    price: 250.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    condition: "good",
    category: "electronics",
    seller: "john_seller",
    postedDaysAgo: 2,
    rating: 4,
  },
  {
    id: "2",
    title: "Wooden Desk - Oak",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    condition: "like-new",
    category: "furniture",
    seller: "sarah_designs",
    postedDaysAgo: 1,
    rating: 5,
  },
  {
    id: "3",
    title: "Samsung 4K Smart TV 55 inch",
    price: 130.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
    condition: "good",
    category: "electronics",
    seller: "tech_store",
    postedDaysAgo: 5,
    rating: 4,
  },
  {
    id: "4",
    title: "Office Chair - Black Mesh",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1701937189060-8b87985d85e1?w=800&h=600&fit=crop",
    condition: "fair",
    category: "furniture",
    seller: "office_supplies",
    postedDaysAgo: 3,
    rating: 3,
  },
  {
    id: "5",
    title: "Sony Wireless Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    condition: "like-new",
    category: "electronics",
    seller: "music_lover",
    postedDaysAgo: 4,
    rating: 5,
  },
  {
    id: "6",
    title: "Bookshelf - White Shelving Unit",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1668003375925-03101d2f2fe6?q=80&w=500&h=400fit=crop",
    condition: "good",
    category: "furniture",
    seller: "home_staging",
    postedDaysAgo: 6,
    rating: 4,
  },
];

export const PRODUCTS: Product[] = [
  // 🔹 Existing products (Index वाले)
  {
    id: "1",
    title: "MacBook Pro 2019 - 13 inch",
    price: 250.99,
    image: "",
    condition: "good",
    category: "electronics",
    seller: "john_seller",
    postedDaysAgo: 2,
    rating: 4,
  },
  {
    id: "2",
    title: "Wooden Desk - Oak",
    price: 149.99,
    image: "",
    condition: "like-new",
    category: "furniture",
    seller: "sarah_designs",
    postedDaysAgo: 1,
    rating: 5,
  },

  // 🔹 NEW products (added by you)
  {
    id: "6",
    title: "iPhone 12",
    price: 300.0,
    image: "",
    condition: "good",
    category: "electronics",
    seller: "mobile_store",
    postedDaysAgo: 1,
    rating: 4,
  },
  {
    id: "7",
    title: "Study Table",
    price: 120.0,
    image: "",
    condition: "like-new",
    category: "furniture",
    seller: "furniture_hub",
    postedDaysAgo: 3,
    rating: 5,
  },
  {
    id: "8",
    title: "Gaming Keyboard",
    price: 60.0,
    image: "",
    condition: "like-new",
    category: "electronics",
    seller: "gaming_store",
    postedDaysAgo: 2,
    rating: 4,
  },
];

const CATEGORIES = [
  { name: "Electronics", count: 342 },
  { name: "Furniture", count: 218 },
  { name: "Appliances", count: 156 },
  { name: "Clothing", count: 89 },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to browse page with search query
    if (searchQuery.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Quality Refurbished Items
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Buy and sell refurbished electronics, furniture, and household items.
              Trusted marketplace for quality goods at great prices.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">805</p>
              <p className="text-sm text-muted-foreground">Active Listings</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">2,341</p>
              <p className="text-sm text-muted-foreground">Happy Buyers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">1,204</p>
              <p className="text-sm text-muted-foreground">Sellers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">$1.2M</p>
              <p className="text-sm text-muted-foreground">Items Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                to={`/browse?category=${category.name.toLowerCase()}`}
                className="border border-border rounded p-4 text-center hover:border-primary hover:bg-secondary transition-colors group"
              >
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Featured Listings</h2>
            <Link
              to="/browse"
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-medium text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Become a Seller */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Have Items to Sell?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of sellers and reach thousands of buyers looking for quality
              refurbished products.
            </p>
            <Link
              to="/sell"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded font-medium hover:opacity-90 transition-opacity"
            >
              Start Selling Today
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
