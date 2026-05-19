import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import productsRouter from "./routes/products";
import cartRouter from "./routes/cart";
import checkoutRouter from "./routes/checkout";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
