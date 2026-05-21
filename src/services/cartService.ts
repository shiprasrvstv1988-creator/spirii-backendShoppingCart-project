import { Cart, CartItem } from "../types";
import { getCartById, saveCart, updateCart } from "../data/cartData";
import { getProductById } from "../data/productionData";

function ensureActiveCart(cart: Cart): void {
  if (cart.status !== "active") {
    throw new Error("Cart is already checked out");
  }
}

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

  const product = await getProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return updateCart(cartId, (cart) => {
    ensureActiveCart(cart);

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

    return cart;
  });
}

export async function updateItemQuantity(
  cartId: string,
  productId: string,
  quantity: number,
): Promise<Cart> {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  return updateCart(cartId, (cart) => {
    ensureActiveCart(cart);

    const item = cart.items.find((item) => item.productId === productId);

    if (!item) {
      throw new Error("Item not found in cart");
    }

    item.quantity = quantity;

    return cart;
  });
}

export async function removeItem(
  cartId: string,
  productId: string,
): Promise<Cart> {
  return updateCart(cartId, (cart) => {
    ensureActiveCart(cart);

    const itemExists = cart.items.find((item) => item.productId === productId);

    if (!itemExists) {
      throw new Error("Item not found in cart");
    }

    cart.items = cart.items.filter(
      (item: CartItem) => item.productId !== productId
    );

    return cart;
  });
}

export async function checkout(cartId: string) {
  let total = 0;

  const cart = await updateCart(cartId, async (cart) => {
    ensureActiveCart(cart);

    if (cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    for (const item of cart.items) {
      const product = await getProductById(item.productId);

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      total += product.price * item.quantity;
    }

    cart.status = "checked_out";

    return cart;
  });

  return {
    cartId: cart.id,
    items: cart.items,
    total,
  };
}
