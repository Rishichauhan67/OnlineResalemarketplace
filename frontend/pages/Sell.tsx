import { useState, useEffect } from "react";
import axios from "axios";

export default function Sell() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    condition: "Good",
    imageFile: null,
  });

  const [preview, setPreview] = useState("");
  const [products, setProducts] = useState([]);

  // 📦 Convert file → base64
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        imageFile: reader.result as string, // This converts the file to a long string
      });
      setPreview(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 📥 Fetch products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sell.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData
    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("condition", form.condition);

    if (form.imageFile) {
      // This MUST be named "image" to match upload.single("image") in the backend
      data.append("image", form.imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      console.log("Success!", response.data);
      fetchProducts(); // Refresh the list

      // Reset Form
      setForm({ name: "", price: "", condition: "Good", imageFile: null });
      setPreview("");
    } catch (err: any) {
      console.error("Backend Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-white shadow p-5">
        <h2 className="text-xl font-bold mb-6">Seller Panel</h2>
        <p className="text-sm text-gray-500">Manage Products</p>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {/* ADD PRODUCT */}
        <div className="bg-white p-6 rounded-xl shadow mb-9">
          <h2 className="text-lg font-semibold mb-4">Add Product</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded"
            />
            <input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
            />

            <input
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 rounded"
            />

            <select
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              className="border p-2 rounded"
            >
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>

            {/* FILE INPUT */}
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              className="mt-4 w-32 h-32 object-cover rounded"
            />
          )}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white px-6 py-2 rounded"
          >
            Add Product
          </button>
        </div>

        {/* PRODUCT LIST */}
        <div>
          <h2 className="text-lg font-semibold mb-4 ">Your Products</h2>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 border-r-2">
            {products.map((p: any) => (
              <div key={p._id} className="bg-white p-4 rounded shadow">
                <img
                  src={p.image}
                  className="h-44 w-full object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{p.name}</h3>
                <p className="text-green-900">₹{p.price}</p>
                <p className="text-sm text-gray-500">{p.condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
