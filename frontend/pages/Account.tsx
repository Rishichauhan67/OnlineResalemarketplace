import { useEffect, useState } from "react";
import { getUser, setUser } from "../utils/auth";
import EditProfileModal from "../components/EditProfileModal";
import ProductCard from "@/components/ProductCard";
import { User, ShoppingBag, Heart, Package } from "lucide-react";
import { string } from "zod/v4";

export default function Account() {
  const [user, setUserState] = useState(getUser());
  const [open, setOpen] = useState(false);

  if (!user) {
    return <div className="p-10 text-center text-lg">Please login first</div>;
  }
  const [listings, setListings] = useState<any[]>([]);
  useEffect(() => {
    const storedListings = JSON.parse(
      localStorage.getItem("myListings") || "[]",
    );
    setListings(storedListings);
  }, []);

  //  const listings = JSON.parse(localStorage.getItem("myListings") || "[]");

  const handleSave = (data: any) => {
    setUser(data);
    setUserState(data);
  };

  const deleteListing = (id: number) => {
    const updatedListings = listings.filter((item) => item.id !== id);

    setListings(updatedListings);
    localStorage.setItem("myListings", JSON.stringify(updatedListings));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white px-4 py-3 rounded-lg shadow-sm text-center w-full">
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl mx-auto mb-4">
            {user.name?.charAt(0)}
          </div>

          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>

          <button
            onClick={() => setOpen(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>

          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>
              <b>Phone:</b> {user.phone || "Not added"}
            </p>
            <p>
              <b>Location:</b> {user.location || "Not added"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className=" gap-4 max-w-xs mx-auto md:mx-1 mb-36">
          <div className="bg-white px-3 py-3 rounded-lg grid grid-cols-0 shadow-sm text-center gap-0 mb-4">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-semibold">{listings.length}</p>
          </div>

          <div className="bg-white px-4  py-3 rounded-lg shadow-sm text-center mb-3">
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-lg font-semibold">{listings.length}</p>
          </div>

          <div className="bg-white px-6 py-4 rounded-lg shadow-sm text-center">
            <p className="text-xs text-gray-500">Sold</p>
            <p className="text-lg font-semibold">0</p>
          </div>
        </div>
      </div>

      {/* LISTINGS SECTION */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">My Listings</h2>

        {listings.length === 0 ? (
          <p className="text-gray-500">No items listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={item.image}
                  className="w-full h-40 object-contain mb-3"
                />

                {/* Title */}
                <h3 className="font-semibold text-center">
                  {item.productName}
                </h3>

                {/* Price */}
                <p className="text-blue-600 font-bold">${item.price}</p>

                {/* Button */}
                <button
                  onClick={() => deleteListing(item.id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <EditProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={user}
        onSave={handleSave}
      />
    </div>
  );
}
