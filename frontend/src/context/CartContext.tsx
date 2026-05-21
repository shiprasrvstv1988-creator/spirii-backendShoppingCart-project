import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  addCartItem,
  checkoutCart,
  createCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../api";
import type { Cart, CheckoutResult } from "../types";

type CartContextType = {
  cart: Cart;
  isCartReady: boolean;
  error: string | null;
  addToCart: (productId: string) => Promise<void>;
  increase: (productId: string) => Promise<void>;
  decrease: (productId: string) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  placeOrder: () => Promise<CheckoutResult>;
  cartCount: number;
  cartTotal: number;
};

const CART_ID_KEY = "cartId";
let initialCartRequest: Promise<Cart> | null = null;

const emptyCart: Cart = {
  id: "",
  items: [],
  status: "active",
  createdAt: new Date().toISOString(),
};

const CartContext = createContext<CartContextType | null>(null);

async function loadActiveCart() {
  if (!initialCartRequest) {
    initialCartRequest = (async () => {
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      let activeCart = savedCartId
        ? await getCart(savedCartId).catch(() => createCart())
        : await createCart();

      if (activeCart.status !== "active") {
        activeCart = await createCart();
      }

      localStorage.setItem(CART_ID_KEY, activeCart.id);
      return activeCart;
    })();
  }

  return initialCartRequest;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [isCartReady, setIsCartReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCart() {
      setError(null);

      try {
        const activeCart = await loadActiveCart();

        if (!isMounted) return;

        setCart(activeCart);
      } catch (err) {
        initialCartRequest = null;

        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Could not load cart");
      } finally {
        if (isMounted) setIsCartReady(true);
      }
    }

    loadCart();

    return () => {
      isMounted = false;
    };
  }, []);

  async function updateCart(action: () => Promise<Cart>) {
    setError(null);

    try {
      const updatedCart = await action();
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cart update failed");
    }
  }

  const addToCart = async (productId: string) => {
    if (!cart.id) return;
    await updateCart(() => addCartItem(cart.id, productId));
  };

  const increase = async (productId: string) => {
    const item = cart.items.find((cartItem) => cartItem.productId === productId);
    if (!cart.id || !item) return;

    await updateCart(() =>
      updateCartItemQuantity(cart.id, productId, item.quantity + 1),
    );
  };

  const decrease = async (productId: string) => {
    const item = cart.items.find((cartItem) => cartItem.productId === productId);
    if (!cart.id || !item || item.quantity <= 1) return;

    await updateCart(() =>
      updateCartItemQuantity(cart.id, productId, item.quantity - 1),
    );
  };

  const remove = async (productId: string) => {
    if (!cart.id) return;
    await updateCart(() => removeCartItem(cart.id, productId));
  };

  const placeOrder = async () => {
    setError(null);

    try {
      const result = await checkoutCart(cart.id);
      const nextCart = await createCart();

      localStorage.setItem(CART_ID_KEY, nextCart.id);
      initialCartRequest = Promise.resolve(nextCart);
      setCart(nextCart);

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      throw err;
    }
  };

  const cartCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    [cart.items],
  );

  const cartTotal = useMemo(
    () =>
      cart.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
      ),
    [cart.items],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartReady,
        error,
        addToCart,
        increase,
        decrease,
        remove,
        placeOrder,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
