import ProductCard from "../components/ProductCard";
import { mockProducts } from "../data/products";

export default function Products() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Our Coffee</h1>

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
