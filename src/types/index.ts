export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
  status: "active" | "checked_out";
  createdAt: string;
};

export type ApiError = {
  error: string;
  details?: string;
};
