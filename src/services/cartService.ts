import { Cart, CartItem } from "../types";
import { getCartById, saveCart } from "../data";
import { getProductById } from "../data";

//Create a new cart
export function createCart(cartId: string): Cart {
  const newCart: Cart = {
    id: cartId,
    items: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };

  saveCart(newCart);
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

//Add item to cart
export function addItem(
  cartId: string,
  productId: string,
  quantity: number,
  unitPrice: number
): Cart {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = getCart(cartId);

  const product = getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newItem: CartItem = {
      productId,
      quantity,
      unitPrice,
    };

    cart.items.push(newItem);
  }

  saveCart(cart);
  return cart;
}

//Update quantity of an item in the cart

export function updateItemQuantity(
  cartId: string,
  productId: string,
  quantity: number
): Cart {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = getCart(cartId);

  const item = cart.items.find((i) => i.productId === productId);

  if (!item) {
    throw new Error("Item not found in cart");
  }

  item.quantity = quantity;

  saveCart(cart);
  return cart;
}
