import ProductCard from "../components/ProductCard";
import { mockProducts } from "../data/products";

export default function Products() {
  return (
    <div
      style={{
        padding: "2rem",
        background: "#F5F0FF",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "0.5rem",
          textAlign: "center",
          color: "#000",
          fontSize: "2rem",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        Brewed With Love
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#555",
          marginTop: "0",
          marginBottom: "2.5rem",
          fontSize: "1.1rem",
        }}
      >
        Choose your perfect cup
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
