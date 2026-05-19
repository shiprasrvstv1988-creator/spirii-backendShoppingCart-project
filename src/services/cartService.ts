import { Cart, CartItem } from "../types";

//Create a new cart

export function createCart(cartId: string): Cart {
  const newCart: Cart = {
    id: cartId,
    items: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };

  return newCart;
}
