import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, increase, decrease, remove, cartTotal, error } = useCart();
  const { products, isLoading } = useProducts();
  const navigate = useNavigate();
  const cartItems = cart.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    return {
      ...item,
      name: product?.name || "Unknown Product",
      description: product?.description || "",
    };
  });
  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  return (
    <div
      style={{
        padding: "2rem",
        background: "#F5F0FF",
      }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#000",
          fontSize: "2rem",
          fontWeight: "bold",
        }}>
        Your Cart
      </h1>

      {error && (
        <p
          style={{
            color: "#B42318",
            textAlign: "center",
            marginBottom: "1rem",
          }}>
          {error}
        </p>
      )}

      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto",
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}>
          <p style={{ color: "#444", marginBottom: "1.5rem" }}>
            Your cart is empty.
          </p>
          <button
            onClick={() => navigate("/products")}
            style={{
              background: "#A78BFA",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8B6EF6")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#A78BFA")
            }>
            Back to Products
          </button>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "1px solid #eee",
              }}>
              <div style={{ width: "200px" }}>
                <h3 style={{ margin: 0, color: "#000" }}>{item.name}</h3>
                <p style={{ margin: "4px 0", color: "#555" }}>
                  ${item.unitPrice}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  width: "120px",
                  justifyContent: "center",
                }}>
                <button
                  onClick={() => decrease(item.productId)}
                  style={{
                    background: "#E6D8FF",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}>
                  -
                </button>
                <span style={{ fontWeight: "bold", color: "#000" }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => increase(item.productId)}
                  style={{
                    background: "#E6D8FF",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}>
                  +
                </button>
              </div>

              <button
                onClick={() => remove(item.productId)}
                style={{
                  background: "#FF6B6B",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "90px",
                }}>
                Remove
              </button>
            </div>
          ))}

          <h2
            style={{
              marginTop: "2rem",
              textAlign: "right",
              color: "#000",
            }}>
            Total: ${cartTotal}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              width: "100%",
              background: "#A78BFA",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8B6EF6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#A78BFA";
            }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
