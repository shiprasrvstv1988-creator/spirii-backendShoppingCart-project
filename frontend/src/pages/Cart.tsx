import { useState } from "react";
import { mockCart } from "../data/cart";
import { mockProducts } from "../data/products";

export default function Cart() {
  const [cart, setCart] = useState(mockCart);

  const cartItems = cart.items.map((item) => {
    const product = mockProducts.find((p) => p.id === item.productId);

    return {
      ...item,
      name: product?.name || "Unknown Product",
      description: product?.description || "",
    };
  });

  const increase = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    }));
  };

  const decrease = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    }));
  };

  const remove = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

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

      <h2 style={{ marginTop: "2rem" }}>Total: ${total}</h2>

      <button
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
