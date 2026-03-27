import { useState } from "react";
import { getUser, setUser } from "../utils/auth";
import EditProfileModal from "../components/EditProfileModal";
import { User, ShoppingBag, Heart, Package } from "lucide-react";

export default function Account() {
  const [user, setUserState] = useState(getUser());
  const [open, setOpen] = useState(false);

  if (!user) {
    return <div className="p-10 text-center text-lg">Please login first</div>;
  }

  const handleSave = (data: any) => {
    setUser(data);
    setUserState(data);
  };

  return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}

          <div className="bg-white rounded-xl shadow p-6 text-center">
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

      </div>
      <EditProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={user}
        onSave={handleSave}
      />
    </div>
  );
}
