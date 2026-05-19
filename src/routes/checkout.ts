import { Router } from "express";
import { checkout } from "../services/cartService";

const checkoutRouter = Router();

checkoutRouter.post("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await checkout(id);

    response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("not found") ? 404 : 400;

    response.status(status).json({ error: message });
  }
});

export default checkoutRouter;
