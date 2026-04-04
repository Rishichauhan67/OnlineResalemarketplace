import { useState } from "react";
import Layout from "@/components/Layout";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Sell() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    category: "electronics",
    condition: "good",
    price: "",
    description: "",
    image: null as File | null,
    imagePreview: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    // Validation
    if (!formData.productName.trim()) {
      toast({
        title: "Missing product name",
        description: "Please enter a product name.",
      });
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price.",
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Missing description",
        description: "Please enter a product description.",
      });
      return;
    }

    if (!formData.imagePreview) {
      toast({
        title: "Missing image",
        description: "Please upload a product image.",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Creating listing with data:", formData);

    // Simulate API call
    setTimeout(() => {
      const listingData = {
        id: Date.now(),
        productName: formData.productName,
        brand: formData.brand,
        category: formData.category,
        condition: formData.condition,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.imagePreview,
      };
      // Get existing listings
      const existingListings = JSON.parse(
        localStorage.getItem("myListings") || "[]",
      );

      // Add new listing
      existingListings.push(listingData);

      // Save back to localStorage
      localStorage.setItem("myListings", JSON.stringify(existingListings));

      console.log("Listing created successfully:", listingData);

      toast({
        title: "Success!",
        description: `"${formData.productName}" has been listed for sale!`,
      });

      // Reset form
      setFormData({
        productName: "",
        brand: "",
        category: "electronics",
        condition: "good",
        price: "",
        description: "",
        image: null,
        imagePreview: "",
      });

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-11">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Sell Your Items
          </h1>
          <p className="text-muted-foreground text-sm">
            Create a listing for items you want to sell. Fill in the details
            below to get started.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Image */}
          <div className="bg-secondary rounded border border-border p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Product Image
            </h2>

            {formData.imagePreview ? (
              <div className="relative w-full">
                <img
                  src={formData.imagePreview}
                  alt="Product preview"
                  className="w-full h-64 object-cover rounded border border-border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded hover:opacity-90 transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="block w-full border-2 border-dashed border-border rounded p-8 text-center cursor-pointer hover:border-primary hover:bg-border transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-foreground font-medium mb-1">
                  Click to upload image
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or select a file (Max 5MB)
                </p>
              </label>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-secondary rounded border border-border p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Product Name *
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  placeholder="e.g., MacBook Pro 2019"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Brand */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="e.g., Apple"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Condition */}
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Price ($) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-secondary rounded border border-border p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Description
            </h2>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Product Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide detailed information about your product. Include condition, any defects, what's included, size, color, etc."
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Listing Settings */}
          <div className="bg-secondary rounded border border-border p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Listing Settings
            </h2>

            <div className="space-y-4">
              <label className="flex items-start gap-3"></label>

              <label className="flex items-start gap-3">
                <input  type="checkbox"  defaultChecked className="w-4 h-4 border border-border rounded bg-background text-primary focus:ring-2 focus:ring-primary mt-1"/>
                <div>
                  <p className="font-medium text-foreground">
                    Local pickup available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Buyers can pick up the item in person
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 border border-border rounded bg-background text-primary focus:ring-2 focus:ring-primary mt-1"
                />
                <div>
                  <p className="font-medium text-foreground">
                    Shipping available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You'll handle shipping to buyers
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Creating Listing...
                </span>
              ) : (
                "Create Listing"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  productName: "",
                  brand: "",
                  category: "electronics",
                  condition: "good",
                  price: "",
                  description: "",
                  image: null,
                  imagePreview: "",
                });
              }}
              className="flex-1 border border-border text-foreground px-6 py-3 rounded font-medium hover:bg-border transition-colors"
            >
              Clear Form
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-sm text-blue-900">
              <strong>note:</strong> Use clear photos, be honest about the
              condition, provide detailed descriptions, and set a fair price.
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
}
