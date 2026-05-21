import { Request, Router } from "express";
import {
  validateAddItem,
  validateUpdateQuantity,
} from "../middleware/validate";
import { randomUUID } from "crypto";
import {
  createCart,
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
} from "../services/cartService";
import { AddItemBody, UpdateQuantityBody } from "../types";

const cartRouter = Router();

cartRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const cart = await getCart(id);

    response.status(200).json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    response.status(404).json({ error: message });
  }
});

cartRouter.post("/", async (request, response) => {
  try {
    const id = randomUUID();
    const cart = await createCart(id);

    response.status(201).json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    response.status(500).json({ error: message });
  }
});

cartRouter.post<"/:id/items", { id: string }, unknown, AddItemBody>(
  "/:id/items",
  validateAddItem,
  async (request, response) => {
    const id = String(request.params.id);
    const { productId, quantity } = request.body;
    try {
      const cart = await addItem(id, productId, quantity);

      response.status(201).json(cart);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const status = message.includes("not found") ? 404 : 400;

      response.status(status).json({ error: message });
    }
  },
);

cartRouter.put(
  "/:id/items/:productId",
  validateUpdateQuantity,
  async (
    request: Request<
      { id: string; productId: string },
      unknown,
      UpdateQuantityBody
    >,
    response,
  ) => {
    const id = String(request.params.id);
    const productId = String(request.params.productId);
    const { quantity } = request.body;

    try {
      const cart = await updateItemQuantity(id, productId, quantity);

      response.status(200).json(cart);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const status = message.includes("not found") ? 404 : 400;

      response.status(status).json({ error: message });
    }
  },
);

cartRouter.delete("/:id/items/:productId", async (request, response) => {
  const id = String(request.params.id);
  const productId = String(request.params.productId);

  try {
    const cart = await removeItem(id, productId);

    response.status(200).json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("not found") ? 404 : 400;

    response.status(status).json({ error: message });
  }
});

export default cartRouter;
