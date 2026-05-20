import { useCart } from "../context/CartContext";
import { mockProducts } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const cartItems = cart.items.map((item) => {
    const product = mockProducts.find((p) => p.id === item.productId);

    return {
      ...item,
      name: product?.name || "Unknown Product",
      description: product?.description || "",
    };
  });

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/checkout/success");
  };

  return (
    <div style={{ padding: "2rem", background: "#F5F0FF", minHeight: "100vh" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#000",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Checkout
      </h1>

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
          }}
        >
          <p
            style={{
              color: "#555",
              fontSize: "1.1rem",
              marginBottom: "2rem",
            }}
          >
            Your cart is empty.
          </p>
          <button
            onClick={() => navigate("/products")}
            style={{
              background: "#A78BFA",
              color: "white",
              border: "none",
              padding: "0.9rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8B6EF6")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#A78BFA")}
          >
            Back to Products
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "1rem",
                color: "#000",
                fontSize: "1.4rem",
                fontWeight: "bold",
              }}
            >
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, color: "#000" }}>{item.name}</h3>
                  <p style={{ margin: "4px 0", color: "#555" }}>
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p>${item.unitPrice * item.quantity}</p>
              </div>
            ))}

            <h2
              style={{
                marginTop: "2rem",
                fontSize: "1.6rem",
                fontWeight: "900",
                color: "#000",
                textAlign: "right",
              }}
            >
              Total: ${cartTotal}
            </h2>

            <button
              onClick={handlePlaceOrder}
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#A78BFA",
                color: "white",
                border: "none",
                borderRadius: "8px",
                width: "100%",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#8B6EF6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#A78BFA")
              }
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
