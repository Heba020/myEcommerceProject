import { ca } from "zod/locales";

export async function handleProducts() {
  try {
    const products = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
      { cache: "no-store" },
    );
    const result = await products.json();
    return result?.data;
  } catch (error) {
    return error;
  }
}
