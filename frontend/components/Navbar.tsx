import { useEffect, useState } from "react";
import { getUser, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  navigate("/login");
};
export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">RefreshMart</h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/browse">Browse</a>
        <a href="/sell">Sell</a>

        {user ? (
          <>
            <a href="/account">Account</a>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            {/* <a href="/login">Login</a> */}
            {/* <a href="/signup">Sign Up</a> */}
          </>
        )}
      </div>
    </nav>
  );
}
