import { Router } from "express";
import { getProducts } from "../data/productionData";

const productsRouter = Router();

productsRouter.get("/", async (request, response) => {
  try {
    const products = getProducts();
    response.status(200).json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    response.status(404).json({ error: message });
  }
});

export default productsRouter;
