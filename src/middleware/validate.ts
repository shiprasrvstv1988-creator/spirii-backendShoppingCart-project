import { Request, Response, NextFunction } from "express";
import { AddItemBody, UpdateQuantityBody } from "../types";

export const validateAddItem = (
  request: Request<{}, {}, AddItemBody>,
  response: Response,
  next: NextFunction,
) => {
  const { productId, quantity } = request.body;
  if (!productId) {
    return response.status(400).json({ error: "Product ID is required" });
  }
  if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
    return response
      .status(400)
      .json({ error: "Quantity must be a positive integer" });
  }
  next();
};

export const validateUpdateQuantity = (
  request: Request<{}, {}, UpdateQuantityBody>,
  response: Response,
  next: NextFunction,
) => {
  const { quantity } = request.body;
  if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
    return response
      .status(400)
      .json({ error: "Quantity must be a positive integer" });
  }
  next();
};
