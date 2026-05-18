import { ca } from "zod/locales";

export async function handleProducts() {
  try {
    const products = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      { next: { revalidate: 60 } },
    );
    const result = await products.json();
    return result?.data;
  } catch (error) {
    return error;
  }
}