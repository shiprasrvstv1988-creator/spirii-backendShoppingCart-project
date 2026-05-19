import { Router } from "express";
import {
  validateAddItem,
  validateUpdateQuantity,
} from "../middleware/validate";

const cartRouter = Router();

cartRouter.get("/:id", (request, response) => {
  response.json({ message: "View cart" });
});

cartRouter.post("/", (request, response) => {
  response.json({ message: "Add cart" });
});

cartRouter.post("/:id/items", validateAddItem, (request, response) => {
  response.json({ message: "Add item to cart" });
});

cartRouter.put(
  "/:id/items/:productId",
  validateUpdateQuantity,
  (request, response) => {
    response.json({ message: "Update item quantity in cart" });
  },
);

cartRouter.delete("/:id/items/:productId", (request, response) => {
  response.json({ message: "Remove item from cart" });
});

export default cartRouter;
