import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Cart } from "../types/index";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const cartFilePath = path.join(process.cwd(), "data", "cart.json");

export async function getCartById(id: string) {
  const data = await readFile(cartFilePath, "utf-8");
  const carts = JSON.parse(data) as Cart[];
  return carts.find((cart) => cart.id === id) || null;
}

export async function saveCart(cart: Cart) {
  await mutex.runExclusive(async () => {
    const data = await readFile(cartFilePath, "utf-8");
    const carts = JSON.parse(data) as Cart[];
    const index = carts.findIndex((c) => c.id === cart.id);

    if (index !== -1) {
      carts[index] = cart;
    } else {
      carts.push(cart);
    }

    await writeFile(cartFilePath, JSON.stringify(carts, null, 2));
  });
}
