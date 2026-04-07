import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, MessageSquare, Star, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { Product } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

// Mock product details (in real app, fetch by ID)
const PRODUCT_DETAILS: Record<
  string,
  Product & { description: string; specs?: string[] }
> = {
  "1": {
    id: "1",
    title: "MacBook Pro 2019 - 13 inch",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    condition: "good",
    category: "electronics",
    seller: "john_seller",
    postedDaysAgo: 2,
    rating: 4,
    description:
      "Great condition MacBook Pro 13-inch from 2019. Works perfectly, minimal wear. Includes charger. Battery health at 87%. Perfect for student or professional work.",
    specs: [
      "Intel Core i5",
      "8GB RAM",
      "256GB SSD",
      "13-inch Retina Display",
      "Touch Bar",
      "Included: Charger",
    ],
  },
  "2": {
    id: "2",
    title: "Wooden Desk - Oak",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    condition: "like-new",
    category: "furniture",
    seller: "sarah_designs",
    postedDaysAgo: 1,
    rating: 5,
    description:
      "Beautiful solid oak desk in like-new condition. Minimal use. Plenty of storage with drawers. Sturdy construction. Dimensions: 48x24x30 inches.",
    specs: [
      "Solid Oak Wood",
      "4 Drawers",
      "48x24x30 inches",
      "Stained Finish",
      "Recently refinished",
    ],
  },
  "3": {
    id: "3",
    title: "Samsung laptop - 15 inch",
    price: 399.99,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
    condition: "good",
    category: "electronics",
    seller: "tech_store",
    postedDaysAgo: 5,
    rating: 4,
    description:
      "Samsung 4K Smart TV in excellent working condition. Slight frame mark on back, not visible when mounted. Full smart features working. Comes with remote.",
    specs: [
      "55-inch Display",
      "4K Resolution (3840x2160)",
      "HDR Support",
      "Smart TV Apps",
      "WiFi Built-in",
      "Remote Included",
    ],
  },
  "4": {
    id: "4",
    title: "Office Chair - Black Mesh",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1701937189060-8b87985d85e1?w=800&h=600&fit=crop",
    condition: "fair",
    category: "furniture",
    seller: "sarah_designs",
    postedDaysAgo: 6,
    rating: 5,
    description:
      "Sturdy office chair with breathable black mesh back. Adjustable height and tilt. Some wear on seat cushion, but fully functional and comfortable for long work sessions.",
    specs: [
      "Height Adjustable",
      "Tilt Mechanism",
      "Mesh Back",
      "Padded Seat",
      "Like new condition",
    ],
  },
  "5": {
    id: "5",
    title: "Sony Wireless Headphones",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1641048930621-ab5d225ae5b0?q=80&w=543&fit=crop",
    condition: "like-new",
    category: "electronics",
    seller: "music_lover",
    postedDaysAgo: 4,
    rating: 5,
    description:
      "Sony wireless headphones in like-new condition. Excellent sound quality with deep bass and clear highs. Comfortable fit for long listening sessions. Bluetooth connectivity works flawlessly.",
    specs: [
      "Wireless Bluetooth",
      "Noise Cancelling",
      "20 Hours Battery Life",
      "Built-in Microphone",
      "Like-new condition",
    ],
  },
  "6": {
    id: "6",
    title: "Iphone 13 - 128GB",
    price: 30199,
    image:
      "https://images.unsplash.com/photo-1668003375925-03101d2f2fe6?q=80&w=200&fit=crop",
    condition: "good",
    category: "electronics",
    seller: "home_staging",
    postedDaysAgo: 6,
    rating: 4,
    description:
      "iPhone 13 with 128GB storage in good condition. Minor scratches on back, screen is flawless. Battery health at 90%. Comes with original charger and box.",
    specs: [
      "128GB Storage",
      "A15 Bionic Chip",
      "Dual Camera System",
      "6.1-inch Super Retina XDR Display",
      "Battery Health at 90%",
    ],
  },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? PRODUCT_DETAILS[id] : null;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-foreground">Product not found.</p>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      condition: product.condition,
      seller: product.seller,
    });
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  const conditionColors = {
    "like-new": { bg: "bg-green-100", text: "text-green-800" },
    good: { bg: "bg-blue-100", text: "text-blue-800" },
    fair: { bg: "bg-yellow-100", text: "text-yellow-800" },
    poor: { bg: "bg-orange-100", text: "text-orange-800" },
  };

  const colors = conditionColors[product.condition];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Image */}
          <div>
            <div className="relative w-full bg-secondary rounded border border-border overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-medium ${colors.bg} ${colors.text}`}
                >
                  {product.condition.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {product.title}
              </h1>
              <p className="text-4xl font-bold text-primary mb-4">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </p>

              {/* Category and Seller */}
              <div className="text-sm text-muted-foreground space-y-1 mb-4">
                <p className="capitalize">{product.category}</p>
                <p>Posted {product.postedDaysAgo} days ago</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-border">
              <h2 className="font-semibold text-foreground mb-3">
                Description
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specs && (
              <div className="mb-6 pb-6 border-b border-border">
                <h2 className="font-semibold text-foreground mb-3">
                  Specifications
                </h2>
                <ul className="space-y-2">
                  {product.specs.map((spec, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Seller Info */}
            <div className="bg-secondary rounded border border-border p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-2">SOLD BY</p>
              <p className="text-lg font-semibold text-foreground mb-1">
                Renewed
              </p>
              {product.rating && (
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 {
                        i < product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-border"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">
                    {product.rating}.0/5.0
                  </span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Member since 2023 • 127 positive ratings
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAdding ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="w-full border border-border text-foreground px-6 py-3 rounded font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Contact Seller
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            More from this seller
          </h2>
          <div className="bg-secondary rounded border border-border p-8 text-center">
            <p className="text-muted-foreground">
              View more items from {product.seller} by visiting their profile
            </p>
            <button className="mt-4 text-primary font-medium hover:opacity-80 transition-opacity">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
