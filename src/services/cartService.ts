import { Cart, CartItem } from "../types";
import { getCart, saveCart } from "../data/cartData";
import { getProductById } from "../data/productionData";

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
export async function getCartById(cartId: string): Promise<Cart> {
  const carts = await getCart();

  const cart = carts.find((c: Cart) => c.id === cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  return cart;
}

//Add item to cart
export async function addItem(
  cartId: string,
  productId: string,
  quantity: number
): Promise<Cart> {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await getCart();

  const product = await getProductById(Number(productId));

  if (!product) {
    throw new Error("Product not found");
  }

  const existingItem = cart.items.find(
    (item: CartItem) => item.productId === productId
  );

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

  saveCart(cart);
  return cart;
}

//Update quantity of an item in the cart
export async function updateItemQuantity(
  cartId: string,
  productId: string,
  quantity: number
): Promise<Cart> {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await getCart();

  const item = cart.items.find((i: CartItem) => i.productId === productId);

  if (!item) {
    throw new Error("Item not found in cart");
  }

  item.quantity = quantity;

  saveCart(cart);
  return cart;
}

//Remove item from cart
export async function removeItem(
  cartId: string,
  productId: string
): Promise<Cart> {
  const cart = await getCart();

  const itemExists = cart.items.find(
    (item: CartItem) => item.productId === productId
  );

  if (!itemExists) {
    throw new Error("Item not found in cart");
  }

  cart.items = cart.items.filter(
    (item: CartItem) => item.productId !== productId
  );

  saveCart(cart);
  return cart;
}

//Checkout cart and calculate total price
export async function checkout(cartId: string) {
  const cart = await getCart();

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
  saveCart(cart);

  return {
    cartId: cart.id,
    items: cart.items,
    total,
  };
}
