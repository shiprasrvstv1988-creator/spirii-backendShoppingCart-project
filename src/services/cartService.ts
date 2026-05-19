import { Cart, CartItem } from "../types";
import { getCartById, saveCart } from "../data";

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

//Get a cart by id
export function getCart(cartId: string): Cart {
  const cart = getCartById(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  return cart;
}

//
