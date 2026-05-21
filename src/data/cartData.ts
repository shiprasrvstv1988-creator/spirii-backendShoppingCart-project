import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Cart } from "../types/index";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const cartFilePath = path.join(process.cwd(), "data", "cart.json");

type FileError = Error & {
  code?: string;
};

async function readCarts(): Promise<Cart[]> {
  try {
    const data = await readFile(cartFilePath, "utf-8");
    return JSON.parse(data) as Cart[];
  } catch (error) {
    const fileError = error as FileError;

    if (fileError.code !== "ENOENT") {
      throw error;
    }

    await writeFile(cartFilePath, JSON.stringify([], null, 2));
    return [];
  }
}

export async function getCartById(id: string) {
  const carts = await readCarts();
  return carts.find((cart) => cart.id === id) || null;
}

export async function saveCart(cart: Cart) {
  await mutex.runExclusive(async () => {
    const carts = await readCarts();
    const index = carts.findIndex((c) => c.id === cart.id);

    if (index !== -1) {
      carts[index] = cart;
    } else {
      carts.push(cart);
    }

    await writeFile(cartFilePath, JSON.stringify(carts, null, 2));
  });
}

export async function updateCart(
  id: string,
  update: (cart: Cart) => Cart | Promise<Cart>,
): Promise<Cart> {
  return mutex.runExclusive(async () => {
    const carts = await readCarts();
    const index = carts.findIndex((cart) => cart.id === id);

    if (index === -1) {
      throw new Error("Cart not found");
    }

    const updatedCart = await update(carts[index]);
    carts[index] = updatedCart;

    await writeFile(cartFilePath, JSON.stringify(carts, null, 2));
    return updatedCart;
  });
}
