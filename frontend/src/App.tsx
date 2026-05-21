import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { FaCoffee, FaShoppingCart } from "react-icons/fa";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/checkoutSuccess";
import Home from "./pages/Home";
import { useCart } from "./context/CartContext";
import "./App.css";

export default function App() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <button
          className="brand-button"
          type="button"
          onClick={() => navigate("/")}
        >
          <FaCoffee className="brand-icon" aria-hidden="true" />
          <span>Brewed With Love</span>
        </button>

        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/products">
            Products
          </Link>
          <Link className="nav-link" to="/checkout">
            Checkout
          </Link>
        </div>

        <Link className="cart-link" to="/cart" aria-label="Cart">
          <FaShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Brewed With Love</p>
        <p>Crafted with coffee and React</p>
      </footer>
    </div>
  );
}
