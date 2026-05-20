import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        background: "#F5F0FF",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div
        style={{
          background: "white",
          padding: "3rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "#000",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Order Placed Successfully
        </h1>
        <p
          style={{
            color: "#555",
            fontSize: "1.1rem",
            marginBottom: "2rem",
          }}
        >
          Thank you for your purchase!
        </p>

        <Link
          to="/products"
          style={{
            marginTop: "1rem",
            display: "inline-block",
            padding: "0.9rem 1.5rem",
            background: "#A78BFA",
            color: "white",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#8B6EF6")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#A78BFA")}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
