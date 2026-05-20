import { useCart } from "../context/CartContext";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

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
        onClick={() => addToCart(product.id, product.price)}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (product.available) e.currentTarget.style.background = "#8B6EF6";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (product.available) e.currentTarget.style.background = "#A78BFA";
        }}
        style={{
          width: "100%",
          padding: "0.9rem 1.5rem",
          background: product.available ? "#A78BFA" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: product.available ? "pointer" : "not-allowed",
          fontWeight: "bold",
          transition: "background 0.2s ease",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
