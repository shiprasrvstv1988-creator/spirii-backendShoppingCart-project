import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useCart } from "./context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import CheckoutSuccess from "./pages/checkoutSuccess";

import Home from "./pages/Home";
export default function App() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#E6D8FF",
          color: "white",
          padding: "1rem 2rem",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1.6rem" }}>☕</span>
          <span
            style={{ fontWeight: "bold", color: "#000", fontSize: "1.1rem" }}
          >
            Brewed With Love
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link
            to="/"
            style={{
              color: "#000",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{
              color: "#000",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Products
          </Link>
          <Link
            to="/checkout"
            style={{
              color: "#000",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Checkout
          </Link>
        </div>
        <Link to="/cart" style={{ position: "relative", color: "#000" }}>
          <FaShoppingCart size={24} />

          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "#A78BFA",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
      </Routes>
      <footer
        style={{
          marginTop: "3rem",
          padding: "1.5rem 0",
          background: "#F3E8FF",
          textAlign: "center",
          color: "#555",
          fontSize: "0.9rem",
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Brewed With Love
        </p>
        <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#777" }}>
          Crafted with ☕ and React
        </p>
      </footer>
    </>
  );
}
