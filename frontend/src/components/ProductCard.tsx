import { useCart } from "../context/CartContext";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isCartReady } = useCart();
  const canAdd = product.available && isCartReady;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        background: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{product.name}</h3>

      <p style={{ color: "#555", margin: "0.5rem 0" }}>{product.description}</p>

      <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        ${product.price}
      </p>

      <p
        style={{
          color: product.available ? "green" : "red",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        {product.available ? "Available" : "Out of stock"}
      </p>

      <button
        disabled={!canAdd}
        onClick={() => addToCart(product.id)}
        onMouseEnter={(e) => {
          if (canAdd) e.currentTarget.style.background = "#8B6EF6";
        }}
        onMouseLeave={(e) => {
          if (canAdd) e.currentTarget.style.background = "#A78BFA";
        }}
        style={{
          width: "100%",
          padding: "0.9rem 1.5rem",
          background: canAdd ? "#A78BFA" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: canAdd ? "pointer" : "not-allowed",
          fontWeight: "bold",
          transition: "background 0.2s ease",
        }}
      >
        {isCartReady ? "Add to Cart" : "Loading Cart..."}
      </button>
    </div>
  );
}
