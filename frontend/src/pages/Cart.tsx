import { useCart } from "../context/CartContext";
import { mockProducts } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, increase, decrease, remove, cartTotal } = useCart();
  const navigate = useNavigate();
  const cartItems = cart.items.map((item) => {
    const product = mockProducts.find((p) => p.id === item.productId);

    return {
      ...item,
      name: product?.name || "Unknown Product",
      description: product?.description || "",
    };
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.productId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <div>
              <h3>{item.name}</h3>
              <p>${item.unitPrice}</p>
            </div>

            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <button onClick={() => decrease(item.productId)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item.productId)}>+</button>
            </div>

            <button
              onClick={() => remove(item.productId)}
              style={{ background: "red", color: "white" }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h2 style={{ marginTop: "2rem" }}>Total: ${cartTotal}</h2>

      <button
        onClick={() => navigate("/checkout")}
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Checkout
      </button>
    </div>
  );
}
