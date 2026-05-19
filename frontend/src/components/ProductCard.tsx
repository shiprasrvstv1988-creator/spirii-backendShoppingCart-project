type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
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
        disabled={!product.available}
        style={{
          width: "100%",
          padding: "0.7rem",
          background: product.available ? "#333" : "#aaa",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: product.available ? "pointer" : "not-allowed",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
