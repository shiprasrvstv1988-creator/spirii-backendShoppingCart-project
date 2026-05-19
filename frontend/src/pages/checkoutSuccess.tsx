import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Order Placed Successfully</h1>
      <p>Thank you for your purchase!</p>

      <Link
        to="/products"
        style={{
          marginTop: "1rem",
          display: "inline-block",
          padding: "1rem",
          background: "#333",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
