import { readFile } from "fs/promises";
import path from "path";
import { Product } from "../types/index";

const productsFilePath = path.join(process.cwd(), "data", "products.json");

export async function getProducts() {
  const data = await readFile(productsFilePath, "utf-8");
  return JSON.parse(data) as Product[];
}

export async function getProductById(id: string) {
  const products = await getProducts();
  return products.find((product) => product.id === id) || null;
}
