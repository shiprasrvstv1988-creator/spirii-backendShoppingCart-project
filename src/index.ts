import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import productsRouter from "./routes/products";
import cartRouter from "./routes/cart";
import checkoutRouter from "./routes/checkout";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use((request, response, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

  response.header("Access-Control-Allow-Origin", allowedOrigin);
  response.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS",
  );
  response.header("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ message: "Coffee Shop API is running" });
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  },
);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server failed to start", error);
});
