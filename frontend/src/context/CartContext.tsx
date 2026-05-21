import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

type Cart = {
  id: string;
  items: CartItem[];
  status: "active" | "checked_out";
  createdAt: string;
};

type CartContextType = {
  cart: Cart;
  addToCart: (productId: string, price: number) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  remove: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => {
    const saved = localStorage.getItem("cart");
    if (saved) return JSON.parse(saved);

    return {
      id: crypto.randomUUID(),
      items: [],
      status: "active",
      createdAt: new Date().toISOString(),
    };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: string, price: number) => {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.productId === productId);

      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }

      return {
        ...prev,
        items: [...prev.items, { productId, quantity: 1, unitPrice: price }],
      };
    });
  };

  const increase = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    }));
  };

  const decrease = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      ),
    }));
  };

  const remove = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.productId !== productId),
    }));
  };

  const clearCart = () => {
    setCart((prev) => ({
      ...prev,
      items: [],
    }));
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        remove,
        clearCart,
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
