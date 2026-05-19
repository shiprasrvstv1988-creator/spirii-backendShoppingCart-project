import { Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useCart } from "./context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
export default function App() {
  const { cartCount } = useCart();
  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/products">Products</Link>
          <Link to="/checkout">Checkout</Link>
        </div>

        <Link to="/cart" style={{ position: "relative" }}>
          <FaShoppingCart size={24} />

          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}
