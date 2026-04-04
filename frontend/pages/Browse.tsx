import Layout from "@/components/Layout";
import ProductCard, { Product } from "@/components/ProductCard";

const PRODUCTS: Product[] = [
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
    image: "",
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
    image: "",
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
    image: "",
    condition: "like-new",
    category: "electronics",
    seller: "music_lover",
    postedDaysAgo: 4,
    rating: 5,
  },
  {
    id: "6",
    title: "iPhone 12",
    price: 300,
    image: "",
    condition: "good",
    category: "electronics",
    seller: "mobile_store",
    postedDaysAgo: 1,
    rating: 4,
  },
  {
  id: "7",
  title: "Dell Laptop i5",
  price: 220,
  image: "",
  condition: "good",
  category: "electronics",
  seller: "laptop_store",
  postedDaysAgo: 2,
  rating: 4,
},
{
  id: "8",
  title: "Dining Table Set",
  price: 180,
  image: "",
  condition: "like-new",
  category: "furniture",
  seller: "home_store",
  postedDaysAgo: 3,
  rating: 5,
},
{
  id: "9",
  title: "Bluetooth Speaker",
  price: 50,
  image: "",
  condition: "good",
  category: "electronics",
  seller: "audio_shop",
  postedDaysAgo: 1,
  rating: 4,
},
{
  id: "10",
  title: "Study Chair",
  price: 70,
  image: "",
  condition: "fair",
  category: "furniture",
  seller: "chair_world",
  postedDaysAgo: 4,
  rating: 3,
},
{
  id: "11",
  title: "LED Monitor 24 inch",
  price: 140,
  image: "",
  condition: "like-new",
  category: "electronics",
  seller: "tech_zone",
  postedDaysAgo: 2,
  rating: 5,
}
];

export default function Browse() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        <h1 className="text-2xl font-bold mb-6">Browse Products</h1>

        {/* SAME UI as Index */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </Layout>
  );
}