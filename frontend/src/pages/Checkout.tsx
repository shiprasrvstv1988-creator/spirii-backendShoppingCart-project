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
    <div style={{ padding: "2rem" }}>
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p>${item.unitPrice * item.quantity}</p>
            </div>
          ))}

          <h2 style={{ marginTop: "2rem" }}>Total: ${cartTotal}</h2>

          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#333",
              color: "white",
              border: "none",
              borderRadius: "6px",
              width: "200px",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
