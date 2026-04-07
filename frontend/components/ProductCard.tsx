import { Link } from "react-router-dom";
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  condition: "like-new" | "good" | "fair" | "poor";
  category: string;
  seller: string;
  postedDaysAgo: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

const conditionStyles = {
  "like-new": "bg-green-100 text-green-800",
  good: "bg-blue-100 text-blue-800",
  fair: "bg-yellow-100 text-yellow-800",
  poor: "bg-orange-100 text-orange-800",
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-white rounded-md border border-border hover:border-primary hover:shadow-md transition-all duration-200 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
        />
        <span
          className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded ${conditionStyles[product.condition]}`}
        >
          {product.condition.replace("-", " ")}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <p className="text-2xl font-semibold tracking-tight text-primary">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>
        </div>

        {/* Details */}
        <div className="text-xs text-muted-foreground space-y-1 mb-3">
          <p className="capitalize">{product.category}</p>
          <p>
            Posted {product.postedDaysAgo}{" "}
            {product.postedDaysAgo === 1 ? "day" : "days"} ago
          </p>
        </div>

        {/* Seller Info */}
      </div>
    </Link>
  );
}
