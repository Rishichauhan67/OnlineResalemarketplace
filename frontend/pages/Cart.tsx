import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { toast } = useToast();

  const handleRemove = (id: string, title: string) => {
    removeFromCart(id);
    toast({
      title: "Removed from cart",
      description: `${title} has been removed.`,
    });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="min-h-96 flex flex-col items-center justify-center text-center bg-secondary rounded border border-border p-8">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Start shopping and add some items to your cart!
            </p>
            <Link
              to="/"
              className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded border border-border overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="border-b border-border p-6 last:border-b-0 flex gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-border rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Condition: <span className="capitalize">{item.condition}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Seller: <span className="text-foreground font-medium">{item.seller}</span>
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.id, item.title)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 border border-border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="p-2 hover:bg-border transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 font-medium text-foreground min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-border transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-secondary rounded border border-border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items ({getTotalItems()})</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>TBD</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>TBD</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                <span>Total</span>
                <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>

              <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:opacity-90 transition-opacity mb-3">
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="w-full border border-border text-foreground px-6 py-3 rounded font-medium hover:bg-border transition-colors text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
