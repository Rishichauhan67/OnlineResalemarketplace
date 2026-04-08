import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Sell from "./pages/Sell";
import About from './pages/About'; // Import the new file you just created

function App() {
  return (
    <BrowserRouter>

      {/* TOP NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;