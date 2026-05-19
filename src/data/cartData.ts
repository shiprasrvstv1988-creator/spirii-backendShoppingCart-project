import { readFile, writeFile } from "fs/promises";
import path from "path";

const cartFilePath = path.join(process.cwd(), "data", "cart.json");

export async function getCart() {
  const data = await readFile(cartFilePath, "utf-8");
  return JSON.parse(data);
}

export async function saveCart(cart: any[]) {
  await writeFile(cartFilePath, JSON.stringify(cart, null, 2));
}
