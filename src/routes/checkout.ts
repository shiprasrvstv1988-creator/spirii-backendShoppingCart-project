import { Router } from "express";

const checkoutRouter = Router();

checkoutRouter.post("/:id", (request, response) => {
  response.json({ message: "Checkout cart" });
});

export default checkoutRouter;
