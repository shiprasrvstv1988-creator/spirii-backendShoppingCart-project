import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", (request, response) => {
  response.json({ message: "List of products" });
});

export default productsRouter;
