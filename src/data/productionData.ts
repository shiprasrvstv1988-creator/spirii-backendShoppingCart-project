import { readFile } from "fs/promises";
import path from "path";

const productsFilePath = path.join(process.cwd(), "data", "products.json");

export async function getProducts() {
  const data = await readFile(productsFilePath, "utf-8");
  if (!data) throw new Error("product data is empty");
  return JSON.parse(data);
}

export async function getProductById(id: number) {
  const products = await getProducts();
  return products.find((p: any) => p.id === id) || null;
}
