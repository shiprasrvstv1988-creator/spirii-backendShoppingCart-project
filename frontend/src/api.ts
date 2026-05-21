import type { Cart, CheckoutResult, Product } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    throw new Error(body?.error ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export function getProducts() {
  return request<Product[]>("/products");
}

export function createCart() {
  return request<Cart>("/cart", { method: "POST" });
}

export function getCart(id: string) {
  return request<Cart>(`/cart/${id}`);
}

export function addCartItem(cartId: string, productId: string) {
  return request<Cart>(`/cart/${cartId}/items`, {
    method: "POST",
    body: JSON.stringify({ productId, quantity: 1 }),
  });
}

export function updateCartItemQuantity(
  cartId: string,
  productId: string,
  quantity: number,
) {
  return request<Cart>(`/cart/${cartId}/items/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(cartId: string, productId: string) {
  return request<Cart>(`/cart/${cartId}/items/${productId}`, {
    method: "DELETE",
  });
}

export function checkoutCart(cartId: string) {
  return request<CheckoutResult>(`/checkout/${cartId}`, { method: "POST" });
}
