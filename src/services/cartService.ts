import { Cart, CartItem } from "../types";
import { getCartById, saveCart } from "../data/cartData";
import { getProductById } from "../data/productionData";

export async function createCart(cartId: string): Promise<Cart> {
  const newCart: Cart = {
    id: cartId,
    items: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };

  await saveCart(newCart);
  return newCart;
}

export async function getCart(cartId: string): Promise<Cart> {
  const cart = await getCartById(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  return cart;
}

export async function addItem(
  cartId: string,
  productId: string,
  quantity: number,
): Promise<Cart> {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await getCart(cartId);
  const product = await getProductById(productId);

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
      unitPrice: product.price,
    };

    cart.items.push(newItem);
  }

  await saveCart(cart);
  return cart;
}

export async function updateItemQuantity(
  cartId: string,
  productId: string,
  quantity: number,
): Promise<Cart> {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await getCart(cartId);
  const item = cart.items.find((item) => item.productId === productId);

  if (!item) {
    throw new Error("Item not found in cart");
  }

  item.quantity = quantity;

  await saveCart(cart);
  return cart;
}

export async function removeItem(
  cartId: string,
  productId: string,
): Promise<Cart> {
  const cart = await getCart(cartId);
  const itemExists = cart.items.find((item) => item.productId === productId);

  if (!itemExists) {
    throw new Error("Item not found in cart");
  }

  cart.items = cart.items.filter((item) => item.productId !== productId);

  await saveCart(cart);
  return cart;
}

export async function checkout(cartId: string) {
  const cart = await getCart(cartId);

  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let total = 0;

  for (const item of cart.items) {
    const product = await getProductById(item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    total += product.price * item.quantity;
  }

  cart.status = "checked_out";
  await saveCart(cart);

  return {
    cartId: cart.id,
    items: cart.items,
    total,
  };
}
