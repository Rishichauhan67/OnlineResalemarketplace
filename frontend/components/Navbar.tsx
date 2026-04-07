import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">RefreshMart</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse</Link>
        <Link to="/sell">Sell</Link>
      </div>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default Navbar;
