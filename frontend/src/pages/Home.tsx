import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "3rem 1rem",
        background: "#F5F0FF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#000",
          marginBottom: "1rem",
        }}
      >
        Welcome to Brewed With Love
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          color: "#555",
          marginBottom: "2rem",
          maxWidth: "500px",
        }}
      >
        Discover handcrafted coffee drinks made with passion. Start exploring
        our menu and find your perfect cup.
      </p>

      <button
        onClick={() => navigate("/products")}
        style={{
          padding: "1rem 2rem",
          background: "#A78BFA",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#8B6EF6")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#A78BFA")}
      >
        Explore Products
      </button>
    </div>
  );
}
